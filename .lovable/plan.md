# What's Left to Complete the ADF Frontend

Based on the three Neptune Technology documents in `docs/`, here is everything the proposal promises that the site does not yet have. All of it is buildable now with mock data; nothing below needs a backend.

## What already exists

Home, About, Programmes, Resources, Advocacy, News, Careers, Contact, Governance — as single listing/overview pages, plus the header, footer, accessibility toolbar, assistant widget and the Donate / Membership / Take Action modals. Mock data covers events, programmes, careers, resources, news, executive council and OPD countries.

## Gap 1 — Detail pages (currently every section is a dead end)

Nothing is clickable through to a full item. Add:
- `/news/$slug` — full article, dateline, category, share links, related stories.
- `/programmes/$slug` — objectives, impact stats, donors and partners, gallery, related resources and news.
- `/resources/$slug` — publication detail with full metadata (author, year, language, pages, accessibility format), summary, download and "accessible HTML version" of the document.
- `/events/$slug` — event detail with registration form (mock submit).
- `/careers/$slug` — vacancy detail with requirements and an application form (mock submit).

## Gap 2 — Missing sections named in the documents

- **Events** (`/events`) — data already exists but has no page. Upcoming/past tabs, filters by type, country, virtual/in-person.
- **Knowledge Hub** (`/knowledge-hub`) — the learning-and-resources centre: toolkits, explainers, multimedia (video and podcast cards), grouped by theme. Distinct from the flat publications list.
- **Youth** (`/youth`) — the whole youth engagement strategy is unbuilt: youth stories, executive summaries and infographics of long reports, opportunities board (internships, fellowships, volunteering, calls for participation), polls and surveys, discussion prompts, and a quiz/knowledge challenge.
- **Membership** (`/membership`) — searchable member OPD directory built on `OPD_COUNTRIES`: filter by region and country, member profile cards, plus how to join.
- **Partners** (`/partners`) — donor and partner directory with logos and categories.
- **Get Involved** (`/get-involved`) — donate, volunteer, partner with us, as a real page rather than only modals.

## Gap 3 — SPADRA platform (`/spadra`, embedded section)

Called out repeatedly as its own embedded platform with its own sub-navigation:
- Dashboard overview
- Policy tracker — ratification and domestication status per country, filterable table
- Country profiles — `/spadra/countries/$code`
- Animated accessible statistics — charts each paired with a visible data table equivalent
- Consortium portal and partner directory (public view only for now)
- Knowledge hub entry point

## Gap 4 — Site-wide functionality

- **Enterprise search** — a global search page (`/search`) plus header search that queries across all mock datasets with type filters and result counts.
- **Filtering and pagination** on every listing page (resources, news, events, careers).
- **404 / not-found route** and error state — currently missing.
- **Accessibility statement** (`/accessibility`) and **Privacy** (`/privacy`) — required alongside a WCAG 2.2 AA claim.
- **Multilingual shell** — EN / FR / KIS switcher wired to a translation dictionary with English filled in and the other locales stubbed, so the structure exists before real translation.
- **Social sharing** on every article, publication and story.
- **SEO** — unique `head()` metadata on every new route, JSON-LD for articles, events and the organisation, sitemap and canonical tags.

## Gap 5 — Assistant polish (still mock)

The widget exists. To match what the documents describe, it needs: an explicit "you are talking to an AI" disclosure, suggested question chips, source citations linking to the page each answer came from, and a conversation reset. Real RAG waits for the backend.

## Technical notes

- All new data lives in `src/data/` as typed mock modules alongside `mockData.generated.ts`, with new interfaces added to `src/types.ts`.
- Detail routes read from mock arrays by slug and throw `notFound()` on a miss.
- Forms (registration, application, contact, polls) validate and show a success state; no submission target yet.
- Charts render as accessible SVG with a visible `<table>` equivalent underneath — no chart library that hides data from screen readers.
- Every new page reuses the existing navy editorial components; no new visual direction.

## Suggested build order

1. Detail pages for news, programmes, resources, careers — closes the dead ends.
2. Events, Membership directory, Partners, Get Involved.
3. Knowledge Hub and Youth section.
4. SPADRA platform.
5. Search, filters, pagination, 404, accessibility and privacy pages.
6. Multilingual shell, SEO and structured data, assistant polish, final contrast and keyboard audit.
