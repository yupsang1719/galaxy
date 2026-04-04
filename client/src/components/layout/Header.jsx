import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiPhone } from "react-icons/hi";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Employers", to: "/employers" },
  { label: "Candidates", to: "/candidates" },
  { label: "Vacancies", to: "/vacancies" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-maroon ${
      isActive ? "text-maroon border-b-2 border-maroon pb-0.5" : "text-black"
    }`;

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Announcement bar */}
      <div className="bg-dark text-white text-xs py-2 px-4 text-center flex items-center justify-center gap-2">
        <HiPhone className="text-maroon flex-shrink-0" />
        <span>Supplying experienced healthcare staff across Southeast England · Available <strong>24/7</strong></span>
      </div>

      {/* Main nav */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/icon-only.png" alt="Galaxy Care Staffing" className="h-8 w-auto" />
            <span className="font-bold text-lg tracking-tight">
              Galaxy<span className="text-maroon"> Care Staffing</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"}>
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="bg-maroon text-white text-sm font-semibold px-5 py-2 rounded hover:bg-maroon-dark transition-colors"
            >
              Get in Touch
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-dark transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-dark transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-dark transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? "text-maroon" : "text-black"}`
              }
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="bg-maroon text-white text-sm font-semibold px-5 py-2 rounded text-center"
            onClick={() => setMenuOpen(false)}
          >
            Get in Touch
          </Link>
        </nav>
      )}
    </header>
  );
}
