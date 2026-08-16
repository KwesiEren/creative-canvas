import React from "react";
import { Link } from "@tanstack/react-router";
import { useSpadra, signOut } from "@/lib/spadraStore";

export const PORTAL_TABS = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "data", label: "Data & Insights", icon: "query_stats" },
  { id: "research", label: "Research & Evidence", icon: "science" },
  { id: "resources", label: "Resources", icon: "folder_shared" },
  { id: "organisations", label: "Organisations", icon: "groups" },
  { id: "programmes", label: "Programmes", icon: "rocket_launch" },
  { id: "events", label: "Events", icon: "event" },
  { id: "profile", label: "My Profile", icon: "account_circle" },
] as const;

export type PortalTabId = (typeof PORTAL_TABS)[number]["id"];

interface Props {
  active: PortalTabId;
  onChange: (tab: PortalTabId) => void;
  children: React.ReactNode;
}

export const SpadraShell: React.FC<Props> = ({ active, onChange, children }) => {
  const { user, savedResources } = useSpadra();

  return (
    <div className="animate-fade-in min-h-screen bg-white">
      {/* Branded header bar */}
      <header className="bg-[var(--s-primary)] text-white border-b-2 border-[var(--s-highlight)]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">school</span>
            </div>
            <div>
              <span className="font-bold text-sm tracking-wide">SPADRA</span>
              <span className="hidden sm:inline text-white/60 text-xs ml-2">
                African Disability Forum
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-white/70">
              <span className="material-symbols-outlined text-sm">bookmark</span>
              {savedResources.length} saved
            </span>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-1.5 border border-white/30 text-white font-semibold text-xs px-3 py-1.5 rounded-sm hover:bg-white hover:text-[var(--s-primary)] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Welcome section */}
      <div className="bg-[var(--s-surface)] border-b border-[var(--s-primary)]/10">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-6">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--s-accent)]">
            SPADRA Portal
          </p>
          <h1 className="mt-1 text-2xl md:text-3xl font-bold text-[var(--s-primary)]">
            Welcome back, {user?.name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-sm text-[var(--s-muted)]">
            {user?.role} · {user?.organisation} · {user?.country}
          </p>
        </div>
      </div>

      {/* Tab navigation */}
      <nav
        aria-label="SPADRA portal sections"
        className="bg-white border-b-2 border-[var(--s-primary)]/15 sticky top-0 z-30"
      >
        <ul className="max-w-[1280px] mx-auto px-4 md:px-10 flex items-stretch overflow-x-auto">
          {PORTAL_TABS.map((tab) => (
            <li key={tab.id} className="shrink-0">
              <button
                onClick={() => onChange(tab.id)}
                aria-current={active === tab.id ? "page" : undefined}
                className={`flex items-center gap-2 px-4 py-4 text-xs font-bold uppercase tracking-widest border-b-4 transition-colors cursor-pointer ${
                  active === tab.id
                    ? "border-[var(--s-accent)] text-[var(--s-primary)]"
                    : "border-transparent text-[var(--s-muted)] hover:text-[var(--s-primary)]"
                }`}
              >
                <span className="material-symbols-outlined text-base">{tab.icon}</span>
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="max-w-[1280px] mx-auto px-4 md:px-10 py-12">{children}</main>
    </div>
  );
};
