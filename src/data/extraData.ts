import type {
  CountryProfile,
  KnowledgeItem,
  PartnerItem,
  PollItem,
  PolicyTrackerRow,
  YouthOpportunity,
  YouthStory,
} from '../types';

/** Mock content for the Knowledge Hub, Youth, Partners and SPADRA sections. */

export const KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  {
    id: 'kh-1',
    title: 'Shadow Reporting Toolkit for National OPDs',
    theme: 'Treaty Monitoring',
    format: 'Toolkit',
    language: 'English',
    year: 2024,
    summary: 'A step-by-step workbook covering evidence gathering, disaggregated data, drafting and submission timelines for the UN CRPD Committee.',
    accessibleFormats: ['Easy Read', 'Braille-ready DOCX', 'Screen-reader tagged PDF'],
  },
  {
    id: 'kh-2',
    title: 'Comprendre le Protocole africain sur le handicap',
    theme: 'African Disability Protocol',
    format: 'Report',
    language: 'French',
    year: 2024,
    summary: 'Analyse article par article du Protocole, avec des recommandations pour les parlements nationaux et les coalitions d’OPH.',
    accessibleFormats: ['Tagged PDF', 'Audio summary'],
  },
  {
    id: 'kh-3',
    title: 'Inclusive Employment: Employer Field Guide',
    theme: 'Economic Inclusion',
    format: 'Toolkit',
    language: 'English',
    year: 2023,
    summary: 'Practical workplace adaptation checklists, reasonable accommodation budgeting and inclusive recruitment templates for African employers.',
    accessibleFormats: ['Easy Read', 'Large print'],
  },
  {
    id: 'kh-4',
    title: 'Voices from the Grassroots — Episode 4: Rural Access',
    theme: 'Community Advocacy',
    format: 'Audio',
    language: 'Kiswahili',
    year: 2024,
    duration: '32 min',
    summary: 'Podcast conversation with rural OPD organisers in Tanzania and Uganda on transport, land rights and local budget advocacy.',
    accessibleFormats: ['Full transcript', 'English translation'],
  },
  {
    id: 'kh-5',
    title: 'How a Bill Becomes Inclusive Law',
    theme: 'Legislative Advocacy',
    format: 'Video',
    language: 'English',
    year: 2023,
    duration: '8 min',
    summary: 'Animated explainer tracing a disability rights bill from drafting to domestication, with sign language interpretation.',
    accessibleFormats: ['Sign language track', 'Captions', 'Audio description'],
  },
  {
    id: 'kh-6',
    title: 'Disability Data at a Glance: Africa 2024',
    theme: 'Research & Data',
    format: 'Infographic',
    language: 'English',
    year: 2024,
    summary: 'One-page visual of prevalence estimates, ratification status and education participation, with a full data table equivalent.',
    accessibleFormats: ['Data table', 'Plain text version'],
  },
  {
    id: 'kh-7',
    title: 'Know Your Rights — Easy Read Handbook',
    theme: 'Rights Awareness',
    format: 'Easy Read',
    language: 'English',
    year: 2022,
    summary: 'Plain-language handbook with illustrations explaining the UN CRPD and how to make a complaint to national institutions.',
    accessibleFormats: ['Easy Read', 'Audio', 'Braille-ready DOCX'],
  },
  {
    id: 'kh-8',
    title: 'Safeguarding Standards for Member Organisations',
    theme: 'Governance',
    format: 'Report',
    language: 'English',
    year: 2023,
    summary: 'Minimum safeguarding policy, reporting routes and investigation protocols expected of every ADF member organisation.',
    accessibleFormats: ['Tagged PDF'],
  },
];

export const KNOWLEDGE_THEMES = Array.from(new Set(KNOWLEDGE_ITEMS.map((item) => item.theme)));

export const YOUTH_OPPORTUNITIES: YouthOpportunity[] = [
  {
    id: 'yo-1',
    title: 'ADF Young Advocates Fellowship 2025',
    kind: 'Fellowship',
    location: 'Addis Ababa & remote',
    deadline: 'July 31, 2025',
    summary: 'A nine-month paid fellowship placing twelve young leaders with disabilities inside national policy campaigns and the ADF Secretariat.',
  },
  {
    id: 'yo-2',
    title: 'Digital Accessibility Internship',
    kind: 'Internship',
    location: 'Nairobi, Kenya',
    deadline: 'June 20, 2025',
    summary: 'Three-month placement auditing government and banking platforms against WCAG 2.2 alongside the communications team.',
  },
  {
    id: 'yo-3',
    title: 'Campus Ambassador Volunteering',
    kind: 'Volunteering',
    location: 'Any AU member state',
    deadline: 'Rolling',
    summary: 'Run rights-awareness sessions and accessibility audits at your university, supported by ADF training and materials.',
  },
  {
    id: 'yo-4',
    title: 'Youth Innovation Micro-Grants',
    kind: 'Grant',
    location: 'Pan-African',
    deadline: 'September 15, 2025',
    summary: 'Grants of up to USD 5,000 for youth-led assistive technology, accessible transport and inclusive livelihood pilots.',
  },
];

