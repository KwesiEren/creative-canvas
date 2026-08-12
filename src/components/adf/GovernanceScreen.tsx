import React, { useState } from 'react';
import { EXECUTIVE_COUNCIL, OPD_COUNTRIES } from '@/data/mockData';
import { ExecutiveMember, OpdCountry } from '@/types';

interface Props {
  onOpenMembership: () => void;
}

export const GovernanceScreen: React.FC<Props> = ({ onOpenMembership }) => {
  const [selectedExec, setSelectedExec] = useState<ExecutiveMember | null>(null);
  const [activeCountry, setActiveCountry] = useState<OpdCountry>(OPD_COUNTRIES[0]);

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-10 space-y-12 animate-fade-in">
      {/* Header */}
      <div className="border-b-2 border-[#74777f] pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#002045] mb-2">
          Governance & Continental OPD Network
        </h1>
        <p className="text-[#43474e] text-base md:text-lg max-w-3xl leading-relaxed">
          The African Disability Forum is governed by a democratically elected Executive Council of leaders representing national and regional Organizations of Persons with Disabilities (OPDs) across Africa.
        </p>
      </div>

      {/* Executive Council Section */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#002045] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#126e0c]">groups</span>
          <span>ADF Executive Council</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXECUTIVE_COUNCIL.map((member) => (
            <div
              key={member.id}
              className="bg-white border-2 border-[#74777f] rounded-xl overflow-hidden p-6 flex flex-col items-center text-center shadow-sm hover:border-[#002045] transition-colors"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#002045] mb-4 shadow">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-[#002045]">{member.name}</h3>
              <span className="text-sm font-bold text-[#126e0c] bg-[#9bf585] px-3 py-0.5 rounded-full mt-1">
                {member.role}
              </span>
              <span className="text-xs font-medium text-[#43474e] mt-2 mb-4">
                {member.organization}
              </span>
              <p className="text-xs text-[#1a1c1c] leading-relaxed line-clamp-3 mb-4">
                {member.bio}
              </p>
              <button
                onClick={() => setSelectedExec(member)}
                className="mt-auto px-4 py-2 bg-[#002045] text-white text-xs font-bold rounded hover:bg-[#1a365d] transition-colors focus-ring"
              >
                View Full Leadership Bio
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Continental OPD Network Interactive Map & Country List */}
      <section className="bg-[#f3f3f3] border-2 border-[#74777f] rounded-xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#c4c6cf] pb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#002045] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#126e0c]">map</span>
              <span>Continental OPD Member Presence</span>
            </h2>
            <p className="text-sm text-[#43474e] mt-1">
              Select an African country below to view its registered national Organizations of Persons with Disabilities.
            </p>
          </div>
          <button
            onClick={onOpenMembership}
            className="px-5 py-2.5 bg-[#126e0c] text-white font-bold text-sm rounded shadow hover:bg-[#005300] transition-colors"
          >
            Apply for OPD Membership
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Map Node Canvas / Visual representation */}
          <div className="lg:col-span-7 bg-[#002045] text-white rounded-xl p-6 relative min-h-[360px] flex flex-col justify-between overflow-hidden shadow-inner">
            <div className="flex justify-between items-center text-xs text-[#86a0cd]">
              <span className="font-bold uppercase tracking-wider">Africa Regional Network Map</span>
              <span>{OPD_COUNTRIES.length} Core Regions Represented</span>
            </div>

            {/* Stylized Node Network */}
            <div className="relative w-full h-64 border border-[#1a365d] rounded bg-[#001733] overflow-hidden my-4">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#86a0cd_1px,transparent_1px)] [background-size:16px_16px]" />

              {OPD_COUNTRIES.map((c) => (
                <button
                  key={c.country}
                  onClick={() => setActiveCountry(c)}
                  style={{ left: `${c.coordinates.x}%`, top: `${c.coordinates.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all cursor-pointer group ${
                    activeCountry.country === c.country
                      ? 'bg-[#9bf585] text-[#005300] scale-125 z-20 shadow-lg ring-4 ring-[#126e0c]'
                      : 'bg-[#d6e3ff] text-[#002045] hover:scale-110 z-10'
                  }`}
                  aria-label={`View ${c.country} OPD details`}
                >
                  <span className="material-symbols-outlined text-sm font-bold">location_on</span>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 bg-black/90 text-white text-[10px] rounded font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {c.country}
                  </span>
                </button>
              ))}
            </div>

            <div className="text-xs text-[#adc7f7] italic">
              Click pins on the map or country tags to display regional OPD profiles.
            </div>
          </div>

          {/* Selected Country Details */}
          <div className="lg:col-span-5 bg-white border-2 border-[#002045] rounded-xl p-6 space-y-4 shadow">
            <div className="flex items-center justify-between border-b border-[#c4c6cf] pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#126e0c] text-2xl">flag</span>
                <h3 className="text-2xl font-bold text-[#002045]">{activeCountry.country}</h3>
              </div>
              <span className="text-xs font-bold bg-[#e2e2e2] text-[#002045] px-3 py-1 rounded-full">
                {activeCountry.region}
              </span>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-[#74777f] block mb-1">National Umbrella OPD</label>
              <div className="text-lg font-bold text-[#1a1c1c] leading-snug">
                {activeCountry.opdName}
              </div>
            </div>

            <div className="bg-[#f9f9f9] p-4 rounded-lg border border-[#c4c6cf] space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-bold text-[#43474e]">Local Affiliated OPDs:</span>
                <span className="font-bold text-[#126e0c]">{activeCountry.membersCount} Organizations</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-[#43474e]">Status:</span>
                <span className="font-bold text-[#002045]">Active Voting Member</span>
              </div>
            </div>

            {/* Country Selector Buttons */}
            <div>
              <label className="text-xs font-bold text-[#43474e] block mb-2">Switch Country Focus:</label>
              <div className="flex flex-wrap gap-1.5">
                {OPD_COUNTRIES.map((c) => (
                  <button
                    key={c.country}
                    onClick={() => setActiveCountry(c)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                      activeCountry.country === c.country
                        ? 'bg-[#002045] text-white'
                        : 'bg-[#e2e2e2] text-[#43474e] hover:bg-[#c4c6cf]'
                    }`}
                  >
                    {c.country}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Callout */}
      <section className="bg-[#002045] text-white rounded-xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Unify Your Organization with ADF</h2>
          <p className="text-base text-[#adc7f7] max-w-xl">
            Are you a registered Organization of Persons with Disabilities in Africa? Join ADF to amplify your national advocacy at the African Union and UN levels.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onOpenMembership}
            className="px-6 py-3 bg-[#9bf585] text-[#005300] hover:bg-[#82db6f] font-bold text-base rounded shadow transition-colors"
          >
            Apply for Membership
          </button>
          <button
            onClick={() => alert('Downloading ADF Membership Criteria and Requirements Document (PDF)...')}
            className="px-6 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold text-base rounded transition-colors"
          >
            Download Requirements
          </button>
        </div>
      </section>

      {/* Leadership Bio Modal */}
      {selectedExec && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 border-2 border-[#002045] shadow-2xl relative">
            <div className="flex justify-between items-center mb-4 border-b border-[#c4c6cf] pb-3">
              <div className="flex items-center gap-3">
                <img src={selectedExec.image} alt={selectedExec.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#002045]" />
                <div>
                  <h3 className="text-xl font-bold text-[#002045]">{selectedExec.name}</h3>
                  <span className="text-xs font-bold text-[#126e0c]">{selectedExec.role}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedExec(null)}
                className="p-1 text-[#43474e] hover:bg-[#e8e8e8] rounded-full"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-sm text-[#1a1c1c] leading-relaxed mb-4">{selectedExec.bio}</p>
            <div className="p-3 bg-[#f3f3f3] rounded border border-[#c4c6cf] text-xs space-y-1">
              <div><strong>Representing OPD:</strong> {selectedExec.organization}</div>
              <div><strong>Term:</strong> 2022 - 2026 Continental Assembly mandate</div>
            </div>
            <div className="mt-6 pt-3 border-t border-[#c4c6cf] flex justify-end">
              <button
                onClick={() => setSelectedExec(null)}
                className="px-6 py-2 bg-[#002045] text-white font-bold text-sm rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
