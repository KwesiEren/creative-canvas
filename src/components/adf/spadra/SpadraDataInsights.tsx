import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { POLICY_TRACKER, COUNTRY_PROFILES } from "@/data/extraData";
import { BarChart, FilterChips } from "../ui-extra";

const STATUS_OPTIONS = ["All", "Ratified", "Signed", "Not signed"] as const;
type StatusOption = (typeof STATUS_OPTIONS)[number];

function protocolStatus(row: (typeof POLICY_TRACKER)[number]): StatusOption {
  if (row.protocolRatified) return "Ratified";
  if (row.protocolSigned) return "Signed";
  return "Not signed";
}

export const SpadraDataInsights: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<StatusOption>("All");

  const filteredRows = POLICY_TRACKER.filter(
    (row) => statusFilter === "All" || protocolStatus(row) === statusFilter,
  );

  const deviceCoverage = COUNTRY_PROFILES.map((p) => ({
    label: p.country,
    value: p.indicators.find((i) => i.label.toLowerCase().includes("assistive"))?.value ?? 0,
  }));

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-bold text-[var(--s-primary)] uppercase">Country profiles</h2>
        <p className="mt-2 text-[var(--s-muted)] leading-relaxed">
          Open a country to explore population context, disability data indicators, treaty status
          and milestones — each page ships an accessible chart plus an equivalent data table.
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COUNTRY_PROFILES.map((profile) => (
            <Link
              key={profile.code}
              to="/spadra/countries/$code"
              params={{ code: profile.code }}
              className="group border-2 border-[var(--s-primary)] p-5 flex flex-col gap-3 hover:bg-[var(--s-surface)] transition-colors"
            >
              <span className="font-display text-3xl text-[var(--s-primary)]">
                {profile.country.toUpperCase().slice(0, 3)}
              </span>
              <div>
                <h3 className="font-bold text-[var(--s-primary)] uppercase tracking-wide">
                  {profile.country}
                </h3>
                <p className="mt-1 text-sm text-[var(--s-muted)]">{profile.region}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[var(--s-accent)] group-hover:underline">
                View profile
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="tracker-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="tracker-heading"
              className="text-2xl font-bold text-[var(--s-primary)] uppercase"
            >
              African Disability Protocol tracker
            </h2>
            <p className="mt-2 text-[var(--s-muted)]">
              CRPD ratification and progress towards signing and ratifying the African Disability
              Protocol, maintained by the SPADRA secretariat.
            </p>
          </div>
          <FilterChips
            legend="Protocol status"
            options={[...STATUS_OPTIONS]}
            value={statusFilter}
            onChange={(v) => setStatusFilter(v as StatusOption)}
          />
        </div>
        <div className="mt-6 overflow-x-auto border-2 border-[var(--s-primary)]">
          <table className="w-full border-collapse text-sm min-w-[720px]">
            <caption className="sr-only">Disability treaty ratification status by country</caption>
            <thead>
              <tr className="bg-[var(--s-primary)] text-white text-left">
                <th scope="col" className="px-4 py-3 font-bold uppercase tracking-widest text-xs">
                  Country
                </th>
                <th scope="col" className="px-4 py-3 font-bold uppercase tracking-widest text-xs">
                  CRPD
                </th>
                <th scope="col" className="px-4 py-3 font-bold uppercase tracking-widest text-xs">
                  Protocol status
                </th>
                <th scope="col" className="px-4 py-3 font-bold uppercase tracking-widest text-xs">
                  National law
                </th>
                <th scope="col" className="px-4 py-3 font-bold uppercase tracking-widest text-xs">
                  Last updated
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => {
                const status = protocolStatus(row);
                return (
                  <tr key={row.code} className="border-t border-[var(--s-primary)]/15 align-top">
                    <th scope="row" className="px-4 py-3 font-bold text-[var(--s-primary)]">
                      {row.country}
                    </th>
                    <td className="px-4 py-3">
                      <StatusPill
                        ok={row.crpdRatified}
                        label={row.crpdRatified ? "Ratified" : "Pending"}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill
                        ok={status === "Ratified"}
                        warn={status === "Signed"}
                        label={status}
                      />
                    </td>
                    <td className="px-4 py-3 text-[var(--s-muted)]">{row.nationalLaw}</td>
                    <td className="px-4 py-3 text-[var(--s-muted)]">{row.lastUpdated}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="analytics-heading">
        <h2 id="analytics-heading" className="text-2xl font-bold text-[var(--s-primary)] uppercase">
          Analytics explorer
        </h2>
        <p className="mt-2 text-[var(--s-muted)]">
          Every visual below is backed by a machine-readable data table for screen-reader users.
        </p>
        <div className="mt-6 grid lg:grid-cols-2 gap-8">
          <BarChart
            caption="Assistive device coverage by country (%)"
            unit="%"
            data={deviceCoverage}
          />
          <div className="border-2 border-[var(--s-primary)] p-6 flex flex-col justify-center gap-4">
            <span className="material-symbols-outlined text-4xl text-[var(--s-accent)]">
              monitoring
            </span>
            <h3 className="text-lg font-bold text-[var(--s-primary)] uppercase">About the data</h3>
            <p className="text-sm text-[var(--s-muted)] leading-relaxed">
              Indicators combine national statistical office figures, WHO-WB estimates and OPD
              member verification. Figures are illustrative for this prototype and are reviewed each
              quarter by the SPADRA data working group.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const StatusPill: React.FC<{ ok?: boolean; warn?: boolean; label: string }> = ({
  ok,
  warn,
  label,
}) => (
  <span
    className={`inline-block px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest ${
      ok
        ? "bg-[#dcedd8] text-[#1f5c3d]"
        : warn
          ? "bg-[#fdf3d0] text-[#8a6d00]"
          : "bg-[#f3e1e1] text-[#8a2b2b]"
    }`}
  >
    {label}
  </span>
);
