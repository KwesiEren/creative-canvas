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

      <div className="relative max-w-[1200px] mx-auto px-4 md:px-6 pt-14 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-5">
          <div>
            <img
              src={assetUrl("/images/adf-logo.png")}
              alt=""
              aria-hidden="true"
              className="h-10 w-auto brightness-0 invert opacity-90"
            />
            <p className="mt-4 font-display text-xl text-white">African Disability Forum</p>
          </div>
          <button type="button" onClick={onOpenDonate} className="adf-btn adf-btn-secondary w-max focus-ring">
            Donate Now
          </button>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-display text-lg mb-4">Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button type="button" onClick={() => onNavigate("about")} className="hover:text-white focus-ring">
                About us
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

        {/* Programmes & resources */}
        <div>
          <h4 className="text-white font-display text-lg mb-4">Our Work</h4>
          <ul className="space-y-2 text-sm">
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
          <h4 className="text-white font-display text-lg mb-4">Contact</h4>
          <ul className="space-y-4 text-sm">
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
            <Link to="/accessibility" className="text-sm hover:text-white focus-ring">
              Accessibility Statement
            </Link>
            <Link to="/privacy" className="text-sm hover:text-white focus-ring">
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
      <div className="relative border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} African Disability Forum. All rights reserved.
          </p>
          <div className="flex items-center gap-3" aria-label="Social media">
            {["twitter", "facebook", "pinterest", "instagram"].map((network) => (
              <a
                key={network}
                href="#"
                aria-label={network}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 hover:border-[var(--adf-gold)] hover:text-[var(--adf-gold)] focus-ring"
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">
                  {network === "twitter" ? "tag" : network === "facebook" ? "groups" : network === "pinterest" ? "push_pin" : "photo_camera"}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
