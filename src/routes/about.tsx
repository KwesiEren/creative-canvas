import { createFileRoute } from "@tanstack/react-router";
import { AboutScreen } from "@/components/adf/AboutScreen";
import { useAdf } from "@/components/adf/app-shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ADF | African Disability Forum" },
      {
        name: "description",
        content:
          "Who we are, our history, vision, leadership and membership across the African Disability Forum network of OPDs.",
      },
      { property: "og:title", content: "About the African Disability Forum" },
      {
        property: "og:description",
        content: "History, vision, leadership and membership of ADF.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { extra, onOpenMembership, onOpenTakeAction } = useAdf();
  return (
    <AboutScreen
      {...(extra.subSection ? { subSection: extra.subSection } : {})}
      onOpenMembership={onOpenMembership}
      onOpenTakeAction={onOpenTakeAction}
    />
  );
}
