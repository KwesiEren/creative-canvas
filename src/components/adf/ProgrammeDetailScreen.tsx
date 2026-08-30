import React from 'react';
import { Link } from '@tanstack/react-router';
import { PROGRAMMES_DATA, NEWS_DATA, RESOURCES_DATA } from '@/data/mockData';
import type { ProgrammeId } from '@/types';
import { findByIdSlug, slugify } from '@/lib/slug';
import { Breadcrumbs, ShareRow, FilterChips, EmptyState } from '@/components/adf/ui-extra';
import { assetUrl } from '@/lib/assetUrl';
import { PageBanner, SectionHeading, StatBand, btnDonate, btnGhost } from '@/components/adf/ui';

interface ProgrammeDetailScreenProps {
  programmeId: ProgrammeId;
}

const GALLERY_IMAGES = [
  assetUrl('/images/adf-event-1.jpg'),
  assetUrl('/images/adf-event-3.jpg'),
  assetUrl('/images/adf-event-5.png'),
];

export const ProgrammeDetailScreen: React.FC<ProgrammeDetailScreenProps> = ({ programmeId }) => {
  const item = findByIdSlug(PROGRAMMES_DATA, programmeId);

  if (!item) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-20">
        <EmptyState message="Programme not found." />
        <div className="mt-8 flex justify-center">
          <Link to="/programmes" className={btnGhost}>
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Programmes
          </Link>
        </div>
      </div>
    );
  }

  const relatedNews = NEWS_DATA.slice(0, 3);
  const relatedResources = RESOURCES_DATA.slice(0, 3);

  return (
    <div className="animate-fade-in">
      <Breadcrumbs
        trail={[
          { label: 'Home', to: '/' },
          { label: 'Programmes', to: '/programmes' },
          { label: item.name },
        ]}
      />

      <PageBanner
        title={item.name}
        crumbs={[{ label: "Home" }, { label: "Programmes", onClick: () => {} }, { label: item.name }]}
        image={assetUrl("/images/adf-event-2.jpg")}
        imageAlt={item.name}
      />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-16 space-y-20">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <SectionHeading
              eyebrow="Programme Overview"
              title={item.name}
              intro={item.summary}
            />
            <div className="space-y-4 text-lg leading-relaxed text-[#33415c]">
              <p>{item.summary}</p>
              <p>
                Implemented across {item.leadRegion}, this initiative brings together
                governments, civil society, and community stakeholders to deliver on
                ADF&apos;s strategic mandate for inclusion, participation, and equity.
              </p>
            </div>
          </div>
          <aside className="lg:col-span-4 space-y-6">
            <div className="border-2 border-[#0f1b3d] bg-[#e8edf3] p-6 space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#245a86]">
                  Lead Region
                </p>
                <p className="mt-2 text-xl font-bold text-[#0f1b3d]">{item.leadRegion}</p>
              </div>
              <div className="border-t border-[#0f1b3d]/20 pt-5">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#245a86]">
                  Programme Code
                </p>
                <p className="mt-2 text-xl font-bold text-[#0f1b3d] uppercase">{item.acronym}</p>
              </div>
              <div className="border-t border-[#0f1b3d]/20 pt-5">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#245a86]">
                  Partners
                </p>
                <p className="mt-2 text-xl font-bold text-[#0f1b3d]">
                  {item.donorsAndPartners.length}
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section className="space-y-10">
          <SectionHeading
            eyebrow="Strategic Objectives"
            title="What this programme delivers"
            intro="Measurable, country-level results anchored in ADF's continental strategic plan."
          />
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {item.objectives.map((objective, i) => (
              <li
                key={i}
                className="border-2 border-[#0f1b3d] bg-white p-8 relative"
              >
                <span className="absolute top-6 right-6 font-display text-6xl text-[#e8edf3] leading-none select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#245a86] mb-4">
                    Objective {i + 1}
                  </p>
                  <p className="text-base md:text-lg font-semibold text-[#0f1b3d] leading-relaxed">
                    {objective}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <StatBand stats={item.impactStats} caption="Measurable Impact to Date" />

        <section id="donate-partner" className="space-y-10">
          <SectionHeading
            eyebrow="Donors & Partners"
            title="Strategic collaborators making this work possible"
            intro="ADF programmes are delivered through trust-based partnerships with institutional donors, implementing agencies, and member OPDs."
          />
          <div className="flex flex-wrap gap-3">
            {item.donorsAndPartners.map((partner, i) => (
              <span
                key={`${partner}-${i}`}
                className="border-2 border-[#0f1b3d] bg-white px-6 py-4 text-sm font-bold uppercase tracking-widest text-[#0f1b3d]"
              >
                {partner}
              </span>
            ))}
          </div>
          <div className="border-2 border-[#0f1b3d] bg-[#0f1b3d] text-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a8c6e4]">
                Become a Partner
              </p>
              <h3 className="mt-3 text-2xl md:text-3xl font-extrabold uppercase max-w-2xl">
                Fund, implement, or champion {item.acronym}
              </h3>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <a href="/contact" className={btnDonate}>
                Partner Inquiry
              </a>
              <a href="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-white hover:text-[#0f1b3d] transition-colors focus-ring cursor-pointer">
                Download Concept Note
              </a>
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeading
            eyebrow="Gallery"
            title="From the field"
            intro="Real communities implementing this programme across African member states."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GALLERY_IMAGES.map((src, i) => (
              <figure
                key={i}
                className="border-2 border-[#0f1b3d] overflow-hidden"
              >
                <img
                  src={src}
                  alt={`${item.name} field activity ${i + 1}`}
                  className="w-full h-64 object-cover"
                />
                <figcaption className="bg-[#e8edf3] px-5 py-3">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#245a86]">
                    Activity {i + 1}
                  </p>
                  <p className="mt-1 text-sm font-bold text-[#0f1b3d]">
                    {item.acronym} — {item.leadRegion}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeading
            eyebrow="Related Resources & News"
            title="Dive deeper into this programme"
            intro="Publications, research, and news updates from the programme team."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#245a86] border-b border-[#0f1b3d]/20 pb-3">
                Latest News
              </h3>
              <div className="space-y-4">
                {relatedNews.map((news) => (
                  <Link
                    key={news.id}
                    to="/news/$slug" params={{ slug: slugify(news.title) }}
                    className="block group border-2 border-[#0f1b3d]/20 hover:border-[#0f1b3d] bg-white p-5 transition-colors focus-ring"
                  >
                    <div className="flex gap-4">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-24 h-24 object-cover border border-[#0f1b3d]/20 shrink-0"
                      />
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#245a86]">
                          {news.category}
                        </span>
                        <h4 className="text-base font-bold text-[#0f1b3d] leading-snug group-hover:text-[#245a86] transition-colors">
                          {news.title}
                        </h4>
                        <time
                          dateTime={news.datetime}
                          className="text-[10px] font-bold uppercase tracking-widest text-[#5b6b85]"
                        >
                          {news.date}
                        </time>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#245a86] border-b border-[#0f1b3d]/20 pb-3">
                Publications & Resources
              </h3>
              <div className="space-y-4">
                {relatedResources.map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.downloadUrl}
                    className="block group border-2 border-[#0f1b3d]/20 hover:border-[#0f1b3d] bg-white p-5 transition-colors focus-ring"
                  >
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-[#e8edf3] border border-[#0f1b3d]/20 shrink-0 flex flex-col items-center justify-center p-3">
                        <span className="material-symbols-outlined text-3xl text-[#245a86]">
                          description
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#0f1b3d] mt-1">
                          {resource.pages} p.
                        </span>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#245a86]">
                          {resource.category} · {resource.year}
                        </span>
                        <h4 className="text-base font-bold text-[#0f1b3d] leading-snug group-hover:text-[#245a86] transition-colors">
                          {resource.title}
                        </h4>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#5b6b85]">
                          By {resource.author}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ShareRow title={`${item.name} | ADF Programmes`} path={`/programmes/${item.id}`} />
      </div>
    </div>
  );
};
