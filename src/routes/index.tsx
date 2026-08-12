import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";

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
          "The continental umbrella of organisations of persons with disabilities, advancing rights, inclusion and full participation across Africa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PILLARS = [
  {
    title: "Advocacy",
    body: "Carrying the position of African OPDs into the African Union, UN processes and national policy.",
  },
  {
    title: "Evidence",
    body: "Publications, policy briefs and country data that make disability exclusion visible and measurable.",
  },
  {
    title: "Capacity",
    body: "Practical support so member organisations can lead their own advocacy and hold institutions to account.",
  },
];

const STATS = [
  { value: "54", label: "African countries in scope" },
  { value: "1 in 6", label: "People live with a disability worldwide" },
  { value: "2018", label: "African Disability Protocol adopted" },
];

function Index() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-surface">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow text-accent">African Disability Forum</p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl">
              Rights, inclusion and full participation — decided with us, not for us.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              ADF is the continental umbrella of organisations of persons with
              disabilities. We advance advocacy, influence policy, strengthen
              institutions and connect disability rights work across Africa.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-display font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                About our work
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-input px-5 py-3 font-display font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Contact the secretariat
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-8">
            <h2 className="eyebrow text-muted-foreground">At a glance</h2>
            <dl className="mt-6 space-y-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-4xl font-semibold text-primary">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="container-page py-20" aria-labelledby="pillars">
        <h2 id="pillars" className="text-3xl">
          How we work
        </h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <li key={pillar.title} className="border-t-4 border-accent bg-card p-6">
              <span aria-hidden="true" className="font-display text-sm font-semibold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-xl">{pillar.title}</h3>
              <p className="mt-3 text-muted-foreground">{pillar.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-border bg-primary text-primary-foreground">
        <div className="container-page flex flex-wrap items-center justify-between gap-6 py-14">
          <div className="max-w-xl">
            <h2 className="text-3xl">Built to be used by everyone</h2>
            <p className="mt-3 text-primary-foreground/85">
              Every page on this platform is built to WCAG 2.2 Level AA, works with a
              keyboard alone, and stays light enough for low-bandwidth connections.
            </p>
          </div>
          <Link
            to="/contact"
            className="rounded-md bg-primary-foreground px-5 py-3 font-display font-semibold text-primary transition-opacity hover:opacity-90"
          >
            Report a barrier
          </Link>
        </div>
      </section>

      <section className="container-page py-20" aria-labelledby="next">
        <h2 id="next" className="text-3xl">
          Coming next
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Publications repository, news and events, the Knowledge Hub, the youth
          engagement section and the embedded SPADRA platform are the next phases of
          this build.
        </p>
      </section>
    </SiteLayout>
  );
}
