# African Disability Forum — Platform Plan

A blank starting page is now live at `/`. Below is how I propose to build the rest, based on the three Neptune Technology documents.

## Principles I will hold to
- Accessibility is the product, not a feature. WCAG 2.2 AA from the first component: semantic HTML, visible focus rings, keyboard-only operability, 4.5:1 contrast minimum, skip links, reduced-motion support, real alt text, form labels and error text tied to inputs.
- Low bandwidth first. Light pages, compressed images, lazy loading below the fold, no heavy decorative media.
- Design driven by ADF's own identity and imagery — disability rights, African continental scope, member OPDs. No stock-gradient template look.

## Design system (built first)
- Tokens in `src/styles.css`: colour, type scale, spacing, radii, focus ring, motion. Every component consumes tokens; no hardcoded colours.
- Type scale sized for readability at 200% zoom; body text minimum 16px.
- Accessibility toolbar: text size, high-contrast theme, reduced motion — persisted locally.
- Core components: header/nav with mega-menu, footer, cards, publication item, stat block, tabs, accordion, breadcrumb, pagination, form controls.

## Site structure (public)
1. `/` Home — mission, featured work, latest news and publications, calls to action.
2. `/about` — who ADF is, governance, members, partners, contact.
3. `/programmes` and `/programmes/$slug` — thematic areas and projects.
4. `/publications` — searchable, filterable repository (theme, country, year, type) with detail pages.
5. `/news` and `/news/$slug`, `/events` with registration.
6. `/knowledge-hub` — learning resources, toolkits, multimedia.
7. `/youth` — youth engagement: opportunities (internships, fellowships, volunteering), explainers, stories, polls and surveys.
8. `/spadra` — embedded SPADRA area: dashboard, policy tracker, country profiles, accessible animated statistics, consortium and partner directory.
9. `/contact`, `/accessibility` statement, `/privacy`.

## Phasing
- Phase 1 — design system, layout shell, home page, about, contact. Static content.
- Phase 2 — publications repository, news, events, knowledge hub, search and filtering.
- Phase 3 — youth section, opportunities, polls/surveys, multimedia stories.
- Phase 4 — SPADRA: country profiles, policy tracker, statistics (accessible charts with data tables as equivalents).
- Phase 5 — multilingual support (English/French/Kiswahili), staff login and admin content management, analytics.
- Phase 6 — accessibility audit pass, performance pass, SEO and structured data.

## Technical notes
- TanStack Start with file routes; each section is its own route with its own metadata.
- Content is static/typed data in Phase 1–3 so pages are real and reviewable; a backend (database, auth for staff login, submissions, polls) is introduced in Phase 5 and requires enabling Lovable Cloud.
- Charts rendered with accessible markup plus a visible data-table fallback.
- The AI chatbot described in the proposal is deliberately last and out of the initial build; it depends on a curated ADF knowledge base existing first.

## What I need from you
- ADF brand assets: logo, colour values, fonts, photography.
- Real content for at least the home and about pages, or permission to use placeholder text marked clearly as such.
- Confirmation of the languages required at launch.
