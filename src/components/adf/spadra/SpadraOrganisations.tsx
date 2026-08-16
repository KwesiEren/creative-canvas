import React, { useMemo, useState } from "react";
import { OPD_COUNTRIES } from "@/data/mockData";
import { PARTNERS } from "@/data/extraData";
import { FilterChips } from "../ui-extra";

const REGIONS = ["All", ...Array.from(new Set(OPD_COUNTRIES.map((m) => m.region)))];

export const SpadraOrganisations: React.FC = () => {
  const [region, setRegion] = useState("All");
  const [query, setQuery] = useState("");

  const members = useMemo(() => {
    const q = query.trim().toLowerCase();
    return OPD_COUNTRIES.filter((m) => {
      const matchesRegion = region === "All" || m.region === region;
      const matchesQuery =
        q === "" || m.country.toLowerCase().includes(q) || m.opdName.toLowerCase().includes(q);
      return matchesRegion && matchesQuery;
    });
  }, [region, query]);

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-bold text-[var(--s-primary)] uppercase">
          Member organisations
        </h2>
        <p className="mt-2 text-[var(--s-muted)]">
          National and regional organisations of persons with disabilities within the ADF
          federation.
        </p>

        <div className="mt-6 space-y-4 bg-[var(--s-surface)] p-6 border-2 border-[var(--s-primary)]/10">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-3 text-[var(--s-muted)]">
              search
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by country or OPD name..."
              aria-label="Search member organisations"
              className="w-full p-3 pl-10 bg-white border-2 border-[var(--s-primary)] text-sm font-bold text-[var(--s-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--s-focus)]"
            />
          </div>
          <FilterChips legend="Region" options={REGIONS} value={region} onChange={setRegion} />
        </div>

        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map((member) => (
            <div
              key={member.country}
              className="border-2 border-[var(--s-primary)] p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-bold text-[var(--s-primary)] leading-snug">{member.opdName}</h3>
                <span className="shrink-0 bg-[var(--s-primary)] text-white text-[11px] font-bold uppercase tracking-widest px-2.5 py-1">
                  {member.region}
                </span>
              </div>
              <p className="text-sm text-[var(--s-muted)]">
                <strong className="text-[var(--s-primary)]">{member.country}</strong> ·{" "}
                {member.membersCount} affiliated OPDs
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-[var(--s-primary)] uppercase">
          Partners & stakeholders
        </h2>
        <p className="mt-2 text-[var(--s-muted)]">
          Funders, implementing partners, institutional and network partners collaborating on the
          platform.
        </p>
        <div className="mt-6 grid md:grid-cols-2 gap-5">
          {PARTNERS.map((partner) => (
            <div key={partner.id} className="border-2 border-[var(--s-primary)]/25 p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-bold text-[var(--s-primary)]">{partner.name}</h3>
                <span className="shrink-0 bg-[var(--s-surface)] text-[var(--s-accent)] text-[11px] font-bold uppercase tracking-widest px-2.5 py-1">
                  {partner.type}
                </span>
              </div>
              <p className="mt-2 text-sm text-[var(--s-muted)] leading-relaxed">
                {partner.description}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-[var(--s-accent)]">
                {partner.country}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
