import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiShield, FiZap, FiCheckCircle, FiAward } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";

const API = process.env.REACT_APP_API_URL;

const defaultWhyUs = [
  { title: "Trusted & Reliable", description: "Dependable staff you can count on, every shift, every time.", icon: "shield" },
  { title: "Rapid Response", description: "We fill shifts at short notice — 24/7 availability means you're never left short.", icon: "zap" },
  { title: "Fully Compliant", description: "All staff are vetted, DBS-checked, and trained to CQC standards.", icon: "check" },
  { title: "10+ Years Experience", description: "A decade of specialist healthcare staffing across Southeast England.", icon: "award" },
];

const defaultTestimonials = [
  { name: "Care Manager", role: "Residential Home, Kent", message: "Galaxy have been fantastic — always responsive and the staff they send are excellent." },
  { name: "Operations Manager", role: "Nursing Home, Surrey", message: "Reliable, professional, and always willing to go the extra mile. Highly recommend." },
  { name: "Service Manager", role: "Community Care, Sussex", message: "We've used Galaxy for years. The quality and consistency of their staff is outstanding." },
];

const iconMap = {
  shield: <FiShield className="text-maroon text-2xl" />,
  zap: <FiZap className="text-maroon text-2xl" />,
  check: <FiCheckCircle className="text-maroon text-2xl" />,
  award: <FiAward className="text-maroon text-2xl" />,
};

