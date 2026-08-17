import { createFileRoute } from "@tanstack/react-router";
import { EventsScreen } from "@/components/adf/EventsScreen";
import { buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/events")({
  head: () =>
    buildMeta({
      title: "Events & Convenings | African Disability Forum",
      description:
        "Workshops, summits, webinars and continental forums hosted or co-organized by the African Disability Forum. Connect with disability rights leaders from across Africa.",
      path: "/events",
      image: "/__l5e/assets-v1/3e4db988-eb52-42fc-b023-d413f1380676/adf-photo-4.jpg",
      type: "website",
      keywords: "ADF events, disability workshops, African summits, webinars, continental forums",
    }),
  component: EventsScreen,
});
