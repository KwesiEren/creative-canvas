import { ResourceItem, NewsItem, ExecutiveMember, OpdCountry, EventItem, ProgrammeItem, CareerItem } from '../types';

export const DOCX_IMPORT_SUMMARY = {
  sourceDocument: 'docs/ADF_Website_Content_Migration_Document (1).docx',
  generatedAt: '2026-08-13',
  pipeline: 'scripts/import-docx-mock-data.mjs',
  note: 'This file is output from the offline DOCX import pipeline and is kept in sync with the mock-data project dataset.'
};

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Pan-African Workshop on UN CRPD Shadow Reporting',
    type: 'Workshop',
    date: '2025-06-12',
    time: '09:00 - 15:30 EAT',
    location: 'Nairobi Conference Center & Online',
    country: 'Kenya',
    isVirtual: true,
    description: 'Practical training for regional OPD leaders on collecting disaggregated data, writing shadow reports, and presenting evidence before the UN Committee on the Rights of Persons with Disabilities.',
    targetAudience: 'OPD Representatives, Human Rights Advocates, Legal Researchers',
    registrationUrl: 'https://adf-events.org/register/crpd-workshop',
    status: 'Upcoming'
  },
  {
    id: 'evt-2',
    title: 'African Disability Protocol Domestication Summit 2025',
    type: 'Summit',
    date: '2025-07-24',
    time: '08:30 - 17:00 WAT',
    location: 'Abuja International Convention Centre',
    country: 'Nigeria',
    isVirtual: true,
    description: 'High-level continental convening bringing together parliamentarians, AU delegates, and disability rights organizations to harmonize national legislations with the African Disability Protocol.',
    targetAudience: 'Ministers, Parliamentarians, Civil Society Directors, OPD Leaders',
    registrationUrl: 'https://adf-events.org/register/adp-summit',
    status: 'Upcoming'
  },
  {
    id: 'evt-3',
    title: 'International Day of Persons with Disabilities (IDPD) Continental Forum',
    type: 'International Awareness Day',
    date: '2025-12-03',
    time: '10:00 - 16:00 EAT',
    location: 'AU Headquarters, Addis Ababa',
    country: 'Ethiopia',
    isVirtual: true,
    description: 'Annual global celebration highlighting leadership, innovation, and systemic inclusion across Africa. Features youth innovation showcases and policy declarations.',
    targetAudience: 'Public, International Partners, AU Commissioners, OPDs',
    registrationUrl: 'https://adf-events.org/register/idpd-2025',
    status: 'Upcoming'
  },
  {
    id: 'evt-4',
    title: 'Inclusive Digital Public Infrastructure & Assistive Tech Webinar',
    type: 'Webinar',
    date: '2025-08-15',
    time: '14:00 - 16:00 CAT',
    location: 'Zoom Virtual Platform',
    country: 'Online / Pan-African',
    isVirtual: true,
    description: 'Exploring web content accessibility guidelines (WCAG 2.2), screen reader optimization for African languages, and affordable assistive tech manufacturing.',
    targetAudience: 'Software Engineers, Policy Makers, Accessibility Tech Developers',
    registrationUrl: 'https://adf-events.org/register/tech-webinar',
    status: 'Upcoming'
  },
  {
    id: 'evt-5',
    title: 'Continental Conference on Women and Girls with Disabilities',
    type: 'Conference',
    date: '2025-09-28',
    time: '09:00 - 17:30 GMT',
    location: 'Accra International Conference Centre',
    country: 'Ghana',
    isVirtual: true,
    description: 'Addressing intersectional challenges including gender-based violence, sexual and reproductive health rights, and political representation for women with disabilities.',
    targetAudience: 'Women Rights Organizations, OPD Leaders, Gender Policy Officers',
    registrationUrl: 'https://adf-events.org/register/women-disability-conf',
    status: 'Upcoming'
  },
  {
    id: 'evt-6',
    title: 'Global Accessibility Awareness Day (GAAD) African Showcase',
    type: 'International Awareness Day',
    date: '2025-05-15',
    time: '11:00 - 14:00 EAT',
    location: 'Online Livestream',
    country: 'Online',
    isVirtual: true,
    description: 'Demonstrating real-world digital accessibility barriers and solutions in banking, e-governance, and mobile telecom platforms across African markets.',
    targetAudience: 'UX Designers, Mobile Developers, Telecom Executives',
    registrationUrl: 'https://adf-events.org/register/gaad-2025',
    status: 'Upcoming'
  }
];

