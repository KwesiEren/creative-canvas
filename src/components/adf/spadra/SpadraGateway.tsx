import React, { useState } from "react";
import { signIn, signUp } from "@/lib/spadraStore";

const inputBase =
  "h-auto px-4 py-3 rounded-sm border-2 border-[var(--s-primary)]/20 bg-white text-[var(--s-primary)] focus-visible:ring-1 focus-visible:ring-[var(--s-focus)] focus-visible:border-[var(--s-focus)] text-base font-medium w-full";
const labelBase = "text-sm font-bold text-[var(--s-primary)] mb-2 block";

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
    <div className="animate-fade-in min-h-screen bg-[var(--s-surface)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 md:p-10">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-[var(--s-primary)] flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-white text-3xl">school</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--s-primary)]">SPADRA Portal</h1>
          <p className="mt-2 text-sm text-[var(--s-muted)] leading-relaxed">
            Sign in to access disability data, research, resources and advocacy tools across Africa.
          </p>
        </div>

        <div className="mt-8 flex rounded-sm border-2 border-[var(--s-primary)] overflow-hidden">
          {MODES.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`flex-1 py-2.5 font-bold uppercase tracking-widest text-xs text-center transition-colors cursor-pointer ${
                mode === m
                  ? "bg-[var(--s-primary)] text-white"
                  : "bg-[var(--s-surface)] text-[var(--s-primary)]"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {mode === "Sign in" ? <SignInForm /> : <SignUpForm />}

        <p className="mt-6 text-xs text-[var(--s-muted)] text-center">
          Don't have access credentials?{" "}
          <span className="font-bold text-[var(--s-accent)]">Contact the programme office</span> for
          assistance.
        </p>
        <p className="mt-3 text-[11px] text-[var(--s-muted)] text-center">
          This is a prototype. No data leaves your browser, and any account you create is stored
          locally for demonstration only.
        </p>
      </div>
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
      className="mt-8 space-y-5"
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
        className="w-full py-3 bg-[var(--s-primary)] text-white font-bold uppercase tracking-widest text-sm hover:bg-[var(--s-primary-hover)] transition-colors cursor-pointer"
      >
        Sign in to the portal
      </button>
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
      className="mt-8 space-y-5"
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
        className="w-full py-3 bg-[var(--s-primary)] text-white font-bold uppercase tracking-widest text-sm hover:bg-[var(--s-primary-hover)] transition-colors cursor-pointer"
      >
        Create account and enter portal
      </button>
    </form>
  );
};
