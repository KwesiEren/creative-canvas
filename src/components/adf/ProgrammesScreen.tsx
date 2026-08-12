import React, { useState, useEffect } from 'react';
import { ProgrammeId, NavTab } from '@/types';
import { PROGRAMMES_DATA } from '@/data/mockData';

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
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-10 space-y-10 animate-fade-in">
      {/* Header */}
      <div className="bg-white/95 dark:bg-[#1a1c1c]/95 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl border border-white/80">
        <span className="text-xs font-bold uppercase tracking-wider text-[#126e0c] dark:text-[#9bf585]">
          Continental Flagship Initiatives
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#002045] dark:text-[#d6e3ff] mt-1">
          ADF Strategic Programmes
        </h1>
        <p className="text-[#43474e] dark:text-[#c4c6cf] text-base md:text-lg max-w-3xl leading-relaxed mt-2">
          From legal rights advocacy and youth employment to healthcare inclusion and grassroots OPD capacity building, ADF implements targeted programmes across sub-Saharan Africa.
        </p>
      </div>

      {/* Programme Selector Pills */}
      <div className="bg-white/95 dark:bg-[#1a1c1c]/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/80 flex flex-wrap gap-2">
        {PROGRAMMES_DATA.map((prog) => (
          <button
            key={prog.id}
            onClick={() => setActiveProgId(prog.id)}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
              activeProgId === prog.id
                ? 'bg-[#002045] text-white shadow-md'
                : 'bg-[#f3f3f3] dark:bg-[#2f3131] text-[#002045] dark:text-[#d6e3ff] hover:bg-[#e2e2e2]'
            }`}
          >
            <span className="text-xs px-2 py-0.5 rounded bg-[#126e0c] text-white font-extrabold">
              {prog.acronym}
            </span>
            <span>{prog.name}</span>
          </button>
        ))}
      </div>

      {/* Active Programme Hero Card */}
      <div className="bg-white dark:bg-[#1a1c1c] border-2 border-[#002045] rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 p-6 md:p-10 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-[#126e0c] text-white text-xs font-extrabold px-3 py-1 rounded-full">
                {currentProgramme.acronym}
              </span>
              <span className="text-xs font-bold text-[#74777f]">
                Lead Region: {currentProgramme.leadRegion}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045] dark:text-white leading-tight">
              {currentProgramme.name}
            </h2>

            <p className="text-base font-bold text-[#126e0c] dark:text-[#9bf585]">
              "{currentProgramme.tagline}"
            </p>

            <p className="text-sm md:text-base text-[#1a1c1c] dark:text-[#e2e2e2] leading-relaxed">
              {currentProgramme.summary}
            </p>

            {/* Objectives */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#002045] dark:text-[#d6e3ff]">
                Key Programme Objectives
              </h3>
              <ul className="space-y-2">
                {currentProgramme.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-[#43474e] dark:text-[#c4c6cf]">
                    <span className="material-symbols-outlined text-[#126e0c] text-lg shrink-0 mt-0.5">check_circle</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-[#c4c6cf] flex flex-wrap gap-4 items-center justify-between">
            <button
              onClick={onOpenTakeAction}
              className="px-6 py-3 bg-[#126e0c] hover:bg-[#005300] text-white font-bold text-sm rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              Partner on this Programme
            </button>
            <button
              onClick={() => onNavigate('advocacy')}
              className="px-6 py-3 border border-[#002045] text-[#002045] dark:text-white font-bold text-sm rounded-lg hover:bg-[#f3f3f3] transition-colors cursor-pointer"
            >
              View Related Events
            </button>
          </div>
        </div>

        {/* Right Column: Image & Impact Metrics */}
        <div className="lg:col-span-5 bg-[#002045] text-white p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="h-60 rounded-xl overflow-hidden border border-[#86a0cd] shadow relative">
            <img
              src={currentProgramme.image}
              alt={currentProgramme.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Impact Stats */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#9bf585]">
              Measurable Impact to Date
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {currentProgramme.impactStats.map((stat, idx) => (
                <div key={idx} className="bg-[#001733] p-3 rounded-lg border border-[#1a365d] text-center">
                  <div className="text-lg md:text-xl font-extrabold text-[#9bf585]">{stat.value}</div>
                  <div className="text-[10px] md:text-xs text-[#d6e3ff] mt-0.5 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Donors & Partners */}
          <div className="space-y-2 pt-2 border-t border-[#1a365d]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#86a0cd]">
              Strategic Partners & Donors
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentProgramme.donorsAndPartners.map((donor, idx) => (
                <span key={idx} className="bg-[#1a365d] text-xs px-2.5 py-1 rounded text-[#d6e3ff] font-semibold">
                  {donor}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
