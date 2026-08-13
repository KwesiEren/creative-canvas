# ADF Redesign — Photographic Advocacy Site

The reference site works because photography carries the message and the layout gets out of the way: a slim navy contact bar, a clean white nav with one bright CTA, a full-bleed hero photo with big white headline over it, then calm white sections with numbered programmes, a stats band and repeated donate prompts.

We take that structure and apply your chosen ADF identity: navy palette, Archivo Black headings, Hind body, magazine-style lead-plus-grid content.

## What changes

**Removes the current problems**
- The fixed blurred background image behind every page goes. It fights the content and hurts readability.
- Floating white rounded cards on a photo backdrop go. Sections sit on flat white or navy fields.
- The centred pill-badge hero with two buttons goes.

**Global shell**
- Slim navy utility bar: email, phone, language toggle (EN / FR / KIS), accessibility settings button.
- White sticky header: ADF logo left, nav centre, one high-contrast Donate button right. Mobile: full-screen nav panel.
- Footer rebuilt as a navy multi-column block: mission line, site map, contact, member/partner logos, accessibility and privacy links.

**Homepage sections, in order**
1. Full-bleed hero photograph of African OPD members, navy scrim for contrast, Archivo Black headline over it, one-line subhead, Donate + Explore Our Work buttons.
2. Lead story block — image left, text right: who ADF is and why it exists.
3. Strategic Focus Areas — numbered 01/02/03 list in a ruled magazine grid, each with a photo and a link.
4. Impact band — navy field with large numerals: members, countries reached, ratifications tracked.
5. Latest news — one featured story plus a two-up grid, each with dateline and category.
6. Get involved — volunteer, partner, become a member, donate.

**Inner pages** (About, Programmes, Resources, Advocacy, News, Careers, Contact, Governance) all get the same treatment: full-bleed page banner with title over photograph, then flat sections using the shared components. No page keeps the old card-on-backdrop look.

## Design tokens

- Navy `#0f1b3d` (primary surface and text), `#1e3a5f` (secondary), `#3b6fa0` (accent/links), `#e8edf3` (light field), white.
- One warm high-visibility CTA colour for Donate, contrast-checked against navy and white.
- Archivo Black for all headings, uppercase and tight-tracked. Hind for body at 17px minimum.
- Hairline rules and hard edges instead of large rounded corners and drop shadows.

## Accessibility (kept as the priority)

- All hero text over photography sits on a solid navy scrim, tested at 4.5:1 minimum.
- Existing accessibility toolbar (text size, high contrast, reduced motion, dyslexic font) stays and is re-styled; the high-contrast variant is re-tuned to the navy tokens.
- Visible focus rings on every interactive element, skip link, semantic landmarks, real alt text, keyboard-operable nav and modals.
- Motion limited to fades; disabled under reduced motion.

## Technical notes

- Rewrite tokens in `src/styles.css`, drop `.site-backdrop`, add Archivo Black + Hind via `<link>` in `src/routes/__root.tsx`.
- Replace the hardcoded hex colours currently scattered through the `src/components/adf/*` screens with semantic token classes.
- Add shared presentation components: `PageHero`, `SectionHeading`, `NumberedList`, `StatBand`, `StoryCard`.
- Content stays as the existing typed mock data; no backend work in this pass.
- Photography: reuse your existing ADF images, plus new placeholders where a section needs one. Tell me if you have more real photographs to use.

## Order of work

1. Tokens, fonts, header, footer.
2. Homepage.
3. Inner pages.
4. Accessibility and contrast pass across all routes.
