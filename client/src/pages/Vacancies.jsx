import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function Vacancies() {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/api/vacancies`)
      .then((res) => setVacancies(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleApply = (title) => {
    navigate(`/contact?role=${encodeURIComponent(title)}`);
  };

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <section className="relative bg-maroon text-white pt-16 pb-28 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 animate-fadeSlideUp">Current Vacancies</h1>
          <p className="text-red-100 text-lg animate-fadeSlideUp-d1">Browse our latest healthcare roles across Southeast England.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 64L1440 0V64H0Z" fill="white" />
          </svg>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-400">Loading vacancies...</p>
          ) : vacancies.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg mb-2">No vacancies at the moment.</p>
              <p className="text-gray-400 text-sm mb-8">
                Check back soon or send us a general enquiry and we'll keep you in mind.
              </p>
              <Link
                to="/contact"
                className="bg-maroon text-white font-semibold px-8 py-3 rounded hover:bg-maroon-dark transition-colors"
              >
                Send an Enquiry
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {vacancies.map((v) => (
                <div
                  key={v._id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="bg-maroon text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {v.roleType}
                        </span>
                        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                          {v.location}
                        </span>
                        {v.closingDate && (
                          <span className="text-xs text-gray-400">
                            Closes {formatDate(v.closingDate)}
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-bold mb-3">{v.title}</h2>
                      <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                        {v.description}
                      </p>
                    </div>
                    <div className="sm:flex-shrink-0">
                      <button
                        onClick={() => handleApply(v.title)}
                        className="w-full sm:w-auto bg-maroon text-white font-semibold px-6 py-2.5 rounded hover:bg-maroon-dark transition-colors text-sm"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-dark py-16 px-4 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Don't see the right role?</h2>
        <p className="text-gray-400 mb-8">
          Send us your details and we'll match you when something suitable comes up.
        </p>
        <Link
          to="/contact"
          className="bg-maroon text-white font-semibold px-10 py-3 rounded hover:bg-maroon-dark transition-colors"
        >
          Get in Touch
        </Link>
      </section>
    </>
  );
}
