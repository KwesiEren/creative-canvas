import React, { useMemo, useState } from "react";
import { RESOURCES_DATA } from "@/data/mockData";
import { useSpadra, toggleSaved, isSaved } from "@/lib/spadraStore";
import { FilterChips } from "../ui-extra";

const CATEGORIES = ["All", ...Array.from(new Set(RESOURCES_DATA.map((r) => r.category)))];

export const SpadraResources: React.FC = () => {
  const [category, setCategory] = useState("All");
  const [view, setView] = useState<"all" | "saved">("all");
  const { savedResources } = useSpadra();

  const filtered = useMemo(
    () =>
      RESOURCES_DATA.filter((r) => {
        const matchesCategory = category === "All" || r.category === category;
        const matchesView = view === "all" || savedResources.includes(r.id);
        return matchesCategory && matchesView;
      }),
    [category, view, savedResources],
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0f1b3d] uppercase">Resources repository</h2>
          <p className="mt-2 text-[#33415c]">
            Downloadable briefs, toolkits and publications. Bookmark items to build your personal
            saved list.
          </p>
        </div>
        <div className="flex rounded-none border-2 border-[#0f1b3d] overflow-hidden">
          {(["all", "saved"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest cursor-pointer ${
                view === v ? "bg-[#0f1b3d] text-white" : "bg-white text-[#0f1b3d]"
              }`}
            >
              {v === "all" ? `All (${RESOURCES_DATA.length})` : `Saved (${savedResources.length})`}
            </button>
          ))}
        </div>
      </div>

      <FilterChips legend="Category" options={CATEGORIES} value={category} onChange={setCategory} />

      {filtered.length === 0 ? (
        <p className="border-2 border-dashed border-[#0f1b3d]/30 p-10 text-center text-sm font-bold text-[#33415c]">
          {view === "saved"
            ? "Nothing saved yet — browse the full repository and tap the bookmark on any item."
            : "No resources in this category."}
        </p>
      ) : (
        <ul className="divide-y-2 divide-[#0f1b3d]/15 border-2 border-[#0f1b3d]">
          {filtered.map((r) => {
            const saved = isSaved(r.id);
            return (
              <li key={r.id} className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#245a86]">
                    {r.category} · {r.year} · {r.pages} pages · {r.author}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-[#0f1b3d]">{r.title}</h3>
                  <p className="mt-1 text-sm text-[#33415c] leading-relaxed">{r.description}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <a
                    href={r.downloadUrl}
                    className="inline-flex items-center gap-1.5 bg-[#0f1b3d] text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 hover:bg-[#1e3a5f] transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    Download
                  </a>
                  <button
                    onClick={() => toggleSaved(r.id)}
                    aria-pressed={saved}
                    aria-label={
                      saved ? `Remove ${r.title} from saved resources` : `Save ${r.title}`
                    }
                    className={`inline-flex items-center gap-1.5 border-2 text-xs font-bold uppercase tracking-widest px-4 py-2.5 cursor-pointer transition-colors ${
                      saved
                        ? "border-[#245a86] bg-[#e8edf3] text-[#245a86]"
                        : "border-[#0f1b3d] text-[#0f1b3d] hover:bg-[#e8edf3]"
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-sm"
                      style={saved ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      bookmark
                    </span>
                    {saved ? "Saved" : "Save"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
