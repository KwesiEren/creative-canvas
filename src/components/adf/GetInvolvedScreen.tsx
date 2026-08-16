import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { PageHero, SectionHeading, btnPrimary } from "./ui";

const HERO_IMAGE =
  "/images/adf-event-1.jpg";

const inputBase =
  "h-auto px-4 py-3 rounded-none border-2 border-[#0f1b3d]/30 bg-white text-[#0f1b3d] focus-visible:ring-1 focus-visible:ring-[#245a86] focus-visible:border-[#245a86] text-base font-medium w-full";
const labelBase = "text-[11px] font-bold uppercase tracking-widest text-[#245a86] mb-2 block";

export const GetInvolvedScreen: React.FC = () => {
  const [donationSent, setDonationSent] = useState(false);
  const [volunteerSent, setVolunteerSent] = useState(false);
  const [partnerSent, setPartnerSent] = useState(false);

  return (
    <div className="animate-fade-in">
      <PageHero
        eyebrow="Get Involved"
        title="Stand with the African Disability Forum"
        intro="Donate, volunteer your skills, or partner with us to advance the rights of persons with disabilities across Africa."
        image={HERO_IMAGE}
        imageAlt="Volunteers working together in a community project"
      />

      <section className="max-w-[1280px] mx-auto px-4 md:px-10 py-16 space-y-16">
        {/* Donate */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <SectionHeading
              eyebrow="Donate"
              title="Power advocacy with a gift"
              intro="Your contribution directly powers grassroots OPD capacity building, youth leadership workshops and continental legal advocacy."
            />
            <div className="space-y-4 text-[#33415c] leading-relaxed">
              <p>
                <strong className="text-[#0f1b3d]">$50</strong> provides accessible learning
                toolkits for 5 youth leaders with sensory disabilities in grassroots OPD workshops.
              </p>
              <p>
                <strong className="text-[#0f1b3d]">$250</strong> supports a national coalition to
                table amendments on an inclusive accessibility law.
              </p>
              <div className="border-l-4 border-[#245a86] bg-[#e8edf3] p-5">
                <p className="text-sm font-bold text-[#0f1b3d]">
                  Every gift is used transparently. ADF reports annually against its safeguarding,
                  governance and financial accountability standards.
                </p>
              </div>
            </div>
          </div>

          <div className="border-2 border-[#0f1b3d] bg-white p-6 md:p-8">
            {donationSent ? (
              <div role="status" aria-live="polite" className="text-center py-10 space-y-4">
                <span className="material-symbols-outlined text-5xl text-[#245a86]">
                  volunteer_activism
                </span>
                <h3 className="text-2xl font-bold text-[#0f1b3d]">Generous Support Received</h3>
                <p className="text-[#33415c]">
                  Thank you. This is a mock donation flow — a payment gateway will be wired here
                  when the backend is live.
                </p>
                <button onClick={() => setDonationSent(false)} className={btnPrimary}>
                  Make another gift
                </button>
              </div>
            ) : (
              <DonateForm onDone={() => setDonationSent(true)} />
            )}
          </div>
        </div>

        {/* Volunteer */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="lg:order-2">
            <SectionHeading
              eyebrow="Volunteer"
              title="Lend your skills"
              intro="Legal drafting, data analysis, sign language interpretation, accessibility audits, translation and communications support are all in demand."
            />
            <div className="space-y-3 text-[#33415c] leading-relaxed">
              <p>
                Volunteers work alongside the secretariat in Addis Ababa or remotely from any AU
                member state.
              </p>
              <p>
                Reasonable accommodations and accessible tooling are provided for every volunteer
                placement.
              </p>
            </div>
          </div>

          <div className="border-2 border-[#0f1b3d] bg-white p-6 md:p-8">
            {volunteerSent ? (
              <div role="status" aria-live="polite" className="text-center py-10 space-y-4">
                <span className="material-symbols-outlined text-5xl text-[#245a86]">
                  diversity_3
                </span>
                <h3 className="text-2xl font-bold text-[#0f1b3d]">
                  Volunteer Application Received
                </h3>
                <p className="text-[#33415c]">
                  Our people team will reach out to match your skills with an active need.
                </p>
                <button onClick={() => setVolunteerSent(false)} className={btnPrimary}>
                  Apply again
                </button>
              </div>
            ) : (
              <VolunteerForm onDone={() => setVolunteerSent(true)} />
            )}
          </div>
        </div>

        {/* Partner */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <SectionHeading
              eyebrow="Partner with us"
              title="Join the coalition"
              intro="Funders, implementing NGOs, UN agencies, academic institutions and the private sector can all move inclusion forward."
            />
            <div className="space-y-3 text-[#33415c] leading-relaxed">
              <p>
                Explore current donors and implementing partners on the{" "}
                <Link
                  to="/partners"
                  className="font-bold text-[#245a86] underline underline-offset-4"
                >
                  Partners page
                </Link>
                , or reach the partnerships team directly.
              </p>
            </div>
          </div>

          <div className="border-2 border-[#0f1b3d] bg-white p-6 md:p-8">
            {partnerSent ? (
              <div role="status" aria-live="polite" className="text-center py-10 space-y-4">
                <span className="material-symbols-outlined text-5xl text-[#245a86]">handshake</span>
                <h3 className="text-2xl font-bold text-[#0f1b3d]">Partnership Enquiry Received</h3>
                <p className="text-[#33415c]">
                  The secretariat's partnerships team will respond within 5 working days.
                </p>
                <button onClick={() => setPartnerSent(false)} className={btnPrimary}>
                  Send another enquiry
                </button>
              </div>
            ) : (
              <PartnerForm onDone={() => setPartnerSent(true)} />
            )}
          </div>
        </div>

        <div className="bg-[#0f1b3d] text-white p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl uppercase font-bold">Not sure where to start?</h2>
            <p className="mt-2 text-[#dbe6f2]">
              Talk to the secretariat about the right way for you or your organisation to engage.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#f5b301] text-[#0f1b3d] font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-[#ffc933] transition-colors"
            >
              Contact the secretariat
            </Link>
            <Link
              to="/membership"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-white hover:text-[#0f1b3d] transition-colors"
            >
              Member directory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const DonateForm: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [amount, setAmount] = useState("50");
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"once" | "monthly">("monthly");

  const selectedValue = amount === "custom" ? customAmount : amount;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onDone();
      }}
      className="space-y-6"
    >
      <div className="flex rounded-none border-2 border-[#0f1b3d] overflow-hidden">
        {(["monthly", "once"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFrequency(f)}
            className={`flex-1 py-2.5 font-bold uppercase tracking-widest text-xs text-center transition-colors cursor-pointer ${
              frequency === f ? "bg-[#245a86] text-white" : "bg-[#e8edf3] text-[#0f1b3d]"
            }`}
          >
            {f === "monthly" ? "Monthly Gift" : "One-Time Gift"}
          </button>
        ))}
      </div>

      <div>
        <label className={labelBase}>Donation amount (USD)</label>
        <div className="grid grid-cols-4 gap-2">
          {["25", "50", "100", "250"].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setAmount(val)}
              className={`py-3 font-bold border-2 transition-all cursor-pointer ${
                amount === val
                  ? "border-[#245a86] bg-[#e8edf3] text-[#0f1b3d]"
                  : "border-[#c4c6cf] hover:border-[#245a86] text-[#33415c]"
              }`}
            >
              ${val}
            </button>
          ))}
        </div>
        <input
          type="number"
          min={1}
          placeholder="Or enter a custom amount"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            setAmount("custom");
          }}
          className={`${inputBase} mt-3`}
        />
      </div>

      <button type="submit" className={btnPrimary + " w-full"}>
        <span className="material-symbols-outlined text-base">favorite</span>
        Donate ${selectedValue || "50"} {frequency === "monthly" ? "/ month" : ""}
      </button>
      <p className="text-xs text-[#5b6b85]">
        Mock donation flow — a secure payment gateway connects here with the backend.
      </p>
    </form>
  );
};