export const PROGRAMMES_DATA: ProgrammeItem[] = [
  {
    id: 'spadra',
    name: 'Strengthening Pan-African Disability Rights Advocacy',
    acronym: 'SPADRA',
    tagline: 'Amplifying unified voices for institutional policy reforms across the continent.',
    summary: 'SPADRA works to build cohesive national coalitions of OPDs, providing structured policy research tools, legal aid frameworks, and direct engagement pathways with the African Union and sub-regional economic communities (ECOWAS, EAC, SADC).',
    objectives: [
      'Accelerate ratification and domestication of the African Disability Protocol in 25 AU nations.',
      'Train over 500 grassroots OPD leaders on treaty monitoring and shadow reporting.',
      'Establish a permanent OPD consultative seat in African Union socio-economic committees.'
    ],
    impactStats: [
      { label: 'OPDs Trained', value: '420+' },
      { label: 'Countries Engaged', value: '38' },
      { label: 'Policy Papers Adopted', value: '18' }
    ],
    donorsAndPartners: ['African Union Commission', 'Ford Foundation', 'Disability Rights Fund'],
    leadRegion: 'Pan-African / Regional Hubs',
image: '/images/adf-event-4.jpg'
    },
    {
      id: 'we-are-able',
    name: 'We Are Able!',
    acronym: 'We Are Able!',
    tagline: 'Fostering food security and resilient livelihoods for persons with disabilities in fragile contexts.',
    summary: 'Focused on Burundi, DRC, Ethiopia, South Sudan, Sudan, and Uganda, We Are Able! addresses double marginalization by linking disability inclusion directly to agricultural development, humanitarian assistance, and local government decision-making.',
    objectives: [
      'Increase agricultural land access and climate-resilient farming tools for rural farmers with disabilities.',
      'Influence local government authorities to mandate 10% disability inclusion in municipal development funds.',
      'Empower local OPDs to advocate for accessible disaster risk reduction strategies.'
    ],
    impactStats: [
      { label: 'Beneficiaries', value: '150,000+' },
      { label: 'Local Councils Partnered', value: '85' },
      { label: 'Target Nations', value: '6' }
    ],
    donorsAndPartners: ['Dutch Ministry of Foreign Affairs', 'ZOA', 'Light for the World', 'VNG International'],
    leadRegion: 'East & Central Africa',
image: '/images/adf-event-5.png'
    },
    {
      id: 'we-can-work',
    name: 'We Can Work',
    acronym: 'We Can Work',
    tagline: 'Transforming economic inclusion and employment pathways for African youth with disabilities.',
    summary: 'A decade-long initiative in partnership with Mastercard Foundation to ensure young women and men with disabilities access dignified, fulfilling work, vocational apprenticeships, and entrepreneurial finance across 7 key countries.',
    objectives: [
      'Engage 1,000+ private employers to adopt accessible hiring and workplace adaptation standards.',
      'Provide vocational mentorship and tech seed capital to 50,000 young entrepreneurs with disabilities.',
      'Establish Young Disability Champions network driving policy change in technical education colleges.'
    ],
    impactStats: [
      { label: 'Youth Reached', value: '50,000' },
      { label: 'Employer Partners', value: '340' },
      { label: 'Seed Grants Awarded', value: '1,200' }
    ],
    donorsAndPartners: ['Mastercard Foundation', 'Light for the World', 'National Youth Councils'],
    leadRegion: 'Sub-Saharan Africa',
image: '/images/adf-event-3.jpg'
    },
    {
      id: 'helasia',
    name: 'Inclusive Health & Assistive Technology in Africa',
    acronym: 'HELASIA',
    tagline: 'Guaranteeing equitable healthcare, rehabilitation services, and assistive tech supply chains.',
    summary: 'HELASIA addresses healthcare discrimination and physical access barriers in hospitals, maternal health centers, and emergency care facilities. It works directly with health ministries to integrate universal health coverage.',
    objectives: [
      'Train healthcare workers on inclusive patient care and sign language communication in clinical settings.',
      'Subsidize essential assistive devices (wheelchairs, hearing aids, optical tools) in national health schemes.',
      'Publish regional health equity scorecards for maternal and child disability health services.'
    ],
    impactStats: [
      { label: 'Health Facilities Audit', value: '210' },
      { label: 'Clinicians Trained', value: '1,800' },
      { label: 'AT Devices Distributed', value: '8,500' }
    ],
    donorsAndPartners: ['Humanity & Inclusion (HI)', 'WHO Regional Office for Africa', 'GIZ'],
    leadRegion: 'West & Southern Africa',
image: '/images/adf-event-1.jpg'
    },
    {
      id: 'csso',
    name: 'Civil Society Support Organization Capacity Building',
    acronym: 'CSSO',
    tagline: 'Institutional strengthening, governance, and financial sustainability for OPDs.',
    summary: 'CSSO equips national Organizations of Persons with Disabilities with operational toolkits, governance oversight models, digital fundraising capabilities, and strategic communication skills.',
    objectives: [
      'Provide organizational development grants and operational coaching to 60 member federations.',
      'Establish transparent financial accounting and grant management software across all regional offices.',
      'Develop crisis resilience protocols for OPDs operating in conflict-affected regions.'
    ],
    impactStats: [
      { label: 'Member OPDs Supported', value: '60+' },
      { label: 'Grants Managed', value: '$3.5M+' },
      { label: 'Training Modules', value: '14' }
    ],
    donorsAndPartners: ['Sida', 'CBM Christian Blind Mission', 'Norad'],
    leadRegion: 'Continental Secretariat',
    image: '/images/adf-event-2.jpg'
  }
];

