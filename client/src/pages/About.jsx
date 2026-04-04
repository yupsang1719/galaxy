import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUsers, FiMapPin, FiClock, FiAward } from "react-icons/fi";

const defaultBody = `Galaxy Care Staffing was founded with a single mission: to connect experienced health and social care professionals with the facilities that need them most. We understand that staffing shortages can have a direct impact on the quality of care — which is why we work tirelessly to ensure our clients always have the right people in place.

Covering Southeast England, we supply staff to residential homes, nursing homes, rehabilitation schemes, community-based services, and more. Every member of our register is thoroughly vetted, DBS-checked, and trained to meet the highest standards.`;

const defaultDirectorMessage = `With over 10 years in the healthcare staffing sector, I know first-hand how critical it is to have the right people in place. At Galaxy Care Staffing, we don't just fill shifts — we build relationships. Our commitment to quality, compliance, and care is at the heart of everything we do.`;

export default function About() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/content`).then((res) => setContent(res.data)).catch(() => {});
  }, []);

  const about = content?.about;

  return (
    <>
      {/* Page header */}
      <section className="relative bg-maroon text-white pt-16 pb-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 animate-fadeSlideUp">About Us</h1>
          <p className="text-red-100 text-lg animate-fadeSlideUp-d1">A dedicated team committed to quality healthcare staffing.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 64L1440 0V64H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Who we are — text + image */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-3">Who We Are</h2>
            <div className="w-10 h-1 bg-maroon rounded mb-6" />
            <div className="text-gray-600 leading-relaxed space-y-4 mb-8">
              {(about?.body || defaultBody).split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <FiUsers className="text-maroon text-xl" />, label: "500+ Placements" },
                { icon: <FiMapPin className="text-maroon text-xl" />, label: "Southeast England" },
                { icon: <FiClock className="text-maroon text-xl" />, label: "24/7 Support" },
                { icon: <FiAward className="text-maroon text-xl" />, label: "CQC Compliant" },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 border border-gray-100">
                  {item.icon}
                  <span className="text-sm font-semibold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* About image */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-maroon/10 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-maroon/5 rounded-2xl -z-10" />
            <img
              src="/images/about-us.jpg"
              alt="Galaxy Care Staffing team"
              className="w-full h-[420px] object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Director message */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Director photo */}
          <div className="relative order-2 md:order-1">
            <img
              src="/images/director.JPG"
              alt="Director, Galaxy Care Staffing"
              className="w-full h-[420px] object-cover object-top rounded-2xl shadow-lg"
            />
            <div className="absolute -bottom-4 -right-4 bg-maroon text-white px-5 py-3 rounded-xl shadow-md">
              <p className="font-bold text-sm">{about?.directorName || "Director"}</p>
              <p className="text-xs text-red-200">Galaxy Care Staffing</p>
            </div>
          </div>

          {/* Quote */}
          <div className="order-1 md:order-2">
            <div className="text-maroon text-7xl font-serif leading-none mb-4 opacity-20">"</div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
              {(about?.directorMessage || defaultDirectorMessage).replace(/^"|"$/g, "")}
            </p>
            <p className="font-bold text-maroon text-sm">{about?.directorName || "Director, Galaxy Care Staffing"}</p>
            <div className="w-10 h-1 bg-maroon rounded mt-3" />
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-dark text-white py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "10+", label: "Years Experience" },
            { value: "500+", label: "Placements Made" },
            { value: "24/7", label: "Support Available" },
            { value: "CQC", label: "Compliant Standards" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-bold text-maroon mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
