import React from "react";
import { PageHero, SectionHeading } from "./ui";
import { assetUrl } from "@/lib/assetUrl";

const HERO_IMAGE = assetUrl("/images/adf-event-1.jpg");

export const AccessibilityScreen: React.FC = () => (
  <div className="animate-fade-in">
    <PageHero
      eyebrow="Accessibility"
      title="Making the whole site work for everyone"
      intro="The ADF website is built to meet WCAG 2.2 AA, with a persistent toolbar for font sizing, contrast, motion and reading preferences."
      image={HERO_IMAGE}
      imageAlt="Close-up of hands adjusting a device"
    />

    <section className="max-w-[1280px] mx-auto px-4 md:px-10 py-16 space-y-16">
      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            icon: "format_size",
            title: "Font sizing",
            body: "Use the Accessibility button in the top bar to switch text to Large or Extra Large. The layout reflows at every size.",
          },
          {
            icon: "contrast",
            title: "High contrast",
            body: "A high-contrast mode boosts colour contrast across the site, including form fields and charts.",
          },
          {
            icon: "directions_run",
            title: "Reduced motion",
            body: "Turn off non-essential animation for vestibular comfort. All critical motion is removed and navigation stays fully functional.",
          },
          {
            icon: "text_fields",
            title: "Dyslexia-friendly text",
            body: "A dedicated font style increases letter spacing and uses a clearer typeface for reading comfort.",
          },
          {
            icon: "keyboard",
            title: "Keyboard navigation",
            body: "Every interactive element is reachable and operable by keyboard alone, with visible focus indicators.",
          },
          {
            icon: "data_table",
            title: "Accessible data",
            body: "Charts on the SPADRA portal ship with equivalent data tables and captions for screen-reader users.",
          },
        ].map((f) => (
          <div key={f.title} className="border-2 border-[#0f1b3d]/20 p-6">
            <span className="material-symbols-outlined text-3xl text-[#245a86]">{f.icon}</span>
            <h2 className="mt-3 text-lg font-bold text-[#0f1b3d] uppercase">{f.title}</h2>
            <p className="mt-2 text-sm text-[#33415c] leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>

      <section>
        <SectionHeading
          eyebrow="How we build"
          title="Standards we follow"
          intro="Accessibility is part of how this site is built, reviewed and tested — not an add-on."
        />
        <ul className="mt-6 divide-y-2 divide-[#0f1b3d]/15 border-2 border-[#0f1b3d]">
          {[
            {
              title: "WCAG 2.2 AA",
              body: "All public pages target the Web Content Accessibility Guidelines 2.2 at Level AA conformance.",
            },
            {
              title: "Semantic structure",
              body: "Pages use landmarks, headings, labels and live regions so assistive technology can navigate the content.",
            },
            {
              title: "Testing with users",
              body: "Designs are reviewed with disability organisations, including screen-reader and keyboard-only testing.",
            },
          ].map((item) => (
            <li key={item.title} className="p-6">
              <h3 className="font-bold text-[#0f1b3d]">{item.title}</h3>
              <p className="mt-1 text-sm text-[#33415c] leading-relaxed">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="bg-[#e8edf3] border-l-4 border-[#245a86] p-6">
        <h2 className="text-lg font-bold text-[#0f1b3d] uppercase">
          Report an accessibility barrier
        </h2>
        <p className="mt-2 text-sm text-[#33415c] leading-relaxed">
          If anything on this site is hard to use, tell us and we will fix it. Email{" "}
          <a
            href="mailto:accessibility@adf-secretariat.org"
            className="font-bold text-[#245a86] underline underline-offset-4"
          >
            accessibility@adf-secretariat.org
          </a>{" "}
          with the page address and the issue you hit.
        </p>
      </div>
    </section>
  </div>
);
