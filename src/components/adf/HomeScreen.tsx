import React, { useState } from "react";
import { NEWS_DATA, PROGRAMMES_DATA } from "@/data/mockData";
import { NewsItem, NavTab, ProgrammeId } from "@/types";
import {
  PageHero,
  SectionHeading,
  StatBand,
  btnDonate,
  btnGhostLight,
  btnGhost,
  btnPrimary,
} from "./ui";

interface Props {
  onNavigate: (tab: NavTab, extra?: { programmeId?: ProgrammeId }) => void;
  onOpenTakeAction: () => void;
  onOpenDonate: () => void;
}

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuByj2Ml4c7nvfBge8H6Ux0mK8K1M2TK9Y7yWq32uM43yHwryJSWELU31LYXw4pOtZ6O1nbK9RJjyfbs-7P_dTMwIGUFAczcqIKVSA1Hnerc8LbJSPsQ4moGc6Qmbk8ITgWSikWHdMI5FiTPTzErUrsRKMNjQlVPQnNG9Qp0IW2NNuWaFAzxYd4VISnXM2eF3QKtAAs08--ZjkrUBx1cNWPBfHR0v1pt1Jn_o-BpPUpI2I9SwA8iCIaC";

const LEAD_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCYZuIyX9Ho-ibqwzFt22KG1IYNDjtiXoApWd9YPpskMnoVcmLQqjWY5kwqBO9GGAPU2FSJ5ey2nO8utKrDW2WLTkzS5FQ21RGOyYYpOH0JhJ6GMTL5Hh_EUp81uixqO2v0lZx3T64xPoOG9zDAcs7_2TVgEsAgzakgKxMJOJAmb9Gx6ctoRJjhFlCNAz_kq2lMjPWRKNQbaN0tLNf6uB872UU_7RJJ-o0jNyfaFf25pUvb5owHhkR1";

const CASE_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCDP8_ZulRnJ2SL2bdrSYv-pqaZnHa-gQVASe20G4fphgygggTbqo7HXlYk8Xl2rfMZAhNcxG7QzYUdHzRbed25M4Yuc__M-BAckrFMAF-FHZC94acOS7lMsS257U0rbgbVSzay3V-vfXbI5iIVhwb6JP1-TP9sPFj492dw89b-lSZUbLF0FyugGooaXd8Qo_D2PkL1I4yJPHcbAr-AZuxU3kp_jmQTXKBKW8AnMAj5jx5o4fTHq-xt";

const FOCUS_AREAS = [
  {
    number: "01",
    title: "Ratification of the African Disability Protocol",
    body: "We lead the continental push for member states to sign, ratify and domesticate the African Disability Protocol, establishing a clear legal standard for inclusion.",
    action: "Read policy brief",
    tab: "resources" as NavTab,
  },
  {
    number: "02",
    title: "Monitoring CRPD Implementation",
    body: "We equip Organizations of Persons with Disabilities to collect robust, disaggregated data and hold governments accountable to the UN Convention.",
    action: "View reports",
    tab: "resources" as NavTab,
  },
  {
    number: "03",
    title: "Women and Youth with Disabilities",
    body: "We tackle intersectional discrimination and put the voices of women and young people with disabilities at the centre of every policy discussion.",
    action: "Explore programmes",
    tab: "programmes" as NavTab,
  },
];

