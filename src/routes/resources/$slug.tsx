import { createFileRoute, notFound } from "@tanstack/react-router";
import { RESOURCES_DATA } from "@/data/mockData.generated";
import { findByTitleSlug, slugify } from "@/lib/slug";
import { buildMeta, renderJsonLd } from "@/lib/seo";
import { ResourceDetailScreen } from "@/components/adf/ResourceDetailScreen";

export const Route = createFileRoute("/resources/$slug")({
  loader: async ({ params }) => {
    const item = findByTitleSlug(RESOURCES_DATA, params.slug);
    if (!item) {
      throw notFound();
    }
    return { item };
  },
  head: ({ params }) => {
    const item = findByTitleSlug(RESOURCES_DATA, params.slug);
    const path = `/resources/${params.slug}`;
    if (!item) {
      return buildMeta({
        title: "Resource Not Found | African Disability Forum",
        description: "The requested resource could not be found.",
        path,
        type: "website",
      });
    }
    const jsonLd = renderJsonLd({
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      headline: item.title,
      author: { "@type": "Organization", name: item.author },
      datePublished: String(item.year),
      inLanguage: "en",
      numberOfPages: item.pages,
      genre: item.category,
      description: item.description,
      publisher: {
        "@type": "Organization",
        name: "African Disability Forum",
        url: "https://adf-secretariat.org",
      },
    });
    return {
      ...buildMeta({
        title: `${item.title} | African Disability Forum`,
        description: item.description,
        path,
        type: "website",
        keywords: `${item.category}, ${item.year}, disability rights, Africa, ADF`,
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: jsonLd,
        },
      ],
    };
  },
  component: ResourceDetailPage,
});

function ResourceDetailPage() {
  const { slug } = Route.useParams();
  return <ResourceDetailScreen slug={slug} />;
}
