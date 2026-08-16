import React from "react";
import { Link } from "@tanstack/react-router";
import { COUNTRY_PROFILES } from "@/data/extraData";
import { findByIdSlug, findByCustomSlug } from "@/lib/slug";
import { Breadcrumbs, BarChart, MetaRow, EmptyState } from "../ui-extra";
import { PageHero, SectionHeading } from "../ui";

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
            className="inline-flex items-center justify-center gap-2 border-2 border-[#0f1b3d] text-[#0f1b3d] font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-[#0f1b3d] hover:text-white transition-colors"
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

      <PageHero
        eyebrow={`${profile.region} · SPADRA country profile`}
        title={`${profile.country} at a glance`}
        intro={profile.summary}
        image="https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=1600&q=60"
        imageAlt={`Map imagery representing ${profile.country}`}
      />

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
            <p className="text-lg leading-relaxed text-[#33415c]">{profile.summary}</p>
            <div className="mt-6 bg-[#e8edf3] border-l-4 border-[#245a86] p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#245a86]">
                Focal member OPD
              </p>
              <p className="mt-2 font-bold text-[#0f1b3d]">{profile.focalOpd}</p>
            </div>
          </section>

          <section>
            <SectionHeading eyebrow="Progress" title="Milestones" />
            <ol className="mt-4 space-y-0">
              {profile.milestones.map((milestone, i) => (
                <li key={milestone.year} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full bg-[#0f1b3d] mt-1.5 shrink-0" />
                    {i < profile.milestones.length - 1 && (
                      <span className="w-0.5 flex-1 bg-[#0f1b3d]/20" />
                    )}
                  </div>
                  <div className="pb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#245a86]">
                      {milestone.year}
                    </span>
                    <p className="mt-1 font-bold text-[#0f1b3d]">{milestone.event}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="border-2 border-[#0f1b3d] bg-[#e8edf3] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#0f1b3d] uppercase">
              Explore related country data
            </h2>
            <p className="mt-1 text-sm text-[#33415c]">
              Compare treaty ratification across all tracked countries in the SPADRA policy tracker.
            </p>
          </div>
          <Link
            to="/spadra"
            className="inline-flex items-center justify-center gap-2 bg-[#0f1b3d] text-white font-bold uppercase tracking-widest text-xs px-6 py-3 hover:bg-[#1e3a5f] transition-colors self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-base">query_stats</span>
            Open the portal
          </Link>
        </div>
      </div>
    </div>
  );
};
