import React, { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { OPD_COUNTRIES } from "@/data/mockData";
import { OpdCountry } from "@/types";
import { PageHero, SectionHeading, btnPrimary, btnGhost, btnGhostLight } from "./ui";
import { FilterChips, EmptyState } from "./ui-extra";
import { assetUrl } from "@/lib/assetUrl";

const HERO_IMAGE = assetUrl("/images/adf-event-2.jpg");

export const MembershipScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState<string>("All");

  const regionOptions = useMemo(() => {
    const regions = Array.from(new Set(OPD_COUNTRIES.map((m) => m.region)));
    return ["All", ...regions];
  }, []);

  const filteredMembers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return OPD_COUNTRIES.filter((m) => {
      const matchesRegion = activeRegion === "All" || m.region === activeRegion;
      const matchesQuery =
        q === "" ||
        m.country.toLowerCase().includes(q) ||
        m.opdName.toLowerCase().includes(q) ||
        m.region.toLowerCase().includes(q);
      return matchesRegion && matchesQuery;
    });
  }, [activeRegion, searchQuery]);

  const totalMemberships = OPD_COUNTRIES.reduce((sum, m) => sum + m.membersCount, 0);

  return (
    <div className="animate-fade-in">
      <PageHero
        eyebrow="ADF Membership"
        title="Member OPD Directory"
        intro="Search national, regional and pan-African organisations of persons with disabilities that make up the ADF federation."
        image={HERO_IMAGE}
        imageAlt="People collaborating around a table at a civil society meeting"
      />

      <section className="max-w-[1280px] mx-auto px-4 md:px-10 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { value: `${OPD_COUNTRIES.length}`, label: "Member federations" },
            { value: `${totalMemberships}`, label: "Affiliated OPDs" },
            { value: `${regionOptions.length - 1}`, label: "Regions represented" },
          ].map((stat) => (
            <div key={stat.label} className="border-2 border-[#0f1b3d] bg-[#e8edf3] p-6">
              <span className="block font-display text-4xl leading-none text-[#0f1b3d]">
                {stat.value}
              </span>
              <span className="mt-2 block text-xs font-bold uppercase tracking-widest text-[#245a86]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div>
          <SectionHeading
            eyebrow="Member Directory"
            title="Find a member organisation"
            intro="Filter by region or search by country or organisation name."
          />

          <div className="space-y-4 bg-[#e8edf3] p-6 border-2 border-[#0f1b3d]/10">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3 text-[#5b6b85]">
                search
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by country or OPD name..."
                aria-label="Search member organisations"
                className="w-full p-3 pl-10 bg-white border-2 border-[#0f1b3d] rounded-none text-sm font-bold text-[#0f1b3d] focus:outline-none focus:ring-2 focus:ring-[#245a86]"
              />
            </div>
            <FilterChips
              legend="Region"
              options={regionOptions}
              value={activeRegion}
              onChange={setActiveRegion}
            />
          </div>

          {filteredMembers.length === 0 ? (
            <EmptyState message="No member organisations match your search. Try clearing the filters." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <MemberCard key={member.country} member={member} />
              ))}
            </div>
          )}
        </div>

        <div className="bg-[#0f1b3d] text-white p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a8c6e4]">
            Join the continental voice
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl uppercase">How to become a member</h2>
          <ol className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Confirm eligibility",
                body: "Membership is open to democratic national federations of persons with disabilities, sub-regional associations and specialized pan-African networks.",
              },
              {
                step: "02",
                title: "Submit your dossier",
                body: "Send your constitution, proof of registration and governance documents to the ADF Executive Secretariat in Addis Ababa.",
              },
              {
                step: "03",
                title: "Credential verification",
                body: "The secretariat verifies your dossier and the Executive Council approves full voting membership.",
              },
            ].map((item) => (
              <li key={item.step} className="border-2 border-white/20 p-6">
                <span className="block font-display text-3xl text-[#f5b301]">{item.step}</span>
                <h3 className="mt-3 text-lg font-bold uppercase">{item.title}</h3>
                <p className="mt-2 text-sm text-[#dbe6f2] leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#f5b301] text-[#0f1b3d] font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-[#ffc933] transition-colors"
            >
              Enquire about membership
            </Link>
            <Link to="/about" className={btnGhostLight}>
              About ADF
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const MemberCard: React.FC<{ member: OpdCountry }> = ({ member }) => (
  <article className="bg-white border-2 border-[#0f1b3d] p-6 flex flex-col gap-4">
    <div className="flex items-start justify-between gap-3">
      <h3 className="text-lg font-extrabold text-[#0f1b3d] leading-snug">{member.opdName}</h3>
      <span className="shrink-0 bg-[#0f1b3d] text-white text-[11px] font-bold uppercase tracking-widest px-2.5 py-1">
        {member.region}
      </span>
    </div>
    <dl className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <dt className="text-[11px] font-bold uppercase tracking-widest text-[#245a86]">Country</dt>
        <dd className="mt-1 font-bold text-[#0f1b3d]">{member.country}</dd>
      </div>
      <div>
        <dt className="text-[11px] font-bold uppercase tracking-widest text-[#245a86]">
          Affiliated OPDs
        </dt>
        <dd className="mt-1 font-bold text-[#0f1b3d]">{member.membersCount}</dd>
      </div>
    </dl>
    <div className="mt-auto pt-4 border-t border-[#0f1b3d]/15 flex items-center gap-2 text-sm font-bold text-[#245a86]">
      <span className="material-symbols-outlined text-base">public</span>
      <span>{member.region} hub</span>
    </div>
  </article>
);
