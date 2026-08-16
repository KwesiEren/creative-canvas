import { createFileRoute } from "@tanstack/react-router";
import { SearchScreen } from "@/components/adf/SearchScreen";
import { buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search['q'] === "string" ? (search['q'] as string) : "",
  }),
  head: () =>
    buildMeta({
      title: "Search | African Disability Forum",
      description:
        "Search news, events, resources, programmes, careers and knowledge hub content across the African Disability Forum website.",
      path: "/search",
      keywords: "search, ADF, African Disability Forum, news, resources, events",
    }),

  component: SearchPage,
});

function SearchPage() {
  const search = Route.useSearch();
  return <SearchScreen query={search.q} />;
}
