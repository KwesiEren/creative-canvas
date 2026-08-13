import React from 'react';

/** Shared presentation primitives for the ADF editorial design system. */

export const btnPrimary =
  'inline-flex items-center justify-center gap-2 bg-[#0f1b3d] text-white font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-[#1e3a5f] transition-colors focus-ring cursor-pointer';

export const btnDonate =
  'inline-flex items-center justify-center gap-2 bg-[#f5b301] text-[#0f1b3d] font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-[#ffc933] transition-colors focus-ring cursor-pointer';

export const btnGhost =
  'inline-flex items-center justify-center gap-2 border-2 border-[#0f1b3d] text-[#0f1b3d] font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-[#0f1b3d] hover:text-white transition-colors focus-ring cursor-pointer';

export const btnGhostLight =
  'inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-white hover:text-[#0f1b3d] transition-colors focus-ring cursor-pointer';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
  imageAlt: string;
  children?: React.ReactNode;
  tall?: boolean;
}

/** Full-bleed page banner: photograph with a navy scrim and title over it. */
export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  children,
  tall = false,
}) => (
  <section className={`relative w-full ${tall ? 'min-h-[560px]' : 'min-h-[360px]'} flex items-center overflow-hidden bg-[#0a1128]`}>
    <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />
    <div className="hero-scrim absolute inset-0" aria-hidden="true" />
    <div className="relative w-full max-w-[1280px] mx-auto px-4 md:px-10 py-16 md:py-24">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a8c6e4]">{eyebrow}</p>
      <h1 className={`mt-4 text-white uppercase ${tall ? 'text-4xl sm:text-5xl md:text-7xl' : 'text-3xl sm:text-4xl md:text-5xl'} max-w-4xl`}>
        {title}
      </h1>
      {intro && (
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-[#dbe6f2] leading-relaxed">{intro}</p>
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
      light ? 'border-white/25' : 'border-[#0f1b3d]/20'
    } pb-6 mb-12`}
  >
    <div className="max-w-2xl">
      {eyebrow && (
        <p className={`text-xs font-bold uppercase tracking-[0.25em] ${light ? 'text-[#a8c6e4]' : 'text-[#245a86]'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-3 text-3xl md:text-4xl uppercase ${light ? 'text-white' : 'text-[#0f1b3d]'}`}>{title}</h2>
      {intro && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-[#dbe6f2]' : 'text-[#33415c]'}`}>{intro}</p>
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
  <section className="bg-[#0f1b3d] text-white">
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-16">
      {caption && (
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a8c6e4] mb-10">{caption}</p>
      )}
      <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/20">
        {stats.map((s) => (
          <div key={s.label} className="border-b border-r border-white/20 p-8">
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className="block font-display text-4xl md:text-5xl leading-none">{s.value}</span>
              <span className="mt-3 block text-sm uppercase tracking-widest text-[#b7cbe0]">{s.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);
