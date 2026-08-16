import React from "react";
import { Link } from "@tanstack/react-router";

export const NotFoundScreen: React.FC = () => (
  <div className="animate-fade-in">
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-24 text-center">
      <p className="font-display text-7xl md:text-9xl text-[#0f1b3d]">404</p>
      <h1 className="mt-4 text-2xl md:text-4xl uppercase font-bold text-[#0f1b3d]">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[#33415c]">
        The page you are looking for may have moved, been renamed, or never existed. Use the
        navigation, the search box, or head back to the home page.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#0f1b3d] text-white font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-[#1e3a5f] transition-colors"
        >
          <span className="material-symbols-outlined text-base">home</span>
          Back to home
        </Link>
        <Link
          to="/search"
          className="inline-flex items-center gap-2 border-2 border-[#0f1b3d] text-[#0f1b3d] font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-[#e8edf3] transition-colors"
        >
          <span className="material-symbols-outlined text-base">search</span>
          Search the site
        </Link>
      </div>
    </div>
  </div>
);
