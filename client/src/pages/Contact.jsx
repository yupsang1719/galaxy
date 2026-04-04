import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const prefilledRole = searchParams.get("role");

  const [content, setContent] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryType: prefilledRole ? "I'm Looking for Work (Candidate)" : "General Enquiry",
    message: prefilledRole ? `I would like to apply for the following role: ${prefilledRole}` : "",
  });
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/content`)
      .then((res) => setContent(res.data))
      .catch(() => {});
  }, []);

  const contact = content?.contact;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/contact`, form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", enquiryType: "General Enquiry", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <section className="relative bg-maroon text-white pt-16 pb-28 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 animate-fadeSlideUp">Contact Us</h1>
          <p className="text-red-100 text-lg animate-fadeSlideUp-d1">Get in touch — we'll respond within the hour.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 64L1440 0V64H0Z" fill="white" />
          </svg>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
            <div className="space-y-6">
              {[
                {
                  label: "Phone",
                  value: contact?.phone || "Please check our website for the latest number",
                  icon: "📞",
                },
                {
                  label: "Email",
                  value: contact?.email || "info@galaxystaffing.co.uk",
                  icon: "✉️",
                },
                {
                  label: "Address",
                  value: contact?.address || "Southeast England",
                  icon: "📍",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      {item.label}
                    </p>
                    <p className="text-gray-700">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enquiry form */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Send an Enquiry</h2>

            {status === "success" ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <p className="text-green-700 font-semibold text-lg mb-2">Enquiry Sent!</p>
                <p className="text-green-600 text-sm">
                  Thank you for getting in touch. We'll respond to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-maroon">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-maroon"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-maroon">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-maroon"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-maroon"
                      placeholder="07700 000000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enquiry Type</label>
                    <select
                      name="enquiryType"
                      value={form.enquiryType}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-maroon bg-white"
                    >
                      <option>General Enquiry</option>
                      <option>I Need Staff (Employer)</option>
                      <option>I'm Looking for Work (Candidate)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-maroon">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-maroon resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-600 text-sm">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-maroon text-white font-semibold py-3 rounded hover:bg-maroon-dark transition-colors disabled:opacity-60"
                >
                  {status === "loading" ? "Sending..." : "Send Enquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
