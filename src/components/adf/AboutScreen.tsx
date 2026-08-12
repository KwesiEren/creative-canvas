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
  const [activeCountry, setActiveCountry] = useState(OPD_COUNTRIES[0]);

  useEffect(() => {
    if (subSection) {
      setActiveTab(subSection);
    }
  }, [subSection]);

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-10 space-y-12 animate-fade-in">
      {/* Page Header */}
      <div className="bg-white/95 dark:bg-[#1a1c1c]/95 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl border border-white/80">
        <span className="text-xs font-bold uppercase tracking-wider text-[#126e0c] dark:text-[#9bf585]">
          Continental Representation
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#002045] dark:text-[#d6e3ff] mt-1">
          About the African Disability Forum
        </h1>
        <p className="text-[#43474e] dark:text-[#c4c6cf] text-base md:text-lg max-w-3xl leading-relaxed mt-2">
          Established in 2014, ADF is the democratic, continental forum unifying national and regional Organizations of Persons with Disabilities (OPDs) to amplify rights and build inclusive African societies.
        </p>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="bg-white/95 dark:bg-[#1a1c1c]/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/80 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('who')}
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors cursor-pointer ${
            activeTab === 'who'
              ? 'bg-[#002045] text-white shadow'
              : 'bg-[#f3f3f3] text-[#002045] hover:bg-[#e2e2e2]'
          }`}
        >
          Who We Are
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors cursor-pointer ${
            activeTab === 'history'
              ? 'bg-[#002045] text-white shadow'
              : 'bg-[#f3f3f3] text-[#002045] hover:bg-[#e2e2e2]'
          }`}
        >
          Our History
        </button>
        <button
          onClick={() => setActiveTab('vision')}
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors cursor-pointer ${
            activeTab === 'vision'
              ? 'bg-[#002045] text-white shadow'
              : 'bg-[#f3f3f3] text-[#002045] hover:bg-[#e2e2e2]'
          }`}
        >
          Vision & Mission
        </button>
        <button
          onClick={() => setActiveTab('leadership')}
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors cursor-pointer ${
            activeTab === 'leadership'
              ? 'bg-[#002045] text-white shadow'
              : 'bg-[#f3f3f3] text-[#002045] hover:bg-[#e2e2e2]'
          }`}
        >
          Leadership & Governance
        </button>
        <button
          onClick={() => setActiveTab('membership')}
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors cursor-pointer ${
            activeTab === 'membership'
              ? 'bg-[#002045] text-white shadow'
              : 'bg-[#f3f3f3] text-[#002045] hover:bg-[#e2e2e2]'
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
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#002045]">
                Unifying the Voice of 100+ Million Africans with Disabilities
              </h2>
              <p className="text-base text-[#1a1c1c] leading-relaxed">
                The African Disability Forum (ADF) was initiated in November 2014 by leaders of continental, sub-regional, and national Organizations of Persons with Disabilities (OPDs). ADF was created to bridge the democratic gap in continental representation, ensuring that African persons with disabilities speak with an authentic, collective voice before the African Union, United Nations, and regional economic communities.
              </p>
              <p className="text-base text-[#1a1c1c] leading-relaxed">
                ADF operates strictly under the principle of <strong>"Nothing About Us Without Us"</strong>, promoting self-advocacy, gender equity, youth empowerment, and equal enjoyment of all human rights across all 55 African nations.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={onOpenTakeAction}
                  className="px-6 py-3 bg-[#126e0c] text-white font-bold text-sm rounded-lg hover:bg-[#005300] transition-colors shadow-sm"
                >
                  Join Strategic Initiatives
                </button>
                <button
                  onClick={onOpenMembership}
                  className="px-6 py-3 bg-[#002045] text-white font-bold text-sm rounded-lg hover:bg-[#1a365d] transition-colors shadow-sm"
                >
                  OPD Membership Details
                </button>
              </div>
            </div>

            <div className="md:col-span-5 rounded-2xl overflow-hidden border-2 border-[#002045] shadow-lg relative h-80 md:h-[400px]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5RTHq8GFRwH8lZB1Uhqpuh-e3LRFZroug2X8Inod0btmKvbTBhoNJRJdpDRdSbNs_NOw0tMM8PZSVzBMm9PD-A9aaoOG1nicAhZM4k1YZI43-pr9uMgrPlUxqUnE2IqOT85HMDFf68qOwGJUp08zUM-LVTfTN1v-FLwvBbJ4GmbGuf7aUJYhet9Na2-I0tbFUTMne4ceQ68VWU7gfiTwvDOjjHfJYBls4vI2ckusTOzgPnVJxRCo9"
                alt="ADF Executive Council and continental assembly members gathered in Addis Ababa"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="bg-[#f3f3f3] border-2 border-[#002045] rounded-xl p-8 space-y-3 shadow-sm">
              <div className="w-12 h-12 bg-[#002045] text-white rounded-full flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-2xl">visibility</span>
              </div>
              <h3 className="text-2xl font-bold text-[#002045]">Our Vision</h3>
              <p className="text-base text-[#1a1c1c] leading-relaxed">
                An inclusive, accessible, and barrier-free Africa where all persons with disabilities enjoy full citizenship, equal rights, human dignity, and economic opportunities on an equal basis with others.
              </p>
            </div>

            <div className="bg-[#f3f3f3] border-2 border-[#126e0c] rounded-xl p-8 space-y-3 shadow-sm">
              <div className="w-12 h-12 bg-[#126e0c] text-white rounded-full flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-2xl">target</span>
              </div>
              <h3 className="text-2xl font-bold text-[#002045]">Our Mission</h3>
              <p className="text-base text-[#1a1c1c] leading-relaxed">
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
            <h2 className="text-3xl font-extrabold text-[#002045]">A Decade of Continental Advocacy History</h2>
            <p className="text-base text-[#43474e] leading-relaxed">
              Trace ADF's milestone achievements from its founding assembly in Addis Ababa to leading major treaty ratifications across the continent.
            </p>
          </div>

          <div className="space-y-6 relative border-l-4 border-[#002045] pl-6 md:pl-8 ml-2">
            <div className="relative">
              <div className="absolute -left-[31px] md:-left-[39px] top-1 w-6 h-6 rounded-full bg-[#126e0c] border-4 border-white" />
              <span className="text-xs font-bold text-[#126e0c] bg-[#e8f5e9] px-2.5 py-0.5 rounded">2014</span>
              <h3 className="text-xl font-bold text-[#002045] mt-1">Founding Assembly in Addis Ababa</h3>
              <p className="text-sm text-[#1a1c1c] mt-1 leading-relaxed max-w-2xl">
                Delegates representing over 30 national and sub-regional OPDs convened at the African Union Headquarters in Addis Ababa, Ethiopia, formally founding the African Disability Forum as an independent democratic federation.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] md:-left-[39px] top-1 w-6 h-6 rounded-full bg-[#002045] border-4 border-white" />
              <span className="text-xs font-bold text-[#002045] bg-[#d6e3ff] px-2.5 py-0.5 rounded">2018</span>
              <h3 className="text-xl font-bold text-[#002045] mt-1">Adoption of African Disability Protocol</h3>
              <p className="text-sm text-[#1a1c1c] mt-1 leading-relaxed max-w-2xl">
                ADF played a pivotal legal research and lobbying role leading to the African Union Heads of State adopting the Protocol to the African Charter on Human and Peoples' Rights on the Rights of Persons with Disabilities.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] md:-left-[39px] top-1 w-6 h-6 rounded-full bg-[#126e0c] border-4 border-white" />
              <span className="text-xs font-bold text-[#126e0c] bg-[#e8f5e9] px-2.5 py-0.5 rounded">2021</span>
              <h3 className="text-xl font-bold text-[#002045] mt-1">Expansion of Flagship Programmes (SPADRA & We Can Work)</h3>
              <p className="text-sm text-[#1a1c1c] mt-1 leading-relaxed max-w-2xl">
                Partnered with international coalitions to launch multi-country programmes targeting youth employment, assistive technology distribution, and municipal budget tracking.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] md:-left-[39px] top-1 w-6 h-6 rounded-full bg-[#002045] border-4 border-white" />
              <span className="text-xs font-bold text-[#002045] bg-[#d6e3ff] px-2.5 py-0.5 rounded">2024 - Present</span>
              <h3 className="text-xl font-bold text-[#002045] mt-1">Pan-African OPD Network Expansion</h3>
              <p className="text-sm text-[#1a1c1c] mt-1 leading-relaxed max-w-2xl">
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
            <h2 className="text-3xl font-extrabold text-[#002045]">ADF Executive Council & Governance</h2>
            <p className="text-base text-[#43474e] mt-1">
              Elected officers representing regional federations across North, West, East, Central, and Southern Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXECUTIVE_COUNCIL.map((member) => (
              <div key={member.id} className="bg-white border-2 border-[#74777f] rounded-xl p-6 text-center space-y-3">
                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-[#002045]" />
                <h3 className="text-xl font-bold text-[#002045]">{member.name}</h3>
                <span className="inline-block bg-[#9bf585] text-[#003900] text-xs font-bold px-3 py-1 rounded-full">
                  {member.role}
                </span>
                <p className="text-xs text-[#43474e]">{member.organization}</p>
                <p className="text-xs text-[#1a1c1c] leading-relaxed line-clamp-4">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MEMBERSHIP & PANPPD SECTION */}
      {activeTab === 'membership' && (
        <section className="space-y-8 animate-fade-in">
          <div className="bg-[#002045] text-white rounded-2xl p-8 space-y-4">
            <span className="inline-block bg-[#9bf585] text-[#003900] font-bold text-xs uppercase px-3 py-1 rounded-full">
              Federation Membership
            </span>
            <h2 className="text-3xl font-extrabold">National Umbrella OPDs & PANPPD Integration</h2>
            <p className="text-[#d6e3ff] text-base leading-relaxed max-w-3xl">
              ADF membership is open to democratic national federations of Persons with Disabilities, sub-regional associations, and specialized pan-African networks (including PANPPD - Pan-African Network of Persons with Psychosocial Disabilities).
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenMembership}
                className="px-6 py-3 bg-[#9bf585] text-[#003900] hover:bg-[#82db6f] font-bold rounded-lg transition-colors cursor-pointer"
              >
                Apply for OPD Membership
              </button>
            </div>
          </div>

          {/* Active Members Table */}
          <div className="bg-[#f9f9f9] border border-[#c4c6cf] rounded-xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-[#002045]">Continental Member Presence ({OPD_COUNTRIES.length} Sample Countries)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#002045] text-white text-xs uppercase">
                    <th className="p-3 rounded-tl">Country</th>
                    <th className="p-3">National OPD Umbrella</th>
                    <th className="p-3">Region</th>
                    <th className="p-3 rounded-tr">Local OPD Affiliates</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c4c6cf]">
                  {OPD_COUNTRIES.map((c) => (
                    <tr key={c.country} className="hover:bg-[#f0f0f0]">
                      <td className="p-3 font-bold text-[#002045]">{c.country}</td>
                      <td className="p-3 font-semibold text-[#1a1c1c]">{c.opdName}</td>
                      <td className="p-3 text-[#43474e]">{c.region}</td>
                      <td className="p-3 font-bold text-[#126e0c]">{c.membersCount} Member Orgs</td>
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