export default function Home() {
  const [content, setContent] = useState(null);
  const [vacancyCount, setVacancyCount] = useState(0);

  useEffect(() => {
    axios.get(`${API}/api/content`).then((res) => setContent(res.data)).catch(() => {});
    axios.get(`${API}/api/vacancies/count`).then((res) => setVacancyCount(res.data.count)).catch(() => {});
  }, []);

  const hero = content?.hero;
  const whyUs = content?.whyUs?.length ? content.whyUs : defaultWhyUs;
  const testimonials = content?.testimonials?.length ? content.testimonials : defaultTestimonials;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-maroon text-white pt-24 pb-36 px-4 overflow-hidden">
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Vacancy badge */}
          {vacancyCount > 0 && (
            <Link
              to="/vacancies"
              className="animate-fadeIn inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-8 hover:bg-white/20 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {vacancyCount} Active {vacancyCount === 1 ? "Vacancy" : "Vacancies"} — View Roles
            </Link>
          )}

          <h1 className="animate-fadeSlideUp text-4xl md:text-5xl font-bold leading-tight mb-6">
            {hero?.headline || "Trusted Healthcare Staffing Across Southeast England"}
          </h1>
          <p className="animate-fadeSlideUp-d1 text-lg md:text-xl text-red-100 mb-10 max-w-2xl mx-auto">
            {hero?.subtext || "Providing experienced health and social care professionals when you need them most."}
          </p>
          <div className="animate-fadeSlideUp-d2 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/employers" className="bg-white text-maroon font-semibold px-8 py-3 rounded hover:bg-gray-100 transition-colors shadow-md">
              I Need Staff
            </Link>
            <Link to="/candidates" className="border-2 border-white text-white font-semibold px-8 py-3 rounded hover:bg-white hover:text-maroon transition-colors">
              I'm Looking for Work
            </Link>
          </div>
        </div>

        {/* Angled bottom edge */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 64L1440 0V64H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-white py-12 px-4 border-b border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "10+", label: "Years Experience" },
            { value: "500+", label: "Placements Made" },
            { value: "24/7", label: "Support Available" },
            { value: "CQC", label: "Compliant" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-maroon mb-1">{s.value}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-24 px-4 bg-gray-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-14">
            <span className="inline-block bg-maroon/10 text-maroon text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Why Galaxy
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Why Choose Us?</h2>
            <div className="w-12 h-1 bg-maroon rounded mx-auto mb-4" />
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              We're committed to delivering the highest standard of healthcare staffing, every shift, every time.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <div
                key={i}
                className="why-card group relative bg-white border border-gray-200 rounded-2xl p-7 hover:border-maroon hover:shadow-xl transition-all duration-300 cursor-default overflow-hidden"
              >
                {/* Ghost number */}
                <span className="absolute top-3 right-4 text-7xl font-bold text-gray-100 group-hover:text-maroon/10 leading-none transition-colors duration-300 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon with ring pulse */}
                <div className="relative w-16 h-16 mb-6">
                  {/* Ping ring */}
                  <span className="icon-ring absolute inset-0 rounded-2xl bg-maroon/20" />
                  {/* Tile */}
                  <div className="absolute inset-0 rounded-2xl bg-maroon/10 group-hover:bg-maroon transition-colors duration-300" />
                  {/* Icon */}
                  <span className="icon-inner absolute inset-0 flex items-center justify-center [&>*]:text-maroon [&>*]:text-2xl group-hover:[&>*]:text-white transition-colors duration-300">
                    {iconMap[item.icon] || <div className="w-6 h-6 bg-maroon rounded" />}
                  </span>
                </div>

                <h3 className="font-bold text-lg mb-2 text-dark group-hover:text-maroon transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom accent line sweep */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-maroon group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services split ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-maroon text-white rounded-2xl p-10 flex flex-col shadow-lg">
            <div className="text-4xl font-bold text-white/20 mb-2">01</div>
            <h3 className="text-2xl font-bold mb-4">For Employers</h3>
            <p className="text-red-100 mb-6 leading-relaxed">
              We supply experienced healthcare professionals to residential homes, nursing homes, and community services — quickly and compliantly.
            </p>
            <Link to="/employers" className="mt-auto inline-block bg-white text-maroon font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-gray-100 transition-colors w-fit">
              Learn More →
            </Link>
          </div>
          <div className="bg-dark text-white rounded-2xl p-10 flex flex-col shadow-lg">
            <div className="text-4xl font-bold text-white/20 mb-2">02</div>
            <h3 className="text-2xl font-bold mb-4">For Candidates</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Join our register of care professionals. We offer flexible work, competitive pay, and ongoing training opportunities.
            </p>
            <Link to="/candidates" className="mt-auto inline-block bg-maroon text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-maroon-dark transition-colors w-fit">
              Register Interest →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Vacancies preview (only when active) ── */}
      {vacancyCount > 0 && (
        <section className="py-16 px-4 bg-maroon text-white text-center">
          <div className="max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Now Hiring
            </span>
            <h2 className="text-3xl font-bold mb-4">
              {vacancyCount} {vacancyCount === 1 ? "Role" : "Roles"} Available
            </h2>
            <p className="text-red-100 mb-8">
              We're actively recruiting healthcare professionals across Southeast England.
            </p>
            <Link to="/vacancies" className="bg-white text-maroon font-semibold px-10 py-3 rounded hover:bg-gray-100 transition-colors">
              View All Vacancies
            </Link>
          </div>
        </section>
      )}

      {/* ── Testimonials ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What Our Clients Say</h2>
            <div className="w-12 h-1 bg-maroon rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="relative bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
                <FaQuoteLeft className="text-maroon/20 text-5xl absolute top-6 right-6" />
                <p className="text-gray-600 text-sm leading-relaxed mb-6 relative z-10">"{t.message}"</p>
                <div>
                  <p className="font-semibold text-sm text-maroon">{t.name}</p>
                  {t.role && <p className="text-xs text-gray-400 mt-0.5">{t.role}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="bg-dark py-20 px-4 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to work with us?</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">Get in touch today — we respond to all enquiries within the hour.</p>
        <Link to="/contact" className="bg-maroon text-white font-semibold px-10 py-3 rounded hover:bg-maroon-dark transition-colors">
          Contact Us
        </Link>
      </section>
    </>
  );
}
