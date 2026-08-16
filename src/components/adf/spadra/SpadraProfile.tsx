import React, { useState } from "react";
import { RESOURCES_DATA } from "@/data/mockData";
import { useSpadra, toggleSaved, signOut } from "@/lib/spadraStore";

const inputBase =
  "h-auto px-4 py-3 rounded-sm border-2 border-[var(--s-primary)]/20 bg-white text-[var(--s-primary)] focus-visible:ring-1 focus-visible:ring-[var(--s-focus)] focus-visible:border-[var(--s-focus)] text-base font-medium w-full";
const labelBase =
  "text-[11px] font-bold uppercase tracking-widest text-[var(--s-accent)] mb-2 block";

export const SpadraProfile: React.FC = () => {
  const { user, savedResources } = useSpadra();
  const [name, setName] = useState(user?.name ?? "");
  const [organisation, setOrganisation] = useState(user?.organisation ?? "");
  const [country, setCountry] = useState(user?.country ?? "");
  const [savedNotice, setSavedNotice] = useState(false);

  const savedItems = RESOURCES_DATA.filter((r) => savedResources.includes(r.id));

  if (!user) return null;

  return (
    <div className="grid lg:grid-cols-2 gap-10 items-start">
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--s-primary)] uppercase">My profile</h2>
          <p className="mt-2 text-[var(--s-muted)]">
            Your account details. In this prototype profile edits are cosmetic — a real backend will
            persist them.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSavedNotice(true);
            window.setTimeout(() => setSavedNotice(false), 3000);
          }}
          className="border-2 border-[var(--s-primary)] p-6 space-y-5 bg-white"
        >
          <div>
            <label htmlFor="profile-email" className={labelBase}>
              Email (account)
            </label>
            <input
              id="profile-email"
              value={user.email}
              readOnly
              className={`${inputBase} bg-[var(--s-surface)]`}
            />
          </div>
          <div>
            <label htmlFor="profile-name" className={labelBase}>
              Full name
            </label>
            <input
              id="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputBase}
            />
          </div>
          <div>
            <label htmlFor="profile-org" className={labelBase}>
              Organisation
            </label>
            <input
              id="profile-org"
              value={organisation}
              onChange={(e) => setOrganisation(e.target.value)}
              className={inputBase}
            />
          </div>
          <div>
            <label htmlFor="profile-country" className={labelBase}>
              Country
            </label>
            <input
              id="profile-country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={inputBase}
            />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--s-accent)]">
            Role · {user.role}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="bg-[var(--s-primary)] text-white font-bold uppercase tracking-widest text-xs px-6 py-3 hover:bg-[var(--s-primary-hover)] transition-colors cursor-pointer"
            >
              Save changes
            </button>
            <button
              type="button"
              onClick={signOut}
              className="border-2 border-[var(--s-primary)] text-[var(--s-primary)] font-bold uppercase tracking-widest text-xs px-6 py-3 hover:bg-[var(--s-surface)] transition-colors cursor-pointer"
            >
              Sign out
            </button>
          </div>
          <p role="status" aria-live="polite" className="text-sm font-bold text-[#1f5c3d]">
            {savedNotice ? "Profile changes saved (locally)." : ""}
          </p>
        </form>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[var(--s-primary)] uppercase">Saved resources</h2>
          <span className="bg-[var(--s-primary)] text-white text-[11px] font-bold uppercase tracking-widest px-2.5 py-1">
            {savedItems.length}
          </span>
        </div>
        <ul className="mt-4 divide-y-2 divide-[var(--s-primary)]/15 border-2 border-[var(--s-primary)]">
          {savedItems.length === 0 ? (
            <li className="p-6 text-sm font-bold text-[var(--s-muted)]">
              No saved resources yet. Visit the Resources repository to bookmark items.
            </li>
          ) : (
            savedItems.map((r) => (
              <li key={r.id} className="p-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-[var(--s-primary)] leading-snug">{r.title}</h3>
                  <p className="mt-1 text-sm text-[var(--s-muted)]">
                    {r.category} · {r.year}
                  </p>
                </div>
                <button
                  onClick={() => toggleSaved(r.id)}
                  aria-label={`Remove ${r.title} from saved resources`}
                  className="shrink-0 flex items-center gap-1 border-2 border-[var(--s-primary)] px-3 py-2 text-xs font-bold uppercase tracking-widest text-[var(--s-primary)] hover:bg-[var(--s-surface)] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
};
