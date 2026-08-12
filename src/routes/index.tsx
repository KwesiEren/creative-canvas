import { createFileRoute } from "@tanstack/react-router";
import { HomeScreen } from "@/components/adf/HomeScreen";
import { useAdf } from "@/components/adf/app-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "African Disability Forum | Rights, Inclusion, Participation" },
      {
        name: "description",
        content:
          "The African Disability Forum unites organisations of persons with disabilities across Africa to advance rights, influence policy and share evidence.",
      },
      { property: "og:title", content: "African Disability Forum" },
      {
        property: "og:description",
        content:
          "Continental forum unifying organisations of persons with disabilities across Africa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { onNavigate, onOpenTakeAction, onOpenDonate } = useAdf();
  return (
    <HomeScreen
      onNavigate={onNavigate}
      onOpenTakeAction={onOpenTakeAction}
      onOpenDonate={onOpenDonate}
    />
  );
}
