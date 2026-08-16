import { createFileRoute, notFound } from "@tanstack/react-router";
import { EVENTS_DATA } from "@/data/mockData";
import { findByTitleSlug } from "@/lib/slug";
import { buildMeta, eventJsonLd, renderJsonLd } from "@/lib/seo";
import { EventDetailScreen } from "@/components/adf/EventDetailScreen";

export const Route = createFileRoute("/events/$slug")({
  loader: async ({ params }) => {
    const item = findByTitleSlug(EVENTS_DATA, params.slug);
    if (!item) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const item = findByTitleSlug(EVENTS_DATA, loaderData.slug)!;
    const path = `/events/${loaderData.slug}`;
    return buildMeta({
      title: `${item.title} | ADF Events`,
      description: item.description,
      path,
      type: "event",
      keywords: `events, ${item.type}, ${item.country}, disability, Africa`,
    });
  },
  component: EventDetailPage,
});

function EventDetailPage() {
  const { slug } = Route.useLoaderData();
  const item = findByTitleSlug(EVENTS_DATA, slug)!;
  const path = `/events/${slug}`;

  return (
    <>
      <EventDetailScreen slug={slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(eventJsonLd(item, path)) }}
      />
    </>
  );
}
