import React, { useState, useEffect } from 'react';
import { AboutSubSection } from '@/types';
import { EXECUTIVE_COUNCIL, OPD_COUNTRIES } from '@/data/mockData';
import { assetUrl } from '@/lib/assetUrl';
import { PageBanner } from './ui';

interface Props {
  subSection?: AboutSubSection;
  onOpenMembership: () => void;
  onOpenTakeAction: () => void;
}

export const AboutScreen: React.FC<Props> = ({ subSection = 'who', onOpenMembership, onOpenTakeAction }) => {
  const [activeTab, setActiveTab] = useState<AboutSubSection>(subSection);

  useEffect(() => {
    if (subSection) {
      setActiveTab(subSection);
    }
  }, [subSection]);

  return (
    <div className="animate-fade-in font-sans text-slate-800 bg-white">
      {/* 1. HERO PAGE BANNER */}
      <section className="relative bg-neutral-900 text-white min-h-[320px] md:min-h-[380px] flex items-center overflow-hidden">
        {/* Background Watermark / Overlay Image */}
        <img
          src={assetUrl("/images/adf-event-1.jpg")}
          alt="About ADF"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />

        {/* Large Decorative Text 1894X378 in background matching Figma */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-10">
          <span className="text-[12vw] font-black tracking-widest text-white">
            1894X378
          </span>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 w-full py-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            <span>Home</span>
            <span>/</span>
            <span className="text-white/80">About us</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            About us
          </h1>
        </div>
      </section>

      {/* SUB-NAVIGATION TABS BAR */}
      <div className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex flex-wrap gap-2 py-3">
          {[
            { id: "who", label: "Who We Are" },
            { id: "history", label: "Our History" },
            { id: "vision", label: "Vision & Mission" },
            { id: "leadership", label: "Leadership & Council" },
            { id: "membership", label: "Membership (+PANPPD)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AboutSubSection)}
              className={`px-5 py-2 rounded-md font-bold text-xs md:text-sm transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-700 text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 space-y-20">
        {/* 2. ESTABLISHED IN 2014 ADF & VISION/MISSION (FIGMA LAYOUT) */}
        {(activeTab === "who" || activeTab === "vision") && (
          <section className="space-y-16 animate-fade-in">
            {/* Top Grid: Narrative & Accent Photo Box */}
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Side Header & Story */}
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--adf-charcoal)] leading-tight">
                  Established in 2014 ADF
                </h2>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  The African Disability Forum (ADF) was initiated in November 2014 by leaders of continental, sub-regional, and national Organizations of Persons with Disabilities (OPDs). Formally registered in Addis Ababa, Ethiopia, ADF unifies and amplifies the representative voices of Africans with disabilities, their families, and democratic member organizations.
                </p>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  ADF operates strictly under the principles of self-advocacy, non-discrimination, gender equality, and youth empowerment. We serve as the primary civil society partner to the African Union and international agencies regarding disability rights.
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={onOpenTakeAction}
                    className="px-8 py-3.5 bg-[var(--adf-gold)] hover:bg-[var(--adf-gold)]/90 text-white font-bold rounded-md transition-colors shadow-md text-sm"
                  >
                    Join Our Initiatives
                  </button>
                  <button
                    onClick={onOpenMembership}
                    className="px-8 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-md transition-colors shadow-md text-sm"
                  >
                    OPD Membership
                  </button>
                </div>
              </div>

              {/* Right Side: Photo Frame with Gold Background Box (Figma Style) */}
              <div className="lg:col-span-5 relative flex justify-center items-center min-h-[360px]">
                {/* Yellow/Gold background shape offset */}
                <div className="absolute -top-4 -left-4 w-full h-full bg-amber-400 rounded-2xl z-0 hidden sm:block" />

                {/* Main Photo Card */}
                <div className="relative w-full h-[360px] rounded-2xl overflow-hidden shadow-xl border-4 border-white z-10">
                  <img
                    src={assetUrl("/images/adf-event-1.jpg")}
                    alt="Established in 2014 ADF convening"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Blue Play Badge */}
                <button
                  type="button"
                  onClick={onOpenTakeAction}
                  className="absolute bottom-6 right-6 h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 z-20"
                  aria-label="Play introduction video"
                >
                  <span className="material-symbols-outlined text-xl">play_arrow</span>
                </button>
              </div>
            </div>

            {/* Middle Block: Our Mission & Our Vision Rows (Figma Alignment) */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-12 space-y-8 shadow-sm max-w-4xl mx-auto">
              <div className="grid md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3">
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                    Our Mission
                  </h3>
                </div>
                <div className="md:col-span-9">
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    To strengthen the representative voice of persons with disabilities in Africa, build the institutional capacity of national OPDs, and hold governments accountable to the UN CRPD and the African Disability Protocol.
                  </p>
                </div>
              </div>

              <hr className="border-slate-200" />

              <div className="grid md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3">
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                    Our Vision
                  </h3>
                </div>
                <div className="md:col-span-9">
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    An inclusive, accessible and barrier-free Africa where all persons with disabilities enjoy full citizenship, equal rights, human dignity, and economic opportunities on an equal basis with others.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. OUR HISTORY SECTION */}
        {activeTab === "history" && (
          <section className="space-y-12 animate-fade-in max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                MILESTONES & JOURNEY
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--adf-charcoal)]">
                A Decade of Continental Advocacy
              </h2>
              <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
                Trace ADF&apos;s milestone achievements from its founding assembly in Addis Ababa to leading major treaty ratifications across Africa.
              </p>
            </div>

            <div className="space-y-8 relative border-l-4 border-blue-700 pl-6 md:pl-10 ml-4">
              {[
                {
                  year: "2014",
                  title: "Founding Assembly in Addis Ababa",
                  desc: "Delegates representing over 30 national and sub-regional OPDs convened at the African Union Headquarters in Ethiopia, formally establishing the African Disability Forum as an independent democratic federation.",
                },
                {
                  year: "2018",
                  title: "Adoption of African Disability Protocol",
                  desc: "ADF played a pivotal legal research and lobbying role leading to the African Union Heads of State adopting the landmark Protocol to the African Charter on Human and Peoples' Rights on the Rights of Persons with Disabilities.",
                },
                {
                  year: "2021",
                  title: "Expansion of Flagship Programmes (SPADRA & We Can Work)",
                  desc: "Partnered with international coalitions to launch multi-country programs targeting youth employment, gender-based advocacy, and municipal budget tracking.",
                },
                {
                  year: "2024 - Present",
                  title: "Pan-African OPD Network Expansion",
                  desc: "Today, ADF represents national umbrella OPDs across 44+ African nations, coordinating shadow reports and driving legislative domestication of disability rights.",
                },
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] md:-left-[47px] top-1 w-6 h-6 rounded-full bg-blue-700 border-4 border-white shadow" />
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-md">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 mt-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. EXECUTIVE LEADERSHIP & COUNCIL (FIGMA PILL PORTRAITS DESIGN) */}
        {(activeTab === "who" || activeTab === "leadership") && (
          <section className="space-y-12 animate-fade-in pt-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--adf-charcoal)]">
                Executive Leadership &amp; Council
              </h2>
              <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
                Elected officers representing regional federations across North, West, East, Central, and Southern Africa.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {EXECUTIVE_COUNCIL.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl p-6 text-center space-y-4 flex flex-col items-center border border-slate-100 shadow-lg hover:shadow-xl transition-all"
                >
                  {/* Oval Pill Framed Portrait (Matching Figma oval cutout shape) */}
                  <div className="w-48 h-64 rounded-[90px] overflow-hidden border-4 border-slate-100 shadow-md relative bg-slate-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-800">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-amber-600 mt-0.5">
                      {member.role}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1">
                      {member.organization}
                    </p>
                  </div>
                  {/* Social links icons matching Figma */}
                  <div className="flex gap-3 text-slate-400 text-xs pt-2">
                    <span className="material-symbols-outlined text-sm hover:text-blue-600 cursor-pointer">
                      share
                    </span>
                    <span className="material-symbols-outlined text-sm hover:text-blue-600 cursor-pointer">
                      mail
                    </span>
                    <span className="material-symbols-outlined text-sm hover:text-blue-600 cursor-pointer">
                      link
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. MEMBERSHIP (+PANPPD) TAB */}
        {activeTab === "membership" && (
          <section className="space-y-12 animate-fade-in">
            <div className="bg-neutral-900 text-white rounded-2xl p-8 md:p-12 space-y-4 shadow-xl">
              <span className="inline-block bg-[var(--adf-gold)] text-white font-bold text-xs uppercase px-3 py-1 rounded-md">
                Federation Membership
              </span>
              <h2 className="text-3xl font-extrabold">
                National Umbrella OPDs &amp; PANPPD Integration
              </h2>
              <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-3xl">
                ADF membership is open to democratic national federations of Persons with Disabilities, sub-regional associations, and specialized pan-African networks (including PANPPD - Pan-African Network of Persons with Psychosocial Disabilities).
              </p>
              <div className="pt-4">
                <button
                  onClick={onOpenMembership}
                  className="px-8 py-3.5 bg-[var(--adf-gold)] hover:bg-[var(--adf-gold)]/90 text-white font-bold rounded-md transition-colors"
                >
                  Apply for OPD Membership
                </button>
              </div>
            </div>

            {/* Member Presence Table */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-4 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800">
                Continental Member Presence ({OPD_COUNTRIES.length} Sample Countries)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                      <th className="p-3.5">Country</th>
                      <th className="p-3.5">National OPD Umbrella</th>
                      <th className="p-3.5">Region</th>
                      <th className="p-3.5 text-right">Local OPD Affiliates</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {OPD_COUNTRIES.map((c) => (
                      <tr key={c.country} className="hover:bg-slate-50">
                        <td className="p-3.5 font-bold text-slate-800">{c.country}</td>
                        <td className="p-3.5 text-slate-700">{c.opdName}</td>
                        <td className="p-3.5 text-gray-500">{c.region}</td>
                        <td className="p-3.5 font-bold text-blue-700 text-right">
                          {c.membersCount} Member Orgs
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* 6. BLUE STATISTICS COUNTER BAR (FIGMA METRICS) */}
      <section className="bg-blue-700 text-white py-12 shadow-inner">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-4xl text-amber-300">
              groups
            </span>
            <div>
              <div className="text-3xl md:text-4xl font-black">1m+</div>
              <p className="text-xs text-blue-100 uppercase tracking-wider font-semibold">
                Total Community
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-4xl text-amber-300">
              volunteer_activism
            </span>
            <div>
              <div className="text-3xl md:text-4xl font-black">6k+</div>
              <p className="text-xs text-blue-100 uppercase tracking-wider font-semibold">
                Volunteers / Members
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-4xl text-amber-300">
              domain
            </span>
            <div>
              <div className="text-3xl md:text-4xl font-black">3k+</div>
              <p className="text-xs text-blue-100 uppercase tracking-wider font-semibold">
                OPDs Supported
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-4xl text-amber-300">
              handshake
            </span>
            <div>
              <div className="text-3xl md:text-4xl font-black">23k+</div>
              <p className="text-xs text-blue-100 uppercase tracking-wider font-semibold">
                Our Supporters
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DARK CALL TO ACTION (FIGMA LAYOUT) */}
      <section className="bg-neutral-900 py-16 text-center">
        <div className="max-w-[800px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl text-white font-extrabold leading-tight">
            Unifying the Voice of Million Africans with Disabilities
          </h2>
          <div className="mt-8">
            <button
              type="button"
              onClick={onOpenTakeAction}
              className="px-10 py-4 bg-[var(--adf-gold)] hover:bg-[var(--adf-gold)]/90 text-white font-bold rounded-md transition-colors shadow-lg uppercase text-xs md:text-sm tracking-wider"
            >
              Read Special Stories
            </button>
          </div>
        </div>
      </section>

      {/* 8. PARTNERS & SUPPORTERS BAND (FIGMA FOOTER LOGOS) */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
            OUR PARTNERS &amp; DONORS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70">
            <div className="font-extrabold text-lg text-slate-700">LIGHT FOR THE WORLD</div>
            <div className="font-extrabold text-lg text-slate-700">IDA</div>
            <div className="font-extrabold text-lg text-slate-700">Save the Children</div>
            <div className="font-extrabold text-lg text-slate-700">mastercard foundation</div>
          </div>
        </div>
      </section>
    </div>
  );
};
