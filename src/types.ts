export type NavTab =
  | "home"
  | "about"
  | "programmes"
  | "resources"
  | "advocacy"
  | "news"
  | "careers"
  | "contact"
  | "governance"
  | "events"
  | "knowledge-hub"
  | "youth"
  | "membership"
  | "partners"
  | "get-involved"
  | "spadra"
  | "search"
  | "accessibility"
  | "privacy";

export type AboutSubSection =
  | "who"
  | "history"
  | "vision"
  | "leadership"
  | "membership";

export type ProgrammeId =
  | "spadra"
  | "we-are-able"
  | "we-can-work"
  | "helasia"
  | "csso";

export interface NavExtra {
  subSection?: AboutSubSection;
  programmeId?: ProgrammeId;
  filterCategory?: string;
}

export interface AccessibilitySettings {
  fontSize: "normal" | "large" | "xlarge";
  highContrast: boolean;
  dyslexicFont: boolean;
  reducedMotion: boolean;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

export interface EventItem {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  country: string;
  isVirtual: boolean;
  description: string;
  targetAudience: string;
  registrationUrl: string;
  status: string;
}

export interface ProgrammeImpactStat {
  label: string;
  value: string;
}

export interface ProgrammeItem {
  id: ProgrammeId;
  name: string;
  acronym: string;
  tagline: string;
  summary: string;
  objectives: string[];
  impactStats: ProgrammeImpactStat[];
  donorsAndPartners: string[];
  leadRegion: string;
  image: string;
}

export interface CareerItem {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  deadline: string;
  summary: string;
  requirements: string[];
}

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  year: number;
  downloadUrl: string;
  description: string;
  pages: number;
  author: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  datetime: string;
  image: string;
  summary: string;
  content: string;
}

export interface ExecutiveMember {
  id: string;
  name: string;
  role: string;
  organization: string;
  image: string;
  bio: string;
}

export interface OpdCountry {
  country: string;
  opdName: string;
  region: string;
  coordinates: { x: number; y: number };
  membersCount: number;
}

export type KnowledgeFormat = "Report" | "Toolkit" | "Video" | "Audio" | "Easy Read" | "Infographic";

export interface KnowledgeItem {
  id: string;
  title: string;
  theme: string;
  format: KnowledgeFormat;
  language: string;
  year: number;
  duration?: string;
  summary: string;
  accessibleFormats: string[];
}

export interface YouthOpportunity {
  id: string;
  title: string;
  kind: "Internship" | "Fellowship" | "Volunteering" | "Grant";
  location: string;
  deadline: string;
  summary: string;
}

export interface YouthStory {
  id: string;
  title: string;
  name: string;
  country: string;
  image: string;
  quote: string;
  body: string;
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface PollItem {
  id: string;
  question: string;
  options: PollOption[];
}

export interface PartnerItem {
  id: string;
  name: string;
  type: "Donor" | "Implementing Partner" | "Institutional" | "Network";
  country: string;
  description: string;
}

export interface PolicyTrackerRow {
  country: string;
  code: string;
  crpdRatified: boolean;
  protocolSigned: boolean;
  protocolRatified: boolean;
  nationalLaw: string;
  lastUpdated: string;
}

export interface CountryProfile {
  code: string;
  country: string;
  region: string;
  population: string;
  prevalence: string;
  focalOpd: string;
  summary: string;
  indicators: { label: string; value: number }[];
  milestones: { year: string; event: string }[];
}
