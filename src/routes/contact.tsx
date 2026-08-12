import { createFileRoute } from "@tanstack/react-router";
import { ContactScreen } from "@/components/adf/ContactScreen";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | African Disability Forum" },
      {
        name: "description",
        content:
          "Reach the African Disability Forum secretariat for partnership, membership, media and accessibility enquiries.",
      },
      { property: "og:title", content: "Contact the ADF Secretariat" },
      {
        property: "og:description",
        content: "Partnership, membership, media and accessibility enquiries.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactScreen,
});
