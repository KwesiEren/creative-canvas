import { createFileRoute, notFound } from "@tanstack/react-router";
import { COUNTRY_PROFILES } from "@/data/extraData";
import { findByCustomSlug } from "@/lib/slug";
import { buildMeta, renderJsonLd } from "@/lib/seo";
import { CountryProfileScreen } from "@/components/adf/spadra/CountryProfileScreen";

export const Route = createFileRoute("/spadra/countries/$code")({
  loader: async ({ params }) => {
    const profile = findByCustomSlug(COUNTRY_PROFILES, params.code, (p) => p.code);
    if (!profile) throw notFound();
    return { code: params.code };
  },
  head: ({ loaderData }) => {
    const profile = findByCustomSlug(COUNTRY_PROFILES, loaderData.code, (p) => p.code)!;
    const path = `/spadra/countries/${loaderData.code}`;
    return buildMeta({
      title: `${profile.country} — Disability Country Profile | SPADRA`,
      description: profile.summary,
      path,
      type: "profile",
      keywords: `${profile.country}, disability data, SPADRA, African Disability Protocol, ${profile.region}`,
    });
  },
  component: CountryProfilePage,
});

function CountryProfilePage() {
  const { code } = Route.useLoaderData();
  const profile = findByCustomSlug(COUNTRY_PROFILES, code, (p) => p.code)!;
  const path = `/spadra/countries/${code}`;

  return (
    <>
      <CountryProfileScreen code={code} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd({
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: `${profile.country} disability indicators — SPADRA`,
            description: profile.summary,
            url: `https://adf-secretariat.org${path}`,
            spatialCoverage: profile.country,
            variableMeasured: profile.indicators.map((i) => ({
              "@type": "PropertyValue",
              name: i.label,
              value: i.value,
              unitText: "%",
            })),
            isAccessibleForFree: true,
          }),
        }}
      />
    </>
  );
}
