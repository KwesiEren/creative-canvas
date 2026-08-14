import { createFileRoute, notFound } from "@tanstack/react-router";
import { CAREERS_DATA } from "@/data/mockData";
import { findByTitleSlug, slugify } from "@/lib/slug";
import { buildMeta, renderJsonLd } from "@/lib/seo";
import { CareerDetailScreen } from "@/components/adf/CareerDetailScreen";

export const Route = createFileRoute("/careers/$slug")({
  loader: ({ params }) => {
    const item = findByTitleSlug(CAREERS_DATA, params.slug);
    if (!item) {
      throw notFound();
    }
    return item;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Vacancy not found | African Disability Forum" },
          {
            name: "description",
            content:
              "The requested vacancy could not be found. Browse current openings at the African Disability Forum.",
          },
        ],
      };
    }
    const itemSlug = slugify(loaderData.title);
    const path = `/careers/${itemSlug}`;
    return buildMeta({
      title: `${loaderData.title} | ADF Careers`,
      description: loaderData.summary,
      path,
      type: "profile",
      keywords: `careers, jobs, Africa, disability, ${loaderData.department}, ${loaderData.location}`,
    });
  },
  component: () => {
    const { slug } = Route.useParams();
    const item = Route.useLoaderData();
    const itemSlug = slugify(item.title);
    const path = `/careers/${itemSlug}`;

    const jobPostingJsonLd = {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: item.title,
      hiringOrganization: {
        "@type": "Organization",
        name: "African Disability Forum",
      },
      jobLocation: {
        "@type": "Place",
        address: item.location,
      },
      employmentType: item.type === "Full-Time" ? "FULL_TIME" : "CONTRACTOR",
      validThrough: "2025-12-31",
      description: item.summary,
      responsibilities: item.requirements,
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: "Competitive",
      },
      url: `https://adf-secretariat.org${path}`,
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: renderJsonLd(jobPostingJsonLd),
          }}
        />
        <CareerDetailScreen slug={slug} />
      </>
    );
  },
});
