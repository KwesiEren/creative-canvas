import React, { useState } from 'react';
import { EXECUTIVE_COUNCIL, OPD_COUNTRIES } from '@/data/mockData';
import { ExecutiveMember, OpdCountry } from '@/types';
import { assetUrl } from '@/lib/assetUrl';
import { PageBanner } from './ui';

interface Props {
  onOpenMembership: () => void;
}

export const GovernanceScreen: React.FC<Props> = ({ onOpenMembership }) => {
  const [selectedExec, setSelectedExec] = useState<ExecutiveMember | null>(null);
  const [activeCountry, setActiveCountry] = useState<OpdCountry>(OPD_COUNTRIES[0]!);

  return (
    <div className="animate-fade-in">
      <PageBanner
        title="Governance & Continental OPD Network"
        crumbs={[{ label: "Home" }, { label: "Governance" }]}
        image={assetUrl("/images/adf-event-6.png")}
        imageAlt="ADF governance and executive council"
      />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-10 space-y-12">
        <div>
          <p className="text-[#33415c] text-base md:text-lg max-w-3xl leading-relaxed">
            The African Disability Forum is governed by a democratically elected Executive Council of leaders representing national and regional Organizations of Persons with Disabilities (OPDs) across Africa.
          </p>
        </div>

      {/* Executive Council Section */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0f1b3d] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#245a86]">groups</span>
          <span>ADF Executive Council</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXECUTIVE_COUNCIL.map((member) => (
            <div
              key={member.id}
              className="bg-white border-2 border-[#5b6b85] rounded-none overflow-hidden p-6 flex flex-col items-center text-center shadow-sm hover:border-[#0f1b3d] transition-colors"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#0f1b3d] mb-4 shadow">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-[#0f1b3d]">{member.name}</h3>
              <span className="text-sm font-bold text-[#245a86] bg-[#a8c6e4] px-3 py-0.5 rounded-full mt-1">
                {member.role}
              </span>
              <span className="text-xs font-medium text-[#33415c] mt-2 mb-4">
                {member.organization}
              </span>
              <p className="text-xs text-[#0a1128] leading-relaxed line-clamp-3 mb-4">
                {member.bio}
              </p>
              <button
                onClick={() => setSelectedExec(member)}
                className="mt-auto px-4 py-2 bg-[#0f1b3d] text-white text-xs font-bold rounded hover:bg-[#1e3a5f] transition-colors focus-ring"
              >
                View Full Leadership Bio
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Continental OPD Network Interactive Map & Country List */}
      <section className="bg-[#e8edf3] border-2 border-[#5b6b85] rounded-none p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#c4c6cf] pb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#0f1b3d] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#245a86]">map</span>
              <span>Continental OPD Member Presence</span>
            </h2>
            <p className="text-sm text-[#33415c] mt-1">
              Select an African country below to view its registered national Organizations of Persons with Disabilities.
            </p>
          </div>
          <button
            onClick={onOpenMembership}
            className="px-5 py-2.5 bg-[#245a86] text-white font-bold text-sm rounded shadow hover:bg-[#0f1b3d] transition-colors"
          >
            Apply for OPD Membership
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Map Node Canvas / Visual representation */}
          <div className="lg:col-span-7 bg-[#0f1b3d] text-white rounded-none p-6 relative min-h-[360px] flex flex-col justify-between overflow-hidden shadow-inner">
            <div className="flex justify-between items-center text-xs text-[#b7cbe0]">
              <span className="font-bold uppercase tracking-wider">Africa Regional Network Map</span>
              <span>{OPD_COUNTRIES.length} Core Regions Represented</span>
            </div>

            {/* Stylized Node Network */}
            <div className="relative w-full h-64 border border-[#1e3a5f] rounded bg-[#0a1128] overflow-hidden my-4">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#b7cbe0_1px,transparent_1px)] [background-size:16px_16px]" />

              {OPD_COUNTRIES.map((c) => (
                <button
                  key={c.country}
                  onClick={() => setActiveCountry(c)}
                  style={{ left: `${c.coordinates.x}%`, top: `${c.coordinates.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all cursor-pointer group ${
                    activeCountry.country === c.country
                      ? 'bg-[#a8c6e4] text-[#0f1b3d] scale-125 z-20 shadow-lg ring-4 ring-[#245a86]'
                      : 'bg-[#dbe6f2] text-[#0f1b3d] hover:scale-110 z-10'
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

            <div className="text-xs text-[#cfe0f0] italic">
              Click pins on the map or country tags to display regional OPD profiles.
            </div>
          </div>

          {/* Selected Country Details */}
          <div className="lg:col-span-5 bg-white border-2 border-[#0f1b3d] rounded-none p-6 space-y-4 shadow">
            <div className="flex items-center justify-between border-b border-[#c4c6cf] pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#245a86] text-2xl">flag</span>
                <h3 className="text-2xl font-bold text-[#0f1b3d]">{activeCountry.country}</h3>
              </div>
              <span className="text-xs font-bold bg-[#e8edf3] text-[#0f1b3d] px-3 py-1 rounded-full">
                {activeCountry.region}
              </span>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-[#5b6b85] block mb-1">National Umbrella OPD</label>
              <div className="text-lg font-bold text-[#0a1128] leading-snug">
                {activeCountry.opdName}
              </div>
            </div>

            <div className="bg-[#f4f7fa] p-4 rounded-none border border-[#c4c6cf] space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-bold text-[#33415c]">Local Affiliated OPDs:</span>
                <span className="font-bold text-[#245a86]">{activeCountry.membersCount} Organizations</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-[#33415c]">Status:</span>
                <span className="font-bold text-[#0f1b3d]">Active Voting Member</span>
              </div>
            </div>

            {/* Country Selector Buttons */}
            <div>
              <label className="text-xs font-bold text-[#33415c] block mb-2">Switch Country Focus:</label>
              <div className="flex flex-wrap gap-1.5">
                {OPD_COUNTRIES.map((c) => (
                  <button
                    key={c.country}
                    onClick={() => setActiveCountry(c)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                      activeCountry.country === c.country
                        ? 'bg-[#0f1b3d] text-white'
                        : 'bg-[#e8edf3] text-[#33415c] hover:bg-[#c4c6cf]'
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
      <section className="bg-[#0f1b3d] text-white rounded-none p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Unify Your Organization with ADF</h2>
          <p className="text-base text-[#cfe0f0] max-w-xl">
            Are you a registered Organization of Persons with Disabilities in Africa? Join ADF to amplify your national advocacy at the African Union and UN levels.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onOpenMembership}
            className="px-6 py-3 bg-[#a8c6e4] text-[#0f1b3d] hover:bg-[#a8c6e4] font-bold text-base rounded shadow transition-colors"
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
          <div className="bg-white rounded-none max-w-lg w-full p-6 border-2 border-[#0f1b3d] shadow-lg relative">
            <div className="flex justify-between items-center mb-4 border-b border-[#c4c6cf] pb-3">
              <div className="flex items-center gap-3">
                <img src={selectedExec.image} alt={selectedExec.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#0f1b3d]" />
                <div>
                  <h3 className="text-xl font-bold text-[#0f1b3d]">{selectedExec.name}</h3>
                  <span className="text-xs font-bold text-[#245a86]">{selectedExec.role}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedExec(null)}
                className="p-1 text-[#33415c] hover:bg-[#e8edf3] rounded-full"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-sm text-[#0a1128] leading-relaxed mb-4">{selectedExec.bio}</p>
            <div className="p-3 bg-[#e8edf3] rounded border border-[#c4c6cf] text-xs space-y-1">
              <div><strong>Representing OPD:</strong> {selectedExec.organization}</div>
              <div><strong>Term:</strong> 2022 - 2026 Continental Assembly mandate</div>
            </div>
            <div className="mt-6 pt-3 border-t border-[#c4c6cf] flex justify-end">
              <button
                onClick={() => setSelectedExec(null)}
                className="px-6 py-2 bg-[#0f1b3d] text-white font-bold text-sm rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
