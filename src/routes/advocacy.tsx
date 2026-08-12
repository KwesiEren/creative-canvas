import { createFileRoute } from "@tanstack/react-router";
import { AdvocacyScreen } from "@/components/adf/AdvocacyScreen";
import { useAdf } from "@/components/adf/app-shell";

export const Route = createFileRoute("/advocacy")({
  head: () => ({
    meta: [
      { title: "Advocacy & Events | African Disability Forum" },
      {
        name: "description",
        content:
          "Summits, workshops and awareness days convening OPD leaders, parliamentarians and partners on disability rights in Africa.",
      },
      { property: "og:title", content: "ADF Advocacy & Events" },
      {
        property: "og:description",
        content: "Upcoming continental convenings on disability rights and treaty monitoring.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdvocacyPage,
});

function AdvocacyPage() {
  const { onNavigate, onOpenTakeAction } = useAdf();
  return <AdvocacyScreen onNavigate={onNavigate} onOpenTakeAction={onOpenTakeAction} />;
}
