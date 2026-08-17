import { createFileRoute } from "@tanstack/react-router";
import { AccessibilityScreen } from "@/components/adf/AccessibilityScreen";
import { buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/accessibility")({
  head: () =>
    buildMeta({
      title: "Accessibility Statement | African Disability Forum",
      description:
        "The ADF website meets WCAG 2.2 AA with font sizing, high contrast, reduced motion and dyslexia-friendly reading options.",
      path: "/accessibility",
      image: "/images/adf-event-1.jpg",
      keywords: "accessibility, WCAG 2.2, ADF, disability, inclusive web",
    }),
  component: AccessibilityScreen,
});
