export type NavTab =
  | "home"
  | "about"
  | "programmes"
  | "resources"
  | "advocacy"
  | "news"
  | "careers"
  | "contact"
  | "governance";

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
