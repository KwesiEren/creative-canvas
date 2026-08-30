import React, { useState, useEffect } from 'react';
import { ProgrammeId, NavTab } from '@/types';
import { PROGRAMMES_DATA } from '@/data/mockData';
import { assetUrl } from '@/lib/assetUrl';
import { PageBanner } from './ui';

interface Props {
  selectedProgrammeId?: ProgrammeId;
  onNavigate: (tab: NavTab) => void;
  onOpenTakeAction: () => void;
}

export const ProgrammesScreen: React.FC<Props> = ({ selectedProgrammeId = 'spadra', onNavigate, onOpenTakeAction }) => {
  const [activeProgId, setActiveProgId] = useState<ProgrammeId>(selectedProgrammeId);

  useEffect(() => {
    if (selectedProgrammeId) {
      setActiveProgId(selectedProgrammeId);
    }
  }, [selectedProgrammeId]);

  const currentProgramme = PROGRAMMES_DATA.find(p => p.id === activeProgId) || PROGRAMMES_DATA[0]!;

  return (
    <div className="animate-fade-in">
      <PageBanner
        title="ADF Strategic Programmes"
        crumbs={[{ label: "Home" }, { label: "Programmes" }]}
        image={assetUrl("/images/adf-event-2.jpg")}
        imageAlt="ADF strategic programmes across Africa"
      />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-10 space-y-10">
        <div>
          <p className="text-[#33415c] text-base md:text-lg max-w-3xl leading-relaxed">
            From legal rights advocacy and youth employment to healthcare inclusion and grassroots OPD capacity building, ADF implements targeted programmes across sub-Saharan Africa.
          </p>
        </div>

        {/* Programme Selector Pills */}
        <div className="bg-white dark:bg-[#0a1128]/95 rounded-none p-4 shadow-lg border border-[#0f1b3d]/15 flex flex-wrap gap-2">
          {PROGRAMMES_DATA.map((prog) => (
            <button
              key={prog.id}
              onClick={() => setActiveProgId(prog.id)}
              className={`px-5 py-2.5 rounded-none font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
                activeProgId === prog.id
                  ? 'bg-[#0f1b3d] text-white shadow-md'
                  : 'bg-[#e8edf3] dark:bg-[#152a4a] text-[#0f1b3d] dark:text-[#dbe6f2] hover:bg-[#e8edf3]'
              }`}
            >
              <span className="text-xs px-2 py-0.5 rounded bg-[#245a86] text-white font-extrabold">
                {prog.acronym}
              </span>
              <span>{prog.name}</span>
            </button>
          ))}
        </div>

        {/* Active Programme Hero Card */}
          <div className="bg-white dark:bg-[#0a1128] border-2 border-[#0f1b3d] rounded-none overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 p-6 md:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-[#245a86] text-white text-xs font-extrabold px-3 py-1 rounded-full">
                  {currentProgramme.acronym}
                </span>
                <span className="text-xs font-bold text-[#5b6b85]">
                  Lead Region: {currentProgramme.leadRegion}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f1b3d] dark:text-white leading-tight">
                {currentProgramme.name}
              </h2>

              <p className="text-base font-bold text-[#245a86] dark:text-[#a8c6e4]">
                "{currentProgramme.tagline}"
              </p>

              <p className="text-sm md:text-base text-[#0a1128] dark:text-[#e8edf3] leading-relaxed">
                {currentProgramme.summary}
              </p>

              {/* Objectives */}
              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0f1b3d] dark:text-[#dbe6f2]">
                  Key Programme Objectives
                </h3>
                <ul className="space-y-2">
                  {currentProgramme.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-[#33415c] dark:text-[#c4c6cf]">
                      <span className="material-symbols-outlined text-[#245a86] text-lg shrink-0 mt-0.5">check_circle</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-[#c4c6cf] flex flex-wrap gap-4 items-center justify-between">
              <button
                onClick={onOpenTakeAction}
                className="px-6 py-3 bg-[#245a86] hover:bg-[#0f1b3d] text-white font-bold text-sm rounded-none transition-colors cursor-pointer shadow-sm"
              >
                Partner on this Programme
              </button>
              <button
                onClick={() => onNavigate('advocacy')}
                className="px-6 py-3 border border-[#0f1b3d] text-[#0f1b3d] dark:text-white font-bold text-sm rounded-none hover:bg-[#e8edf3] transition-colors cursor-pointer"
              >
                View Related Events
              </button>
            </div>
          </div>

          {/* Right Column: Image & Impact Metrics */}
          <div className="lg:col-span-5 bg-[#0f1b3d] text-white p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="h-60 rounded-none overflow-hidden border border-[#b7cbe0] shadow relative">
              <img
                src={currentProgramme.image}
                alt={currentProgramme.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Impact Stats */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#a8c6e4]">
                Measurable Impact to Date
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {currentProgramme.impactStats.map((stat, idx) => (
                  <div key={idx} className="bg-[#0a1128] p-3 rounded-none border border-[#1e3a5f] text-center">
                    <div className="text-lg md:text-xl font-extrabold text-[#a8c6e4]">{stat.value}</div>
                    <div className="text-[10px] md:text-xs text-[#dbe6f2] mt-0.5 leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Donors & Partners */}
            <div className="space-y-2 pt-2 border-t border-[#1e3a5f]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#b7cbe0]">
                Strategic Partners & Donors
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentProgramme.donorsAndPartners.map((donor, idx) => (
                  <span key={idx} className="bg-[#1e3a5f] text-xs px-2.5 py-1 rounded text-[#dbe6f2] font-semibold">
                    {donor}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
