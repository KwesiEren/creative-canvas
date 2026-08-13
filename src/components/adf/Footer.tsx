import React from 'react';
import { NavTab, AboutSubSection, ProgrammeId } from '@/types';

interface Props {
  onNavigate: (tab: NavTab, extra?: { subSection?: AboutSubSection; programmeId?: ProgrammeId; filterCategory?: string }) => void;
  onOpenAccessibility: () => void;
}

export const Footer: React.FC<Props> = ({ onNavigate, onOpenAccessibility }) => {
  return (
    <footer className="bg-[#0f1b3d] text-white w-full py-12 px-4 md:px-10 mt-auto border-t-4 border-[#245a86]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Copyright */}
        <div className="flex flex-col gap-3 md:col-span-1">
          <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              accessibility_new
            </span>
            <span>African Disability Forum</span>
          </h2>
          <p className="text-xs text-[#b7cbe0] leading-relaxed">
            © 2025 African Disability Forum. The continental federation unifying national and regional Organizations of Persons with Disabilities.
          </p>
          <p className="text-[10px] text-[#b7cbe0] italic">
            Operating in partnership with the African Union (AU) and United Nations (UN).
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div className="flex flex-col gap-2 text-xs">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#a8c6e4] mb-1">About & OPD Network</h3>
          <button
            onClick={() => onNavigate('about', { subSection: 'who' })}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5"
          >
            Who We Are
          </button>
          <button
            onClick={() => onNavigate('about', { subSection: 'history' })}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5"
          >
            Our History & Milestones
          </button>
          <button
            onClick={() => onNavigate('about', { subSection: 'vision' })}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5"
          >
            Vision & Mission
          </button>
          <button
            onClick={() => onNavigate('about', { subSection: 'leadership' })}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5"
          >
            Executive Leadership Council
          </button>
          <button
            onClick={() => onNavigate('about', { subSection: 'membership' })}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5"
          >
            OPD Membership & PANPPD
          </button>
        </div>

        {/* Column 3: Programmes & Resources */}
        <div className="flex flex-col gap-2 text-xs">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#a8c6e4] mb-1">Flagships & Resources</h3>
          <button
            onClick={() => onNavigate('programmes', { programmeId: 'spadra' })}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5"
          >
            SPADRA Advocacy Programme
          </button>
          <button
            onClick={() => onNavigate('programmes', { programmeId: 'we-can-work' })}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5"
          >
            We Can Work Youth Initiative
          </button>
          <button
            onClick={() => onNavigate('advocacy')}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5 font-bold text-white"
          >
            Events Calendar & Workshops
          </button>
          <button
            onClick={() => onNavigate('resources')}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5"
          >
            Publications Repository
          </button>
          <button
            onClick={() => onNavigate('careers')}
            className="text-[#b7cbe0] hover:text-[#a8c6e4] transition-colors text-left py-0.5"
          >
            Careers & Consultancies
          </button>
        </div>

        {/* Column 4: Contact & Accessibility */}
        <div className="flex flex-col gap-2 text-xs">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#a8c6e4] mb-1">Secretariat & Help</h3>
          <address className="not-italic text-[#b7cbe0] space-y-1">
            <div><strong>Headquarters:</strong> Addis Ababa, Ethiopia</div>
            <div><strong>Email:</strong> info@adf-africa.org</div>
            <div><strong>Tel:</strong> +251 11 663 8210</div>
          </address>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => onNavigate('contact')}
              className="text-[#a8c6e4] hover:underline text-left font-bold"
            >
              Contact Regional Hubs
            </button>
            <button
              onClick={onOpenAccessibility}
              className="px-3 py-1.5 bg-[#1e3a5f] hover:bg-[#1e3a5f] text-white rounded font-bold text-[11px] w-max flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">settings_accessibility</span>
              <span>Accessibility Options</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
