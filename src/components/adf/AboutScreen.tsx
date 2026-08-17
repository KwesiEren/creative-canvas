import React, { useState, useEffect } from 'react';
import { AboutSubSection } from '@/types';
import { EXECUTIVE_COUNCIL, OPD_COUNTRIES } from '@/data/mockData';

interface Props {
  subSection?: AboutSubSection;
  onOpenMembership: () => void;
  onOpenTakeAction: () => void;
}

export const AboutScreen: React.FC<Props> = ({ subSection = 'who', onOpenMembership, onOpenTakeAction }) => {
  const [activeTab, setActiveTab] = useState<AboutSubSection>(subSection);
  const [activeCountry, setActiveCountry] = useState(OPD_COUNTRIES[0]!);

  useEffect(() => {
    if (subSection) {
      setActiveTab(subSection);
    }
  }, [subSection]);

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-10 space-y-12 animate-fade-in">
      {/* Page Header */}
      <div className="bg-white dark:bg-[#0a1128]/95 rounded-none p-6 md:p-8 shadow-none border border-[#0f1b3d]/15">
        <span className="text-xs font-bold uppercase tracking-wider text-[#245a86] dark:text-[#a8c6e4]">
          Continental Representation
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0f1b3d] dark:text-[#dbe6f2] mt-1">
          About the African Disability Forum
        </h1>
        <p className="text-[#33415c] dark:text-[#c4c6cf] text-base md:text-lg max-w-3xl leading-relaxed mt-2">
          Established in 2014, ADF is the democratic, continental forum unifying national and regional Organizations of Persons with Disabilities (OPDs) to amplify rights and build inclusive African societies.
        </p>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="bg-white dark:bg-[#0a1128]/95 rounded-none p-4 shadow-lg border border-[#0f1b3d]/15 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('who')}
          className={`px-4 py-2 rounded-none font-bold text-sm transition-colors cursor-pointer ${
            activeTab === 'who'
              ? 'bg-[#0f1b3d] text-white shadow'
              : 'bg-[#e8edf3] text-[#0f1b3d] hover:bg-[#e8edf3]'
          }`}
        >
          Who We Are
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-none font-bold text-sm transition-colors cursor-pointer ${
            activeTab === 'history'
              ? 'bg-[#0f1b3d] text-white shadow'
              : 'bg-[#e8edf3] text-[#0f1b3d] hover:bg-[#e8edf3]'
          }`}
        >
          Our History
        </button>
        <button
          onClick={() => setActiveTab('vision')}
          className={`px-4 py-2 rounded-none font-bold text-sm transition-colors cursor-pointer ${
            activeTab === 'vision'
              ? 'bg-[#0f1b3d] text-white shadow'
              : 'bg-[#e8edf3] text-[#0f1b3d] hover:bg-[#e8edf3]'
          }`}
        >
          Vision & Mission
        </button>
        <button
          onClick={() => setActiveTab('leadership')}
          className={`px-4 py-2 rounded-none font-bold text-sm transition-colors cursor-pointer ${
            activeTab === 'leadership'
              ? 'bg-[#0f1b3d] text-white shadow'
              : 'bg-[#e8edf3] text-[#0f1b3d] hover:bg-[#e8edf3]'
          }`}
        >
          Leadership & Governance
        </button>
        <button
          onClick={() => setActiveTab('membership')}
          className={`px-4 py-2 rounded-none font-bold text-sm transition-colors cursor-pointer ${
            activeTab === 'membership'
              ? 'bg-[#0f1b3d] text-white shadow'
              : 'bg-[#e8edf3] text-[#0f1b3d] hover:bg-[#e8edf3]'
          }`}
        >
          Membership (+PANPPD)
        </button>
      </div>

      {/* WHO WE ARE SECTION */}
      {(activeTab === 'who' || activeTab === 'vision') && (
        <section className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f1b3d]">
                Unifying the Voice of 100+ Million Africans with Disabilities
              </h2>
              <p className="text-base text-[#0a1128] leading-relaxed">
                The African Disability Forum (ADF) was initiated in November 2014 by leaders of continental, sub-regional, and national Organizations of Persons with Disabilities (OPDs). ADF was created to bridge the democratic gap in continental representation, ensuring that African persons with disabilities speak with an authentic, collective voice before the African Union, United Nations, and regional economic communities.
              </p>
              <p className="text-base text-[#0a1128] leading-relaxed">
                ADF operates strictly under the principle of <strong>"Nothing About Us Without Us"</strong>, promoting self-advocacy, gender equity, youth empowerment, and equal enjoyment of all human rights across all 55 African nations.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={onOpenTakeAction}
                  className="px-6 py-3 bg-[#245a86] text-white font-bold text-sm rounded-none hover:bg-[#0f1b3d] transition-colors shadow-sm"
                >
                  Join Strategic Initiatives
                </button>
                <button
                  onClick={onOpenMembership}
                  className="px-6 py-3 bg-[#0f1b3d] text-white font-bold text-sm rounded-none hover:bg-[#1e3a5f] transition-colors shadow-sm"
                >
                  OPD Membership Details
                </button>
              </div>
            </div>

            <div className="md:col-span-5 rounded-none overflow-hidden border-2 border-[#0f1b3d] shadow-lg relative h-80 md:h-[400px]">
              <img
                src="/__l5e/assets-v1/c3cb9e62-06bc-4f39-8065-d855452b65f0/adf-photo-1.jpg"
                alt="ADF Executive Council and continental assembly members gathered in Addis Ababa"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="bg-[#e8edf3] border-2 border-[#0f1b3d] rounded-none p-8 space-y-3 shadow-sm">
              <div className="w-12 h-12 bg-[#0f1b3d] text-white rounded-full flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-2xl">visibility</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0f1b3d]">Our Vision</h3>
              <p className="text-base text-[#0a1128] leading-relaxed">
                An inclusive, accessible, and barrier-free Africa where all persons with disabilities enjoy full citizenship, equal rights, human dignity, and economic opportunities on an equal basis with others.
              </p>
            </div>

            <div className="bg-[#e8edf3] border-2 border-[#245a86] rounded-none p-8 space-y-3 shadow-sm">
              <div className="w-12 h-12 bg-[#245a86] text-white rounded-full flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-2xl">target</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0f1b3d]">Our Mission</h3>
              <p className="text-base text-[#0a1128] leading-relaxed">
                To strengthen the representative voice of persons with disabilities in Africa, build the institutional capacity of national OPDs, and hold governments accountable to the UN CRPD and the African Disability Protocol.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* OUR HISTORY SECTION */}
      {activeTab === 'history' && (
        <section className="space-y-8 animate-fade-in">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl font-extrabold text-[#0f1b3d]">A Decade of Continental Advocacy History</h2>
            <p className="text-base text-[#33415c] leading-relaxed">
              Trace ADF's milestone achievements from its founding assembly in Addis Ababa to leading major treaty ratifications across the continent.
            </p>
          </div>

          <div className="space-y-6 relative border-l-4 border-[#0f1b3d] pl-6 md:pl-8 ml-2">
            <div className="relative">
              <div className="absolute -left-[31px] md:-left-[39px] top-1 w-6 h-6 rounded-full bg-[#245a86] border-4 border-white" />
              <span className="text-xs font-bold text-[#245a86] bg-[#e8edf3] px-2.5 py-0.5 rounded">2014</span>
              <h3 className="text-xl font-bold text-[#0f1b3d] mt-1">Founding Assembly in Addis Ababa</h3>
              <p className="text-sm text-[#0a1128] mt-1 leading-relaxed max-w-2xl">
                Delegates representing over 30 national and sub-regional OPDs convened at the African Union Headquarters in Addis Ababa, Ethiopia, formally founding the African Disability Forum as an independent democratic federation.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] md:-left-[39px] top-1 w-6 h-6 rounded-full bg-[#0f1b3d] border-4 border-white" />
              <span className="text-xs font-bold text-[#0f1b3d] bg-[#dbe6f2] px-2.5 py-0.5 rounded">2018</span>
              <h3 className="text-xl font-bold text-[#0f1b3d] mt-1">Adoption of African Disability Protocol</h3>
              <p className="text-sm text-[#0a1128] mt-1 leading-relaxed max-w-2xl">
                ADF played a pivotal legal research and lobbying role leading to the African Union Heads of State adopting the Protocol to the African Charter on Human and Peoples' Rights on the Rights of Persons with Disabilities.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] md:-left-[39px] top-1 w-6 h-6 rounded-full bg-[#245a86] border-4 border-white" />
              <span className="text-xs font-bold text-[#245a86] bg-[#e8edf3] px-2.5 py-0.5 rounded">2021</span>
              <h3 className="text-xl font-bold text-[#0f1b3d] mt-1">Expansion of Flagship Programmes (SPADRA & We Can Work)</h3>
              <p className="text-sm text-[#0a1128] mt-1 leading-relaxed max-w-2xl">
                Partnered with international coalitions to launch multi-country programmes targeting youth employment, assistive technology distribution, and municipal budget tracking.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] md:-left-[39px] top-1 w-6 h-6 rounded-full bg-[#0f1b3d] border-4 border-white" />
              <span className="text-xs font-bold text-[#0f1b3d] bg-[#dbe6f2] px-2.5 py-0.5 rounded">2024 - Present</span>
              <h3 className="text-xl font-bold text-[#0f1b3d] mt-1">Pan-African OPD Network Expansion</h3>
              <p className="text-sm text-[#0a1128] mt-1 leading-relaxed max-w-2xl">
                Today, ADF represents national umbrella OPDs in over 40 African nations, coordinating shadow reports and driving legislative domestication.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* LEADERSHIP SECTION */}
      {activeTab === 'leadership' && (
        <section className="space-y-8 animate-fade-in">
          <div className="border-b border-[#c4c6cf] pb-4">
            <h2 className="text-3xl font-extrabold text-[#0f1b3d]">ADF Executive Council & Governance</h2>
            <p className="text-base text-[#33415c] mt-1">
              Elected officers representing regional federations across North, West, East, Central, and Southern Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXECUTIVE_COUNCIL.map((member) => (
              <div key={member.id} className="bg-white border-2 border-[#5b6b85] rounded-none p-6 text-center space-y-3">
                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-[#0f1b3d]" />
                <h3 className="text-xl font-bold text-[#0f1b3d]">{member.name}</h3>
                <span className="inline-block bg-[#a8c6e4] text-[#0a1128] text-xs font-bold px-3 py-1 rounded-full">
                  {member.role}
                </span>
                <p className="text-xs text-[#33415c]">{member.organization}</p>
                <p className="text-xs text-[#0a1128] leading-relaxed line-clamp-4">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MEMBERSHIP & PANPPD SECTION */}
      {activeTab === 'membership' && (
        <section className="space-y-8 animate-fade-in">
          <div className="bg-[#0f1b3d] text-white rounded-none p-8 space-y-4">
            <span className="inline-block bg-[#a8c6e4] text-[#0a1128] font-bold text-xs uppercase px-3 py-1 rounded-full">
              Federation Membership
            </span>
            <h2 className="text-3xl font-extrabold">National Umbrella OPDs & PANPPD Integration</h2>
            <p className="text-[#dbe6f2] text-base leading-relaxed max-w-3xl">
              ADF membership is open to democratic national federations of Persons with Disabilities, sub-regional associations, and specialized pan-African networks (including PANPPD - Pan-African Network of Persons with Psychosocial Disabilities).
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenMembership}
                className="px-6 py-3 bg-[#a8c6e4] text-[#0a1128] hover:bg-[#a8c6e4] font-bold rounded-none transition-colors cursor-pointer"
              >
                Apply for OPD Membership
              </button>
            </div>
          </div>

          {/* Active Members Table */}
          <div className="bg-[#f4f7fa] border border-[#c4c6cf] rounded-none p-6 space-y-4">
            <h3 className="text-xl font-bold text-[#0f1b3d]">Continental Member Presence ({OPD_COUNTRIES.length} Sample Countries)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#0f1b3d] text-white text-xs uppercase">
                    <th className="p-3 rounded-tl">Country</th>
                    <th className="p-3">National OPD Umbrella</th>
                    <th className="p-3">Region</th>
                    <th className="p-3 rounded-tr">Local OPD Affiliates</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c4c6cf]">
                  {OPD_COUNTRIES.map((c) => (
                    <tr key={c.country} className="hover:bg-[#e8edf3]">
                      <td className="p-3 font-bold text-[#0f1b3d]">{c.country}</td>
                      <td className="p-3 font-semibold text-[#0a1128]">{c.opdName}</td>
                      <td className="p-3 text-[#33415c]">{c.region}</td>
                      <td className="p-3 font-bold text-[#245a86]">{c.membersCount} Member Orgs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
