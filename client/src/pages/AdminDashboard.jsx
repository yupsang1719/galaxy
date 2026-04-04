import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  FiGrid, FiMonitor, FiInfo, FiPhone, FiStar,
  FiMessageSquare, FiBriefcase, FiLogOut, FiMenu, FiX,
  FiExternalLink, FiCheck, FiPlus, FiTrash2, FiToggleLeft, FiToggleRight,
} from "react-icons/fi";

const API = process.env.REACT_APP_API_URL;
const authHeaders = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem("galaxyAdminToken")}` } });

const navItems = [
  { id: "overview",      label: "Overview",       icon: <FiGrid /> },
  { id: "hero",          label: "Hero Section",    icon: <FiMonitor /> },
  { id: "about",         label: "About",           icon: <FiInfo /> },
  { id: "contact",       label: "Contact Details", icon: <FiPhone /> },
  { id: "whyUs",         label: "Why Choose Us",   icon: <FiStar /> },
  { id: "testimonials",  label: "Testimonials",    icon: <FiMessageSquare /> },
  { id: "vacancies",     label: "Vacancies",       icon: <FiBriefcase /> },
];

/* ── Shared field components ── */
const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon/20 transition-all bg-white";
const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";
const Field = ({ label, children }) => <div className="mb-5">{children && <label className={labelClass}>{label}</label>}{children}</div>;

/* ── Sidebar ── */
function Sidebar({ active, setActive, onLogout, open, setOpen, vacancyCount, testimonialCount }) {
  return (
    <>
      {/* Overlay for mobile */}
      {open && <div className="fixed inset-0 bg-dark/40 z-20 md:hidden" onClick={() => setOpen(false)} />}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-dark text-white flex flex-col z-30 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>

        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/icon-only.png" alt="Galaxy" className="h-7 w-auto" />
            <span className="font-bold text-sm tracking-tight">Galaxy <span className="text-maroon">CMS</span></span>
          </Link>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setOpen(false)}>
            <FiX />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">Management</p>
          {navItems.map((item) => {
            const badge = item.id === "vacancies" ? vacancyCount : item.id === "testimonials" ? testimonialCount : null;
            return (
              <button
                key={item.id}
                onClick={() => { setActive(item.id); setOpen(false); }}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-all
                  ${active === item.id ? "bg-maroon text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </span>
                {badge > 0 && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${active === item.id ? "bg-white/20 text-white" : "bg-maroon/20 text-maroon"}`}>
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* View site + logout */}
        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all"
          >
            <FiExternalLink className="text-base" /> View Live Site
          </a>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <FiLogOut className="text-base" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

