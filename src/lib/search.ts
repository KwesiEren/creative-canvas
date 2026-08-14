import {
  NEWS_DATA,
  PROGRAMMES_DATA,
  RESOURCES_DATA,
  CAREERS_DATA,
  EVENTS_DATA,
} from "@/data/mockData.generated";
import { KNOWLEDGE_ITEMS } from "@/data/extraData";
import { slugify } from "./slug";

export type SearchKind =
  | "news"
  | "programmes"
  | "resources"
  | "events"
  | "careers"
  | "knowledge";

export interface SearchHit {
  id: string;
  kind: SearchKind;
  title: string;
  summary: string;
  category?: string;
  date?: string;
  year?: number;
  location?: string;
  to: string;
  highlight?: string;
}

const K_LABEL: Record<SearchKind, string> = {
  news: "News",
  programmes: "Programme",
  resources: "Resource",
  events: "Event",
  careers: "Career",
  knowledge: "Knowledge Hub",
};

export function searchKindLabel(k: SearchKind): string {
  return K_LABEL[k];
}

function haystack(...fields: (string | number | undefined)[]): string {
  return fields
    .filter((v) => v !== undefined && v !== null)
    .map((v) => String(v).toLowerCase())
    .join(" ");
}

export function buildAllHits(): SearchHit[] {
  const hits: SearchHit[] = [];
  for (const i of NEWS_DATA) {
    hits.push({
      id: i.id,
      kind: "news",
      title: i.title,
      summary: i.summary,
      category: i.category,
      date: i.date,
      to: `/news/${slugify(i.title)}`,
      highlight: i.content,
    });
  }
  for (const i of PROGRAMMES_DATA) {
    hits.push({
      id: i.id,
      kind: "programmes",
      title: i.name,
      summary: i.summary,
      category: i.acronym,
      to: `/programmes/${i.id}`,
      highlight: i.objectives.join(" "),
    });
  }
  for (const i of RESOURCES_DATA) {
    hits.push({
      id: i.id,
      kind: "resources",
      title: i.title,
      summary: i.description,
      category: i.category,
      year: i.year,
      to: `/resources/${slugify(i.title)}`,
      highlight: i.author,
    });
  }
  for (const i of EVENTS_DATA) {
    hits.push({
      id: i.id,
      kind: "events",
      title: i.title,
      summary: i.description,
      category: i.type,
      date: i.date,
      location: i.location,
      to: `/events/${slugify(i.title)}`,
      highlight: i.targetAudience,
    });
  }
  for (const i of CAREERS_DATA) {
    hits.push({
      id: i.id,
      kind: "careers",
      title: i.title,
      summary: i.summary,
      category: i.type,
      location: i.location,
      date: i.deadline,
      to: `/careers/${slugify(i.title)}`,
      highlight: i.requirements.join(" "),
    });
  }
  for (const i of KNOWLEDGE_ITEMS) {
    hits.push({
      id: i.id,
      kind: "knowledge",
      title: i.title,
      summary: i.summary,
      category: i.format,
      year: i.year,
      to: `/knowledge-hub`,
      highlight: i.theme,
    });
  }
  return hits;
}

export interface SearchQuery {
  q: string;
  kind?: SearchKind | "all";
}

export function runSearch({ q, kind = "all" }: SearchQuery): SearchHit[] {
  const all = buildAllHits();
  const pool = kind === "all" ? all : all.filter((h) => h.kind === kind);
  if (!q.trim()) return pool;
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  return pool
    .map((h) => {
      const blob = haystack(h.title, h.summary, h.category, h.date, h.location, h.highlight, h.year);
      const score = terms.reduce((s, t) => (blob.includes(t) ? s + 1 : s), 0);
      if (score === 0) return null;
      return { h, score };
    })
    .filter((r): r is { h: SearchHit; score: number } => r !== null)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.h);
}

export function searchCounts(q: string): Record<SearchKind | "all", number> {
  const kinds: SearchKind[] = ["news", "programmes", "resources", "events", "careers", "knowledge"];
  const out: Record<string, number> = { all: 0 };
  for (const k of kinds) out[k] = runSearch({ q, kind: k }).length;
  out.all = Object.values(out).reduce((a, b) => a + b, 0) - (out.all as number);
  return out as Record<SearchKind | "all", number>;
}
