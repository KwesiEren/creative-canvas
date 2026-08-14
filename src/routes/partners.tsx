import { createFileRoute } from "@tanstack/react-router";
import { PartnersScreen } from "@/components/adf/PartnersScreen";
import { buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/partners")({
  head: () =>
    buildMeta({
      title: "Partners & Donors | African Disability Forum",
      description:
        "ADF works with institutional funders, implementing NGOs, UN agencies and global networks. Meet the coalition advancing disability rights across Africa.",
      path: "/partners",
      keywords:
        "ADF partners, donors, institutional funders, NGOs, UN agencies, disability rights network, African Disability Forum",
    }),
  component: PartnersScreen,
});
