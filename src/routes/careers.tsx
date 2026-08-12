import { createFileRoute } from "@tanstack/react-router";
import { CareersScreen } from "@/components/adf/CareersScreen";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers | African Disability Forum" },
      {
        name: "description",
        content:
          "Open roles at the African Disability Forum secretariat, including policy, programmes and advocacy positions across the continent.",
      },
      { property: "og:title", content: "Careers at ADF" },
      {
        property: "og:description",
        content: "Join the African Disability Forum secretariat and programme teams.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareersScreen,
});
