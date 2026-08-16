import React, { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CAREERS_DATA } from "@/data/mockData";
import { findByTitleSlug, slugify } from "@/lib/slug";
import { buildCanonical } from "@/lib/slug";
import { Breadcrumbs, MetaRow, ShareRow, Prose } from "./ui-extra";
import { btnPrimary, btnGhost, PageHero, SectionHeading } from "./ui";

const OFFICE_IMAGE =
  "/images/adf-event-3.jpg";

const hearAboutOptions = [
  "ADF website",
  "LinkedIn",
  "Member OPD referral",
  "Other",
] as const;

const applicationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(120),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  organization: z.string().optional(),
  cvAttached: z
    .literal(true, {
      errorMap: () => ({ message: "Please confirm you will attach your CV" }),
    })
    .optional()
    .refine((v) => v === true, {
      message: "Please confirm you will attach your CV",
    }),
  coverLetter: z
    .string()
    .min(50, "Cover letter must be at least 50 characters"),
  hearAbout: z.enum(hearAboutOptions, {
    required_error: "Please select how you heard about us",
  }),
  consent: z
    .literal(true, {
      errorMap: () => ({ message: "You must accept the consent statement" }),
    })
    .optional()
    .refine((v) => v === true, {
      message: "You must accept the consent statement",
    }),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

interface CareerDetailScreenProps {
  slug: string;
}

