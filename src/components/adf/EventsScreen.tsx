import React, { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { EVENTS_DATA } from "@/data/mockData";
import { EventItem } from "@/types";
import { slugify } from "@/lib/slug";
import { PageBanner, SectionHeading } from "./ui";
import { FilterChips, Pagination, EmptyState } from "./ui-extra";
import { assetUrl } from "@/lib/assetUrl";

const ITEMS_PER_PAGE = 12;

// Pool of existing events images to cycle through
const EVENT_IMAGES = [
  "/images/adf-event-1.jpg",
  "/images/adf-event-2.jpg",
  "/images/adf-event-3.jpg",
  "/images/adf-event-4.jpg",
  "/images/adf-event-5.png",
  "/images/adf-event-6.png",
];

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
    <div className="animate-fade-in font-sans">
      {/* Dynamic Hero Banner matching Figma 1894x378 Aspect ratio with existing image */}
      <section 
        className="relative min-h-[320px] md:min-h-[378px] flex items-center bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${assetUrl("/images/adf-event-3.jpg")})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/45" />
        <div className="relative max-w-[1200px] w-full mx-auto px-4 md:px-6 z-10 text-white py-12">
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-wider text-white/70 mb-3">
            <span>Home</span> <span className="mx-1">/</span> <span>Events</span> <span className="mx-1">/</span> <span className="text-[var(--adf-gold)] font-semibold">Events</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Events</h1>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-16">
        <SectionHeading
          eyebrow={`${activeTab} Convenings`}
          title={`${activeTab} Gatherings & Forums`}
          intro="Connect with disability rights leaders, policymakers, and OPD representatives from across the African continent."
        />

        {/* Tab triggers */}
        <div className="mb-10 flex flex-wrap gap-2 border-b border-slate-200 pb-6">
          {(["Upcoming", "Past"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              aria-pressed={activeTab === tab}
              className={`border px-8 py-3 text-sm font-bold uppercase tracking-widest cursor-pointer transition-colors duration-200 rounded-lg ${
                activeTab === tab 
                  ? "bg-blue-700 text-white border-blue-700 shadow-md" 
                  : "text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filter chips panel */}
        <div className="space-y-4 mb-10 bg-slate-50 p-6 border border-slate-200 rounded-xl shadow-sm">
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

        {filteredEvents.length === 0 ? (
          <EmptyState message="No events match your current filters. Try clearing the filters or switching tabs." />
        ) : (
          <>
            {/* 4-Column Responsive Grid matching Figma portrait aspect ratio layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
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

const EventCard: React.FC<{ event: EventItem; index: number }> = ({ event, index }) => {
  const date = new Date(event.date);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  
  // Cycle background images from the pool of existing images
  const bgImage = EVENT_IMAGES[index % EVENT_IMAGES.length];

  return (
    <Link 
      to="/events/$slug" 
      params={{ slug: slugify(event.title) }} 
      className="relative block aspect-[270/369] rounded-xl overflow-hidden shadow-md group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Background Image */}
      <img 
        src={assetUrl(bgImage)} 
        alt={event.title} 
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      {/* Dark overlay for readable white text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

      {/* Date badge on top right */}
      <div className="absolute top-4 right-4 bg-blue-700 text-white font-extrabold text-xs py-2 px-3.5 rounded-lg text-center shadow-md">
        <span className="block text-sm leading-none">{day}</span>
        <span className="block text-[9px] uppercase leading-none mt-0.5 tracking-wider">{month}</span>
      </div>

      {/* Hybrid/Virtual Label indicator */}
      {event.isVirtual && (
        <span className="absolute top-4 left-4 bg-amber-400 text-slate-800 text-[9px] font-extrabold uppercase tracking-widest px-2 py-1 rounded">
          Virtual
        </span>
      )}

      {/* Text elements at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-white/90">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-amber-400">schedule</span>
            {event.time.split(" ")[0]}
          </span>
          <span className="flex items-center gap-1 truncate max-w-[130px]">
            <span className="material-symbols-outlined text-[14px] text-amber-400">location_on</span>
            {event.location.split(" &")[0]}
          </span>
        </div>
        <h3 className="text-base font-bold leading-snug group-hover:text-amber-300 transition-colors line-clamp-2">
          {event.title}
        </h3>
      </div>
    </Link>
  );
};
