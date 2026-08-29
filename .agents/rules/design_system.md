
# Design System & UI/UX Guidelines Rule

All UI components, pages, and sub-pages in this codebase must adhere strictly to the established design system tokens and layout standards documented in `design_system.md`:

1. **Card Geometry**:
   - All content cards, form inputs, modal dialogs, and image containers must be rectangular with smooth rounded corners (`border-radius: 12px` / `rounded-xl` / `rounded-2xl`).
   - Do NOT use generic circular or oval shapes for cards or rectangular media. Reserve `rounded-full` strictly for small avatar icons, top-right date badges, play button triggers, and circular badge graphics.

2. **Inner Page Hero Banner Standard (1894x378 Aspect)**:
   - Every sub-page (Events, Contact, Blog/News, About, Resources, Membership, etc.) must feature a high-contrast hero banner (~378px height) with a dark gradient scrim (`from-black/85 via-black/70 to-black/45`) over a photographic background.
   - Must contain uppercase breadcrumb navigation (`Home / [Category] / [Page]`) and bold 4xl-6xl page title typography.

3. **Color Tokens**:
   - Primary Action Blue: `#0345bf` / `bg-blue-700`
   - Accent Gold/Amber: `#f3b42c` / `bg-amber-400`
   - Dark Charcoal Text: `#313131` / `text-slate-800`
   - Neutral Backdrops: `bg-slate-50` / `bg-slate-100`

4. **Card Patterns**:
   - Feature/Highlight cards: Top accent lines (cyan, amber, red).
   - Article/Event cards: Top image container (370x289 or 270x369), top-right rectangular blue date badge, amber metadata icons (`material-symbols-outlined text-amber-500`), bold title, and uppercase `› READ MORE` action link.

5. **Form Patterns**:
   - Light gray inputs (`bg-slate-50 border-slate-100 rounded-lg px-4 py-3.5`).
   - Inputs arranged in 2x2 responsive grids with full-width textareas and centered solid blue submit buttons (`bg-blue-700`).
