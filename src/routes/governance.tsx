import { createFileRoute } from "@tanstack/react-router";
import { GovernanceScreen } from "@/components/adf/GovernanceScreen";
import { useAdf } from "@/components/adf/app-shell";

export const Route = createFileRoute("/governance")({
  head: () => ({
    meta: [
      { title: "Governance & Network | African Disability Forum" },
      {
        name: "description",
        content:
          "ADF executive council, democratic governance structures and the continental network of member OPDs.",
      },
      { property: "og:title", content: "ADF Governance & Continental Network" },
      {
        property: "og:description",
        content: "Executive council and member OPDs across African regions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GovernancePage,
});

function GovernancePage() {
  const { onOpenMembership } = useAdf();
  return <GovernanceScreen onOpenMembership={onOpenMembership} />;
}
