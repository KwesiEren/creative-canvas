import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/site/site-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ADF | African Disability Forum" },
      {
        name: "description",
        content:
          "The African Disability Forum is the continental umbrella of organisations of persons with disabilities, advancing rights, inclusion and participation across Africa.",
      },
      { property: "og:title", content: "About the African Disability Forum" },
      {
        property: "og:description",
        content:
          "Who ADF is, how it works, and the frameworks that guide its advocacy across the continent.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const FRAMEWORKS = [
  {
    name: "UNCRPD",
    detail:
      "The UN Convention on the Rights of Persons with Disabilities — ADF supports ratification, domestication and shadow reporting.",
  },
  {
    name: "African Disability Protocol",
    detail:
      "Campaigning for signature, ratification and implementation of the Protocol to the African Charter on the rights of persons with disabilities.",
  },
  {
    name: "Agenda 2063",
    detail:
      "Ensuring the African Union's development agenda counts persons with disabilities in its targets and reporting.",
  },
  {
    name: "Sustainable Development Goals",
    detail:
      "Pressing for disaggregated data so that 'leave no one behind' is measurable, not rhetorical.",
  },
];

const WORK = [
  {
    title: "Advocacy and policy influence",
    body: "Representing OPDs before the African Union, United Nations agencies, governments and development partners.",
  },
  {
    title: "Institutional capacity",
    body: "Strengthening national and regional OPDs so members can lead their own advocacy with credible evidence.",
  },
  {
    title: "Research and evidence",
    body: "Producing and curating publications, policy briefs and country data on disability inclusion.",
  },
  {
    title: "Collaboration",
    body: "Convening members, civil society and partners around shared continental priorities.",
  },
];

function About() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About"
        title="The continental voice of organisations of persons with disabilities"
        intro="ADF is the leading continental umbrella organisation representing Organizations of Persons with Disabilities across Africa."
      />

      <section className="container-page py-16" aria-labelledby="mission">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 id="mission" className="text-2xl sm:text-3xl">
              What ADF does
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              ADF advances the rights, inclusion and full participation of persons
              with disabilities by promoting advocacy, influencing policy,
              strengthening institutional capacity, and fostering collaboration
              among governments, the African Union, United Nations agencies,
              development partners, civil society and disability rights
              stakeholders.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {WORK.map((item) => (
                <li
                  key={item.title}
                  className="rounded-lg border border-border bg-card p-5"
                >
                  <h3 className="font-display text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="text-xl">Frameworks we work through</h2>
            <dl className="mt-5 space-y-5">
              {FRAMEWORKS.map((f) => (
                <div key={f.name}>
                  <dt className="font-display text-base font-semibold">{f.name}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{f.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface" aria-labelledby="placeholder">
        <div className="container-page py-14">
          <h2 id="placeholder" className="text-2xl">
            Governance, members and partners
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            This section will list the board, secretariat, member OPDs by country and
            partner organisations once ADF supplies the material. Structure is in
            place; only the content is outstanding.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
