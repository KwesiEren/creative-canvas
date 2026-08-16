import React from "react";
import { Link } from "@tanstack/react-router";
import { COUNTRY_PROFILES } from "@/data/extraData";
import { findByCustomSlug } from "@/lib/slug";
import { Breadcrumbs, BarChart, MetaRow, EmptyState } from "../ui-extra";
import { SectionHeading } from "../ui";

interface Props {
  code: string;
}

export const CountryProfileScreen: React.FC<Props> = ({ code }) => {
  const profile = findByCustomSlug(COUNTRY_PROFILES, code, (p) => p.code);

  if (!profile) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-20">
        <EmptyState message="Country profile not found. The country may not yet be covered by the SPADRA data programme." />
        <div className="mt-8 text-center">
          <Link
            to="/spadra"
            className="inline-flex items-center justify-center gap-2 border-2 border-[var(--s-primary)] text-[var(--s-primary)] font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-[var(--s-primary)] hover:text-white transition-colors"
          >
            Back to the SPADRA portal
          </Link>
        </div>
      </div>
    );
  }

  const chartData = profile.indicators;

  return (
    <div className="animate-fade-in">
      <Breadcrumbs
        trail={[
          { label: "Home", to: "/" },
          { label: "SPADRA portal", to: "/spadra" },
          { label: profile.country },
        ]}
      />

      {/* Country hero */}
      <section className="bg-[var(--s-primary)] text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--s-highlight)]">
            {profile.region} · SPADRA country profile
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl uppercase leading-tight">
            {profile.country} at a glance
          </h1>
          <p className="mt-6 text-[var(--s-muted-light)] text-lg leading-relaxed max-w-3xl">
            {profile.summary}
          </p>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-12 space-y-12">
        <MetaRow
          items={[
            { label: "Population", value: profile.population },
            { label: "Disability prevalence", value: profile.prevalence },
            { label: "Region", value: profile.region },
            { label: "Focal OPD", value: profile.focalOpd },
          ]}
        />

        <section>
          <SectionHeading
            eyebrow="Disability data & indicators"
            title="Indicator explorer"
            intro="Indicators shown as an accessible bar chart with an equivalent data table. Figures are illustrative for this prototype."
          />
          <div className="mt-6">
            <BarChart
              caption={`${profile.country} — key disability indicators (%)`}
              unit="%"
              data={chartData}
            />
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <section>
            <SectionHeading eyebrow="Country context" title="Overview" />
            <p className="text-lg leading-relaxed text-[var(--s-muted)]">{profile.summary}</p>
            <div className="mt-6 bg-[var(--s-surface)] border-l-4 border-[var(--s-accent)] p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--s-accent)]">
                Focal member OPD
              </p>
              <p className="mt-2 font-bold text-[var(--s-primary)]">{profile.focalOpd}</p>
            </div>
          </section>

          <section>
            <SectionHeading eyebrow="Progress" title="Milestones" />
            <ol className="mt-4 space-y-0">
              {profile.milestones.map((milestone, i) => (
                <li key={milestone.year} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full bg-[var(--s-primary)] mt-1.5 shrink-0" />
                    {i < profile.milestones.length - 1 && (
                      <span className="w-0.5 flex-1 bg-[var(--s-primary)]/20" />
                    )}
                  </div>
                  <div className="pb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--s-accent)]">
                      {milestone.year}
                    </span>
                    <p className="mt-1 font-bold text-[var(--s-primary)]">{milestone.event}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="border-2 border-[var(--s-primary)] bg-[var(--s-surface)] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[var(--s-primary)] uppercase">
              Explore related country data
            </h2>
            <p className="mt-1 text-sm text-[var(--s-muted)]">
              Compare treaty ratification across all tracked countries in the SPADRA policy tracker.
            </p>
          </div>
          <Link
            to="/spadra"
            className="inline-flex items-center justify-center gap-2 bg-[var(--s-primary)] text-white font-bold uppercase tracking-widest text-xs px-6 py-3 hover:bg-[var(--s-primary-hover)] transition-colors self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-base">query_stats</span>
            Open the portal
          </Link>
        </div>
      </div>
    </div>
  );
};
