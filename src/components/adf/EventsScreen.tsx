import React, { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { EVENTS_DATA } from "@/data/mockData";
import { EventItem } from "@/types";
import { slugify } from "@/lib/slug";
import { PageHero, SectionHeading, btnPrimary, btnGhost } from "./ui";
import { FilterChips, Pagination, EmptyState } from "./ui-extra";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=60";

const ITEMS_PER_PAGE = 12;

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const btnPrimarySmall =
  "inline-flex items-center justify-center gap-2 bg-[#0f1b3d] text-white font-bold uppercase tracking-widest text-xs px-5 py-2.5 hover:bg-[#1e3a5f] transition-colors focus-ring cursor-pointer";

const btnGhostSmall =
  "inline-flex items-center justify-center gap-2 border-2 border-[#0f1b3d] text-[#0f1b3d] font-bold uppercase tracking-widest text-xs px-5 py-2.5 hover:bg-[#0f1b3d] hover:text-white transition-colors focus-ring cursor-pointer";

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

  const modeOptions = ["All", "Virtual", "In-Person"];

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
      <PageHero
        eyebrow="ADF Engagement"
        title="Events & Convenings"
        intro="Workshops, summits, webinars and continental forums hosted or co-organized by ADF."
        image={HERO_IMAGE}
        imageAlt="Conference attendees participating in a panel discussion"
      />

      <section className="max-w-[1280px] mx-auto px-4 md:px-10 py-16">
        <SectionHeading
          eyebrow={`${activeTab} Events`}
          title={`${activeTab} Convenings & Gatherings`}
          intro="Connect with disability rights leaders, policymakers, OPD representatives and allies from across the African continent."
        />

        <div className="mb-10 flex flex-wrap gap-2 border-b border-[#0f1b3d]/20 pb-6">
          {(["Upcoming", "Past"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              aria-pressed={activeTab === tab}
              className={`border-2 border-[#0f1b3d] px-8 py-3 text-sm font-bold uppercase tracking-widest focus-ring cursor-pointer ${
                activeTab === tab ? "bg-[#0f1b3d] text-white" : "text-[#0f1b3d] hover:bg-[#e8edf3]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4 mb-10 bg-[#e8edf3] p-6 border-2 border-[#0f1b3d]/10">
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
            options={modeOptions}
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
  return (
    <article className="relative bg-white border-2 border-[#0f1b3d] flex flex-col overflow-hidden">
      {event.isVirtual && (
        <span className="absolute top-4 right-4 z-10 bg-[#f5b301] text-[#0f1b3d] text-[11px] font-bold uppercase tracking-widest px-3 py-1.5">
          Virtual/Hybrid
        </span>
      )}

      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex justify-between items-start">
          <span className="bg-[#e8edf3] text-[#0f1b3d] text-xs font-bold uppercase tracking-widest px-3 py-1.5">
            {formatDate(event.date)}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#0f1b3d] text-white text-[11px] font-bold uppercase tracking-widest px-2.5 py-1">
              {event.type}
            </span>
            <span className="text-xs font-bold text-[#5b6b85] uppercase tracking-wider">
              {event.location}
            </span>
          </div>

          <h3 className="text-lg font-extrabold text-[#0f1b3d] leading-snug mt-3">{event.title}</h3>

          <p className="text-sm text-[#33415c] leading-relaxed line-clamp-2">{event.description}</p>
        </div>

        <div className="mt-auto pt-4 border-t border-[#0f1b3d]/15 flex flex-wrap gap-3">
          <Link to="/events/$slug" params={{ slug: slugify(event.title) }} className={btnPrimarySmall}>
            Register
          </Link>
          <Link to="/events/$slug" params={{ slug: slugify(event.title) }} className={btnGhostSmall}>
            Details
          </Link>
        </div>
      </div>
    </article>
  );
};
