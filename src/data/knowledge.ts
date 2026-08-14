export const KNOWLEDGE = {
  summary: `ADF (African Disability Forum) is a continental membership organisation that unifies and amplifies the voices of Organisations/Persons with Disabilities (OPDs) across Africa. The organisation's mission is to promote rights, inclusion and capacity development through programmes, advocacy, a Knowledge Hub, membership services and events. Key programmes include SPADRA, We Are Able!, We Can Work, HELASIA and CSSO. The proposed redevelopment focuses on a metadata-driven Knowledge Hub, a searchable membership directory, clear programmes pages, editorial/news taxonomy, event management, accessible media handling, and preservation of SEO and legacy URLs via redirects. The site must meet WCAG 2.1 AA accessibility standards, preserve original publication metadata, and support multilingual resources.`,

  informationArchitecture: `Home, About, What We Do, Programs & Projects, Membership, Advocacy & Policy, Knowledge Hub (Reports, Publications, Toolkits), News & Media, Events, Partners, Get Involved (Donate, Volunteer), Contact`,

  migrationRules: `Preserve original publication dates, authors, categories, tags, featured images, PDFs and downloadable attachments. Create 301 redirects from legacy URLs, preserve SEO titles and meta descriptions where practical. Convert image-only PDFs into accessible HTML summaries and preserve originals as downloads. Tag resources by language and accessibility format. Separate current opportunities from archives.`,

  programmes: [
    { id: 'spadra', name: 'Strengthening Partnerships to Advance Disability Rights in Africa (SPADRA)' },
    { id: 'we-are-able', name: 'We Are Able!' },
    { id: 'we-can-work', name: 'We Can Work' },
    { id: 'helasia', name: 'HELASIA' },
    { id: 'csso', name: 'CSSO' }
  ],

  contact: {
    office: 'Joseph Tito St, Kirkos Sub-City, Woreda 08, Nega City Mall, 8th floor, 801, Addis Ababa, Ethiopia',
    email: 'info@adf-secretariat.org',
    safeguarding: 'safeguarding@adf-secretariat.org',
    investigations: 'investigations@adf-secretariat.org'
  },

  notes: `This corpus is a short migration-ready summary extracted from the ADF Website Content Migration Document (review date: 9 August 2026). For full-text authoritative content, use the original WordPress export or source documents. If vendor technical proposals are needed to finalize scope (chatbot RAG architecture, hosting requirements), include the Neptune Technology PDFs.`
};