/* ── Save bar ── */
function SaveBar({ onSave, saving, saved }) {
  return (
    <div className="flex items-center gap-3">
      {saved && (
        <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
          <FiCheck /> Saved
        </span>
      )}
      <button
        onClick={onSave}
        disabled={saving}
        className="bg-maroon text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-maroon-dark transition-colors disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

/* ── Overview ── */
function Overview({ content, vacancies, setActive }) {
  const stats = [
    { label: "Active Vacancies", value: vacancies.filter(v => v.isActive).length, action: "vacancies", icon: <FiBriefcase className="text-maroon text-xl" /> },
    { label: "Testimonials", value: (content?.testimonials || []).length, action: "testimonials", icon: <FiMessageSquare className="text-maroon text-xl" /> },
    { label: "Why Us Items", value: (content?.whyUs || []).length, action: "whyUs", icon: <FiStar className="text-maroon text-xl" /> },
    { label: "Total Vacancies", value: vacancies.length, action: "vacancies", icon: <FiGrid className="text-maroon text-xl" /> },
  ];
  const quickActions = [
    { label: "Edit Hero Text", section: "hero", icon: <FiMonitor /> },
    { label: "Update Contact Details", section: "contact", icon: <FiPhone /> },
    { label: "Post a Vacancy", section: "vacancies", icon: <FiBriefcase /> },
    { label: "Add Testimonial", section: "testimonials", icon: <FiMessageSquare /> },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold mb-1">Dashboard Overview</h2>
      <p className="text-gray-500 text-sm mb-8">Welcome back. Here's a summary of your site content.</p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <button key={s.label} onClick={() => setActive(s.action)}
            className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-maroon transition-all text-left group">
            <div className="w-10 h-10 rounded-xl bg-maroon/10 flex items-center justify-center mb-3 group-hover:bg-maroon transition-colors duration-300">
              <span className="group-hover:[&>*]:text-white transition-colors">{s.icon}</span>
            </div>
            <div className="text-2xl font-bold mb-1 group-hover:text-maroon transition-colors">{s.value}</div>
            <div className="text-xs text-gray-400 font-medium">{s.label}</div>
          </button>
        ))}
      </div>

      {/* Quick actions */}
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickActions.map((a) => (
          <button key={a.label} onClick={() => setActive(a.section)}
            className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-maroon transition-all text-left group">
            <div className="w-10 h-10 rounded-lg bg-maroon/10 flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-white transition-colors text-lg flex-shrink-0">
              {a.icon}
            </div>
            <div>
              <p className="text-sm font-semibold group-hover:text-maroon transition-colors">{a.label}</p>
              <p className="text-xs text-gray-400">Click to edit</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════ */
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Vacancies
  const [vacancies, setVacancies] = useState([]);
  const [vacSaving, setVacSaving] = useState(null);
  const [newVac, setNewVac] = useState({ title: "", roleType: "Temporary", location: "Southeast England", description: "", closingDate: "", isActive: true });
  const [addingVac, setAddingVac] = useState(false);

  useEffect(() => {
    axios.get(`${API}/api/content`).then((r) => setContent(r.data)).catch(() => {});
    axios.get(`${API}/api/vacancies/all`, authHeaders()).then((r) => setVacancies(r.data)).catch(() => {});
  }, []);

  const saveContent = async () => {
    setSaving(true); setSaved(false);
    try {
      await axios.put(`${API}/api/content`, content, authHeaders());
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch { alert("Save failed."); }
    finally { setSaving(false); }
  };

  const logout = () => { localStorage.removeItem("galaxyAdminToken"); navigate("/admin/login"); };

  const update = (path, value) => {
    const keys = path.split(".");
    setContent((prev) => {
      const next = { ...prev };
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) { obj[keys[i]] = { ...obj[keys[i]] }; obj = obj[keys[i]]; }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  // Testimonials
  const addTestimonial = () => setContent((p) => ({ ...p, testimonials: [...(p.testimonials || []), { name: "", role: "", message: "" }] }));
  const updateTestimonial = (i, f, v) => setContent((p) => { const a = [...(p.testimonials || [])]; a[i] = { ...a[i], [f]: v }; return { ...p, testimonials: a }; });
  const removeTestimonial = (i) => setContent((p) => ({ ...p, testimonials: p.testimonials.filter((_, idx) => idx !== i) }));

  // Why Us
  const addWhyUs = () => setContent((p) => ({ ...p, whyUs: [...(p.whyUs || []), { title: "", description: "" }] }));
  const updateWhyUs = (i, f, v) => setContent((p) => { const a = [...(p.whyUs || [])]; a[i] = { ...a[i], [f]: v }; return { ...p, whyUs: a }; });
  const removeWhyUs = (i) => setContent((p) => ({ ...p, whyUs: p.whyUs.filter((_, idx) => idx !== i) }));

  // Vacancies
  const createVacancy = async () => {
    if (!newVac.title || !newVac.description) return alert("Title and description required.");
    setAddingVac(true);
    try {
      const r = await axios.post(`${API}/api/vacancies`, newVac, authHeaders());
      setVacancies((p) => [r.data, ...p]);
      setNewVac({ title: "", roleType: "Temporary", location: "Southeast England", description: "", closingDate: "", isActive: true });
    } catch { alert("Failed to create vacancy."); }
    finally { setAddingVac(false); }
  };
  const toggleVacancy = async (v) => {
    try { const r = await axios.put(`${API}/api/vacancies/${v._id}`, { isActive: !v.isActive }, authHeaders()); setVacancies((p) => p.map((x) => x._id === v._id ? r.data : x)); }
    catch { alert("Failed."); }
  };
  const deleteVacancy = async (id) => {
    if (!window.confirm("Delete this vacancy?")) return;
    try { await axios.delete(`${API}/api/vacancies/${id}`, authHeaders()); setVacancies((p) => p.filter((v) => v._id !== id)); }
    catch { alert("Failed."); }
  };
  const updateVacField = (id, f, v) => setVacancies((p) => p.map((x) => x._id === id ? { ...x, [f]: v } : x));
  const saveVacancy = async (v) => {
    setVacSaving(v._id);
    try { const r = await axios.put(`${API}/api/vacancies/${v._id}`, v, authHeaders()); setVacancies((p) => p.map((x) => x._id === v._id ? r.data : x)); }
    catch { alert("Failed."); }
    finally { setVacSaving(null); }
  };

  const currentNav = navItems.find((n) => n.id === active);
  const contentSections = ["hero", "about", "contact", "whyUs", "testimonials"];

  if (!content) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-maroon border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Loading dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <Sidebar
        active={active} setActive={setActive}
        onLogout={logout}
        open={sidebarOpen} setOpen={setSidebarOpen}
        vacancyCount={vacancies.filter(v => v.isActive).length}
        testimonialCount={(content?.testimonials || []).length}
      />

      {/* Main area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-gray-500 hover:text-black" onClick={() => setSidebarOpen(true)}>
              <FiMenu className="text-xl" />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Dashboard</span>
              {active !== "overview" && (
                <>
                  <span className="text-gray-300">/</span>
                  <span className="font-semibold text-gray-800">{currentNav?.label}</span>
                </>
              )}
            </div>
          </div>
          {contentSections.includes(active) && (
            <SaveBar onSave={saveContent} saving={saving} saved={saved} />
          )}
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-8 max-w-4xl w-full mx-auto">

          {/* ── Overview ── */}
          {active === "overview" && (
            <Overview content={content} vacancies={vacancies} setActive={setActive} />
          )}

          {/* ── Hero ── */}
          {active === "hero" && (
            <div>
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-1">Hero Section</h2>
                <p className="text-gray-500 text-sm">The headline and subtext displayed on the homepage banner.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <Field label="Headline">
                  <input type="text" className={inputClass} value={content.hero?.headline || ""} onChange={(e) => update("hero.headline", e.target.value)} placeholder="e.g. Trusted Healthcare Staffing Across Southeast England" />
                </Field>
                <Field label="Subtext">
                  <textarea rows={3} className={inputClass} value={content.hero?.subtext || ""} onChange={(e) => update("hero.subtext", e.target.value)} placeholder="Supporting line displayed below the headline..." />
                </Field>
              </div>
            </div>
          )}

          {/* ── About ── */}
          {active === "about" && (
            <div>
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-1">About Page</h2>
                <p className="text-gray-500 text-sm">Content for the About Us page including the director's message.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-0">
                <Field label="About Body">
                  <textarea rows={6} className={inputClass} value={content.about?.body || ""} onChange={(e) => update("about.body", e.target.value)} placeholder="Describe the company, its history, mission..." />
                </Field>
                <Field label="Director's Message">
                  <textarea rows={4} className={inputClass} value={content.about?.directorMessage || ""} onChange={(e) => update("about.directorMessage", e.target.value)} placeholder="Personal message from the director..." />
                </Field>
                <Field label="Director's Name / Title">
                  <input type="text" className={inputClass} value={content.about?.directorName || ""} onChange={(e) => update("about.directorName", e.target.value)} placeholder="e.g. Director, Galaxy Care Staffing" />
                </Field>
              </div>
            </div>
          )}

          {/* ── Contact ── */}
          {active === "contact" && (
            <div>
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-1">Contact Details</h2>
                <p className="text-gray-500 text-sm">These details appear on the Contact page and in the footer.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <Field label="Phone Number">
                  <input type="text" className={inputClass} value={content.contact?.phone || ""} onChange={(e) => update("contact.phone", e.target.value)} placeholder="e.g. 01234 567890" />
                </Field>
                <Field label="Email Address">
                  <input type="email" className={inputClass} value={content.contact?.email || ""} onChange={(e) => update("contact.email", e.target.value)} placeholder="e.g. info@galaxystaffing.co.uk" />
                </Field>
                <Field label="Address">
                  <textarea rows={3} className={inputClass} value={content.contact?.address || ""} onChange={(e) => update("contact.address", e.target.value)} placeholder="Office address..." />
                </Field>
              </div>
            </div>
          )}

          {/* ── Why Us ── */}
          {active === "whyUs" && (
            <div>
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold mb-1">Why Choose Us</h2>
                  <p className="text-gray-500 text-sm">The four feature cards displayed on the homepage.</p>
                </div>
                <button onClick={addWhyUs} className="flex items-center gap-2 bg-maroon text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-maroon-dark transition-colors">
                  <FiPlus /> Add Item
                </button>
              </div>
              {(content.whyUs || []).length === 0 ? (
                <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
                  <p className="text-gray-400 text-sm">No items yet. Click "Add Item" to get started.</p>
                </div>
              ) : (
                (content.whyUs || []).map((item, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 mb-4 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold bg-gray-100 text-gray-500 px-3 py-1 rounded-full">Item {i + 1}</span>
                      <button onClick={() => removeWhyUs(i)} className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700">
                        <FiTrash2 /> Remove
                      </button>
                    </div>
                    <Field label="Title">
                      <input type="text" className={inputClass} value={item.title} onChange={(e) => updateWhyUs(i, "title", e.target.value)} placeholder="e.g. Trusted & Reliable" />
                    </Field>
                    <Field label="Description">
                      <textarea rows={2} className={inputClass} value={item.description} onChange={(e) => updateWhyUs(i, "description", e.target.value)} placeholder="Brief description..." />
                    </Field>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ── Testimonials ── */}
          {active === "testimonials" && (
            <div>
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold mb-1">Testimonials</h2>
                  <p className="text-gray-500 text-sm">Client quotes displayed on the homepage.</p>
                </div>
                <button onClick={addTestimonial} className="flex items-center gap-2 bg-maroon text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-maroon-dark transition-colors">
                  <FiPlus /> Add
                </button>
              </div>
              {(content.testimonials || []).length === 0 ? (
                <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
                  <p className="text-gray-400 text-sm">No testimonials yet. Click "Add" to get started.</p>
                </div>
              ) : (
                (content.testimonials || []).map((t, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 mb-4 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold bg-gray-100 text-gray-500 px-3 py-1 rounded-full">Testimonial {i + 1}</span>
                      <button onClick={() => removeTestimonial(i)} className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700">
                        <FiTrash2 /> Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <Field label="Name">
                        <input type="text" className={inputClass} value={t.name} onChange={(e) => updateTestimonial(i, "name", e.target.value)} placeholder="e.g. Jane Smith" />
                      </Field>
                      <Field label="Role / Organisation">
                        <input type="text" className={inputClass} value={t.role || ""} onChange={(e) => updateTestimonial(i, "role", e.target.value)} placeholder="e.g. Care Manager, Kent" />
                      </Field>
                    </div>
                    <Field label="Message">
                      <textarea rows={3} className={inputClass} value={t.message} onChange={(e) => updateTestimonial(i, "message", e.target.value)} placeholder="Their testimonial..." />
                    </Field>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ── Vacancies ── */}
          {active === "vacancies" && (
            <div>
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-1">Vacancies</h2>
                <p className="text-gray-500 text-sm">Post and manage job roles displayed on the public vacancies page.</p>
              </div>

              {/* Post new */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
                <h3 className="font-semibold text-sm mb-5 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-maroon text-white flex items-center justify-center"><FiPlus className="text-xs" /></span>
                  Post New Vacancy
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <Field label={<>Job Title <span className="text-maroon">*</span></>}>
                    <input type="text" className={inputClass} placeholder="e.g. Healthcare Assistant" value={newVac.title} onChange={(e) => setNewVac({ ...newVac, title: e.target.value })} />
                  </Field>
                  <Field label="Role Type">
                    <select className={`${inputClass}`} value={newVac.roleType} onChange={(e) => setNewVac({ ...newVac, roleType: e.target.value })}>
                      <option>Temporary</option><option>Permanent</option><option>Contract</option>
                    </select>
                  </Field>
                  <Field label="Location">
                    <input type="text" className={inputClass} value={newVac.location} onChange={(e) => setNewVac({ ...newVac, location: e.target.value })} />
                  </Field>
                  <Field label="Closing Date">
                    <input type="date" className={inputClass} value={newVac.closingDate} onChange={(e) => setNewVac({ ...newVac, closingDate: e.target.value })} />
                  </Field>
                </div>
                <Field label={<>Description <span className="text-maroon">*</span></>}>
                  <textarea rows={4} className={inputClass} placeholder="Role overview, requirements, and details..." value={newVac.description} onChange={(e) => setNewVac({ ...newVac, description: e.target.value })} />
                </Field>
                <button onClick={createVacancy} disabled={addingVac} className="flex items-center gap-2 bg-maroon text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-maroon-dark transition-colors disabled:opacity-60">
                  <FiPlus /> {addingVac ? "Posting..." : "Post Vacancy"}
                </button>
              </div>

              {/* Existing */}
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                All Vacancies ({vacancies.length})
              </h3>
              {vacancies.length === 0 ? (
                <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
                  <p className="text-gray-400 text-sm">No vacancies yet. Post one above.</p>
                </div>
              ) : (
                vacancies.map((v) => (
                  <div key={v._id} className={`bg-white rounded-xl border p-6 mb-4 shadow-sm transition-opacity ${v.isActive ? "border-gray-200" : "border-gray-100 opacity-60"}`}>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${v.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${v.isActive ? "bg-green-500" : "bg-gray-400"}`} />
                          {v.isActive ? "Active" : "Inactive"}
                        </span>
                        <span className="text-xs text-gray-400">{v.roleType} · {v.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => toggleVacancy(v)} className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${v.isActive ? "text-orange-600 bg-orange-50 hover:bg-orange-100" : "text-green-600 bg-green-50 hover:bg-green-100"}`}>
                          {v.isActive ? <><FiToggleRight /> Deactivate</> : <><FiToggleLeft /> Activate</>}
                        </button>
                        <button onClick={() => deleteVacancy(v._id)} className="flex items-center gap-1.5 text-xs text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors">
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <Field label="Job Title">
                        <input type="text" className={inputClass} value={v.title} onChange={(e) => updateVacField(v._id, "title", e.target.value)} />
                      </Field>
                      <Field label="Role Type">
                        <select className={inputClass} value={v.roleType} onChange={(e) => updateVacField(v._id, "roleType", e.target.value)}>
                          <option>Temporary</option><option>Permanent</option><option>Contract</option>
                        </select>
                      </Field>
                      <Field label="Location">
                        <input type="text" className={inputClass} value={v.location} onChange={(e) => updateVacField(v._id, "location", e.target.value)} />
                      </Field>
                      <Field label="Closing Date">
                        <input type="date" className={inputClass} value={v.closingDate ? v.closingDate.split("T")[0] : ""} onChange={(e) => updateVacField(v._id, "closingDate", e.target.value)} />
                      </Field>
                    </div>
                    <Field label="Description">
                      <textarea rows={3} className={inputClass} value={v.description} onChange={(e) => updateVacField(v._id, "description", e.target.value)} />
                    </Field>
                    <button onClick={() => saveVacancy(v)} disabled={vacSaving === v._id} className="flex items-center gap-2 bg-dark text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-60">
                      <FiCheck /> {vacSaving === v._id ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
