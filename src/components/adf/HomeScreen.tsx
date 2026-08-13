import React, { useState } from 'react';
import { NEWS_DATA } from '@/data/mockData';
import { NewsItem, NavTab } from '@/types';

interface Props {
  onNavigate: (tab: NavTab) => void;
  onOpenTakeAction: () => void;
  onOpenDonate: () => void;
}

export const HomeScreen: React.FC<Props> = ({ onNavigate, onOpenTakeAction, onOpenDonate }) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <div className="space-y-16 pb-12 animate-fade-in">
      {/* Hero Section */}
      <section className="w-full px-4 md:px-10 py-8 max-w-[1280px] mx-auto bg-white dark:bg-[#0a1128]/95 rounded-none border border-[#0f1b3d]/15 shadow-none">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
          <span className="inline-block bg-[#1e3a5f] text-[#b7cbe0] font-bold text-sm px-4 py-1.5 rounded-full border border-[#dbe6f2]">
            About ADF
          </span>
          <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#0f1b3d] dark:text-[#dbe6f2] leading-tight tracking-tight">
            Advancing the Rights of Persons with Disabilities in Africa.
          </h1>
          <p className="text-lg md:text-xl text-[#33415c] dark:text-[#c4c6cf] max-w-2xl leading-relaxed font-normal">
            A continental forum unifying and amplifying the voice of persons with disabilities across Africa.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={onOpenTakeAction}
              className="bg-[#0f1b3d] hover:bg-[#1e3a5f] text-white font-bold px-8 py-3.5 rounded transition-colors focus-ring flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>See Our Impact</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
            <button
              onClick={onOpenDonate}
              className="bg-[#245a86] hover:bg-[#0f1b3d] text-white font-bold px-8 py-3.5 rounded transition-colors focus-ring cursor-pointer shadow-md"
            >
              Donate
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-10 rounded-none overflow-hidden border border-[#c4c6cf] shadow-md w-full relative h-[380px] md:h-[540px]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuByj2Ml4c7nvfBge8H6Ux0mK8K1M2TK9Y7yWq32uM43yHwryJSWELU31LYXw4pOtZ6O1nbK9RJjyfbs-7P_dTMwIGUFAczcqIKVSA1Hnerc8LbJSPsQ4moGc6Qmbk8ITgWSikWHdMI5FiTPTzErUrsRKMNjQlVPQnNG9Qp0IW2NNuWaFAzxYd4VISnXM2eF3QKtAAs08--ZjkrUBx1cNWPBfHR0v1pt1Jn_o-BpPUpI2I9SwA8iCIaC"
            alt="ADF community engagement workshop with diverse individuals including persons with disabilities"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Strategic Focus Areas (Bento Grid) */}
      <section className="px-4 md:px-10 max-w-[1280px] mx-auto w-full bg-white dark:bg-[#0a1128]/95 rounded-none p-6 md:p-8 shadow-none border border-[#0f1b3d]/15">
        <div className="flex flex-col gap-2 mb-8">
          <h2 className="text-3xl font-bold text-[#0f1b3d] dark:text-white border-b-2 border-[#245a86] pb-2 w-max">
            Strategic Focus Areas
          </h2>
          <p className="text-base md:text-lg text-[#33415c] dark:text-[#c4c6cf] max-w-2xl">
            Our advocacy efforts are targeted towards systemic change, ensuring the rights enshrined in international frameworks are realized on the ground across the continent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Protocol Ratification */}
          <div className="md:col-span-8 bg-[#f4f7fa] border border-[#5b6b85] rounded-none p-6 flex flex-col justify-between hover:border-[#0f1b3d] transition-all">
            <div className="space-y-4 mb-6">
              <div className="w-12 h-12 bg-[#1e3a5f] text-[#b7cbe0] rounded-full flex items-center justify-center border border-[#c4c6cf] shadow-sm">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0f1b3d]">Ratification of the African Disability Protocol</h3>
              <p className="text-base text-[#0a1128] leading-relaxed">
                We lead the continental push for member states to sign, ratify, and domesticate the African Disability Protocol. This vital instrument addresses the unique challenges faced by Africans with disabilities, including harmful practices, and establishes a clear legal standard for inclusion.
              </p>
            </div>
            <button
              onClick={() => onNavigate('resources')}
              className="inline-flex items-center gap-2 font-bold text-[#0f1b3d] hover:text-[#245a86] group w-max cursor-pointer text-base"
            >
              <span>Read Policy Brief</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>

          {/* CRPD Monitoring */}
          <div className="md:col-span-4 bg-[#e8edf3] border border-[#5b6b85] rounded-none p-6 flex flex-col justify-between hover:border-[#0f1b3d] transition-all">
            <div className="space-y-4 mb-6">
              <div className="w-12 h-12 bg-[#a8c6e4] text-[#245a86] rounded-full flex items-center justify-center border border-[#c4c6cf] shadow-sm">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>troubleshoot</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0f1b3d]">Monitoring CRPD Implementation</h3>
              <p className="text-base text-[#0a1128] leading-relaxed">
                Empowering Organizations of Persons with Disabilities (OPDs) to collect robust data and hold governments accountable to the UN Convention on the Rights of Persons with Disabilities.
              </p>
            </div>
            <button
              onClick={() => onNavigate('resources')}
              className="inline-flex items-center gap-2 font-bold text-[#0f1b3d] hover:text-[#245a86] group w-max cursor-pointer text-base"
            >
              <span>View Reports</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>

          {/* Women & Youth */}
          <div className="md:col-span-12 bg-[#0f1b3d] text-white border border-[#5b6b85] rounded-none p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center shadow-md">
            <div className="w-full md:w-1/3 h-52 md:h-64 rounded border border-[#c4c6cf] relative overflow-hidden bg-[#ffffff]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYZuIyX9Ho-ibqwzFt22KG1IYNDjtiXoApWd9YPpskMnoVcmLQqjWY5kwqBO9GGAPU2FSJ5ey2nO8utKrDW2WLTkzS5FQ21RGOyYYpOH0JhJ6GMTL5Hh_EUp81uixqO2v0lZx3T64xPoOG9zDAcs7_2TVgEsAgzakgKxMJOJAmb9Gx6ctoRJjhFlCNAz_kq2lMjPWRKNQbaN0tLNf6uB872UU_7RJJ-o0jNyfaFf25pUvb5owHhkR1"
                alt="Young African woman with a disability speaking at youth leadership summit"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#a8c6e4]">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>diversity_1</span>
                <span className="text-xs font-bold uppercase tracking-wider">Intersectional Advocacy</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">Women and Youth with Disabilities</h3>
              <p className="text-base text-[#cfe0f0] leading-relaxed max-w-2xl">
                Ensuring that the specific needs and voices of women and youth with disabilities are central to all policy discussions. We tackle intersectional discrimination, promote leadership development, and advocate for inclusive access to education, healthcare, and economic opportunities.
              </p>
              <button
                onClick={onOpenTakeAction}
                className="mt-2 inline-flex items-center gap-2 font-bold text-[#a8c6e4] hover:text-white border-2 border-[#a8c6e4] px-5 py-2.5 rounded transition-colors w-max cursor-pointer"
              >
                <span>Explore Youth Initiatives</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News & Updates */}
      <section className="w-full px-4 md:px-10 py-10 max-w-[1280px] mx-auto bg-white dark:bg-[#0a1128]/95 rounded-none border border-[#0f1b3d]/15 shadow-none">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-[#0f1b3d]">Latest News & Updates</h2>
          <button
            onClick={() => onNavigate('news')}
            className="text-[#245a86] font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS_DATA.map((item) => (
            <article key={item.id} className="bg-white rounded-none border border-[#c4c6cf] overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-[#e8edf3] relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-[#0f1b3d] text-white text-xs font-bold px-3 py-1 rounded">
                  {item.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <time className="text-xs font-bold text-[#5b6b85] mb-2">{item.date}</time>
                <h3 className="text-xl font-bold text-[#0a1128] mb-3 leading-snug">{item.title}</h3>
                <p className="text-sm text-[#33415c] mb-4 line-clamp-3 leading-relaxed">{item.summary}</p>
                <div className="mt-auto pt-2">
                  <button
                    onClick={() => setSelectedNews(item)}
                    className="text-[#0f1b3d] font-bold flex items-center gap-2 hover:text-[#245a86] cursor-pointer text-sm"
                  >
                    <span>Read More</span>
                    <span className="material-symbols-outlined text-base">arrow_right_alt</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Influence Framework */}
      <section className="bg-white dark:bg-[#0a1128]/95 px-6 md:px-10 py-10 rounded-none border border-[#0f1b3d]/15 max-w-[1280px] mx-auto shadow-none">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row gap-10 items-start">
          <div className="w-full md:w-1/3 space-y-3">
            <h2 className="text-3xl font-bold text-[#0f1b3d]">Our Influence Framework</h2>
            <p className="text-base text-[#33415c] leading-relaxed">How we drive systemic change across the continent.</p>
          </div>
          <div className="w-full md:2/3 space-y-6">
            <div className="border-l-4 border-[#245a86] pl-6 py-1">
              <h3 className="text-xl font-bold text-[#0f1b3d] mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#245a86]">account_balance</span>
                <span>Legislative Advocacy</span>
              </h3>
              <p className="text-base text-[#0a1128] leading-relaxed">
                We provide technical assistance to national parliaments to draft, review, and amend legislation, ensuring alignment with international disability rights standards and removing discriminatory laws.
              </p>
            </div>
            <div className="border-l-4 border-[#245a86] pl-6 py-1">
              <h3 className="text-xl font-bold text-[#0f1b3d] mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#245a86]">public</span>
                <span>Policy Influence at the African Union</span>
              </h3>
              <p className="text-base text-[#0a1128] leading-relaxed">
                As a recognized partner, we actively participate in AU summits and technical committees, embedding disability inclusion into broad continental strategies like Agenda 2063 and peacebuilding initiatives.
              </p>
            </div>
            <div className="border-l-4 border-[#245a86] pl-6 py-1">
              <h3 className="text-xl font-bold text-[#0f1b3d] mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#245a86]">groups</span>
                <span>Community-Led Monitoring</span>
              </h3>
              <p className="text-base text-[#0a1128] leading-relaxed">
                We build the capacity of local OPDs to utilize human rights mechanisms, submit shadow reports, and conduct grassroots monitoring to ensure policies translate into tangible improvements in daily life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ADF in Action Gallery */}
      <section className="w-full px-4 md:px-10 py-8 max-w-[1280px] mx-auto bg-white dark:bg-[#0a1128]/95 rounded-none border border-[#0f1b3d]/15 shadow-none">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#0f1b3d]">ADF in Action</h2>
          <p className="text-lg text-[#33415c] max-w-2xl mx-auto mt-1">
            Glimpses of our ongoing work to promote inclusive societies across Africa.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[580px]">
          <div className="md:col-span-2 md:row-span-2 rounded-none overflow-hidden relative group shadow">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-TF4PLY7MMafYMkCWbBgh1J3ONP77VnC89sZVJ6HwEs0cI2xmht_yAtNnBdEJo1LA5OTwoxubR9PSIDoiDQwZJj6hq2j4Zww_j8kn0Sa4gKYOYzubxLe_BtFE5bffeQuY_IeWk4t71w0DZIXipA3YJ_-H48naM5PaGlfXGfhkt4Fo0RQCbB4SYR5Y22sGJqE6puTp85biQyaH4CkUML-vxyV6IRkRDphth0MslSYM0ca1qcZ3MXsm"
              alt="Community outreach programs"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
              <span className="text-white font-bold text-lg">Community Outreach Programs</span>
            </div>
          </div>
          <div className="md:col-span-2 rounded-none overflow-hidden relative group h-48 md:h-auto shadow">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_CtxTpX8bjkNCvnP84YZFaqIVCFIMDFmDSjuiK7y4wKO4_e65nN08GfHCxK2O2q5utGDEe3g1oNiVl6tHiif4867zP7d_t9a1LSSKXJFWRIp047-8ROC1Zh92E4X_lLvFWcr-Ugq7B_RIj8Sfhs5Gv-ERrQDxuHPsZOHMd3YD0zu_XZ59sOqXbJcgTCblRY7vf1Pgr6IfjsLGIg25C1MEBIh_NuQjePsYAYksk0OcI-t5sv2VIv23"
              alt="Policy & Governance meetings"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
              <span className="text-white font-bold text-base">Policy & Governance Meetings</span>
            </div>
          </div>
          <div className="rounded-none overflow-hidden relative group h-48 md:h-auto shadow">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBB8piUgO9VcAucUb923lDZzqECyZoENnosnNZZwz9bSgAgAPttpMpulUEw6W8dx6hks2jKwNHTjIMQeGM5yQTteGctPoSDDdb2sbhy8-T4swXYZblfgFVKR7cSYyjJ3Zt1R4xA_wgXLjr0qHm2XIfzCB_rGntcJ3i6e48_69_sZXYJpGTjn2OZ10zX63ZKeqvSLbFEHw2RT1mDkJBDo0f1q3XIcLHYImGk0bGJG6H0Wyxu3Ya8UwH"
              alt="Tech accessibility keyboard"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
              <span className="text-white font-bold text-sm">Tech Accessibility</span>
            </div>
          </div>
          <div className="rounded-none overflow-hidden relative group h-48 md:h-auto shadow">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZLv0HZ5ykg-aMxf67ABSIsvBPVKK0OWMt2eNRqiIvjdIOF7AqqroW0l3EtXL4HrCRtQVv59T8RhdIZy-G_V9ydruOW7p-i-sbF1At554wrXDs-z2sLzYK-aWPo_TP9qWbWWMpo0jUlWJy51KtRb7UmylmMwZdkpFzgeyebFUj3wu27b569qktBw1RnUU8b9Vnlv8Rux_CZFt4yM3gTmZKwEQkDYKAB33xrsb_8TPxCW6yQo8Wzmr1"
              alt="Public advocacy speech"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
              <span className="text-white font-bold text-sm">Public Advocacy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="px-4 md:px-10 max-w-[1280px] mx-auto w-full">
        <div className="bg-white dark:bg-[#0a1128]/95 border border-[#0f1b3d]/15 rounded-none overflow-hidden flex flex-col md:flex-row shadow-none">
          <div className="w-full md:w-1/2 relative min-h-[320px]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDP8_ZulRnJ2SL2bdrSYv-pqaZnHa-gQVASe20G4fphgygggTbqo7HXlYk8Xl2rfMZAhNcxG7QzYUdHzRbed25M4Yuc__M-BAckrFMAF-FHZC94acOS7lMsS257U0rbgbVSzay3V-vfXbI5iIVhwb6JP1-TP9sPFj492dw89b-lSZUbLF0FyugGooaXd8Qo_D2PkL1I4yJPHcbAr-AZuxU3kp_jmQTXKBKW8AnMAj5jx5o4fTHq-xt"
              alt="Government official signing the landmark inclusive education act with disability advocates standing behind"
              className="object-cover w-full h-full absolute inset-0"
            />
          </div>
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center space-y-4">
            <span className="text-xs font-bold text-[#245a86] uppercase tracking-wider">
              Impact Case Study
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0f1b3d]">
              Landmark Inclusive Education Act Passed
            </h2>
            <p className="text-base text-[#0a1128] leading-relaxed">
              Following a sustained three-year advocacy campaign led by ADF and national partners, Member State X successfully passed the Inclusive Education Act of 2023. This legislation mandates reasonable accommodations in all public schools and allocates dedicated national budget lines for accessible learning materials, directly impacting over 200,000 children with disabilities.
            </p>
            <button
              onClick={() => onNavigate('resources')}
              className="inline-flex items-center justify-center px-6 py-3 bg-[#0f1b3d] text-white font-bold rounded hover:bg-[#1e3a5f] transition-colors w-max shadow-sm cursor-pointer"
            >
              Read Full Case Study
            </button>
          </div>
        </div>
      </section>

      {/* Strategic Partners */}
      <section className="w-full bg-white dark:bg-[#0a1128]/95 py-8 rounded-none max-w-[1280px] mx-auto border border-[#0f1b3d]/15 shadow-none">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 text-center">
          <h2 className="text-sm font-bold text-[#33415c] mb-6 uppercase tracking-wider">
            Our Strategic Partners
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80">
            <div className="flex items-center gap-2 text-2xl font-bold text-[#0a1128]">
              <span className="material-symbols-outlined text-4xl">public</span> SIDA
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold text-[#0a1128]">
              <span className="material-symbols-outlined text-4xl">language</span> AU
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold text-[#0a1128]">
              <span className="material-symbols-outlined text-4xl">groups</span> UN
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold text-[#0a1128]">
              <span className="material-symbols-outlined text-4xl">volunteer_activism</span> Partner Org
            </div>
          </div>
        </div>
      </section>

      {/* News Item Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-none max-w-2xl w-full p-6 border-2 border-[#0f1b3d] shadow-lg relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4 border-b border-[#c4c6cf] pb-3">
              <div>
                <span className="text-xs font-bold bg-[#0f1b3d] text-white px-2 py-0.5 rounded">
                  {selectedNews.category}
                </span>
                <time className="block text-xs text-[#5b6b85] mt-1">{selectedNews.date}</time>
                <h2 className="text-2xl font-bold text-[#0f1b3d] mt-1">{selectedNews.title}</h2>
              </div>
              <button
                onClick={() => setSelectedNews(null)}
                className="p-1 text-[#33415c] hover:bg-[#e8edf3] rounded-full"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-64 object-cover rounded mb-4" />
            <div className="text-base text-[#0a1128] leading-relaxed space-y-3">
              <p className="font-bold">{selectedNews.summary}</p>
              <p>{selectedNews.content}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#c4c6cf] flex justify-end">
              <button
                onClick={() => setSelectedNews(null)}
                className="px-6 py-2 bg-[#0f1b3d] text-white font-bold rounded"
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
