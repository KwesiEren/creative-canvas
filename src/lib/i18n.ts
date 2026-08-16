/**
 * Lightweight multilingual stub.
 *
 * English is complete; French and Kiswahili provide translated UI strings and
 * fall back to English for anything not yet translated. Route content itself is
 * not yet translated — that is tracked as follow-up work.
 */
export const LOCALES = ["en", "fr", "kis"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  kis: "Kiswahili",
};

type Dictionary = Partial<Record<string, string>>;

const en: Dictionary = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.programmes": "Programmes",
  "nav.resources": "Resources",
  "nav.advocacy": "Advocacy",
  "nav.news": "News",
  "nav.careers": "Careers",
  "nav.contact": "Contact",
  "nav.governance": "Governance",
  "nav.events": "Events",
  "nav.knowledge-hub": "Knowledge Hub",
  "nav.youth": "Youth",
  "nav.membership": "Membership",
  "nav.partners": "Partners",
  "nav.get-involved": "Get Involved",
  "nav.spadra": "SPADRA Portal",
  "common.search": "Search",
  "common.accessibility": "Accessibility",
  "common.learnMore": "Learn more",
  "common.readMore": "Read more",
  "common.contactUs": "Contact us",
  "common.signUp": "Create account",
  "common.signIn": "Sign in",
};

const fr: Dictionary = {
  "nav.home": "Accueil",
  "nav.about": "À propos",
  "nav.programmes": "Programmes",
  "nav.resources": "Ressources",
  "nav.advocacy": "Plaidoyer",
  "nav.news": "Actualités",
  "nav.careers": "Carrières",
  "nav.contact": "Contact",
  "nav.governance": "Gouvernance",
  "nav.events": "Événements",
  "nav.knowledge-hub": "Centre de connaissances",
  "nav.youth": "Jeunesse",
  "nav.membership": "Adhésion",
  "nav.partners": "Partenaires",
  "nav.get-involved": "S'impliquer",
  "nav.spadra": "Portail SPADRA",
  "common.search": "Rechercher",
  "common.accessibility": "Accessibilité",
  "common.learnMore": "En savoir plus",
  "common.readMore": "Lire la suite",
  "common.contactUs": "Contactez-nous",
  "common.signUp": "Créer un compte",
  "common.signIn": "Se connecter",
};

const kis: Dictionary = {
  "nav.home": "Nyumbani",
  "nav.about": "Kuhusu Sisi",
  "nav.programmes": "Mipango",
  "nav.resources": "Rasilimali",
  "nav.advocacy": "Utetezi",
  "nav.news": "Habari",
  "nav.careers": "Kazi",
  "nav.contact": "Wasiliana nasi",
  "nav.governance": "Utawala",
  "nav.events": "Matukio",
  "nav.knowledge-hub": "Kituo cha Maarifa",
  "nav.youth": "Vijana",
  "nav.membership": "Uanachama",
  "nav.partners": "Washirika",
  "nav.get-involved": "Shiriki",
  "nav.spadra": "Lango la SPADRA",
  "common.search": "Tafuta",
  "common.accessibility": "Ufikivu",
  "common.learnMore": "Jifunze zaidi",
  "common.readMore": "Soma zaidi",
  "common.contactUs": "Wasiliana nasi",
  "common.signUp": "Fungua akaunti",
  "common.signIn": "Ingia",
};

const DICTIONARIES: Record<Locale, Dictionary> = { en, fr, kis };

export function t(locale: Locale, key: string): string {
  const value = DICTIONARIES[locale]?.[key];
  if (value) return value;
  return DICTIONARIES.en[key] ?? key;
}

export function htmlLang(locale: Locale): string {
  return locale === "kis" ? "sw" : locale;
}
