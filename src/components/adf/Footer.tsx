import React from "react";
import { Link } from "@tanstack/react-router";
import { NavTab, AboutSubSection, ProgrammeId } from "@/types";

interface Props {
  onNavigate: (
    tab: NavTab,
    extra?: { subSection?: AboutSubSection; programmeId?: ProgrammeId; filterCategory?: string },
  ) => void;
  onOpenAccessibility: () => void;
}

export const Footer: React.FC<Props> = ({ onNavigate, onOpenAccessibility }) => {
  return (
    <footer className="bg-[#0a1128] text-white w-full mt-auto">
      {/* Mission line */}
      <div className="border-b border-white/15">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-12">
          <p className="font-display text-2xl md:text-4xl uppercase leading-tight max-w-4xl">
            Nothing about us without us — a continental voice for the rights of persons with
            disabilities in Africa.
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-3 md:col-span-1">
          <h2 className="text-lg uppercase flex items-center gap-2">
            <img
              src={adfLogo.url}
              alt="African Disability Forum logo"
              className="h-12 w-auto invert"
            />
            <span className="sr-only">African Disability Forum</span>
          </h2>

          <p className="text-xs text-[#b7cbe0] leading-relaxed">
            The continental federation unifying national and regional Organizations of Persons with
            Disabilities.
          </p>
          <p className="text-[11px] text-[#8fa8c4] italic">
            Operating in partnership with the African Union (AU) and United Nations (UN).
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div className="flex flex-col gap-2 text-xs">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#a8c6e4] mb-1">
            About & OPD Network
          </h3>
          <button
            onClick={() => onNavigate("about", { subSection: "who" })}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5"
          >
            Who We Are
          </button>
          <button
            onClick={() => onNavigate("about", { subSection: "history" })}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5"
          >
            Our History & Milestones
          </button>
          <button
            onClick={() => onNavigate("about", { subSection: "vision" })}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5"
          >
            Vision & Mission
          </button>
          <button
            onClick={() => onNavigate("about", { subSection: "leadership" })}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5"
          >
            Executive Leadership Council
          </button>
          <button
            onClick={() => onNavigate("membership")}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5"
          >
            OPD Membership & Directory
          </button>
          <button
            onClick={() => onNavigate("get-involved")}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5"
          >
            Get Involved
          </button>
        </div>

        {/* Column 3: Programmes & Resources */}
        <div className="flex flex-col gap-2 text-xs">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#a8c6e4] mb-1">
            Flagships & Resources
          </h3>
          <button
            onClick={() => onNavigate("spadra")}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5 font-bold text-white"
          >
            SPADRA Portal
          </button>
          <button
            onClick={() => onNavigate("programmes", { programmeId: "spadra" })}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5"
          >
            SPADRA Advocacy Programme
          </button>
          <button
            onClick={() => onNavigate("programmes", { programmeId: "we-can-work" })}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5"
          >
            We Can Work Youth Initiative
          </button>
          <button
            onClick={() => onNavigate("advocacy")}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5 font-bold text-white"
          >
            Events Calendar & Workshops
          </button>
          <button
            onClick={() => onNavigate("resources")}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5"
          >
            Publications Repository
          </button>
          <button
            onClick={() => onNavigate("careers")}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5"
          >
            Careers & Consultancies
          </button>
        </div>

        {/* Column 4: Contact & Accessibility */}
        <div className="flex flex-col gap-2 text-xs">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#a8c6e4] mb-1">
            Secretariat & Help
          </h3>
          <address className="not-italic text-[#b7cbe0] space-y-1">
            <div>
              <strong>Headquarters:</strong> Addis Ababa, Ethiopia
            </div>
            <div>
              <strong>Email:</strong> info@adf-africa.org
            </div>
            <div>
              <strong>Tel:</strong> +251 11 663 8210
            </div>
          </address>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => onNavigate("contact")}
              className="text-[#a8c6e4] hover:underline text-left font-bold"
            >
              Contact Regional Hubs
            </button>
            <Link
              to="/accessibility"
              className="text-[#a8c6e4] hover:underline text-left font-bold"
            >
              Accessibility Statement
            </Link>
            <Link to="/privacy" className="text-[#a8c6e4] hover:underline text-left font-bold">
              Privacy Notice
            </Link>
            <button
              onClick={onOpenAccessibility}
              className="px-3 py-2 border border-white/40 text-white font-bold uppercase tracking-widest text-[11px] w-max flex items-center gap-1 hover:bg-white hover:text-[#0a1128] transition-colors cursor-pointer focus-ring"
            >
              <span className="material-symbols-outlined text-sm">settings_accessibility</span>
              <span>Accessibility Options</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/15">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] uppercase tracking-widest text-[#8fa8c4]">
          <span>© {new Date().getFullYear()} African Disability Forum. All rights reserved.</span>
          <Link to="/accessibility" className="hover:underline focus-ring">
            Built to WCAG 2.2 AA standards
          </Link>
        </div>
      </div>
    </footer>
  );
};