export const YOUTH_STORIES: YouthStory[] = [
  {
    id: 'ys-1',
    title: 'From student union to national assembly',
    name: 'Thandiwe Moyo',
    country: 'Zimbabwe',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1200&q=60',
    quote: 'They kept telling me the building had no ramp. I decided the law needed one first.',
    body: 'Thandiwe organised her university disability caucus, then led a two-year campaign that ended with accessible-infrastructure obligations written into a municipal by-law. She now advises three student federations on how to petition their councils.',
  },
  {
    id: 'ys-2',
    title: 'Building sign language into the classroom',
    name: 'Ibrahim Diallo',
    country: 'Senegal',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=60',
    quote: 'Deaf children were present in school but absent from the lesson.',
    body: 'Ibrahim trained 140 primary teachers in basic Senegalese sign language and helped the education ministry pilot interpreter placements in twelve schools across Dakar and Thiès.',
  },
  {
    id: 'ys-3',
    title: 'A workshop that became a business',
    name: 'Grace Achieng',
    country: 'Kenya',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=60',
    quote: 'We repair wheelchairs faster than they can be imported.',
    body: 'With a We Can Work seed grant, Grace set up a wheelchair repair and fitting workshop in Kisumu that now employs seven technicians, five of whom are wheelchair users themselves.',
  },
];

export const YOUTH_POLLS: PollItem[] = [
  {
    id: 'poll-1',
    question: 'What is the biggest barrier facing young people with disabilities in your country?',
    options: [
      { id: 'a', label: 'Access to employment', votes: 412 },
      { id: 'b', label: 'Inaccessible transport', votes: 268 },
      { id: 'c', label: 'Attitudes and stigma', votes: 355 },
      { id: 'd', label: 'Inclusive education', votes: 301 },
    ],
  },
];

export const PARTNERS: PartnerItem[] = [
  { id: 'p-1', name: 'African Union Commission', type: 'Institutional', country: 'Ethiopia', description: 'Continental policy counterpart on the African Disability Protocol and Agenda 2063 inclusion targets.' },
  { id: 'p-2', name: 'Mastercard Foundation', type: 'Donor', country: 'Canada / Africa', description: 'Principal funder of the We Can Work economic inclusion programme.' },
  { id: 'p-3', name: 'Light for the World', type: 'Implementing Partner', country: 'Austria', description: 'Co-implements employment and eye-health inclusion work across East and West Africa.' },
  { id: 'p-4', name: 'Disability Rights Fund', type: 'Donor', country: 'United States', description: 'Supports grassroots OPD advocacy grants and treaty monitoring capacity.' },
  { id: 'p-5', name: 'International Disability Alliance', type: 'Network', country: 'Switzerland', description: 'Global federation through which ADF represents African OPDs at UN level.' },
  { id: 'p-6', name: 'CBM Christian Blind Mission', type: 'Implementing Partner', country: 'Germany', description: 'Partner on inclusive health, rehabilitation and assistive technology delivery.' },
  { id: 'p-7', name: 'Sida', type: 'Donor', country: 'Sweden', description: 'Core institutional funding for the CSSO capacity building programme.' },
  { id: 'p-8', name: 'WHO Regional Office for Africa', type: 'Institutional', country: 'Congo', description: 'Technical partner on inclusive universal health coverage and assistive product lists.' },
];

export const POLICY_TRACKER: PolicyTrackerRow[] = [
  { country: 'Kenya', code: 'ke', crpdRatified: true, protocolSigned: true, protocolRatified: true, nationalLaw: 'Persons with Disabilities Act (under review)', lastUpdated: '2025-03-11' },
  { country: 'Nigeria', code: 'ng', crpdRatified: true, protocolSigned: true, protocolRatified: false, nationalLaw: 'Discrimination Against Persons with Disabilities (Prohibition) Act 2018', lastUpdated: '2025-02-04' },
  { country: 'South Africa', code: 'za', crpdRatified: true, protocolSigned: true, protocolRatified: false, nationalLaw: 'White Paper on the Rights of Persons with Disabilities', lastUpdated: '2025-01-22' },
  { country: 'Ethiopia', code: 'et', crpdRatified: true, protocolSigned: true, protocolRatified: true, nationalLaw: 'Right to Employment of Persons with Disability Proclamation', lastUpdated: '2025-04-02' },
  { country: 'Ghana', code: 'gh', crpdRatified: true, protocolSigned: true, protocolRatified: false, nationalLaw: 'Persons with Disability Act 715 (amendment pending)', lastUpdated: '2024-11-19' },
  { country: 'Senegal', code: 'sn', crpdRatified: true, protocolSigned: true, protocolRatified: true, nationalLaw: 'Loi d’orientation sociale 2010-15', lastUpdated: '2025-02-27' },
  { country: 'Uganda', code: 'ug', crpdRatified: true, protocolSigned: true, protocolRatified: true, nationalLaw: 'Persons with Disabilities Act 2020', lastUpdated: '2025-03-30' },
  { country: 'Egypt', code: 'eg', crpdRatified: true, protocolSigned: false, protocolRatified: false, nationalLaw: 'Law No. 10 of 2018 on the Rights of Persons with Disabilities', lastUpdated: '2024-12-08' },
];

