import React, { useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { RESOURCES_DATA } from '@/data/mockData.generated';
import { ResourceItem } from '@/types';
import { findByTitleSlug, slugify } from '@/lib/slug';
import { Breadcrumbs, MetaRow, Prose, ShareRow, EmptyState } from '@/components/adf/ui-extra';
import { btnPrimary, btnGhost, SectionHeading } from '@/components/adf/ui';

interface Props {
  slug: string;
}

export const ResourceDetailScreen: React.FC<Props> = ({ slug }) => {
  const item = findByTitleSlug(RESOURCES_DATA, slug);
  const [accessibleOpen, setAccessibleOpen] = useState(false);

  if (!item) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-20">
        <EmptyState message="Resource not found. The document you are looking for may have been moved or is unavailable." />
        <div className="mt-8 text-center">
          <Link to="/resources" className={btnGhost}>Back to Resources</Link>
        </div>
      </div>
    );
  }

  const paragraphs = item.description.split('. ').map((p, i, arr) =>
    i === arr.length - 1 ? p : p + '.'
  );

  const relatedResources = useMemo(() => {
    return RESOURCES_DATA
      .filter((r) => r.id !== item.id)
      .slice(0, 3);
  }, [item.id]);

  const metaItems = [
    { label: 'Author', value: item.author },
    { label: 'Year', value: String(item.year) },
    { label: 'Language', value: 'English' },
    { label: 'Pages', value: `${item.pages} pages` },
    { label: 'Category', value: item.category },
    { label: 'Format', value: 'PDF / Accessible HTML' },
  ];

  return (
    <div>
      <Breadcrumbs
        trail={[
          { label: 'Home', to: '/' },
          { label: 'Resources', to: '/resources' },
          { label: item.title },
        ]}
      />

      <section className="bg-[#0f1b3d] text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-16 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a8c6e4]">
            {item.category} — {item.year}
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl uppercase max-w-4xl leading-tight">
            {item.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-[#dbe6f2] leading-relaxed">
            {paragraphs[0]}
          </p>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-12 space-y-12">
        <MetaRow items={metaItems} />

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <SectionHeading eyebrow="Document" title="Summary" />
              <Prose paragraphs={paragraphs} />
            </section>

            <section>
              <div className="flex flex-wrap gap-4">
                <a href="#" className={btnPrimary}>
                  <span className="material-symbols-outlined text-base">download</span>
                  Download PDF
                </a>
                <button
                  type="button"
                  onClick={() => setAccessibleOpen((v) => !v)}
                  aria-expanded={accessibleOpen}
                  aria-controls="accessible-panel"
                  className={btnGhost}
                >
                  <span className="material-symbols-outlined text-base">visibility</span>
                  {accessibleOpen ? 'Hide Accessible Version' : 'Read Accessible HTML Version'}
                </button>
              </div>
            </section>

            {accessibleOpen && (
              <section
                id="accessible-panel"
                className="border-4 border-[#245a86] bg-white p-8 md:p-10 space-y-8"
              >
                <div className="bg-[#e8edf3] p-6 border-l-4 border-[#245a86]">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#245a86]">
                    Accessible HTML Version
                  </p>
                  <p className="mt-2 text-sm text-[#33415c]">
                    This version is optimized for screen readers, keyboard navigation, and
                    high-contrast display modes.
                  </p>
                </div>

                <article>
                  <h2 className="text-3xl uppercase font-bold text-[#0f1b3d]">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-base text-[#33415c]">
                    Published by <strong>{item.author}</strong> — {item.year}
                  </p>

                  <div className="mt-10 space-y-8 text-lg leading-relaxed text-[#33415c]">
                    <section>
                      <h3 className="text-xl font-bold uppercase tracking-widest text-[#0f1b3d] mb-4">
                        Overview
                      </h3>
                      <p>{paragraphs[0]}</p>
                    </section>

                    {paragraphs.length > 1 && (
                      <section>
                        <h3 className="text-xl font-bold uppercase tracking-widest text-[#0f1b3d] mb-4">
                          Background
                        </h3>
                        <p>{paragraphs.slice(1).join(' ')}</p>
                      </section>
                    )}

                    <section className="bg-[#e8edf3] p-6 md:p-8 border-l-4 border-[#245a86]">
                      <h3 className="text-lg font-bold uppercase tracking-widest text-[#0f1b3d] mb-3">
                        <strong className="text-[#245a86]">KEY FINDINGS</strong>
                      </h3>
                      <ul className="space-y-3 list-none">
                        <li className="flex gap-3">
                          <span className="material-symbols-outlined text-[#245a86] shrink-0">check_circle</span>
                          <span>Evidence-based analysis drawn from {item.pages} pages of primary research across ADF member states.</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="material-symbols-outlined text-[#245a86] shrink-0">check_circle</span>
                          <span>Structured according to UN CRPD reporting standards and AU continental benchmarks.</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="material-symbols-outlined text-[#245a86] shrink-0">check_circle</span>
                          <span>Disaggregated by disability type, age cohort, gender identity, and regional classification.</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="material-symbols-outlined text-[#245a86] shrink-0">check_circle</span>
                          <span>Peer reviewed by the ADF {item.category} Editorial Committee prior to publication.</span>
                        </li>
                      </ul>
                    </section>

                    <section className="bg-[#0f1b3d] text-white p-6 md:p-8">
                      <h3 className="text-lg font-bold uppercase tracking-widest text-[#a8c6e4] mb-4">
                        <strong>RECOMMENDATIONS</strong>
                      </h3>
                      <ol className="space-y-4 list-none">
                        <li className="flex gap-4">
                          <span className="bg-[#245a86] w-8 h-8 shrink-0 grid place-items-center font-bold text-sm">1</span>
                          <p>National governments should allocate at least 5% of sectoral budgets to disability-inclusive implementation by {item.year + 2}.</p>
                        </li>
                        <li className="flex gap-4">
                          <span className="bg-[#245a86] w-8 h-8 shrink-0 grid place-items-center font-bold text-sm">2</span>
                          <p>OPDs should be formally consulted in all legislative drafting processes relevant to this {item.category.toLowerCase()} topic.</p>
                        </li>
                        <li className="flex gap-4">
                          <span className="bg-[#245a86] w-8 h-8 shrink-0 grid place-items-center font-bold text-sm">3</span>
                          <p>Regional economic communities should adopt harmonized monitoring indicators every two years.</p>
                        </li>
                        <li className="flex gap-4">
                          <span className="bg-[#245a86] w-8 h-8 shrink-0 grid place-items-center font-bold text-sm">4</span>
                          <p>Annual accessibility audits should be conducted and published with disaggregated, machine-readable datasets.</p>
                        </li>
                      </ol>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold uppercase tracking-widest text-[#0f1b3d] mb-4">
                        Accessible Formats
                      </h3>
                      <p className="mb-6 text-base">
                        This publication is available in the following alternative formats upon
                        request from the ADF Secretariat.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[
                          { name: 'Tagged PDF', desc: 'PDF/UA compliant, full document structure tags for screen readers.' },
                          { name: 'Large print', desc: 'Minimum 16pt sans-serif font, high contrast margins and spacing.' },
                          { name: 'Audio summary', desc: 'Narrated MP3 format, structured by chapter, 30-minute runtime.' },
                          { name: 'Easy Read', desc: 'Simplified language with pictorial illustrations and short sentences.' },
                        ].map((fmt) => (
                          <div key={fmt.name} className="border-2 border-[#0f1b3d]/20 p-5">
                            <p className="text-sm font-bold uppercase tracking-widest text-[#245a86]">
                              {fmt.name}
                            </p>
                            <p className="mt-2 text-sm text-[#33415c] leading-relaxed">
                              {fmt.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </article>
              </section>
            )}
          </div>

          <aside className="space-y-8">
            <div className="bg-[#e8edf3] p-6 border-2 border-[#0f1b3d]/20">
              <p className="text-xs font-bold uppercase tracking-widest text-[#245a86]">
                Citation
              </p>
              <p className="mt-3 text-sm text-[#33415c] leading-relaxed">
                {item.author}. ({item.year}). <em>{item.title}</em>. {item.category}. African Disability Forum. {item.pages} pp.
              </p>
            </div>

            <div className="border-2 border-[#0f1b3d]/20 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#245a86] mb-4">
                Document Identifiers
              </p>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="font-bold text-[#0f1b3d] uppercase tracking-wider text-xs">ADF Ref</dt>
                  <dd className="text-[#33415c]">{item.id.toUpperCase()}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-bold text-[#0f1b3d] uppercase tracking-wider text-xs">Pages</dt>
                  <dd className="text-[#33415c]">{item.pages}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-bold text-[#0f1b3d] uppercase tracking-wider text-xs">WCAG</dt>
                  <dd className="text-[#33415c]">AA Compliant</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-bold text-[#0f1b3d] uppercase tracking-wider text-xs">ISSN</dt>
                  <dd className="text-[#33415c]">2958-{String(2000 + item.year).slice(-2)}-{item.pages}</dd>
                </div>
              </dl>
            </div>

            <ShareRow title={item.title} path={`/resources/${slugify(item.title)}`} />
          </aside>
        </div>

        <section>
          <SectionHeading eyebrow="Related" title="Related Resources" />
          <div className="grid md:grid-cols-3 gap-6">
            {relatedResources.map((res) => (
              <Link
                key={res.id}
                to={`/resources/${slugify(res.title)}`}
                className="group border-2 border-[#0f1b3d]/20 p-6 hover:border-[#245a86] transition-colors bg-white"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-[#245a86]">
                  {res.category} — {res.year}
                </div>
                <h3 className="mt-3 text-lg font-bold text-[#0f1b3d] uppercase leading-snug group-hover:text-[#245a86] transition-colors">
                  {res.title}
                </h3>
                <p className="mt-4 text-sm text-[#33415c] leading-relaxed line-clamp-3">
                  {res.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#245a86]">
                  <span>Read document</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
