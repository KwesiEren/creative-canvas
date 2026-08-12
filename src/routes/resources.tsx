import { createFileRoute } from "@tanstack/react-router";
import { ResourcesScreen } from "@/components/adf/ResourcesScreen";
import { useAdf } from "@/components/adf/app-shell";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources & Research | African Disability Forum" },
      {
        name: "description",
        content:
          "Policy briefs, annual reports and research papers on disability rights, inclusion and monitoring across African states.",
      },
      { property: "og:title", content: "ADF Institutional Knowledge & Research" },
      {
        property: "og:description",
        content: "Accessible policy briefs, reports and research from the African Disability Forum.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const { extra } = useAdf();
  return (
    <ResourcesScreen
      {...(extra.filterCategory ? { initialCategory: extra.filterCategory } : {})}
    />
  );
}
