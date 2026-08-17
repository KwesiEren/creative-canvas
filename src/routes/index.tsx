import { createFileRoute } from "@tanstack/react-router";
import { HomeScreen } from "@/components/adf/HomeScreen";
import { useAdf } from "@/components/adf/app-shell";
import { buildMeta, orgJsonLd, renderJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    buildMeta({
      title: "African Disability Forum | Rights, Inclusion, Participation",
      description:
        "The African Disability Forum unites organisations of persons with disabilities across Africa to advance rights, influence policy and share evidence.",
      path: "/",
      image: "/images/adf-event-2.jpg",
      keywords:
        "African Disability Forum, ADF, disability rights Africa, CRPD, African Disability Protocol, OPD",
    }),
  component: HomePage,
});

function HomePage() {
  const { onNavigate, onOpenTakeAction, onOpenDonate } = useAdf();
  return (
    <>
      <HomeScreen
        onNavigate={onNavigate}
        onOpenTakeAction={onOpenTakeAction}
        onOpenDonate={onOpenDonate}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(orgJsonLd()) }}
      />
    </>
  );
}