function addTwoWeeksToDeadline(deadlineText: string): string {
  const dateMap: Record<string, string> = {
    "June 30, 2025": "July 14, 2025",
    "July 15, 2025": "July 29, 2025",
    "August 10, 2025": "August 24, 2025",
  };
  if (dateMap[deadlineText]) return dateMap[deadlineText];
  try {
    const d = new Date(deadlineText);
    if (!isNaN(d.getTime())) {
      d.setDate(d.getDate() + 14);
      return d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  } catch {
    /* noop */
  }
  return "within two weeks of the application deadline";
}

function generateRefDigits(): string {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export const CareerDetailScreen: React.FC<CareerDetailScreenProps> = ({
  slug,
}) => {
  const item = useMemo(
    () => findByTitleSlug(CAREERS_DATA, slug),
    [slug],
  );

  const [submitted, setSubmitted] = useState<{
    ref: string;
    contactDate: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema) as unknown as Resolver<ApplicationFormValues>,
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      coverLetter: "",
    },
  });

  if (!item) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-24 text-center animate-fade-in">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#245a86]">
          404
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl uppercase text-[#0f1b3d]">
          Vacancy not found
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-lg text-[#33415c]">
          This position may have been closed or the link is incorrect. Please
          return to the careers page to view current openings.
        </p>
        <div className="mt-10 flex justify-center">
          <Link to="/careers" className={btnGhost}>
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            Back to all careers
          </Link>
        </div>
      </div>
    );
  }

  const itemSlug = slugify(item.title);
  const path = `/careers/${itemSlug}`;
  const canonical = buildCanonical(path);

  const onSubmit = (_data: ApplicationFormValues) => {
    const ref = generateRefDigits();
    const contactDate = addTwoWeeksToDeadline(item.deadline);
    setSubmitted({ ref, contactDate });
    reset();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  return (
    <div className="animate-fade-in">
      <Breadcrumbs
        trail={[
          { label: "Home", to: "/" },
          { label: "Careers", to: "/careers" },
          { label: item.title },
        ]}
      />

      <PageHero
        eyebrow={`Careers / ${item.department}`}
        title={item.title}
        intro={`Closing date: ${item.deadline}. ${item.location}.`}
        image={OFFICE_IMAGE}
        imageAlt="A diverse team collaborating in a modern office meeting space"
      />

      <section className="bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-12">
          <MetaRow
            items={[
              { label: "Position", value: item.title },
              { label: "Department", value: item.department },
              { label: "Location", value: item.location },
              { label: "Type", value: item.type },
              { label: "Deadline", value: item.deadline },
            ]}
          />
        </div>
      </section>

      <section className="bg-[#e8edf3]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            <div>
              <SectionHeading eyebrow="About the role" title="Role summary" />
              <Prose paragraphs={[item.summary]} />
            </div>

            <div>
              <SectionHeading
                eyebrow="Requirements"
                title="What we're looking for"
              />
              <ul className="space-y-4 border-l-4 border-[#245a86] pl-6">
                {item.requirements.map((req, i) => (
                  <li
                    key={i}
                    className="text-lg leading-relaxed text-[#33415c] before:hidden"
                  >
                    <div className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center bg-[#0f1b3d] text-white text-xs font-bold"
                      >
                        {i + 1}
                      </span>
                      <span>{req}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="bg-white border-2 border-[#0f1b3d] p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#245a86]">
                Quick apply
              </p>
              <h3 className="mt-2 text-xl uppercase font-bold text-[#0f1b3d]">
                Submit below
              </h3>
              <p className="mt-3 text-sm text-[#33415c] leading-relaxed">
                Complete the application form on this page. Shortlisted
                candidates will be contacted for an interview panel.
              </p>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex gap-3 items-start">
                  <span
                    aria-hidden="true"
                    className="material-symbols-outlined text-[#245a86] text-base"
                  >
                    description
                  </span>
                  <span className="text-[#33415c]">
                    Prepare a CV and a short supporting statement
                  </span>
                </div>
                <div className="flex gap-3 items-start">
                  <span
                    aria-hidden="true"
                    className="material-symbols-outlined text-[#245a86] text-base"
                  >
                    schedule
                  </span>
                  <span className="text-[#33415c]">
                    Apply before {item.deadline}
                  </span>
                </div>
                <div className="flex gap-3 items-start">
                  <span
                    aria-hidden="true"
                    className="material-symbols-outlined text-[#245a86] text-base"
                  >
                    accessibility_new
                  </span>
                  <span className="text-[#33415c]">
                    Reasonable accommodations available on request
                  </span>
                </div>
              </div>
              <a
                href="#application-form"
                className={`mt-8 ${btnPrimary} w-full`}
              >
                Go to application form
                <span className="material-symbols-outlined text-base">
                  arrow_downward
                </span>
              </a>
            </div>

            <ShareRow title={item.title} path={canonical} />
          </aside>
        </div>
      </section>

      <section id="application-form" className="bg-white">
        <div className="max-w-[880px] mx-auto px-4 md:px-10 py-16">
          <SectionHeading
            eyebrow="Apply now"
            title="Application form"
            intro={`Please complete all required fields for the ${item.title} position. Fields marked with * are mandatory.`}
          />

          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="border-2 border-[#0f1b3d] bg-[#e8edf3] p-8 md:p-10"
            >
              <div className="flex items-start gap-5">
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-[48px] text-[#245a86] flex-shrink-0"
                >
                  check_circle
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#245a86]">
                    Application received
                  </p>
                  <h3 className="mt-3 text-2xl md:text-3xl uppercase font-bold text-[#0f1b3d]">
                    Thank you for applying
                  </h3>
                  <div className="mt-5 space-y-3 text-base text-[#33415c] leading-relaxed">
                    <p>
                      <strong>Reference:</strong> REF-{submitted.ref}
                    </p>
                    <p>
                      We have received your application for the{" "}
                      <strong>{item.title}</strong> position. Our recruitment
                      panel will review submissions after the closing date.
                    </p>
                    <p>
                      Shortlisted candidates will be contacted by{" "}
                      <strong>{submitted.contactDate}</strong>. If you do not
                      hear from us by then, please assume your application was
                      not shortlisted on this occasion.
                    </p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <button
                      onClick={() => setSubmitted(null)}
                      className={btnGhost}
                    >
                      Submit another application
                    </button>
                    <Link to="/careers" className={btnPrimary}>
                      Back to all careers
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-8 border-2 border-[#0f1b3d] p-6 md:p-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-bold uppercase tracking-widest text-[#0f1b3d]"
                  >
                    Full name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    {...register("fullName")}
                    className={`w-full border-2 ${
                      errors.fullName
                        ? "border-[#d32f2f] bg-[#fdecea]"
                        : "border-[#0f1b3d]"
                    } px-4 py-3 text-base text-[#0f1b3d] placeholder:text-[#8fa8c4] focus:outline-none focus:ring-2 focus:ring-[#245a86] focus:ring-offset-2`}
                    placeholder="Jane Doe"
                  />
                  {errors.fullName && (
                    <p
                      role="alert"
                      className="text-xs font-bold text-[#d32f2f]"
                    >
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-widest text-[#0f1b3d]"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                    className={`w-full border-2 ${
                      errors.email
                        ? "border-[#d32f2f] bg-[#fdecea]"
                        : "border-[#0f1b3d]"
                    } px-4 py-3 text-base text-[#0f1b3d] placeholder:text-[#8fa8c4] focus:outline-none focus:ring-2 focus:ring-[#245a86] focus:ring-offset-2`}
                    placeholder="jane@example.org"
                  />
                  {errors.email && (
                    <p
                      role="alert"
                      className="text-xs font-bold text-[#d32f2f]"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-xs font-bold uppercase tracking-widest text-[#0f1b3d]"
                  >
                    Phone (optional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    {...register("phone")}
                    className="w-full border-2 border-[#0f1b3d] px-4 py-3 text-base text-[#0f1b3d] placeholder:text-[#8fa8c4] focus:outline-none focus:ring-2 focus:ring-[#245a86] focus:ring-offset-2"
                    placeholder="+251 9XX XXX XXX"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="organization"
                    className="block text-xs font-bold uppercase tracking-widest text-[#0f1b3d]"
                  >
                    Current organization (optional)
                  </label>
                  <input
                    id="organization"
                    type="text"
                    {...register("organization")}
                    className="w-full border-2 border-[#0f1b3d] px-4 py-3 text-base text-[#0f1b3d] placeholder:text-[#8fa8c4] focus:outline-none focus:ring-2 focus:ring-[#245a86] focus:ring-offset-2"
                    placeholder="Organization name"
                  />
                </div>
              </div>

              <div
                className={`border-2 p-5 ${
                  errors.cvAttached
                    ? "border-[#d32f2f] bg-[#fdecea]"
                    : "border-[#0f1b3d]/20 bg-[#e8edf3]"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-[#245a86]">
                  Resume / CV upload
                </p>
                <div className="mt-3 text-sm text-[#33415c] leading-relaxed">
                  <p>
                    <strong>Note:</strong> File uploads are placeholders in
                    this mock build. Please check the confirmation below to
                    indicate that you will attach your CV and supporting
                    statement when submitting the final application.
                  </p>
                </div>
                <div className="mt-4 space-y-2">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      {...register("cvAttached")}
                      className="mt-1 h-5 w-5 accent-[#0f1b3d] cursor-pointer"
                    />
                    <span className="text-sm font-bold text-[#0f1b3d]">
                      I will attach my CV and supporting statement *
                    </span>
                  </label>
                  {errors.cvAttached && (
                    <p
                      role="alert"
                      className="text-xs font-bold text-[#d32f2f] pl-8"
                    >
                      {errors.cvAttached.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="coverLetter"
                  className="block text-xs font-bold uppercase tracking-widest text-[#0f1b3d]"
                >
                  Cover letter *
                </label>
                <p className="text-xs text-[#5b6b85]">
                  Minimum 50 characters. Describe your suitability for this
                  role, relevant experience, and what you would bring to ADF.
                </p>
                <textarea
                  id="coverLetter"
                  rows={8}
                  {...register("coverLetter")}
                  className={`w-full border-2 ${
                    errors.coverLetter
                      ? "border-[#d32f2f] bg-[#fdecea]"
                      : "border-[#0f1b3d]"
                  } px-4 py-3 text-base text-[#0f1b3d] placeholder:text-[#8fa8c4] focus:outline-none focus:ring-2 focus:ring-[#245a86] focus:ring-offset-2 resize-y`}
                  placeholder="I am applying for this role because..."
                />
                {errors.coverLetter && (
                  <p
                    role="alert"
                    className="text-xs font-bold text-[#d32f2f]"
                  >
                    {errors.coverLetter.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="hearAbout"
                  className="block text-xs font-bold uppercase tracking-widest text-[#0f1b3d]"
                >
                  How did you hear about us? *
                </label>
                <div className="relative">
                  <select
                    id="hearAbout"
                    {...register("hearAbout")}
                    defaultValue=""
                    className={`w-full appearance-none border-2 ${
                      errors.hearAbout
                        ? "border-[#d32f2f] bg-[#fdecea]"
                        : "border-[#0f1b3d] bg-white"
                    } px-4 py-3 text-base text-[#0f1b3d] focus:outline-none focus:ring-2 focus:ring-[#245a86] focus:ring-offset-2 cursor-pointer pr-12`}
                  >
                    <option value="" disabled>
                      Select one...
                    </option>
                    {hearAboutOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#0f1b3d]"
                  >
                    expand_more
                  </span>
                </div>
                {errors.hearAbout && (
                  <p
                    role="alert"
                    className="text-xs font-bold text-[#d32f2f]"
                  >
                    {errors.hearAbout.message}
                  </p>
                )}
              </div>

              <div
                className={`p-5 border-2 ${
                  errors.consent
                    ? "border-[#d32f2f] bg-[#fdecea]"
                    : "border-[#0f1b3d]/20"
                }`}
              >
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    {...register("consent")}
                    className="mt-1 h-5 w-5 accent-[#0f1b3d] cursor-pointer"
                  />
                  <span className="text-sm text-[#33415c] leading-relaxed">
                    <strong className="text-[#0f1b3d]">
                      Data protection consent *
                    </strong>{" "}
                    I consent to the African Disability Forum processing my
                    application data (including personal details and
                    submitted documents) for recruitment purposes. I
                    understand that my data will be handled in accordance
                    with ADF's privacy policy and retained only as long as
                    necessary for the recruitment cycle.
                  </span>
                </label>
                {errors.consent && (
                  <p
                    role="alert"
                    className="mt-2 text-xs font-bold text-[#d32f2f] pl-8"
                  >
                    {errors.consent.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-[#0f1b3d]/20">
                <p className="text-xs text-[#5b6b85]">
                  Fields marked with * are required.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/careers" className={btnGhost}>
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${btnPrimary} disabled:opacity-60 disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="material-symbols-outlined animate-spin"
                          aria-hidden="true"
                        >
                          progress_activity
                        </span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit application
                        <span
                          className="material-symbols-outlined text-base"
                          aria-hidden="true"
                        >
                          send
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}

          <div className="mt-12">
            <ShareRow title={item.title} path={canonical} />
          </div>
        </div>
      </section>
    </div>
  );
};
