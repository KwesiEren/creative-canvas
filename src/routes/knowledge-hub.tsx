import { createFileRoute } from "@tanstack/react-router";
import { KnowledgeHubScreen } from "@/components/adf/KnowledgeHubScreen";
import { buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/knowledge-hub")({
  head: () =>
    buildMeta({
      title: "Knowledge Hub | African Disability Forum",
      description:
        "Toolkits, explainers, multimedia and research curated for disability rights organizers, OPDs and policy advocates across Africa.",
      path: "/knowledge-hub",
      image: "/images/adf-event-5.png",
      keywords:
        "disability rights, knowledge hub, research, toolkits, CRPD, African Disability Protocol, OPD resources",
    }),
  component: KnowledgeHubScreen,
});