export const CAREERS_DATA: CareerItem[] = [
  {
    id: 'car-1',
    title: 'Senior Disability Rights Policy Officer',
    department: 'Policy & Advocacy Directorate',
    location: 'Addis Ababa, Ethiopia (Hybrid option available)',
    type: 'Full-Time',
    deadline: 'June 30, 2025',
    summary: 'Lead regional legislative research, draft parliamentary briefings, and manage treaty domestication campaigns across Eastern and Southern Africa.',
    requirements: [
      'Master’s degree in International Human Rights Law, Public Policy, or Disability Studies.',
      'At least 7 years experience in human rights treaty advocacy in Africa.',
      'Fluency in English; working knowledge of French or Portuguese is a strong asset.',
      'Lived experience of disability is strongly encouraged.'
    ]
  },
  {
    id: 'car-2',
    title: 'Communications & Digital Accessibility Specialist',
    department: 'Communications & Public Relations',
    location: 'Nairobi, Kenya or Remote (Africa)',
    type: 'Full-Time',
    deadline: 'July 15, 2025',
    summary: 'Manage continental digital media, produce accessible publications (Braille/easy-read/screen reader optimized), and curate stories of OPD achievements.',
    requirements: [
      'Bachelor’s degree in Communications, Journalism, or Media Technology.',
      'Demonstrated expertise in WCAG accessibility standards and accessible media design.',
      '3+ years managing multi-channel campaigns for non-profit/NGO organizations.'
    ]
  },
  {
    id: 'car-3',
    title: 'Regional OPD Capacity Building Consultant',
    department: 'Programs Division (CSSO)',
    location: 'Dakar, Senegal',
    type: 'Consultancy',
    deadline: 'August 10, 2025',
    summary: 'Conduct organizational health assessments and facilitate interactive governance workshops for national federations in West Africa.',
    requirements: [
      'Proven track record in NGO institutional capacity development and financial governance.',
      'Fluency in French and English.',
      'Willingness to travel across West and Central Africa.'
    ]
  }
];

