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
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=60",
      type: "website",
      keywords: "ADF events, disability workshops, African summits, webinars, continental forums",
    }),
  component: EventsScreen,
});
