import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import type {
  AboutSubSection,
  AccessibilitySettings,
  NavExtra,
  NavTab,
  ProgrammeId,
} from "@/types";
import { htmlLang, type Locale } from "@/lib/i18n";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AccessibilityModal } from "./AccessibilityModal";
import { DonateModal } from "./DonateModal";
import { MembershipModal } from "./MembershipModal";
import { TakeActionModal } from "./TakeActionModal";
import { AdfAssistantWidget } from "./AdfAssistantWidget";

const TAB_TO_PATH: Record<NavTab, string> = {
  home: "/",
  about: "/about",
  programmes: "/programmes",
  resources: "/resources",
  advocacy: "/advocacy",
  news: "/news",
  careers: "/careers",
  contact: "/contact",
  governance: "/governance",
  events: "/events",
  "knowledge-hub": "/knowledge-hub",
  youth: "/youth",
  membership: "/membership",
  partners: "/partners",
  "get-involved": "/get-involved",
  spadra: "/spadra",
  search: "/search",
  accessibility: "/accessibility",
  privacy: "/privacy",
};

const PATH_TO_TAB: Record<string, NavTab> = Object.fromEntries(
  Object.entries(TAB_TO_PATH).map(([tab, path]) => [path, tab as NavTab]),
) as Record<string, NavTab>;

interface AdfContextValue {
  extra: NavExtra;
  onNavigate: (tab: NavTab, extra?: NavExtra) => void;
  onOpenTakeAction: () => void;
  onOpenDonate: () => void;
  onOpenMembership: () => void;
  onOpenAccessibility: () => void;
  lang: Locale;
  setLang: (locale: Locale) => void;
}

const AdfContext = createContext<AdfContextValue | null>(null);

export function useAdf(): AdfContextValue {
  const ctx = useContext(AdfContext);
  if (!ctx) throw new Error("useAdf must be used inside AppShell");
  return ctx;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: "normal",
  highContrast: false,
  dyslexicFont: false,
  reducedMotion: false,
};

export function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const currentTab: NavTab =
    PATH_TO_TAB[pathname] ??
    PATH_TO_TAB[`/${pathname.split("/").filter(Boolean)[0] ?? ""}`] ??
    "home";

  const [extra, setExtra] = useState<NavExtra>({});
  const [takeActionOpen, setTakeActionOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [membershipOpen, setMembershipOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [lang, setLang] = useState<Locale>("en");

  useEffect(() => {
    document.documentElement.lang = htmlLang(lang);
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("hc", settings.highContrast);
    root.classList.toggle("reduce-motion", settings.reducedMotion);
    root.classList.toggle("dyslexic", settings.dyslexicFont);
    root.style.setProperty(
      "--text-scale",
      settings.fontSize === "xlarge" ? "1.25" : settings.fontSize === "large" ? "1.125" : "1",
    );
  }, [settings]);

  const value = useMemo<AdfContextValue>(
    () => ({
      extra,
      onNavigate: (tab, nextExtra) => {
        setExtra(nextExtra ?? {});
        void navigate({ to: TAB_TO_PATH[tab] });
      },
      onOpenTakeAction: () => setTakeActionOpen(true),
      onOpenDonate: () => setDonateOpen(true),
      onOpenMembership: () => setMembershipOpen(true),
      onOpenAccessibility: () => setAccessibilityOpen(true),
      lang,
      setLang,
    }),
    [extra, navigate, lang],
  );

  return (
    <AdfContext.Provider value={value}>
      <div className="flex min-h-screen flex-col">
        <Header
          currentTab={currentTab}
          onNavigate={value.onNavigate}
          onOpenAccessibility={value.onOpenAccessibility}
          onOpenTakeAction={value.onOpenTakeAction}
          onOpenDonate={value.onOpenDonate}
          lang={lang}
          setLang={setLang}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer onNavigate={value.onNavigate} onOpenAccessibility={value.onOpenAccessibility} />
      </div>

      <AdfAssistantWidget
        currentTab={currentTab}
        onNavigate={(tab) => value.onNavigate(tab)}
        onOpenSettings={value.onOpenAccessibility}
      />
      <TakeActionModal isOpen={takeActionOpen} onClose={() => setTakeActionOpen(false)} />
      <DonateModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
      <MembershipModal isOpen={membershipOpen} onClose={() => setMembershipOpen(false)} />
      <AccessibilityModal
        isOpen={accessibilityOpen}
        onClose={() => setAccessibilityOpen(false)}
        settings={settings}
        onUpdateSettings={(next) => setSettings((prev) => ({ ...prev, ...next }))}
      />
    </AdfContext.Provider>
  );
}

export type { AboutSubSection, ProgrammeId };
