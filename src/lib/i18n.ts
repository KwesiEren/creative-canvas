import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export type Locale = "en" | "fr" | "kis";

export const LOCALES: { code: Locale; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "fr", label: "French", native: "Français" },
  { code: "kis", label: "Kiswahili", native: "Kiswahili" },
];

type Dict = Record<string, string>;

const EN: Dict = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.programmes": "Programmes",
  "nav.resources": "Resources",
  "nav.advocacy": "Advocacy",
  "nav.news": "News",
  "nav.events": "Events",
  "nav.knowledgeHub": "Knowledge Hub",
  "nav.youth": "Youth",
  "nav.membership": "Membership",
  "nav.partners": "Partners",
  "nav.careers": "Careers",
  "nav.getInvolved": "Get Involved",
  "nav.spadra": "SPADRA",
  "nav.governance": "Governance",
  "nav.contact": "Contact",
  "nav.search": "Search",
  "nav.accessibility": "Accessibility",
  "nav.privacy": "Privacy",

  "common.readMore": "Read more",
  "common.viewAll": "View all",
  "common.backToList": "Back to list",
  "common.applyNow": "Apply now",
  "common.register": "Register",
  "common.download": "Download",
  "common.share": "Share this page",
  "common.related": "Related",
  "common.filterBy": "Filter by",
  "common.search": "Search",
  "common.clear": "Clear",
  "common.page": "Page",
  "common.of": "of",
  "common.previous": "Previous",
  "common.next": "Next",
  "common.loading": "Loading…",
  "common.noResults": "No results found.",
  "common.required": "Required",
  "common.submit": "Submit",
  "common.success": "Thank you — your submission has been received.",
  "common.error": "Something went wrong. Please try again.",

  "detail.dateline": "Published",
  "detail.category": "Category",
  "detail.author": "Author",
  "detail.year": "Year",
  "detail.language": "Language",
  "detail.pages": "Pages",
  "detail.objectives": "Objectives",
  "detail.impact": "Impact",
  "detail.partners": "Donors & Partners",
  "detail.requirements": "Requirements",
  "detail.location": "Location",
  "detail.deadline": "Deadline",
  "detail.country": "Country",
  "detail.type": "Type",
  "detail.date": "Date",
  "detail.time": "Time",
  "detail.audience": "Audience",
  "detail.department": "Department",
  "detail.accessibleFormats": "Accessible formats",
  "detail.accessibleHTML": "Read accessible HTML version",

  "assistant.disclosure": "You are interacting with an AI assistant. Answers are indicative and should be verified against official ADF publications.",
  "assistant.suggest": "Try asking",
  "assistant.sources": "Sources",
  "assistant.reset": "Reset conversation",
  "assistant.title": "ADF Assistant",

  "spadra.dashboard": "Dashboard",
  "spadra.policyTracker": "Policy Tracker",
  "spadra.countryProfiles": "Country Profiles",
  "spadra.consortium": "Consortium Portal",
  "spadra.knowledge": "Knowledge Hub",
  "spadra.statistics": "Statistics",

  "search.filterAll": "All",
  "search.filterNews": "News",
  "search.filterProgrammes": "Programmes",
  "search.filterResources": "Resources",
  "search.filterEvents": "Events",
  "search.filterCareers": "Careers",
  "search.filterKnowledge": "Knowledge Hub",
  "search.resultCount": "results",

  "footer.rights": "All rights reserved.",
  "footer.sitemap": "Sitemap",
};

