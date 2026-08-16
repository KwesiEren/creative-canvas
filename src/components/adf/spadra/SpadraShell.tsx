import React from "react";
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
    <div className="animate-fade-in">
      <div className="bg-[#0f1b3d] text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f5b301]">
                SPADRA Portal
              </p>
              <h1 className="mt-1 text-2xl md:text-3xl uppercase font-bold">
                Welcome back, {user?.name.split(" ")[0]}
              </h1>
              <p className="mt-1 text-sm text-[#b7cbe0]">
                {user?.role} · {user?.organisation} · {user?.country}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f5b301]">
                <span className="material-symbols-outlined text-base">bookmark</span>
                {savedResources.length} saved
              </span>
              <button
                onClick={signOut}
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-bold uppercase tracking-widest text-xs px-4 py-2 hover:bg-white hover:text-[#0f1b3d] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">logout</span>
                Sign out
              </button>
            </div>
          </div>
        </div>
        <nav aria-label="SPADRA portal sections" className="border-t border-white/15 bg-[#0f1b3d]">
          <ul className="max-w-[1280px] mx-auto px-4 md:px-10 flex items-stretch overflow-x-auto">
            {PORTAL_TABS.map((tab) => (
              <li key={tab.id} className="shrink-0">
                <button
                  onClick={() => onChange(tab.id)}
                  aria-current={active === tab.id ? "page" : undefined}
                  className={`flex items-center gap-2 px-4 py-4 text-xs font-bold uppercase tracking-widest border-b-4 transition-colors cursor-pointer ${
                    active === tab.id
                      ? "border-[#f5b301] text-white"
                      : "border-transparent text-[#b7cbe0] hover:text-white"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">{tab.icon}</span>
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <main className="max-w-[1280px] mx-auto px-4 md:px-10 py-12">{children}</main>
    </div>
  );
};
