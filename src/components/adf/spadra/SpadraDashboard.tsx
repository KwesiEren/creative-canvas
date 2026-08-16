import React from "react";
import { Link } from "@tanstack/react-router";
import { RESOURCES_DATA, EVENTS_DATA } from "@/data/mockData";
import { SPADRA_STATS, COUNTRY_PROFILES } from "@/data/extraData";
import { useSpadra } from "@/lib/spadraStore";
import { BarChart } from "../ui-extra";
import type { PortalTabId } from "./SpadraShell";

interface Props {
  onOpenTab: (tab: PortalTabId) => void;
}

export const SpadraDashboard: React.FC<Props> = ({ onOpenTab }) => {
  const { savedResources } = useSpadra();

  const savedItems = RESOURCES_DATA.filter((r) => savedResources.includes(r.id));
  const upcomingEvents = EVENTS_DATA.filter((e) => e.status !== "Completed").slice(0, 3);

  const employmentData = COUNTRY_PROFILES.map((p) => ({
    label: p.country,
    value: p.indicators.find((i) => i.label.toLowerCase().includes("employment"))?.value ?? 0,
  }));

  return (
    <div className="space-y-12">
      <section aria-labelledby="spadra-overview-heading">
        <h2
          id="spadra-overview-heading"
          className="text-xs font-bold uppercase tracking-widest text-[#245a86]"
        >
          At a glance
        </h2>
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 border-2 border-[#0f1b3d]">
          {SPADRA_STATS.map((stat) => (
            <div
              key={stat.label}
              className="border-[#0f1b3d]/15 p-6 lg:border-r last:border-r-0 border-b lg:border-b-0 bg-[#e8edf3]"
            >
              <span className="block font-display text-4xl leading-none text-[#0f1b3d]">
                {stat.value}
              </span>
              <span className="mt-2 block text-xs font-bold uppercase tracking-widest text-[#245a86]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-8">
        <section aria-labelledby="saved-heading">
          <div className="flex items-center justify-between">
            <h2 id="saved-heading" className="text-xl font-bold text-[#0f1b3d] uppercase">
              Saved resources
            </h2>
            <button
              onClick={() => onOpenTab("resources")}
              className="text-xs font-bold uppercase tracking-widest text-[#245a86] hover:underline cursor-pointer"
            >
              Manage
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {savedItems.length === 0 ? (
              <p className="border-2 border-dashed border-[#0f1b3d]/30 p-8 text-sm font-bold text-[#33415c]">
                You haven’t saved any resources yet. Browse the{" "}
                <button
                  onClick={() => onOpenTab("resources")}
                  className="text-[#245a86] underline cursor-pointer"
                >
                  Resources repository
                </button>{" "}
                and tap the bookmark to save them here.
              </p>
            ) : (
              savedItems.map((r) => (
                <div key={r.id} className="border-2 border-[#0f1b3d]/20 p-4 flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#245a86]">bookmark</span>
                  <div>
                    <h3 className="font-bold text-[#0f1b3d] leading-snug">{r.title}</h3>
                    <p className="mt-1 text-sm text-[#33415c]">
                      {r.category} · {r.year} · {r.pages} pages
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section aria-labelledby="upcoming-heading">
          <div className="flex items-center justify-between">
            <h2 id="upcoming-heading" className="text-xl font-bold text-[#0f1b3d] uppercase">
              Upcoming events
            </h2>
            <button
              onClick={() => onOpenTab("events")}
              className="text-xs font-bold uppercase tracking-widest text-[#245a86] hover:underline cursor-pointer"
            >
              All events
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {upcomingEvents.map((e) => (
              <div key={e.id} className="border-2 border-[#0f1b3d]/20 p-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#245a86]">
                  {e.type} · {e.date}
                </p>
                <h3 className="mt-1 font-bold text-[#0f1b3d] leading-snug">{e.title}</h3>
                <p className="mt-1 text-sm text-[#33415c]">{e.location}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section aria-labelledby="analytics-heading">
        <div className="flex items-center justify-between">
          <h2 id="analytics-heading" className="text-xl font-bold text-[#0f1b3d] uppercase">
            Data visualisation & analytics
          </h2>
          <button
            onClick={() => onOpenTab("data")}
            className="text-xs font-bold uppercase tracking-widest text-[#245a86] hover:underline cursor-pointer"
          >
            Open data explorer
          </button>
        </div>
        <div className="mt-4">
          <BarChart
            caption="Formal employment rate of persons with disabilities by country (%)"
            unit="%"
            data={employmentData}
          />
        </div>
      </section>

      <section className="bg-[#e8edf3] border-2 border-[#0f1b3d] p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#0f1b3d] uppercase">Explore the portal</h2>
          <p className="mt-1 text-sm text-[#33415c]">
            Jump straight into country data, research, the resources repository or stakeholder
            directory.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/spadra/countries/$code" params={{ code: "ke" }}
            className="inline-flex items-center gap-2 border-2 border-[#0f1b3d] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#0f1b3d] hover:bg-[#0f1b3d] hover:text-white transition-colors"
          >
            Sample country profile
          </Link>
          <button
            onClick={() => onOpenTab("data")}
            className="inline-flex items-center gap-2 bg-[#0f1b3d] text-white px-5 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#1e3a5f] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">query_stats</span>
            Data & insights
          </button>
        </div>
      </section>
    </div>
  );
};