const FR: Dict = {
  "nav.home": "Accueil",
  "nav.about": "À propos",
  "nav.programmes": "Programmes",
  "nav.resources": "Ressources",
  "nav.advocacy": "Plaidoyer",
  "nav.news": "Actualités",
  "nav.events": "Événements",
  "nav.knowledgeHub": "Centre de connaissances",
  "nav.youth": "Jeunesse",
  "nav.membership": "Membres",
  "nav.partners": "Partenaires",
  "nav.careers": "Carrières",
  "nav.getInvolved": "S'engager",
  "nav.spadra": "SPADRA",
  "nav.governance": "Gouvernance",
  "nav.contact": "Contact",
  "nav.search": "Recherche",
  "nav.accessibility": "Accessibilité",
  "nav.privacy": "Confidentialité",
  "common.readMore": "Lire la suite",
  "common.viewAll": "Voir tout",
  "common.backToList": "Retour à la liste",
  "common.applyNow": "Postuler",
  "common.register": "S'inscrire",
  "common.download": "Télécharger",
  "common.share": "Partager cette page",
  "common.related": "Connexes",
  "common.filterBy": "Filtrer par",
  "common.search": "Recherche",
  "common.clear": "Effacer",
  "common.page": "Page",
  "common.of": "sur",
  "common.previous": "Précédent",
  "common.next": "Suivant",
  "common.loading": "Chargement…",
  "common.noResults": "Aucun résultat.",
  "common.required": "Requis",
  "common.submit": "Envoyer",
  "common.success": "Merci — votre demande a été reçue.",
  "common.error": "Erreur. Veuillez réessayer.",
  "detail.dateline": "Publié",
  "detail.category": "Catégorie",
  "detail.author": "Auteur",
  "detail.year": "Année",
  "detail.language": "Langue",
  "detail.pages": "Pages",
  "detail.objectives": "Objectifs",
  "detail.impact": "Impact",
  "detail.partners": "Bailleurs & Partenaires",
  "detail.requirements": "Prérequis",
  "detail.location": "Lieu",
  "detail.deadline": "Date limite",
  "detail.country": "Pays",
  "detail.type": "Type",
  "detail.date": "Date",
  "detail.time": "Horaire",
  "detail.audience": "Public",
  "detail.department": "Département",
  "detail.accessibleFormats": "Formats accessibles",
  "detail.accessibleHTML": "Lire la version HTML accessible",
  "assistant.disclosure": "Vous interagissez avec un assistant IA. Les réponses sont indicatives.",
  "assistant.suggest": "Essayez de demander",
  "assistant.sources": "Sources",
  "assistant.reset": "Réinitialiser",
  "assistant.title": "Assistant ADF",
  "spadra.dashboard": "Tableau de bord",
  "spadra.policyTracker": "Suivi politique",
  "spadra.countryProfiles": "Profils pays",
  "spadra.consortium": "Portail consortium",
  "spadra.knowledge": "Centre de connaissances",
  "spadra.statistics": "Statistiques",
  "search.filterAll": "Tous",
  "search.filterNews": "Actualités",
  "search.filterProgrammes": "Programmes",
  "search.filterResources": "Ressources",
  "search.filterEvents": "Événements",
  "search.filterCareers": "Carrières",
  "search.filterKnowledge": "Centre de connaissances",
  "search.resultCount": "résultats",
  "footer.rights": "Tous droits réservés.",
  "footer.sitemap": "Plan du site",
};

