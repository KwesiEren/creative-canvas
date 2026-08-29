import React from "react";
import { Link } from "@tanstack/react-router";
import { NavTab, AboutSubSection, ProgrammeId } from "@/types";
import { assetUrl } from "@/lib/assetUrl";

interface Props {
  onNavigate: (
    tab: NavTab,
    extra?: { subSection?: AboutSubSection; programmeId?: ProgrammeId; filterCategory?: string },
  ) => void;
  onOpenAccessibility: () => void;
  onOpenDonate: () => void;
}

export const Footer: React.FC<Props> = ({ onNavigate, onOpenAccessibility, onOpenDonate }) => {
  return (
    <footer className="adf-footer w-full mt-auto">
      <div className="adf-footer-shape adf-footer-shape-1" aria-hidden="true" />
      <div className="adf-footer-shape adf-footer-shape-2" aria-hidden="true" />

      <div className="relative max-w-[1200px] mx-auto px-4 md:px-6 pt-14 pb-10">
        {/* Top: Donate button */}
        <div className="flex justify-center mb-12">
          <button
            type="button"
            onClick={onOpenDonate}
            className="adf-btn adf-btn-primary adf-btn-circle focus-ring text-lg px-12 py-4"
          >
            DONATE NOW
          </button>
        </div>

        {/* Main footer columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Links */}
          <div>
            <h4 className="text-white text-base font-semibold mb-4 uppercase tracking-wider">Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <button type="button" onClick={() => onNavigate("about")} className="hover:text-white focus-ring">
                  About Us
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate("programmes")} className="hover:text-white focus-ring">
                  Programmes
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate("news")} className="hover:text-white focus-ring">
                  News &amp; Articles
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate("advocacy")} className="hover:text-white focus-ring">
                  Events
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate("get-involved")} className="hover:text-white focus-ring">
                  Get Involved
                </button>
              </li>
            </ul>
          </div>

          {/* Our Work */}
          <div>
            <h4 className="text-white text-base font-semibold mb-4 uppercase tracking-wider">Our Work</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("programmes", { programmeId: "spadra" })}
                  className="hover:text-white focus-ring"
                >
                  SPADRA Advocacy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("programmes", { programmeId: "we-can-work" })}
                  className="hover:text-white focus-ring"
                >
                  We Can Work
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate("resources")} className="hover:text-white focus-ring">
                  Publications
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate("membership")} className="hover:text-white focus-ring">
                  OPD Membership
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate("careers")} className="hover:text-white focus-ring">
                  Careers
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-base font-semibold mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[var(--adf-gold)] text-lg mt-0.5" aria-hidden="true">
                  mail
                </span>
                <a href="mailto:info@adf-africa.org" className="hover:text-white focus-ring">
                  info@adf-africa.org
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[var(--adf-gold)] text-lg mt-0.5" aria-hidden="true">
                  call
                </span>
                <a href="tel:+251116638210" className="hover:text-white focus-ring">
                  +251 11 663 8210
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[var(--adf-gold)] text-lg mt-0.5" aria-hidden="true">
                  location_on
                </span>
                <span>Addis Ababa, Ethiopia</span>
              </li>
            </ul>
            <div className="mt-6 flex flex-col gap-2">
              <Link to="/accessibility" className="text-sm text-white/70 hover:text-white focus-ring">
                Accessibility Statement
              </Link>
              <Link to="/privacy" className="text-sm text-white/70 hover:text-white focus-ring">
                Privacy Notice
              </Link>
              <button
                type="button"
                onClick={onOpenAccessibility}
                className="mt-2 adf-btn adf-btn-outline border-white/30 text-white hover:bg-white hover:text-[var(--adf-footer)] w-max focus-ring"
              >
                Accessibility Options
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">
              &copy; Copyright 2026 ADF Powered by Neptune Technology Ltd
            </p>
            <div className="flex items-center gap-4" aria-label="Social media">
              <a
                href="#"
                aria-label="Twitter"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 hover:border-[var(--adf-gold)] hover:text-[var(--adf-gold)] focus-ring transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 hover:border-[var(--adf-gold)] hover:text-[var(--adf-gold)] focus-ring transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 hover:border-[var(--adf-gold)] hover:text-[var(--adf-gold)] focus-ring transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 hover:border-[var(--adf-gold)] hover:text-[var(--adf-gold)] focus-ring transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility badge (static text, bottom-left) */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          type="button"
          onClick={onOpenAccessibility}
          className="bg-white text-[var(--adf-charcoal)] text-xs font-semibold px-3 py-2 rounded-lg shadow-lg border border-black/10 hover:bg-gray-50 focus-ring transition-colors cursor-pointer"
        >
          All in One Accessibility&reg;
        </button>
      </div>
    </footer>
  );
};
