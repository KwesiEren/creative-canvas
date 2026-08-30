# African Disability Forum (ADF) - Design System & Layout Guidelines

This document establishes the design principles, UI component specifications, color palette, typography rules, and future layout recommendations for the African Disability Forum platform based on our unified Figma redesign.

---

## 1. Core Visual Principles

- **Modern & Authoritative Charity Aesthetic**: High-contrast, clean, and professional layout combining warm human storytelling with clear continental advocacy.
- **Rectangular Component Geometry**: All cards, content containers, modal boxes, and forms use rectangular shapes with smooth, modern rounded corners (`border-radius: 12px` / `--radius: 12px`). Generic circular borders are reserved strictly for badges, avatars, and circular graphics.
- **Dynamic Micro-Interactions**: Smooth hover elevations (`hover:shadow-xl hover:-translate-y-1`), image scale transitions (`group-hover:scale-105`), and color shifts on links and buttons (`transition-colors duration-300`).

---

## 2. Color Palette & Tokens

| Role | Color / Tailwind Class | Hex / Value | Usage |
| :--- | :--- | :--- | :--- |
| **Primary Brand Blue** | `bg-blue-700` / `var(--adf-main)` | `#0345bf` / `#1d4ed8` | Main action buttons, active navigation states, pagination focus, top-right date badges |
| **Secondary Gold / Amber** | `bg-amber-400` / `var(--adf-gold)` | `#f3b42c` / `#fbbf24` | Eyebrow subtitles, highlight badges, metadata icons, hero CTA buttons |
| **Dark Charcoal** | `text-slate-800` / `var(--adf-charcoal)` | `#313131` / `#1e293b` | Main headings, primary body text |
| **Neutral Backgrounds** | `bg-slate-50` / `bg-slate-100` | `#f8fafc` / `#f1f5f9` | Section backdrops, card containers, form input backgrounds |
| **Accent Top Strips** | `border-cyan-500`, `border-amber-500`, `border-red-500` | `#06b6d4`, `#f59e0b`, `#ef4444` | Top accent lines on feature highlight cards |

---

## 3. Typography & Hierarchy

The whole platform uses **Montserrat** as the single typeface — headings, body copy, navigation, forms, buttons, and SPADRA.

- **Platform font**: `Montserrat`, sans-serif (`font-sans` and `font-display` both resolve to Montserrat).
- **Headings**: `font-display` / `font-extrabold` (`700`–`800`) for hero titles, section headlines, and page titles (`text-3xl` to `text-6xl`).
- **Body & interface**: `font-sans` at `400`/`500`/`600` for paragraphs, inputs, navigation, and button labels.
- **Eyebrow headers**: Small, bold, uppercase tracking-widest text (`text-xs font-bold uppercase tracking-widest text-amber-500`).

---

## 4. Universal Layout Standards

### A. Inner Page Banner Standard (`1894x378` Aspect)
Every sub-page (Events, Contact, Blog, About, Resources, Membership, etc.) must utilize the standard header banner layout:
- **Aspect & Height**: Minimum height of `320px` on mobile, `378px` on desktop.
- **Background**: High-resolution photography (`/images/home_hero_bg.jpg` or category photo) with a dark gradient scrim overlay (`from-black/85 via-black/70 to-black/45`).
- **Content Elements**:
  - Breadcrumb navigation (`Home / [Parent Page] / [Current Page]`) in uppercase small tracking text.
  - Page Title in bold white Montserrat (`text-4xl md:text-6xl font-extrabold`).

### B. Standard Component Patterns

#### 1. Content & Feature Cards (3-Column Grid)
- **Container**: `bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300`
- **Top Accent Line**: `border-t-4 border-cyan-500` (or `border-amber-500` / `border-red-500`)
- **Top Image / Background**: Aspect ratio `370/289` or `270/369` with `group-hover:scale-105` transition.
- **Top-Right Date Badge**: Rectangular blue badge (`bg-blue-700 text-white font-extrabold rounded-lg py-2 px-3.5 text-center`).
- **Metadata Row**: Icons rendered using Google Material Symbols (`material-symbols-outlined text-amber-500 text-[15px]`) for time, location, author, or category.
- **Action Link**: Uppercase bold link (`text-xs font-extrabold text-slate-500 hover:text-amber-500 tracking-widest uppercase`).

#### 2. Form & Input Standard (2x2 Grid)
- **Container**: Clean, light gray inputs (`bg-slate-50 border border-slate-100 rounded-lg px-4 py-3.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white`).
- **Grid Layout**: First Name & Last Name (or Name & Email) side-by-side in `grid sm:grid-cols-2 gap-4`, followed by full-width textarea.
- **Submit Button**: Solid blue pill-rectangular CTA (`px-10 py-4 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg uppercase tracking-wider text-xs`).

#### 3. Standard Pagination
- Centered controls featuring `«`, `‹`, numeric buttons (`1`, `2`), `›`, `»`, and a `Page X of Y` label.

---

## 5. Future Page Layout Recommendations

To maintain visual consistency across future page additions or redesigns, follow these layout structures:

### 1. About Us & Governance Page
- **Hero Banner**: `1894x378` Banner with `Home / About` breadcrumb.
- **Intro Section**: 2-Column split:
  - Left: Overlapping circle image container for Founder / Continental Convening photo with dashed gold accent ring and blue video play button.
  - Right: "We're Non-Profit Organisation" headline, mission/vision checkmark list, and "Read More" gold button.
- **Leadership & Secretariat Grid**: 3-Column responsive card grid featuring portrait photos with `rounded-xl`, name, title, region, and amber contact icons.
- **Stats Counter**: Light gray 4-column counter band (`66M+ Raised`, `48k+ Volunteers`, `38k+ Projects`, `230+ Branches`).

### 2. Resources & Technical Publications Page
- **Hero Banner**: `1894x378` Banner with `Home / Resources` breadcrumb.
- **Filter Toolbar**: `bg-slate-50 border border-slate-200 rounded-xl p-6` containing category, publication year, and document format chips.
- **Resource Card Grid**: 3-Column grid featuring rectangular white cards with document type tags (PDF, Report, Policy Brief), published year, download button (`bg-blue-700 text-white rounded-lg`), and file size indicator.

### 3. Membership & OPD Application Page
- **Hero Banner**: `1894x378` Banner with `Home / Membership` breadcrumb.
- **Membership Tier Cards**: 3-Column grid comparing OPD Membership, Associate Partner, and Individual Supporter tiers with top accent borders and feature check-lists.
- **Application Form**: Standard 2x2 grid form with organization details, region dropdown, and file upload for OPD registration documents.

### 4. Detail Pages (Article Detail, Event Detail, Resource Detail)
- **Header**: Compact breadcrumb header.
- **Body Layout**: 2-Column grid (70% main content area, 30% sticky right sidebar).
  - Main Area: Featured image banner, author byline, formatted rich text typography, and social share buttons.
  - Sidebar: Quick Donate CTA box (`bg-amber-400 rounded-xl p-6`), related articles list, and topic tags.

---

## 6. Accessibility Requirements

- **Contrast Ratios**: All white text over images must feature dark scrim overlays (`bg-black/60` or deeper gradient).
- **Interactive Elements**: Touch targets must be at least `44x44px`. Focus rings (`focus:ring-2 focus:ring-blue-600`) must remain visible for keyboard accessibility.
