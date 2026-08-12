import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "African Disability Forum — Digital Platform" },
      {
        name: "description",
        content:
          "The African Disability Forum digital platform: advocacy, research and knowledge sharing for organisations of persons with disabilities across Africa.",
      },
      { property: "og:title", content: "African Disability Forum — Digital Platform" },
      {
        property: "og:description",
        content:
          "Accessible, multilingual digital platform for the African Disability Forum and its member OPDs across Africa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
        African Disability Forum
      </p>
      <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Digital platform — foundation
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Blank starting point. Structure, accessibility baseline and content
        sections will be built from the approved plan.
      </p>
    </main>
  );
}