const VolunteerForm: React.FC<{ onDone: () => void }> = ({ onDone }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onDone();
    }}
    className="space-y-6"
  >
    <div className="grid sm:grid-cols-2 gap-6">
      <div>
        <label htmlFor="vol-name" className={labelBase}>
          Full name
        </label>
        <input id="vol-name" required className={inputBase} />
      </div>
      <div>
        <label htmlFor="vol-email" className={labelBase}>
          Email
        </label>
        <input id="vol-email" type="email" required className={inputBase} />
      </div>
    </div>
    <div>
      <label htmlFor="vol-skills" className={labelBase}>
        Skills you can offer
      </label>
      <select id="vol-skills" required className={inputBase} defaultValue="">
        <option value="" disabled>
          Select a skill area
        </option>
        <option>Legal drafting & policy research</option>
        <option>Data analysis & visualisation</option>
        <option>Sign language interpretation</option>
        <option>Accessibility auditing (WCAG)</option>
        <option>Translation (EN / FR / SW)</option>
        <option>Communications & social media</option>
        <option>Grant writing & fundraising</option>
      </select>
    </div>
    <button type="submit" className={btnPrimary + " w-full"}>
      Submit volunteer application
    </button>
  </form>
);

const PartnerForm: React.FC<{ onDone: () => void }> = ({ onDone }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onDone();
    }}
    className="space-y-6"
  >
    <div>
      <label htmlFor="pt-org" className={labelBase}>
        Organisation
      </label>
      <input id="pt-org" required className={inputBase} />
    </div>
    <div>
      <label htmlFor="pt-type" className={labelBase}>
        Organisation type
      </label>
      <select id="pt-type" required className={inputBase} defaultValue="">
        <option value="" disabled>
          Select a type
        </option>
        <option>Donor / Funder</option>
        <option>Implementing NGO</option>
        <option>UN or intergovernmental agency</option>
        <option>Academic institution</option>
        <option>Private sector</option>
        <option>OPD federation</option>
      </select>
    </div>
    <div>
      <label htmlFor="pt-msg" className={labelBase}>
        How would you like to partner?
      </label>
      <textarea
        id="pt-msg"
        rows={4}
        required
        placeholder="Briefly describe the partnership opportunity..."
        className={`${inputBase} resize-y min-h-[100px]`}
      />
    </div>
    <button type="submit" className={btnPrimary + " w-full"}>
      Send partnership enquiry
    </button>
  </form>
);