export const RESOURCES_DATA: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Inclusive Education Framework 2024',
    category: 'Policy Brief',
    year: 2024,
    downloadUrl: '#',
    description: 'Comprehensive guidelines for domesticating inclusive education policies across African Union Member States, ensuring budget allocation and physical accessibility in schools.',
    pages: 28,
    author: 'ADF Policy & Education Committee'
  },
  {
    id: 'res-2',
    title: 'Annual Accessibility Impact Assessment',
    category: 'Annual Report',
    year: 2023,
    downloadUrl: '#',
    description: 'Annual evaluation on infrastructure, web accessibility, and public service compliance with UN CRPD Article 9 across 18 member countries.',
    pages: 64,
    author: 'ADF Research & Monitoring Secretariat'
  },
  {
    id: 'res-3',
    title: 'Employment Barriers in Sub-Saharan Africa',
    category: 'Research Paper',
    year: 2023,
    downloadUrl: '#',
    description: 'An empirical investigation into workplace discrimination, non-accommodating hiring practices, and policy solutions for youth with disabilities.',
    pages: 42,
    author: 'Dr. Amina Ouedraogo & ADF Research Directorate'
  },
  {
    id: 'res-4',
    title: 'Women with Disabilities: Strategic Advocacy Guidelines',
    category: 'Policy Brief',
    year: 2022,
    downloadUrl: '#',
    description: 'Toolkit designed for Organizations of Persons with Disabilities (OPDs) to combat gender-based violence and promote leadership among women with disabilities.',
    pages: 36,
    author: 'ADF Women & Intersectional Rights Taskforce'
  },
  {
    id: 'res-5',
    title: 'African Disability Protocol Domestication Manual',
    category: 'Policy Brief',
    year: 2024,
    downloadUrl: '#',
    description: 'Step-by-step roadmap for national parliaments to ratify and align national disability laws with the African Disability Protocol.',
    pages: 50,
    author: 'African Disability Forum Legal Affairs Committee'
  },
  {
    id: 'res-6',
    title: 'Continental OPD Capacity & Resilience Barometer 2023',
    category: 'Annual Report',
    year: 2023,
    downloadUrl: '#',
    description: 'A study on organizational health, funding sustainability, and shadow-reporting capabilities of national OPDs across 32 African nations.',
    pages: 78,
    author: 'ADF Capacity Building Division'
  },
  {
    id: 'res-7',
    title: 'Assistive Technology Access in Rural Healthcare',
    category: 'Research Paper',
    year: 2022,
    downloadUrl: '#',
    description: 'Analyzing supply chain bottlenecks and local manufacturing initiatives for wheelchairs, hearing aids, and braille displays in rural Africa.',
    pages: 38,
    author: 'Pan-African Inclusive Tech Coalition & ADF'
  },
  {
    id: 'res-8',
    title: 'Youth Leadership & Political Participation Index',
    category: 'Research Paper',
    year: 2023,
    downloadUrl: '#',
    description: 'Measuring young Africans with disabilities participating in civic advocacy, political party forums, and local council elections.',
    pages: 46,
    author: 'ADF Youth Council'
  }
];

export const NEWS_DATA: NewsItem[] = [
  {
    id: 'news-1',
    title: 'ADF Presents New Accessibility Guidelines at AU Summit',
    category: 'Advocacy',
    date: 'May 15, 2024',
    datetime: '2024-05-15',
    image: '/images/adf-event-6.png',
    summary: 'The African Disability Forum presented continental accessibility frameworks to AU delegates in Addis Ababa, urging accelerated implementation of Agenda 2063 inclusion goals.',
    content: 'During the African Union Summit in Addis Ababa, the African Disability Forum (ADF) delivered a landmark address outlining standard accessibility criteria for physical and digital infrastructure. ADF urged member states to integrate universal design principles in public transportation, health centers, and digital government services. Delegations from over 30 countries pledged to review national accessibility legislation.'
  },
  {
    id: 'news-2',
    title: 'Empowering Local Leaders: Capacity Building Workshop in Nairobi',
    category: 'Community',
    date: 'May 2, 2024',
    datetime: '2024-05-02',
    image: '/images/adf-event-5.png',
    summary: 'Over 60 grassroots OPD representatives gathered in Nairobi for intensive training on human rights monitoring, shadow reporting, and government engagement.',
    content: 'ADF hosted a three-day intensive capacity-building workshop in Nairobi, Kenya, bringing together grassroots disability leaders from East and Central Africa. Participants received practical training on submitting shadow reports to the UN CRPD Committee, leveraging digital data collection tools, and advocating for municipal budget allocations for accessible infrastructure.'
  },
  {
    id: 'news-3',
    title: 'New Report: Inclusive Education Policies Across the Continent',
    category: 'Policy',
    date: 'April 20, 2024',
    datetime: '2024-04-20',
    image: '/images/adf-event-1.jpg',
    summary: 'ADF launched a baseline study analyzing educational access for children with sensory, cognitive, and physical disabilities in 22 African nations.',
    content: 'The African Disability Forum published its annual landmark report assessing educational policies in Africa. While 80% of surveyed nations have inclusive education policies on paper, fewer than 15% provide adequate specialized training for teachers or accessible learning materials like Braille and sign language interpreters. The report offers actionable legislative recommendations for education ministries.'
  }
];

