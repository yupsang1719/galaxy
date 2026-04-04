import React from "react";
import { Link } from "react-router-dom";
import { HiPhone, HiMail, HiLocationMarker } from "react-icons/hi";
import { FiClock, FiShield, FiAward } from "react-icons/fi";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "For Employers", to: "/employers" },
  { label: "For Candidates", to: "/candidates" },
  { label: "Current Vacancies", to: "/vacancies" },
  { label: "Contact", to: "/contact" },
];

const badges = [
  { icon: <FiClock className="text-maroon text-lg" />, text: "24/7 Available" },
  { icon: <FiShield className="text-maroon text-lg" />, text: "DBS Checked Staff" },
  { icon: <FiAward className="text-maroon text-lg" />, text: "CQC Compliant" },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white">

      {/* Top CTA band */}
      <div className="bg-maroon relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-lg">Need healthcare staff urgently?</p>
            <p className="text-red-100 text-sm">We respond to all enquiries within the hour — 24 hours a day, 7 days a week.</p>
          </div>
          <Link
            to="/contact"
            className="flex-shrink-0 bg-white text-maroon font-semibold px-7 py-3 rounded hover:bg-gray-100 transition-colors text-sm"
          >
            Get in Touch →
          </Link>
        </div>
      </div>

      {/* Trust badges strip */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          {badges.map((b) => (
            <div key={b.text} className="flex items-center gap-2 text-sm text-gray-400">
              {b.icon}
              <span>{b.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand column */}
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src="/icon-only.png" alt="Galaxy Care Staffing" className="h-8 w-auto" />
            <span className="font-bold text-lg tracking-tight">
              Galaxy<span className="text-maroon"> Care Staffing</span>
            </span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
            Providing experienced health and social care professionals across Southeast England. Trusted by care providers for over 10 years.
          </p>

          {/* Contact details */}
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <HiPhone className="text-maroon mt-0.5 flex-shrink-0" />
              <span>Available 24/7 — call us anytime</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <HiMail className="text-maroon mt-0.5 flex-shrink-0" />
              <a href="mailto:info@galaxystaffing.co.uk" className="hover:text-maroon transition-colors">
                info@galaxystaffing.co.uk
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <HiLocationMarker className="text-maroon mt-0.5 flex-shrink-0" />
              <span>Southeast England</span>
            </li>
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-5 text-white">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-gray-400 hover:text-maroon transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-maroon opacity-0 group-hover:opacity-100 transition-opacity" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-5 text-white">
            Our Services
          </h4>
          <ul className="space-y-3">
            {[
              "Healthcare Assistants",
              "Support Workers",
              "Team Leaders",
              "Home Care Workers",
              "Live-in Carers",
              "Community Support",
            ].map((s) => (
              <li key={s} className="text-sm text-gray-400 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-maroon flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} Galaxy Care Staffing Ltd. All rights reserved.</p>
          <p>Registered in England &amp; Wales · CQC Regulated</p>
        </div>
      </div>

    </footer>
  );
}
