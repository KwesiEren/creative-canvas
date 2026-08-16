import { createFileRoute } from "@tanstack/react-router";
import { GetInvolvedScreen } from "@/components/adf/GetInvolvedScreen";
import { buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/get-involved")({
  head: () =>
    buildMeta({
      title: "Get Involved | African Disability Forum",
      description:
        "Donate, volunteer your skills, or partner with the African Disability Forum to advance the rights of persons with disabilities across Africa.",
      path: "/get-involved",
      keywords:
        "donate, volunteer, partner, get involved, African Disability Forum, disability rights",
    }),
  component: GetInvolvedScreen,
});
