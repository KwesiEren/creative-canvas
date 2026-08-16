import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { EVENTS_DATA } from "@/data/mockData";
import { slugify } from "@/lib/slug";
import { FilterChips, Pagination } from "../ui-extra";

const ITEMS_PER_PAGE = 6;
const STATUSES = ["All", ...Array.from(new Set(EVENTS_DATA.map((e) => e.status)))];

export const SpadraEvents: React.FC = () => {
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = EVENTS_DATA.filter((e) => status === "All" || e.status === status);
  const pageCount = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, pageCount);
  const visible = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0f1b3d] uppercase">Events</h2>
          <p className="mt-2 text-[#33415c]">
            Conferences, webinars, trainings and campaigns relevant to the SPADRA community.
          </p>
        </div>
        <FilterChips legend="Status" options={STATUSES} value={status} onChange={setStatus} />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((event) => (
          <article key={event.id} className="border-2 border-[#0f1b3d] p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <span className="bg-[#0f1b3d] text-white text-[11px] font-bold uppercase tracking-widest px-2.5 py-1">
                {event.type}
              </span>
              <span
                className={`text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 ${
                  event.status === "Open"
                    ? "bg-[#dcedd8] text-[#1f5c3d]"
                    : "bg-[#e8edf3] text-[#33415c]"
                }`}
              >
                {event.status}
              </span>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#245a86]">
                {event.date} · {event.time}
              </p>
              <h3 className="mt-1 text-lg font-bold text-[#0f1b3d] leading-snug">{event.title}</h3>
              <p className="mt-1 text-sm text-[#33415c]">
                {event.location}
                {event.isVirtual ? " · Virtual" : ""}
              </p>
            </div>
            <p className="text-sm text-[#33415c] leading-relaxed">{event.description}</p>
            <div className="mt-auto flex items-center gap-3">
              <a
                href={event.registrationUrl}
                className="inline-flex items-center gap-1.5 bg-[#0f1b3d] text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 hover:bg-[#1e3a5f] transition-colors"
              >
                Register
              </a>
              <Link
                to="/events/$slug"
                params={{ slug: slugify(event.title) }}
                className="text-xs font-bold uppercase tracking-widest text-[#245a86] hover:underline"
              >
                Details
              </Link>
            </div>
          </article>
        ))}
      </div>

      <Pagination
        page={safePage}
        pageCount={pageCount}
        onChange={setPage}
        label="Events pagination"
      />
    </div>
  );
};