export const EXECUTIVE_COUNCIL: ExecutiveMember[] = [
  {
    id: 'exec-1',
    name: 'Dr. Amina Ouedraogo',
    role: 'Chairperson',
    organization: 'West African Federation of the Disabled',
    image: '/__l5e/assets-v1/c3cb9e62-06bc-4f39-8065-d855452b65f0/adf-photo-1.jpg',
    bio: 'Dr. Amina Ouedraogo is a distinguished scholar and human rights advocate with over 20 years of leadership in regional disability rights across West Africa. She leads ADF strategic direction and international diplomatic engagement.'
  },
  {
    id: 'exec-2',
    name: 'Samuel Kiprono',
    role: 'Vice-Chairperson',
    organization: 'East Africa Disability Action Network',
    image: '/__l5e/assets-v1/fc164317-bb7d-412f-b227-19c662116535/adf-photo-2.jpg',
    bio: 'Samuel Kiprono specializes in legislative advocacy and policy domestication. He has spearheaded legislative campaigns across East Africa to ensure the ratification of the African Disability Protocol.'
  },
  {
    id: 'exec-3',
    name: 'Fatima Al-Fayed',
    role: 'Secretary General',
    organization: 'North African Deaf Association',
    image: '/__l5e/assets-v1/ab8ae646-490d-420d-a8e9-5e2a2e083cd7/adf-photo-3.jpg',
    bio: 'Fatima Al-Fayed is an expert in sign language rights, inclusive governance, and institutional communications. She directs ADF internal governance and member OPD coordination.'
  }
];

export const OPD_COUNTRIES: OpdCountry[] = [
  {
    country: 'Kenya',
    opdName: 'United Disabled Persons of Kenya (UDPK)',
    region: 'East Africa',
    coordinates: { x: 68, y: 55 },
    membersCount: 42
  },
  {
    country: 'South Africa',
    opdName: 'Disability Alliance South Africa (DASA)',
    region: 'Southern Africa',
    coordinates: { x: 55, y: 82 },
    membersCount: 58
  },
  {
    country: 'Nigeria',
    opdName: 'Joint National Association of Persons with Disabilities (JONAPWD)',
    region: 'West Africa',
    coordinates: { x: 42, y: 48 },
    membersCount: 84
  },
  {
    country: 'Senegal',
    opdName: 'Federation of Associations of Persons with Disabilities (FSAPH)',
    region: 'West Africa',
    coordinates: { x: 22, y: 42 },
    membersCount: 26
  },
  {
    country: 'Ethiopia',
    opdName: 'Ethiopian Center for Disability and Development (ECDD)',
    region: 'Horn of Africa',
    coordinates: { x: 66, y: 46 },
    membersCount: 35
  },
  {
    country: 'Ghana',
    opdName: 'Ghana Federation of Disability Organisations (GFD)',
    region: 'West Africa',
    coordinates: { x: 33, y: 50 },
    membersCount: 31
  },
  {
    country: 'Uganda',
    opdName: 'National Union of Disabled Persons of Uganda (NUDIPU)',
    region: 'East Africa',
    coordinates: { x: 63, y: 54 },
    membersCount: 39
  },
  {
    country: 'Egypt',
    opdName: 'Egyptian Federation of Disability Organizations (EFDO)',
    region: 'North Africa',
    coordinates: { x: 60, y: 22 },
    membersCount: 48
  }
];
