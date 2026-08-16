import React, { useState } from "react";
import { signIn, signUp } from "@/lib/spadraStore";

const inputBase =
  "h-auto px-4 py-3 rounded-none border-2 border-[#0f1b3d]/30 bg-white text-[#0f1b3d] focus-visible:ring-1 focus-visible:ring-[#245a86] focus-visible:border-[#245a86] text-base font-medium w-full";
const labelBase = "text-[11px] font-bold uppercase tracking-widest text-[#245a86] mb-2 block";

const MODES = ["Sign in", "Create account"] as const;
type Mode = (typeof MODES)[number];

const COUNTRIES = [
  "Kenya",
  "Ethiopia",
  "Nigeria",
  "South Africa",
  "Senegal",
  "Ghana",
  "Uganda",
  "Egypt",
  "Other African State",
  "International",
];

const ROLES = [
  "Member OPD representative",
  "Partner / funder",
  "Researcher",
  "Government official",
  "Journalist",
  "Individual advocate",
  "Student / youth leader",
];

export const SpadraGateway: React.FC = () => {
  const [mode, setMode] = useState<Mode>("Sign in");

  return (
    <div className="animate-fade-in">
      <section className="bg-[#0f1b3d] text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f5b301]">
              SPADRA — Pan-African Data & Advocacy Platform
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl uppercase leading-tight">
              One portal for African disability data, evidence and action
            </h1>
            <p className="mt-6 text-[#dbe6f2] text-lg leading-relaxed">
              The Strategic Partnership for Advancing Disability Rights in Africa brings together
              disability data, research, resources, organisations and stakeholders in a single
              digital workspace for the movement.
            </p>
            <ul className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: "query_stats",
                  label: "Data & insights",
                  desc: "Country profiles, indicators and analytics",
                },
                {
                  icon: "menu_book",
                  label: "Research & evidence",
                  desc: "Reports, papers and treaty monitoring",
                },
                {
                  icon: "folder_shared",
                  label: "Resources repository",
                  desc: "Toolkits with a personal saved list",
                },
                {
                  icon: "groups",
                  label: "Stakeholders",
                  desc: "OPDs, partners, governments, donors",
                },
              ].map((f) => (
                <li key={f.label} className="border-2 border-white/15 p-5">
                  <span className="material-symbols-outlined text-[#f5b301] text-2xl">
                    {f.icon}
                  </span>
                  <h2 className="mt-3 font-bold uppercase tracking-widest text-sm">{f.label}</h2>
                  <p className="mt-1 text-sm text-[#b7cbe0]">{f.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-2 border-[#f5b301] bg-white text-[#0f1b3d] p-6 md:p-8">
            <div className="flex rounded-none border-2 border-[#0f1b3d] overflow-hidden">
              {MODES.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`flex-1 py-2.5 font-bold uppercase tracking-widest text-xs text-center transition-colors cursor-pointer ${
                    mode === m ? "bg-[#0f1b3d] text-white" : "bg-[#e8edf3] text-[#0f1b3d]"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            {mode === "Sign in" ? <SignInForm /> : <SignUpForm />}
            <p className="mt-6 text-xs text-[#5b6b85]">
              This is a prototype. No data leaves your browser, and any account you create is stored
              locally for demonstration only.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signIn(email.trim() || "member@adf-portal.org");
      }}
      className="mt-6 space-y-5"
    >
      <div>
        <label htmlFor="spadra-signin-email" className={labelBase}>
          Email address
        </label>
        <input
          id="spadra-signin-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@organisation.org"
          className={inputBase}
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-[#0f1b3d] text-white font-bold uppercase tracking-widest text-sm hover:bg-[#1e3a5f] transition-colors cursor-pointer"
      >
        Sign in to the portal
      </button>
      <p className="text-xs text-[#5b6b85]">
        New to SPADRA? <span className="font-bold text-[#245a86]">Switch to “Create account”</span>{" "}
        to join.
      </p>
    </form>
  );
};

const SignUpForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [country, setCountry] = useState(COUNTRIES[0]!);
  const [role, setRole] = useState(ROLES[0]!);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signUp({
          name: name.trim() || "Portal User",
          email: email.trim() || "member@adf-portal.org",
          organisation: organisation.trim() || "My Organisation",
          country,
          role,
        });
      }}
      className="mt-6 space-y-5"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="spadra-name" className={labelBase}>
            Full name
          </label>
          <input
            id="spadra-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputBase}
          />
        </div>
        <div>
          <label htmlFor="spadra-email" className={labelBase}>
            Email
          </label>
          <input
            id="spadra-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputBase}
          />
        </div>
      </div>
      <div>
        <label htmlFor="spadra-org" className={labelBase}>
          Organisation
        </label>
        <input
          id="spadra-org"
          required
          value={organisation}
          onChange={(e) => setOrganisation(e.target.value)}
          className={inputBase}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="spadra-country" className={labelBase}>
            Country
          </label>
          <select
            id="spadra-country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={inputBase}
          >
            {COUNTRIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="spadra-role" className={labelBase}>
            I am a...
          </label>
          <select
            id="spadra-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={inputBase}
          >
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-[#0f1b3d] text-white font-bold uppercase tracking-widest text-sm hover:bg-[#1e3a5f] transition-colors cursor-pointer"
      >
        Create account and enter portal
      </button>
    </form>
  );
};