export const COUNTRY_PROFILES: CountryProfile[] = [
  {
    code: 'ke',
    country: 'Kenya',
    region: 'East Africa',
    population: '55.1 million',
    prevalence: '2.2% recorded / 12% estimated',
    focalOpd: 'United Disabled Persons of Kenya (UDPK)',
    summary: 'Kenya ratified both the UN CRPD and the African Disability Protocol and is currently revising its Persons with Disabilities Act to align definitions, accessibility obligations and the national disability fund.',
    indicators: [
      { label: 'Primary school participation', value: 62 },
      { label: 'Formal employment rate', value: 26 },
      { label: 'Accessible public buildings audited', value: 41 },
      { label: 'Assistive device coverage', value: 33 },
    ],
    milestones: [
      { year: '2008', event: 'UN CRPD ratified' },
      { year: '2022', event: 'African Disability Protocol ratified' },
      { year: '2024', event: 'National accessibility standards gazetted' },
    ],
  },
  {
    code: 'ng',
    country: 'Nigeria',
    region: 'West Africa',
    population: '223.8 million',
    prevalence: '3.1% recorded / 15% estimated',
    focalOpd: 'Joint National Association of Persons with Disabilities (JONAPWD)',
    summary: 'Nigeria has strong federal legislation but uneven state-level domestication. ADF members are campaigning for all 36 states to adopt matching disability laws and fund state commissions.',
    indicators: [
      { label: 'States with domesticated law', value: 28 },
      { label: 'Formal employment rate', value: 19 },
      { label: 'Accessible polling stations', value: 47 },
      { label: 'Assistive device coverage', value: 21 },
    ],
    milestones: [
      { year: '2010', event: 'UN CRPD ratified' },
      { year: '2018', event: 'National Disability Act signed' },
      { year: '2023', event: 'National Commission fully staffed' },
    ],
  },
  {
    code: 'et',
    country: 'Ethiopia',
    region: 'Horn of Africa',
    population: '126.5 million',
    prevalence: '2.9% recorded / 17.6% estimated',
    focalOpd: 'Ethiopian Center for Disability and Development (ECDD)',
    summary: 'Host country of the ADF Secretariat. Employment proclamations are in force, and current advocacy centres on inclusive humanitarian response in conflict-affected regions.',
    indicators: [
      { label: 'Primary school participation', value: 48 },
      { label: 'Formal employment rate', value: 22 },
      { label: 'Inclusive humanitarian plans', value: 35 },
      { label: 'Assistive device coverage', value: 18 },
    ],
    milestones: [
      { year: '2010', event: 'UN CRPD ratified' },
      { year: '2021', event: 'African Disability Protocol ratified' },
      { year: '2024', event: 'Inclusive humanitarian guidance adopted' },
    ],
  },
  {
    code: 'sn',
    country: 'Senegal',
    region: 'West Africa',
    population: '17.7 million',
    prevalence: '1.9% recorded / 11% estimated',
    focalOpd: 'Fédération Sénégalaise des Associations de Personnes Handicapées (FSAPH)',
    summary: 'The equal opportunity card scheme gives holders access to health and transport concessions; ADF members are monitoring issuance rates and rural coverage.',
    indicators: [
      { label: 'Equal opportunity cards issued', value: 54 },
      { label: 'Formal employment rate', value: 24 },
      { label: 'Accessible health centres', value: 38 },
      { label: 'Assistive device coverage', value: 29 },
    ],
    milestones: [
      { year: '2010', event: 'UN CRPD ratified' },
      { year: '2012', event: 'Equal opportunity card launched' },
      { year: '2023', event: 'African Disability Protocol ratified' },
    ],
  },
];

export const SPADRA_STATS = [
  { value: '38', label: 'Countries engaged' },
  { value: '12', label: 'Protocol ratifications' },
  { value: '420+', label: 'OPD leaders trained' },
  { value: '18', label: 'Policy papers adopted' },
];
