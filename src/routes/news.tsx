import { createFileRoute } from "@tanstack/react-router";
import { NewsScreen } from "@/components/adf/NewsScreen";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Articles | African Disability Forum" },
      {
        name: "description",
        content:
          "Statements, campaign updates and continental reporting from the African Disability Forum and its member organisations.",
      },
      { property: "og:title", content: "ADF Newsroom" },
      {
        property: "og:description",
        content: "Latest disability rights news and statements from across Africa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewsScreen,
});
