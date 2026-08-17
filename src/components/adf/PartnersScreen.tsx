import React, { useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { PARTNERS } from '@/data/extraData';
import { PartnerItem } from '@/types';
import { PageHero, SectionHeading, btnDonate, btnGhost } from './ui';
import { FilterChips } from './ui-extra';
import { assetUrl } from '@/lib/assetUrl';

const HERO_IMAGE = assetUrl('/images/adf-event-4.jpg');

const PARTNER_TYPES = [
  'All',
  'Donor',
  'Implementing Partner',
  'Institutional',
  'Network',
] as const;

type PartnerType = (typeof PARTNER_TYPES)[number];

function getAcronym(name: string): string {
  const stopWords = new Set(['the', 'of', 'for', 'and', 'in', 'on', 'at', 'a', 'an', 'to', '&']);
  const words = name.split(/[\s/]+/);
  const letters = words
    .filter((w) => !stopWords.has(w.toLowerCase()) && w.length > 0)
    .map((w) => w[0]!.toUpperCase())
    .join('');
  return letters.slice(0, 3);
}

const btnGhostTiny =
  'inline-flex items-center justify-center gap-2 border-2 border-[#0f1b3d] text-[#0f1b3d] font-bold uppercase tracking-widest text-xs px-5 py-2.5 hover:bg-[#0f1b3d] hover:text-white transition-colors focus-ring cursor-pointer';

export const PartnersScreen: React.FC = () => {
  const [activeType, setActiveType] = useState<PartnerType>('All');

  const filteredPartners = useMemo(() => {
    if (activeType === 'All') return PARTNERS;
    return PARTNERS.filter((p) => p.type === activeType);
  }, [activeType]);

  const handleTypeChange = (value: string) => {
    setActiveType(value as PartnerType);
  };

  return (
    <div className="animate-fade-in">
      <PageHero
        eyebrow="About ADF"
        title="Partners & Donors"
        intro="ADF works with institutional funders, implementing NGOs, UN agencies and global networks. Meet the coalition."
        image={HERO_IMAGE}
        imageAlt="Diverse group of professionals collaborating around a table"
      />

      <section className="max-w-[1280px] mx-auto px-4 md:px-10 py-16 space-y-12">
        <div>
          <SectionHeading eyebrow="Directory" title="Our Partners" />
          <div className="flex flex-wrap justify-start">
            <FilterChips
              legend="Partner type"
              options={[...PARTNER_TYPES]}
              value={activeType}
              onChange={handleTypeChange}
            />
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="Network" title={`${filteredPartners.length} Organisations`} />
          {filteredPartners.length === 0 ? (
            <div className="border-2 border-dashed border-[#0f1b3d]/30 p-12 text-center">
              <p className="text-base font-bold text-[#33415c]">
                No partners match your current filter.
              </p>
              <button
                onClick={() => handleTypeChange('All')}
                className={`mt-6 ${btnGhost}`}
              >
                Show all partners
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPartners.map((partner: PartnerItem) => (
                <article
                  key={partner.id}
                  className="flex flex-col border-2 border-[#0f1b3d] bg-white p-6 gap-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-[#0f1b3d] flex items-center justify-center border-4 border-[#f5b301]">
                        <span className="text-white font-display font-bold text-xl tracking-wider">
                          {getAcronym(partner.name)}
                        </span>
                      </div>
                    </div>
                    <span className="inline-block bg-[#f5b301] text-[#0f1b3d] px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                      {partner.type}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-base font-bold uppercase text-[#0f1b3d] leading-snug">
                      {partner.name}
                    </h4>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#245a86]">
                      {partner.country}
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed text-[#33415c] flex-1">
                    {partner.description}
                  </p>

                  <div className="pt-3 border-t border-[#0f1b3d]/15">
                    <Link to="/contact" className={btnGhostTiny}>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      Learn more
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#0f1b3d] text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a8c6e4] mb-4">
              Work with us
            </p>
            <h2 className="text-3xl md:text-4xl uppercase mb-5">
              Become a partner
            </h2>
            <p className="text-lg leading-relaxed text-[#dbe6f2] max-w-2xl">
              ADF is always looking to deepen its coalition of institutional funders,
              implementing partners, UN agencies and disability-led networks. Reach out to the
              Secretariat to explore funding, programmatic or convening partnerships.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link to="/contact" className={btnDonate}>
              <span className="material-symbols-outlined text-base">diversity_3</span>
              Enquire about partnership
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
