import { createFileRoute } from "@tanstack/react-router";
import { YouthScreen } from "@/components/adf/YouthScreen";
import { buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/youth")({
  head: () =>
    buildMeta({
      title: "Youth Hub | African Disability Forum",
      description:
        "Stories, opportunities, polls and action for young leaders with disabilities driving change across Africa. ADF youth fellowships, internships and advocacy.",
      path: "/youth",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=60",
      keywords:
        "ADF youth, disability youth Africa, youth fellowship, young advocates, disability internships, youth polls, African Disability Protocol youth",
    }),
  component: YouthPage,
});

function YouthPage() {
  return <YouthScreen />;
}
