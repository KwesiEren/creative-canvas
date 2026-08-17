import { createFileRoute } from "@tanstack/react-router";
import { SpadraPortalScreen } from "@/components/adf/spadra/SpadraPortalScreen";
import { buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/spadra")({
  head: () =>
    buildMeta({
      title: "SPADRA Portal | African Disability Forum",
      description:
        "The SPADRA digital portal: one workspace for African disability data, research, resources, organisations and stakeholder engagement.",
      path: "/spadra",
      image: "/images/adf-event-4.jpg",
      keywords:
        "SPADRA, disability data Africa, policy tracker, African Disability Protocol, portal, stakeholders",
    }),
  component: SpadraPortalScreen,
});
