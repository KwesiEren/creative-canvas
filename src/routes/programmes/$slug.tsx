import { createFileRoute, notFound } from '@tanstack/react-router';
import { PROGRAMMES_DATA } from '@/data/mockData';
import { findByIdSlug } from '@/lib/slug';
import { buildMeta, programmeJsonLd, renderJsonLd } from '@/lib/seo';
import { ProgrammeDetailScreen } from '@/components/adf/ProgrammeDetailScreen';
import type { ProgrammeId } from '@/types';

export const Route = createFileRoute('/programmes/$slug')({
  loader: async ({ params }) => {
    const item = findByIdSlug(PROGRAMMES_DATA, params.slug);
    if (!item) throw notFound();
    return { programmeId: params.slug as ProgrammeId };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const item = findByIdSlug(PROGRAMMES_DATA, loaderData.programmeId)!;
    const path = `/programmes/${loaderData.programmeId}`;
    return buildMeta({
      title: `${item.name} | ADF Programmes`,
      description: item.summary,
      path,
      image: item.image,
      type: 'website',
    });
  },
  component: ProgrammeDetailPage,
});

function ProgrammeDetailPage() {
  const { programmeId } = Route.useLoaderData();
  const item = findByIdSlug(PROGRAMMES_DATA, programmeId)!;
  const path = `/programmes/${programmeId}`;

  return (
    <>
      <ProgrammeDetailScreen programmeId={programmeId} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(programmeJsonLd(item, path)) }}
      />
    </>
  );
}
