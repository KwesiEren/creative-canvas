import React, { useMemo } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  NEWS_DATA,
  EVENTS_DATA,
  RESOURCES_DATA,
  PROGRAMMES_DATA,
  CAREERS_DATA,
} from "@/data/mockData";
import { KNOWLEDGE_ITEMS } from "@/data/extraData";
import { slugify } from "@/lib/slug";
import { PageHero } from "./ui";
import { EmptyState } from "./ui-extra";

const HERO_IMAGE =
  "/__l5e/assets-v1/b7b9c09a-82bb-4225-b852-22af7bb2ab1a/adf-photo-5.jpg";

interface ResultItem {
  id: string;
  type: string;
  title: string;
  snippet: string;
  href: string;
  meta: string;
}

interface Props {
  query: string;
}

export const SearchScreen: React.FC<Props> = ({ query }) => {
  const navigate = useNavigate();
  const q = query.trim().toLowerCase();

  const results = useMemo<ResultItem[]>(() => {
    if (!q) return [];
    const matches = (text: string) => text.toLowerCase().includes(q);

    const items: ResultItem[] = [
      ...NEWS_DATA.filter((n) => matches(n.title) || matches(n.summary)).map((n) => ({
        id: n.id,
        type: "News",
        title: n.title,
        snippet: n.summary,
        href: `/news/${slugify(n.title)}`,
        meta: `${n.category} · ${n.date}`,
      })),
      ...EVENTS_DATA.filter(
        (e) => matches(e.title) || matches(e.description) || matches(e.location),
      ).map((e) => ({
        id: e.id,
        type: "Event",
        title: e.title,
        snippet: e.description,
        href: `/events/${slugify(e.title)}`,
        meta: `${e.type} · ${e.date} · ${e.location}`,
      })),
      ...RESOURCES_DATA.filter(
        (r) => matches(r.title) || matches(r.description) || matches(r.author),
      ).map((r) => ({
        id: r.id,
        type: "Resource",
        title: r.title,
        snippet: r.description,
        href: `/resources/${slugify(r.title)}`,
        meta: `${r.category} · ${r.year}`,
      })),
      ...PROGRAMMES_DATA.filter(
        (p) => matches(p.name) || matches(p.acronym) || matches(p.summary),
      ).map((p) => ({
        id: p.id,
        type: "Programme",
        title: `${p.acronym} — ${p.name}`,
        snippet: p.summary,
        href: `/programmes/${p.id}`,
        meta: p.leadRegion,
      })),
      ...CAREERS_DATA.filter((c) => matches(c.title) || matches(c.summary)).map((c) => ({
        id: c.id,
        type: "Career",
        title: c.title,
        snippet: c.summary,
        href: `/careers/${slugify(c.title)}`,
        meta: `${c.department} · ${c.location}`,
      })),
      ...KNOWLEDGE_ITEMS.filter(
        (k) => matches(k.title) || matches(k.summary) || matches(k.theme),
      ).map((k) => ({
        id: k.id,
        type: "Knowledge",
        title: k.title,
        snippet: k.summary,
        href: "/knowledge-hub",
        meta: `${k.theme} · ${k.format} · ${k.year}`,
      })),
    ];

    return items.sort((a, b) => a.title.localeCompare(b.title));
  }, [q]);

  const grouped = useMemo(() => {
    const map = new Map<string, ResultItem[]>();
    results.forEach((r) => {
      const list = map.get(r.type) ?? [];
      list.push(r);
      map.set(r.type, list);
    });
    return Array.from(map.entries());
  }, [results]);

  return (
    <div className="animate-fade-in">
      <PageHero
        eyebrow="Search"
        title="Search the ADF website"
        intro="Find news, events, resources, programmes, careers and knowledge hub content in one place."
        image={HERO_IMAGE}
        imageAlt="Stack of reference books on a library table"
      />

      <section className="max-w-[900px] mx-auto px-4 md:px-10 py-12">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget.elements.namedItem("site-q") as HTMLInputElement | null;
            if (input) void navigate({ to: "/search", search: { q: input.value }, replace: true });
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <label htmlFor="site-search-input" className="sr-only">
            Search the ADF website
          </label>
          <input
            id="site-search-input"
            name="site-q"
            type="search"
            value={query}
            onChange={(e) =>
              void navigate({ to: "/search", search: { q: e.target.value }, replace: true })
            }
            placeholder="e.g. African Disability Protocol, inclusive employment..."
            className="flex-1 px-4 py-3 rounded-none border-2 border-[#0f1b3d] bg-white text-[#0f1b3d] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#245a86]"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-[#0f1b3d] text-white font-bold uppercase tracking-widest text-sm px-8 py-3 hover:bg-[#1e3a5f] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">search</span>
            Search
          </button>
        </form>

        {q === "" ? (
          <div className="mt-12">
            <EmptyState message="Type a keyword above to search across news, events, resources, programmes, careers and knowledge hub content." />
          </div>
        ) : (
          <div className="mt-12">
            <p className="text-sm font-bold uppercase tracking-widest text-[#245a86]">
              {results.length} result{results.length === 1 ? "" : "s"} for “{query.trim()}”
            </p>

            {results.length === 0 ? (
              <div className="mt-6">
                <EmptyState message="Nothing matched your search. Try a broader term or browse the navigation." />
              </div>
            ) : (
              <div className="mt-6 space-y-10">
                {grouped.map(([type, items]) => (
                  <section key={type} aria-labelledby={`results-${type}`}>
                    <h2
                      id={`results-${type}`}
                      className="bg-[#0f1b3d] text-white text-xs font-bold uppercase tracking-widest px-4 py-2"
                    >
                      {type} ({items.length})
                    </h2>
                    <ul className="divide-y-2 divide-[#0f1b3d]/15 border-2 border-t-0 border-[#0f1b3d]">
                      {items.map((r) => (
                        <li key={`${type}-${r.id}`}>
                          <Link
                            to={r.href}
                            className="block p-5 hover:bg-[#e8edf3] transition-colors group"
                          >
                            <h3 className="font-bold text-[#0f1b3d] group-hover:underline leading-snug">
                              {r.title}
                            </h3>
                            <p className="mt-1 text-sm text-[#33415c] leading-relaxed">
                              {r.snippet}
                            </p>
                            <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-[#245a86]">
                              {r.meta}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
