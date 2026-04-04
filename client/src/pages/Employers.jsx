import React from "react";
import { Link } from "react-router-dom";
import { FiUserCheck, FiSearch, FiClipboard, FiBriefcase, FiHeart, FiUsers, FiStar, FiHome, FiSun, FiActivity } from "react-icons/fi";

const roles = [
  { title: "Healthcare Assistants", icon: <FiHeart className="text-maroon text-2xl" />, desc: "Supporting clinical staff in delivering patient care." },
  { title: "Support Workers", icon: <FiUsers className="text-maroon text-2xl" />, desc: "Assisting service users with daily living and activities." },
  { title: "Team Leaders", icon: <FiStar className="text-maroon text-2xl" />, desc: "Experienced supervisors for care teams and shifts." },
  { title: "Home Care Workers", icon: <FiHome className="text-maroon text-2xl" />, desc: "Providing personal care and support in the home." },
  { title: "Live-in Carers", icon: <FiSun className="text-maroon text-2xl" />, desc: "Round-the-clock care within a client's own home." },
  { title: "Community Support Workers", icon: <FiActivity className="text-maroon text-2xl" />, desc: "Supporting individuals in community-based services." },
];

const process = [
  { step: "01", icon: <FiUserCheck className="text-maroon text-2xl" />, title: "Get in Touch", desc: "Contact us with your staffing requirements and we'll discuss your needs." },
  { step: "02", icon: <FiSearch className="text-maroon text-2xl" />, title: "We Match", desc: "We identify and allocate suitable staff from our vetted register." },
  { step: "03", icon: <FiClipboard className="text-maroon text-2xl" />, title: "Staff Confirmed", desc: "You receive confirmation with the worker's details and credentials." },
  { step: "04", icon: <FiBriefcase className="text-maroon text-2xl" />, title: "Shift Covered", desc: "Our staff arrive ready to work to your standards and procedures." },
];

export default function Employers() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-maroon text-white pt-16 pb-28 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 animate-fadeSlideUp">For Employers</h1>
          <p className="text-red-100 text-lg animate-fadeSlideUp-d1">Reliable, compliant healthcare staff — when and where you need them.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 64L1440 0V64H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="/images/slider2.jpg"
              alt="Healthcare staffing professionals"
              className="w-full h-[380px] object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute -bottom-5 -right-5 bg-maroon text-white rounded-2xl px-6 py-4 shadow-lg hidden md:block">
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-xs text-red-200">Always available</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3">Staffing Solutions for Care Providers</h2>
            <div className="w-10 h-1 bg-maroon rounded mb-6" />
            <p className="text-gray-600 leading-relaxed mb-4">
              We work with residential homes, nursing homes, rehabilitation schemes, and community care providers across Southeast England. Whether you need emergency cover or planned temporary placements, we respond rapidly and reliably.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every staff member on our register is fully vetted, holds an enhanced DBS certificate, and has completed all required training. We take compliance seriously so you don't have to worry.
            </p>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">Roles We Cover</h2>
            <div className="w-10 h-1 bg-maroon rounded mx-auto mb-4" />
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              From residential care to community support — we cover the full spectrum of health and social care roles.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => (
              <div
                key={role.title}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-maroon transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-maroon/10 flex items-center justify-center mb-4 group-hover:bg-maroon transition-colors duration-300">
                  <span className="group-hover:[&>*]:text-white transition-colors">{role.icon}</span>
                </div>
                <h3 className="font-semibold text-base mb-2 group-hover:text-maroon transition-colors">{role.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">How It Works</h2>
            <div className="w-10 h-1 bg-maroon rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item) => (
              <div key={item.step} className="text-center group">
                <div className="w-16 h-16 rounded-2xl bg-maroon/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-maroon group-hover:text-white transition-colors duration-300">
                  <span className="group-hover:hidden">{item.icon}</span>
                  <span className="hidden group-hover:block text-white font-bold">{item.step}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark py-20 px-4 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Need staff today?</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">We respond to urgent requests within the hour. Get in touch now.</p>
        <Link to="/contact" className="bg-maroon text-white font-semibold px-10 py-3 rounded hover:bg-maroon-dark transition-colors">
          Make an Enquiry
        </Link>
      </section>
    </>
  );
}
