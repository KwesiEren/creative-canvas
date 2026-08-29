import React, { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { EVENTS_DATA } from "@/data/mockData";
import { EventItem } from "@/types";
import { slugify } from "@/lib/slug";
import { PageBanner, SectionHeading, btnPrimary, btnGhost } from "./ui";
import { FilterChips, Pagination, EmptyState } from "./ui-extra";

const ITEMS_PER_PAGE = 12;

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const EventsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Past">("Upcoming");
  const [activeType, setActiveType] = useState<string>("All");
  const [activeCountry, setActiveCountry] = useState<string>("All");
  const [activeMode, setActiveMode] = useState<"all" | "virtual" | "in-person">("all");
  const [page, setPage] = useState<number>(1);

  const typeOptions = useMemo(() => {
    const types = Array.from(new Set(EVENTS_DATA.map((e) => e.type)));
    return ["All", ...types];
  }, []);

  const countryOptions = useMemo(() => {
    const countries = Array.from(new Set(EVENTS_DATA.map((e) => e.country)));
    return ["All", ...countries];
  }, []);

  const tabEvents = useMemo(() => {
    return EVENTS_DATA.filter((e) => {
      if (activeTab === "Upcoming") {
        return e.date >= "2025-01-01";
      }
      return e.date < "2025-01-01";
    });
  }, [activeTab]);

  const filteredEvents = useMemo(() => {
    return tabEvents.filter((e) => {
      const matchesType = activeType === "All" || e.type === activeType;
      const matchesCountry = activeCountry === "All" || e.country === activeCountry;
      let matchesMode = true;
      if (activeMode === "virtual") matchesMode = e.isVirtual;
      if (activeMode === "in-person") matchesMode = !e.isVirtual;
      return matchesType && matchesCountry && matchesMode;
    });
  }, [tabEvents, activeType, activeCountry, activeMode]);

  const pageCount = Math.max(1, Math.ceil(filteredEvents.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, pageCount);

  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEvents.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  const handleTabChange = (tab: "Upcoming" | "Past") => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleTypeChange = (value: string) => {
    setActiveType(value);
    setPage(1);
  };

  const handleCountryChange = (value: string) => {
    setActiveCountry(value);
    setPage(1);
  };

  const handleModeChange = (value: string) => {
    if (value === "All") setActiveMode("all");
    else if (value === "Virtual") setActiveMode("virtual");
    else if (value === "In-Person") setActiveMode("in-person");
    setPage(1);
  };

  return (
    <div className="animate-fade-in">
      <PageBanner
        title="Events"
        crumbs={[
          { label: "Home", onClick: () => {} },
          { label: "Events" },
        ]}
      />

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-16">
        <SectionHeading
          eyebrow={`${activeTab} Events`}
          title={`${activeTab} Convenings & Gatherings`}
          intro="Connect with disability rights leaders, policymakers, OPD representatives and allies from across the African continent."
        />

        <div className="mb-10 flex flex-wrap gap-2 border-b border-black/10 pb-6">
          {(["Upcoming", "Past"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              aria-pressed={activeTab === tab}
              className={`border border-black/20 px-8 py-3 text-sm font-bold uppercase tracking-widest focus-ring cursor-pointer rounded-full transition-colors ${
                activeTab === tab ? "bg-[var(--adf-main)] text-white border-[var(--adf-main)]" : "text-[var(--adf-charcoal)] hover:bg-[var(--adf-bg)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4 mb-10 bg-[var(--adf-bg)] p-6 border border-black/10">
          <FilterChips
            legend="Type"
            options={typeOptions}
            value={activeType}
            onChange={handleTypeChange}
          />
          <FilterChips
            legend="Country"
            options={countryOptions}
            value={activeCountry}
            onChange={handleCountryChange}
          />
          <FilterChips
            legend="Mode"
            options={["All", "Virtual", "In-Person"]}
            value={
              activeMode === "all" ? "All" : activeMode === "virtual" ? "Virtual" : "In-Person"
            }
            onChange={handleModeChange}
          />
        </div>

        {paginatedEvents.length === 0 ? (
          <EmptyState message="No events match your current filters. Try clearing the filters or switching tabs." />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            <Pagination
              page={currentPage}
              pageCount={pageCount}
              onChange={setPage}
              label="Events pagination"
            />
          </>
        )}
      </section>
    </div>
  );
};

const EventCard: React.FC<{ event: EventItem }> = ({ event }) => {
  const date = new Date(event.date);
  return (
    <article className="relative bg-white border border-black/10 flex flex-col overflow-hidden adf-card">
      {event.isVirtual && (
        <span className="absolute top-4 right-4 z-10 bg-[var(--adf-gold)] text-[var(--adf-charcoal)] text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
          Virtual/Hybrid
        </span>
      )}

      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex gap-4">
          <div className="adf-card-date shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-[var(--adf-main)] text-white rounded-lg">
            <span className="text-2xl font-display leading-none">{date.getDate()}</span>
            <span className="text-xs uppercase mt-0.5">
              {date.toLocaleString("en-GB", { month: "short" })}
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[var(--adf-main)] text-white text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                {event.type}
              </span>
              <span className="text-xs font-bold text-[var(--adf-muted)] uppercase tracking-wider">
                {event.location}
              </span>
            </div>
            <h3 className="text-lg font-bold text-[var(--adf-charcoal)] leading-snug mt-2">{event.title}</h3>
          </div>
        </div>

        <p className="text-sm text-[var(--adf-muted)] leading-relaxed line-clamp-2">{event.description}</p>

        <div className="mt-auto pt-4 border-t border-black/10 flex flex-wrap gap-3">
          <Link to="/events/$slug" params={{ slug: slugify(event.title) }} className="adf-btn adf-btn-secondary text-xs focus-ring">
            Register
          </Link>
          <Link to="/events/$slug" params={{ slug: slugify(event.title) }} className="adf-btn adf-btn-outline text-xs focus-ring">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
};
