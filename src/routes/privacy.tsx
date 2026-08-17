import { createFileRoute } from "@tanstack/react-router";
import { PrivacyScreen } from "@/components/adf/PrivacyScreen";
import { buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    buildMeta({
      title: "Privacy Notice | African Disability Forum",
      description:
        "How the African Disability Forum collects, uses and protects personal data across the website and the SPADRA portal.",
      path: "/privacy",
      image: "/images/adf-event-6.png",
      keywords: "privacy, data protection, ADF, African Disability Forum",
    }),
  component: PrivacyScreen,
});
