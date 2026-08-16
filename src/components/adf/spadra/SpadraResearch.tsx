import React, { useState } from "react";
import { KNOWLEDGE_ITEMS, KNOWLEDGE_THEMES } from "@/data/extraData";
import { useSpadra, toggleSaved } from "@/lib/spadraStore";
import { FilterChips } from "../ui-extra";

export const SpadraResearch: React.FC = () => {
  const [theme, setTheme] = useState("All");
  const { savedResources } = useSpadra();

  const filtered = KNOWLEDGE_ITEMS.filter((item) => theme === "All" || item.theme === theme);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0f1b3d] uppercase">
            Research, reports & evidence
          </h2>
          <p className="mt-2 text-[#33415c]">
            Treaty monitoring toolkits, policy analyses and community evidence in accessible
            formats.
          </p>
        </div>
        <FilterChips
          legend="Theme"
          options={["All", ...KNOWLEDGE_THEMES]}
          value={theme}
          onChange={setTheme}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const saved = savedResources.includes(item.id);
          return (
            <article key={item.id} className="border-2 border-[#0f1b3d] p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <span className="bg-[#0f1b3d] text-white text-[11px] font-bold uppercase tracking-widest px-2.5 py-1">
                  {item.format}
                </span>
                <button
                  onClick={() => toggleSaved(item.id)}
                  aria-pressed={saved}
                  aria-label={
                    saved ? `Remove ${item.title} from saved resources` : `Save ${item.title}`
                  }
                  className={`flex items-center gap-1 text-xs font-bold uppercase tracking-widest cursor-pointer ${
                    saved ? "text-[#245a86]" : "text-[#33415c] hover:text-[#245a86]"
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-base"
                    style={saved ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    bookmark
                  </span>
                  {saved ? "Saved" : "Save"}
                </button>
              </div>
              <div>
                <h3 className="font-bold text-[#0f1b3d] leading-snug">{item.title}</h3>
                <p className="mt-2 text-sm text-[#33415c] leading-relaxed">{item.summary}</p>
              </div>
              <dl className="mt-auto grid grid-cols-2 gap-3 text-xs border-t border-[#0f1b3d]/15 pt-4">
                <div>
                  <dt className="font-bold uppercase tracking-widest text-[#245a86]">Theme</dt>
                  <dd className="mt-0.5 font-bold text-[#0f1b3d]">{item.theme}</dd>
                </div>
                <div>
                  <dt className="font-bold uppercase tracking-widest text-[#245a86]">Language</dt>
                  <dd className="mt-0.5 font-bold text-[#0f1b3d]">{item.language}</dd>
                </div>
                <div>
                  <dt className="font-bold uppercase tracking-widest text-[#245a86]">Year</dt>
                  <dd className="mt-0.5 font-bold text-[#0f1b3d]">{item.year}</dd>
                </div>
                <div>
                  <dt className="font-bold uppercase tracking-widest text-[#245a86]">Duration</dt>
                  <dd className="mt-0.5 font-bold text-[#0f1b3d]">{item.duration ?? "—"}</dd>
                </div>
              </dl>
              <details className="text-sm">
                <summary className="cursor-pointer text-xs font-bold uppercase tracking-widest text-[#245a86] focus-ring">
                  Accessible formats
                </summary>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {item.accessibleFormats.map((f) => (
                    <li
                      key={f}
                      className="bg-[#e8edf3] px-2.5 py-1 text-xs font-bold text-[#0f1b3d]"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </details>
            </article>
          );
        })}
      </div>
    </div>
  );
};
