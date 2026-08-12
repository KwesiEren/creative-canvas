import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/site/site-layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | African Disability Forum" },
      {
        name: "description",
        content:
          "Reach the African Disability Forum secretariat, report an accessibility barrier, or enquire about membership and partnership.",
      },
      { property: "og:title", content: "Contact the African Disability Forum" },
      {
        property: "og:description",
        content:
          "Contact details, accessibility feedback and partnership enquiries for ADF.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const field =
  "mt-2 w-full rounded-md border border-input bg-card px-3 py-2.5 text-base text-foreground placeholder:text-muted-foreground";

function Contact() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch with ADF"
        intro="Membership, partnership, media and accessibility enquiries all reach the secretariat through this page."
      />

      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_1fr]">
        <section aria-labelledby="form-heading">
          <h2 id="form-heading" className="text-2xl">
            Send a message
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The form is not yet connected to a mailbox. Submissions will be wired up
            when the backend is enabled.
          </p>

          <form
            className="mt-8 space-y-6"
            onSubmit={(event) => event.preventDefault()}
            noValidate
          >
            <div>
              <label htmlFor="name" className="font-medium">
                Full name
              </label>
              <input id="name" name="name" type="text" autoComplete="name" className={field} />
            </div>
            <div>
              <label htmlFor="email" className="font-medium">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                aria-describedby="email-hint"
                className={field}
              />
              <p id="email-hint" className="mt-1.5 text-sm text-muted-foreground">
                We use this only to reply to you.
              </p>
            </div>
            <div>
              <label htmlFor="subject" className="font-medium">
                Subject
              </label>
              <select id="subject" name="subject" className={field}>
                <option>Membership</option>
                <option>Partnership or funding</option>
                <option>Media enquiry</option>
                <option>Accessibility barrier on this website</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="font-medium">
                Message
              </label>
              <textarea id="message" name="message" rows={6} className={field} />
            </div>
            <button
              type="submit"
              className="rounded-md bg-primary px-5 py-3 font-display font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Send message
            </button>
          </form>
        </section>

        <section aria-labelledby="details-heading">
          <h2 id="details-heading" className="text-2xl">
            Secretariat
          </h2>
          <dl className="mt-6 space-y-6 rounded-lg border border-border bg-surface p-6">
            <div>
              <dt className="eyebrow text-muted-foreground">Address</dt>
              <dd className="mt-1">Addis Ababa, Ethiopia — full address to be confirmed by ADF.</dd>
            </div>
            <div>
              <dt className="eyebrow text-muted-foreground">Email</dt>
              <dd className="mt-1">To be confirmed by ADF.</dd>
            </div>
            <div>
              <dt className="eyebrow text-muted-foreground">Telephone</dt>
              <dd className="mt-1">To be confirmed by ADF.</dd>
            </div>
          </dl>

          <h2 className="mt-12 text-2xl">Accessibility feedback</h2>
          <p className="mt-3 text-muted-foreground">
            If any part of this website blocks you — with a screen reader, keyboard,
            magnification, captions or anything else — tell us using the form and
            select “Accessibility barrier”. We treat these reports as defects, not
            suggestions.
          </p>
        </section>
      </div>
    </SiteLayout>
  );
}
