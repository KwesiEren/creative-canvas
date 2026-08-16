import { createFileRoute } from "@tanstack/react-router";
import { MembershipScreen } from "@/components/adf/MembershipScreen";
import { buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/membership")({
  head: () =>
    buildMeta({
      title: "Membership & OPD Directory | African Disability Forum",
      description:
        "Meet the national and regional organisations of persons with disabilities that make up the ADF federation, and learn how to join the continental voice for disability rights.",
      path: "/membership",
      keywords:
        "ADF membership, OPD directory, organisations of persons with disabilities, join ADF, disability rights network",
    }),
  component: MembershipScreen,
});
