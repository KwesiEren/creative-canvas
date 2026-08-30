import React from 'react';

/** Shared presentation primitives aligned to the Wishon charity template. */

export const btnPrimary =
  'adf-btn adf-btn-secondary focus-ring';

export const btnDonate =
  'adf-btn adf-btn-primary focus-ring';

export const btnGhost =
  'adf-btn adf-btn-outline focus-ring';

export const btnGhostLight =
  'adf-btn border border-white text-white bg-transparent hover:bg-white hover:text-[var(--adf-main)] focus-ring';

interface PageBannerProps {
  title: string;
  crumbs?: { label: string; onClick?: () => void }[];
  image?: string;
  imageAlt?: string;
}

/** Inner-page title band with background photo + dark gradient scrim. */
export const PageBanner: React.FC<PageBannerProps> = ({
  title,
  crumbs,
  image,
  imageAlt,
}) => (
  <section className="relative w-full min-h-[320px] md:min-h-[378px] flex items-center overflow-hidden bg-[var(--adf-main)]">
    {image && (
      <>
        <img
          src={image}
          alt={imageAlt || title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.7), rgba(0,0,0,0.45))",
          }}
        />
      </>
    )}
    {!image && (
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.7), rgba(0,0,0,0.45))",
        }}
      />
    )}
    <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-24">
      {crumbs && crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2">
            {crumbs.map((crumb, index) => (
              <li
                key={`${crumb.label}-${index}`}
                className="flex items-center gap-2"
              >
                {index > 0 && (
                  <span aria-hidden="true" className="text-white/60">
                    /
                  </span>
                )}
                {crumb.onClick ? (
                  <button
                    type="button"
                    onClick={crumb.onClick}
                    className="text-white/80 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span
                    aria-current="page"
                    className="text-white text-xs font-bold uppercase tracking-widest"
                  >
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white max-w-4xl leading-tight">
        {title}
      </h1>
    </div>
  </section>
);

interface PageHeroProps {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
  imageAlt: string;
  children?: React.ReactNode;
  tall?: boolean;
}

/** Full-bleed page banner: photograph with a blue scrim and title over it. */
export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  children,
  tall = false,
}) => (
  <section className={`relative w-full ${tall ? 'min-h-[560px]' : 'min-h-[360px]'} flex items-center overflow-hidden bg-[var(--adf-main)]`}>
    <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />
    <div className="hero-scrim absolute inset-0" aria-hidden="true" />
    <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">{eyebrow}</p>
      <h1 className={`mt-4 text-white ${tall ? 'text-4xl sm:text-5xl md:text-6xl' : 'text-3xl sm:text-4xl md:text-5xl'} max-w-4xl`}>
        {title}
      </h1>
      {intro && (
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/90 leading-relaxed">{intro}</p>
      )}
      {children && <div className="mt-8 flex flex-wrap gap-4">{children}</div>}
    </div>
  </section>
);

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  action?: React.ReactNode;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  intro,
  action,
  light = false,
}) => (
  <div
    className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b ${
      light ? 'border-white/25' : 'border-black/10'
    } pb-6 mb-12`}
  >
    <div className="max-w-2xl">
      {eyebrow && (
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${light ? 'text-white/75' : 'text-[var(--adf-main)]'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-3 text-3xl md:text-4xl ${light ? 'text-white' : 'text-[var(--adf-charcoal)]'}`}>{title}</h2>
      {intro && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-white/90' : 'text-[var(--adf-muted)]'}`}>{intro}</p>
      )}
    </div>
    {action}
  </div>
);

interface StatBandProps {
  stats: { value: string; label: string }[];
  caption?: string;
}

export const StatBand: React.FC<StatBandProps> = ({ stats, caption }) => (
  <section className="bg-[var(--adf-main)] text-white">
    <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16">
      {caption && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75 mb-10">{caption}</p>
      )}
      <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/20">
        {stats.map((s) => (
          <div key={s.label} className="border-b border-r border-white/20 p-8">
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className="block font-display text-4xl md:text-5xl leading-none">{s.value}</span>
              <span className="mt-3 block text-sm uppercase tracking-widest text-white/75">{s.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);