export const HomeScreen: React.FC<Props> = ({ onNavigate, onOpenTakeAction, onOpenDonate }) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const featured = NEWS_DATA[0];
  const rest = NEWS_DATA.slice(1, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <PageHero
        tall
        eyebrow="African Disability Forum"
        title="Nothing about us without us."
        intro="A continental federation of Organizations of Persons with Disabilities advancing rights, influencing policy and holding governments to account across Africa."
        image={HERO_IMAGE}
        imageAlt="Members of African Organizations of Persons with Disabilities meeting around a conference table"
      >
        <button onClick={onOpenDonate} className={btnDonate}>
          Donate now
        </button>
        <button onClick={() => onNavigate("programmes")} className={btnGhostLight}>
          Explore our work
        </button>
      </PageHero>

      {/* Lead story */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-10 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <img
            src={LEAD_IMAGE}
            alt="Young African woman with a disability speaking at a youth leadership summit"
            className="w-full aspect-4/5 object-cover border border-[#0f1b3d]/15"
            loading="lazy"
          />
        </div>
        <div className="lg:col-span-7">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#245a86]">Who we are</p>
          <h2 className="mt-4 text-3xl md:text-5xl uppercase text-[#0f1b3d]">
            One continental voice for 80 million people
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[#33415c]">
            The African Disability Forum brings national and regional Organizations of Persons with
            Disabilities into a single, accountable movement. We convene members, produce the
            evidence that policy makers cannot ignore, and represent the disability community before
            the African Union, the United Nations and national parliaments.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[#33415c]">
            Our work is led by persons with disabilities. Every programme, publication and platform
            we build — including this website — is designed to be usable by everyone.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button onClick={() => onNavigate("about")} className={btnPrimary}>
              About ADF
            </button>
            <button onClick={onOpenTakeAction} className={btnGhost}>
              Take action
            </button>
          </div>
        </div>
      </section>

      {/* Strategic focus areas */}
      <section className="bg-[#e8edf3]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-20">
          <SectionHeading
            eyebrow="The roadmap"
            title="Strategic focus areas"
            intro="Our advocacy targets systemic change, so the rights enshrined in international frameworks are realised on the ground."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#0f1b3d]/20">
            {FOCUS_AREAS.map((area) => (
              <article
                key={area.number}
                className="border-b border-r border-[#0f1b3d]/20 bg-white p-8 flex flex-col"
              >
                <span className="font-display text-5xl leading-none text-[#b7cbe0]">
                  {area.number}
                </span>
                <h3 className="mt-6 text-2xl uppercase text-[#0f1b3d]">{area.title}</h3>
                <p className="mt-4 text-[#33415c] leading-relaxed flex-1">{area.body}</p>
                <button
                  onClick={() => onNavigate(area.tab)}
                  className="mt-8 self-start text-sm font-bold uppercase tracking-widest text-[#0f1b3d] border-b-2 border-[#245a86] pb-1 hover:text-[#245a86] focus-ring cursor-pointer"
                >
                  {area.action}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Impact band */}
      <StatBand
        caption="Our reach across the continent"
        stats={[
          { value: "60+", label: "Member OPDs" },
          { value: "38", label: "Countries engaged" },
          { value: "420+", label: "OPD leaders trained" },
          { value: "18", label: "Policy papers adopted" },
        ]}
      />

      {/* Latest news */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-10 py-20">
        <SectionHeading
          eyebrow="Newsroom"
          title="Latest from the movement"
          action={
            <button
              onClick={() => onNavigate("news")}
              className="text-sm font-bold uppercase tracking-widest text-[#0f1b3d] border-b-2 border-[#0f1b3d] pb-1 hover:text-[#245a86] hover:border-[#245a86] focus-ring cursor-pointer"
            >
              All news
            </button>
          }
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {featured && (
            <article className="lg:col-span-7">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-[320px] md:h-[420px] object-cover border border-[#0f1b3d]/15"
                loading="lazy"
              />
              <div className="mt-6 flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
                <span className="bg-[#0f1b3d] text-white px-3 py-1">{featured.category}</span>
                <time dateTime={featured.datetime} className="text-[#5b6b85]">
                  {featured.date}
                </time>
              </div>
              <h3 className="mt-4 text-2xl md:text-3xl uppercase text-[#0f1b3d]">
                {featured.title}
              </h3>
              <p className="mt-4 text-lg text-[#33415c] leading-relaxed">{featured.summary}</p>
              <button
                onClick={() => setSelectedNews(featured)}
                className="mt-6 text-sm font-bold uppercase tracking-widest text-[#0f1b3d] border-b-2 border-[#245a86] pb-1 hover:text-[#245a86] focus-ring cursor-pointer"
              >
                Read full story
              </button>
            </article>
          )}
          <div className="lg:col-span-5 flex flex-col divide-y divide-[#0f1b3d]/20 border-t border-[#0f1b3d]/20">
            {rest.map((item) => (
              <article key={item.id} className="py-8 flex gap-5">
                <img
                  src={item.image}
                  alt=""
                  className="w-28 h-28 object-cover shrink-0 border border-[#0f1b3d]/15"
                  loading="lazy"
                />
                <div>
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
                    <span className="text-[#245a86]">{item.category}</span>
                    <time dateTime={item.datetime} className="text-[#5b6b85]">
                      {item.date}
                    </time>
                  </div>
                  <h3 className="mt-2 text-lg uppercase text-[#0f1b3d] leading-tight">
                    {item.title}
                  </h3>
                  <button
                    onClick={() => setSelectedNews(item)}
                    className="mt-3 text-xs font-bold uppercase tracking-widest text-[#0f1b3d] border-b-2 border-[#245a86] pb-0.5 hover:text-[#245a86] focus-ring cursor-pointer"
                  >
                    Read story
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Programmes strip */}
      <section className="bg-[#e8edf3]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-20">
          <SectionHeading
            eyebrow="Programmes"
            title="Where the work happens"
            action={
              <button
                onClick={() => onNavigate("programmes")}
                className="text-sm font-bold uppercase tracking-widest text-[#0f1b3d] border-b-2 border-[#0f1b3d] pb-1 hover:text-[#245a86] hover:border-[#245a86] focus-ring cursor-pointer"
              >
                All programmes
              </button>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {PROGRAMMES_DATA.slice(0, 4).map((prog) => (
              <article key={prog.id} className="bg-white border border-[#0f1b3d]/15 flex flex-col">
                <img src={prog.image} alt="" className="h-40 w-full object-cover" loading="lazy" />
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#245a86]">
                    {prog.acronym}
                  </span>
                  <h3 className="mt-3 text-lg uppercase text-[#0f1b3d] leading-tight">
                    {prog.name}
                  </h3>
                  <p className="mt-3 text-sm text-[#33415c] leading-relaxed flex-1">
                    {prog.tagline}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SPADRA portal */}
      <section className="bg-[#0f1b3d] text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f5b301]">
              SPADRA Portal
            </p>
            <h2 className="mt-3 text-2xl md:text-4xl uppercase leading-tight">
              Disability data, evidence and stakeholders in one place
            </h2>
            <p className="mt-4 text-[#dbe6f2] leading-relaxed">
              Explore country profiles, the African Disability Protocol tracker, research and a
              resources repository — then create a free account to build your saved list and
              personal dashboard.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate("spadra")}
              className="inline-flex items-center justify-center gap-2 bg-[#f5b301] text-[#0f1b3d] font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-[#ffc933] transition-colors cursor-pointer"
            >
              Enter the SPADRA portal
            </button>
            <button
              onClick={() => onNavigate("programmes", { programmeId: "spadra" })}
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-white hover:text-[#0f1b3d] transition-colors cursor-pointer"
            >
              About the SPADRA programme
            </button>
          </div>
        </div>
      </section>

      {/* Case study */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-[#0f1b3d]/15">
          <img
            src={CASE_IMAGE}
            alt="Government official signing the landmark inclusive education act with disability advocates standing behind"
            className="w-full h-full min-h-[320px] object-cover"
            loading="lazy"
          />
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#245a86]">
              Impact case study
            </p>
            <h2 className="mt-4 text-2xl md:text-4xl uppercase text-[#0f1b3d]">
              Landmark inclusive education act passed
            </h2>
            <p className="mt-6 text-lg text-[#33415c] leading-relaxed">
              After a three-year advocacy campaign led by ADF and national partners, the Inclusive
              Education Act mandates reasonable accommodations in all public schools and allocates
              dedicated budget lines for accessible learning materials — reaching over 200,000
              children with disabilities.
            </p>
            <button
              onClick={() => onNavigate("resources")}
              className={`${btnPrimary} mt-8 self-start`}
            >
              Read the case study
            </button>
          </div>
        </div>
      </section>

      {/* Get involved */}
      <section className="bg-[#0f1b3d] text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-20">
          <SectionHeading
            light
            eyebrow="Get involved"
            title="Your support changes what is possible"
            intro="Join as a member organisation, partner with us on programmes, or fund the advocacy that moves national law."
          />
          <div className="flex flex-wrap gap-4">
            <button onClick={onOpenDonate} className={btnDonate}>
              Donate now
            </button>
            <button onClick={onOpenTakeAction} className={btnGhostLight}>
              Take action
            </button>
            <button onClick={() => onNavigate("contact")} className={btnGhostLight}>
              Contact the secretariat
            </button>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-10 py-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#5b6b85] mb-8">
          Strategic partners
        </p>
        <div className="flex flex-wrap items-center gap-10 md:gap-16">
          {["SIDA", "African Union", "United Nations", "Mastercard Foundation"].map((p) => (
            <span key={p} className="font-display text-xl md:text-2xl uppercase text-[#1e3a5f]">
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* News detail modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a1128]/80 p-4">
          <div className="bg-white max-w-2xl w-full p-6 border-2 border-[#0f1b3d] relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start gap-4 mb-4 border-b border-[#0f1b3d]/20 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest bg-[#0f1b3d] text-white px-2 py-1">
                  {selectedNews.category}
                </span>
                <time className="block text-xs text-[#5b6b85] mt-2">{selectedNews.date}</time>
                <h2 className="text-2xl uppercase text-[#0f1b3d] mt-2">{selectedNews.title}</h2>
              </div>
              <button
                onClick={() => setSelectedNews(null)}
                aria-label="Close article"
                className="p-1 text-[#33415c] hover:bg-[#e8edf3] focus-ring cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <img src={selectedNews.image} alt="" className="w-full h-64 object-cover mb-4" />
            <div className="text-base text-[#0a1128] leading-relaxed space-y-3">
              <p className="font-bold">{selectedNews.summary}</p>
              <p>{selectedNews.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
