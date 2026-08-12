import { createFileRoute } from "@tanstack/react-router";
import { ProgrammesScreen } from "@/components/adf/ProgrammesScreen";
import { useAdf } from "@/components/adf/app-shell";

export const Route = createFileRoute("/programmes")({
  head: () => ({
    meta: [
      { title: "Strategic Programmes | African Disability Forum" },
      {
        name: "description",
        content:
          "SPADRA, We Are Able, We Can Work, HelAsia and CSSO — ADF flagship programmes advancing disability rights across sub-Saharan Africa.",
      },
      { property: "og:title", content: "ADF Strategic Programmes" },
      {
        property: "og:description",
        content: "Continental flagship initiatives led by the African Disability Forum.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgrammesPage,
});

function ProgrammesPage() {
  const { extra, onNavigate, onOpenTakeAction } = useAdf();
  return (
    <ProgrammesScreen
      {...(extra.programmeId ? { selectedProgrammeId: extra.programmeId } : {})}
      onNavigate={onNavigate}
      onOpenTakeAction={onOpenTakeAction}
    />
  );
}
