import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 text-center">
      <div>
        <div className="text-8xl font-bold text-maroon mb-4">404</div>
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="bg-maroon text-white font-semibold px-8 py-3 rounded hover:bg-maroon-dark transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
