import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiDollarSign, FiBookOpen, FiHeadphones, FiGlobe, FiShield } from "react-icons/fi";
import { FiUserCheck, FiSearch, FiClipboard, FiBriefcase } from "react-icons/fi";

const benefits = [
  { icon: <FiCalendar className="text-maroon text-xl" />, title: "Flexible Hours", desc: "Choose shifts that work around your schedule — days, nights, weekends." },
  { icon: <FiDollarSign className="text-maroon text-xl" />, title: "Competitive Pay", desc: "Fair, competitive rates with prompt weekly payments." },
  { icon: <FiBookOpen className="text-maroon text-xl" />, title: "Training Support", desc: "Mandatory training and ongoing development opportunities." },
  { icon: <FiHeadphones className="text-maroon text-xl" />, title: "Dedicated Support", desc: "Our team is available 24/7 before, during, and after shifts." },
  { icon: <FiGlobe className="text-maroon text-xl" />, title: "Variety of Settings", desc: "Work across residential homes, nursing facilities, and community care." },
  { icon: <FiShield className="text-maroon text-xl" />, title: "CQC Compliant", desc: "All placements meet full regulatory and compliance standards." },
];

const steps = [
  { icon: <FiUserCheck className="text-maroon text-2xl" />, title: "Submit Your Interest", desc: "Contact us with your details, experience, and the type of work you're looking for." },
  { icon: <FiSearch className="text-maroon text-2xl" />, title: "Interview & Vetting", desc: "We'll arrange an interview and complete all required checks including enhanced DBS." },
  { icon: <FiClipboard className="text-maroon text-2xl" />, title: "Training", desc: "Complete any required mandatory training with our support before going live." },
  { icon: <FiBriefcase className="text-maroon text-2xl" />, title: "Start Working", desc: "Get placed into shifts that match your skills, location, and availability." },
];

export default function Candidates() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-maroon text-white pt-16 pb-28 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 animate-fadeSlideUp">For Candidates</h1>
          <p className="text-red-100 text-lg animate-fadeSlideUp-d1">Join our register and access flexible, rewarding healthcare work.</p>
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
          <div>
            <h2 className="text-2xl font-bold mb-3">Work with Galaxy Care Staffing</h2>
            <div className="w-10 h-1 bg-maroon rounded mb-6" />
            <p className="text-gray-600 leading-relaxed mb-4">
              Whether you're an experienced healthcare assistant, support worker, or carer, we can help you find flexible work that fits your life. We work across Southeast England and are always looking for dedicated, compassionate professionals to join our register.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We handle all the compliance, so you can focus on delivering great care. From DBS checks to mandatory training, we'll guide you through every step of the onboarding process.
            </p>
          </div>
          <div className="relative">
            <img
              src="/images/slider1.jpg"
              alt="Join Galaxy Care Staffing"
              className="w-full h-[380px] object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute -bottom-5 -left-5 bg-dark text-white rounded-2xl px-6 py-4 shadow-lg hidden md:block">
              <p className="text-2xl font-bold text-maroon">500+</p>
              <p className="text-xs text-gray-400">Successful placements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3">Benefits of Working With Us</h2>
            <div className="w-10 h-1 bg-maroon rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md hover:border-maroon transition-all duration-300 group">
                <div className="mb-3">{b.icon}</div>
                <h3 className="font-semibold mb-2 group-hover:text-maroon transition-colors">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">Our Recruitment Process</h2>
            <div className="w-10 h-1 bg-maroon rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 rounded-2xl bg-maroon/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-maroon transition-colors duration-300">
                  <span className="group-hover:[&>*]:text-white transition-colors">{item.icon}</span>
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
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">Send us an enquiry and a member of our team will be in touch.</p>
        <Link to="/contact" className="bg-maroon text-white font-semibold px-10 py-3 rounded hover:bg-maroon-dark transition-colors">
          Express Interest
        </Link>
      </section>
    </>
  );
}
