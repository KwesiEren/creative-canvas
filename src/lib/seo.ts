/**
 * SEO helpers: reusable meta builders and JSON-LD snippets.
 * Always use alongside the route's own head() for unique titles/descriptions.
 */
import type { NewsItem, EventItem, ProgrammeItem } from "@/types";
import { buildCanonical } from "./slug";

export interface SeoMetaInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "event" | "profile";
  keywords?: string;
}

export function buildMeta({
  title,
  description,
  path,
  image,
  type = "website",
  keywords,
}: SeoMetaInput) {
  const canonical = buildCanonical(path);
  const safeImage =
    image ??
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA5RTHq8GFRwH8lZB1Uhqpuh-e3LRFZroug2X8Inod0btmKvbTBhoNJRJdpDRdSbNs_NOw0tMM8PZSVzBMm9PD-A9aaoOG1nicAhZM4k1YZI43-pr9uMgrPlUxqUnE2IqOT85HMDFf68qOwGJUp08zUM-LVTfTN1v-FLwvBbJ4GmbGuf7aUJYhet9Na2-I0tbFUTMne4ceQ68VWU7gfiTwvDOjjHfJYBls4vI2ckusTOzgPnVJxRCo9";
  const meta = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: canonical },
    { property: "og:image", content: safeImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: safeImage },
  ];
  if (keywords) meta.push({ name: "keywords", content: keywords });
  return { meta, links: [{ rel: "canonical", href: canonical }] };
}

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "African Disability Forum (ADF)",
    alternateName: "ADF",
    url: "https://adf-secretariat.org",
    logo: "https://adf-secretariat.org/logo.png",
    description:
      "Continental membership organisation unifying Organisations of Persons with Disabilities across Africa.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Joseph Tito St, Kirkos Sub-City, Nega City Mall 8th floor",
      addressLocality: "Addis Ababa",
      addressCountry: "ET",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@adf-secretariat.org",
      contactType: "customer support",
      availableLanguage: ["English", "French", "Kiswahili"],
    },
    sameAs: ["https://twitter.com/ADFSecretariat"],
  };
}

export function articleJsonLd(item: NewsItem, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    image: item.image ? [item.image] : [],
    datePublished: item.datetime ?? item.date,
    dateModified: item.datetime ?? item.date,
    articleSection: item.category,
    description: item.summary,
    mainEntityOfPage: buildCanonical(path),
    author: { "@type": "Organization", name: "African Disability Forum" },
    publisher: {
      "@type": "Organization",
      name: "African Disability Forum",
      url: "https://adf-secretariat.org",
    },
  };
}

export function eventJsonLd(item: EventItem, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": item.isVirtual ? "VirtualEvent" : "Event",
    name: item.title,
    eventAttendanceMode: item.isVirtual
      ? "https://schema.org/MixedEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    startDate: item.date,
    location: item.isVirtual
      ? {
          "@type": "VirtualLocation",
          url: item.registrationUrl,
        }
      : {
          "@type": "Place",
          name: item.location,
          address: { "@type": "PostalAddress", addressCountry: item.country },
        },
    description: item.description,
    url: buildCanonical(path),
  };
}

export function programmeJsonLd(item: ProgrammeItem, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Project",
    name: item.name,
    alternateName: item.acronym,
    description: item.summary,
    url: buildCanonical(path),
    funding: {
      "@type": "Grant",
      sponsor: item.donorsAndPartners.map((n) => ({ "@type": "Organization", name: n })),
    },
    areaServed: item.leadRegion,
  };
}

export function renderJsonLd(obj: unknown): string {
  return JSON.stringify(obj);
}
