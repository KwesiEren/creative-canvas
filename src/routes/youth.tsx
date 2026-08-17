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
      image: "/__l5e/assets-v1/fc164317-bb7d-412f-b227-19c662116535/adf-photo-2.jpg",
      keywords:
        "ADF youth, disability youth Africa, youth fellowship, young advocates, disability internships, youth polls, African Disability Protocol youth",
    }),
  component: YouthPage,
});

function YouthPage() {
  return <YouthScreen />;
}