const KIS: Dict = {
  "nav.home": "Nyumbani",
  "nav.about": "Kuhusu",
  "nav.programmes": "Mikakati",
  "nav.resources": "Rasilimali",
  "nav.advocacy": "Uendeshaji",
  "nav.news": "Habari",
  "nav.events": "Matukio",
  "nav.knowledgeHub": "Kituo cha Maarifa",
  "nav.youth": "Vijana",
  "nav.membership": "Uanachama",
  "nav.partners": "Washirika",
  "nav.careers": "Ajira",
  "nav.getInvolved": "Jitokeze",
  "nav.spadra": "SPADRA",
  "nav.governance": "Utawala",
  "nav.contact": "Mawasiliano",
  "nav.search": "Tafuta",
  "nav.accessibility": "Ufikiaji",
  "nav.privacy": "Faragha",
  "common.readMore": "Soma zaidi",
  "common.viewAll": "Tazama zote",
  "common.backToList": "Rudi kwenye orodha",
  "common.applyNow": "Omba sasa",
  "common.register": "Jisajili",
  "common.download": "Pakua",
  "common.share": "Sambaza ukurasa huu",
  "common.related": "Vinavyohusiana",
  "common.filterBy": "Chuja kwa",
  "common.search": "Tafuta",
  "common.clear": "Futa",
  "common.page": "Ukurasa",
  "common.of": "ya",
  "common.previous": "Iliotangulia",
  "common.next": "Ifuatayo",
  "common.loading": "Inapakia…",
  "common.noResults": "Hakuna matokeo.",
  "common.required": "Inahitajika",
  "common.submit": "Tuma",
  "common.success": "Asante — ombi lako limepokelewa.",
  "common.error": "Kosa. Tafadhali jaribu tena.",
  "detail.dateline": "Imechapishwa",
  "detail.category": "Kategoria",
  "detail.author": "Mwandishi",
  "detail.year": "Mwaka",
  "detail.language": "Lugha",
  "detail.pages": "Kurasa",
  "detail.objectives": "Lengo",
  "detail.impact": "Athari",
  "detail.partners": "Wafadhili & Washirika",
  "detail.requirements": "Masharti",
  "detail.location": "Mahali",
  "detail.deadline": "Mwisho wa muda",
  "detail.country": "Nchi",
  "detail.type": "Aina",
  "detail.date": "Tarehe",
  "detail.time": "Muda",
  "detail.audience": "Watazamaji",
  "detail.department": "Idara",
  "detail.accessibleFormats": "Maumbo ya ufikiaji",
  "detail.accessibleHTML": "Soma toleo la HTML linalofikia",
  "assistant.disclosure": "Unafanikishwa na msaada wa AI. Majibu ni ya mwongozo.",
  "assistant.suggest": "Jaribu kuuliza",
  "assistant.sources": "Vyanzo",
  "assistant.reset": "Anzisha upya",
  "assistant.title": "Msaidizi wa ADF",
  "spadra.dashboard": "Dashibodi",
  "spadra.policyTracker": "Ufuatiliaji wa Sera",
  "spadra.countryProfiles": "Wasifu wa Nchi",
  "spadra.consortium": "Portali ya Shirikisho",
  "spadra.knowledge": "Kituo cha Maarifa",
  "spadra.statistics": "Takwimu",
  "search.filterAll": "Zote",
  "search.filterNews": "Habari",
  "search.filterProgrammes": "Mikakati",
  "search.filterResources": "Rasilimali",
  "search.filterEvents": "Matukio",
  "search.filterCareers": "Ajira",
  "search.filterKnowledge": "Kituo cha Maarifa",
  "search.resultCount": "matokeo",
  "footer.rights": "Haki zote zimehifadhiwa.",
  "footer.sitemap": "Ramani ya tovuti",
};

const DICTS: Record<Locale, Dict> = { en: EN, fr: FR, kis: KIS };
const STORAGE_KEY = "adf.locale";

export function t(locale: Locale, key: string): string {
  return DICTS[locale][key] ?? DICTS.en[key] ?? key;
}

export function loadSavedLocale(defaultFallback: Locale = "en"): Locale {
  if (typeof window === "undefined") return defaultFallback;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === "en" || v === "fr" || v === "kis") return v;
  } catch {
    /* noop */
  }
  return defaultFallback;
}

export function saveLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.setAttribute("lang", locale === "kis" ? "sw" : locale);
  } catch {
    /* noop */
  }
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

export interface I18nProviderProps {
  locale: Locale;
  setLocale: (next: Locale) => void;
  children: ReactNode;
}

export function I18nProvider({ locale, setLocale, children }: I18nProviderProps) {
  const value: I18nContextValue = {
    locale,
    setLocale,
    t: (key) => t(locale, key),
  };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
