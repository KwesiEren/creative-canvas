import { createFileRoute, notFound } from '@tanstack/react-router';
import { NEWS_DATA } from '@/data/mockData';
import { findByTitleSlug } from '@/lib/slug';
import { buildMeta, articleJsonLd, renderJsonLd } from '@/lib/seo';
import { NewsDetailScreen } from '@/components/adf/NewsDetailScreen';

export const Route = createFileRoute('/news/$slug')({
  loader: async ({ params }) => {
    const item = findByTitleSlug(NEWS_DATA, params.slug);
    if (!item) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const item = findByTitleSlug(NEWS_DATA, loaderData.slug)!;
    const path = `/news/${loaderData.slug}`;
    return buildMeta({
      title: `${item.title} | ADF`,
      description: item.summary,
      path,
      image: item.image,
      type: 'article',
    });
  },
  component: NewsDetailPage,
});

function NewsDetailPage() {
  const { slug } = Route.useLoaderData();
  const item = findByTitleSlug(NEWS_DATA, slug)!;
  const path = `/news/${slug}`;

  return (
    <>
      <NewsDetailScreen slug={slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(articleJsonLd(item, path)) }}
      />
    </>
  );
}
