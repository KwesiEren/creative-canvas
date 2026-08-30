import React from "react";
import { assetUrl } from "@/lib/assetUrl";
import { PageBanner, SectionHeading } from "./ui";

export const PrivacyScreen: React.FC = () => (
  <div className="animate-fade-in">
    <PageBanner
      title="Privacy Policy"
      crumbs={[{ label: "Home" }, { label: "Privacy" }]}
      image={assetUrl("/images/adf-event-4.jpg")}
      imageAlt="ADF privacy and data protection"
    />

    <section className="max-w-[900px] mx-auto px-4 md:px-10 py-16 space-y-16">
      {[
        {
          title: "Who we are",
          body: "The African Disability Forum (ADF) is the continental membership organisation of organisations of persons with disabilities. This notice covers adf-secretariat.org and the SPADRA portal.",
        },
        {
          title: "Data we collect",
          body: "When you register for events, sign up to the SPADRA portal, donate, or contact us, we collect the information you provide: name, email, organisation, country and any accessibility needs you share. We also collect basic, anonymous analytics about site usage.",
        },
        {
          title: "How we use it",
          body: "We use your data to process registrations, deliver the services you request, send updates you opt into, respond to enquiries and improve the accessibility of the site. We do not sell personal data.",
        },
        {
          title: "Legal basis",
          body: "We process personal data with your consent, to perform a contract with you, or for our legitimate interests in running a membership federation and providing accurate disability data and advocacy information.",
        },
        {
          title: "Sharing",
          body: "We share data only with service providers who process it on our behalf (such as event and donation platforms), and never market your data to third parties.",
        },
        {
          title: "Retention",
          body: "We keep personal data only as long as needed for the purpose it was collected, or as required by applicable law.",
        },
        {
          title: "Your rights",
          body: "Depending on your country of residence, you may have rights to access, correct, delete or restrict your personal data, and to object to processing. Contact us to exercise any of these.",
        },
        {
          title: "Cookies & storage",
          body: "This prototype stores some preferences (such as accessibility settings and portal login state) locally in your browser. We use minimal cookies for core site function and analytics.",
        },
        {
          title: "Contact",
          body: "For privacy questions or requests, email privacy@adf-secretariat.org or write to the ADF Executive Secretariat, Addis Ababa, Ethiopia.",
        },
      ].map((section) => (
        <section key={section.title}>
          <SectionHeading eyebrow="Privacy notice" title={section.title} />
          <p className="mt-3 text-lg leading-relaxed text-[#33415c]">{section.body}</p>
        </section>
      ))}
    </section>
  </div>
);
