import React, { useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { KNOWLEDGE_ITEMS, KNOWLEDGE_THEMES } from '@/data/extraData';
import { KnowledgeItem, KnowledgeFormat } from '@/types';
import { assetUrl } from '@/lib/assetUrl';
import { PageBanner, SectionHeading, btnPrimary } from './ui';
import { FilterChips, Pagination } from './ui-extra';

const FORMATS: Array<{ value: 'All' | KnowledgeFormat; icon: string }> = [
  { value: 'All', icon: 'grid_view' },
  { value: 'Report', icon: 'description' },
  { value: 'Toolkit', icon: 'build' },
  { value: 'Video', icon: 'play_circle' },
  { value: 'Audio', icon: 'mic' },
  { value: 'Easy Read', icon: 'menu_book' },
  { value: 'Infographic', icon: 'insights' },
];

const ITEMS_PER_PAGE = 9;

function getFormatIcon(format: KnowledgeFormat): string {
  const found = FORMATS.find((f) => f.value === format);
  return found?.icon ?? 'description';
}

function getFormatLabel(item: KnowledgeItem): string {
  if (item.duration) {
    return `${item.format} (${item.duration})`;
  }
  return item.format;
}

export const KnowledgeHubScreen: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<string>('All');
  const [activeFormat, setActiveFormat] = useState<'All' | KnowledgeFormat>('All');
  const [page, setPage] = useState<number>(1);

  const themeOptions = useMemo(() => ['All', ...KNOWLEDGE_THEMES], []);

  const filteredItems = useMemo(() => {
    return KNOWLEDGE_ITEMS.filter((item) => {
      const matchesTheme = activeTheme === 'All' || item.theme === activeTheme;
      const matchesFormat = activeFormat === 'All' || item.format === activeFormat;
      return matchesTheme && matchesFormat;
    });
  }, [activeTheme, activeFormat]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, page]);

  const handleThemeChange = (value: string) => {
    setActiveTheme(value);
    setPage(1);
  };

  const handleFormatChange = (value: string) => {
    setActiveFormat(value as 'All' | KnowledgeFormat);
    setPage(1);
  };

  const hasPlayOverlay = (format: KnowledgeFormat) => format === 'Video' || format === 'Audio';

  return (
    <div className="animate-fade-in">
      <PageBanner
        title="Knowledge Hub"
        crumbs={[{ label: "Home" }, { label: "Knowledge Hub" }]}
        image={assetUrl("/images/adf-event-2.jpg")}
        imageAlt="Knowledge sharing and research"
      />

      <section className="max-w-[1280px] mx-auto px-4 md:px-10 py-16 space-y-12">
        <div>
          <SectionHeading eyebrow="Browse by Theme" title="Thematic Focus Areas" />
          <div className="overflow-x-auto pb-2">
            <div className="min-w-min">
              <FilterChips
                legend="Themes"
                options={themeOptions}
                value={activeTheme}
                onChange={handleThemeChange}
              />
            </div>
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="Browse by Format" title="Multimedia & Documents" />
          <fieldset className="flex flex-wrap items-center gap-2">
            <legend className="sr-only">Formats</legend>
            <span aria-hidden="true" className="mr-2 text-xs font-bold uppercase tracking-widest text-[#245a86]">
              Formats
            </span>
            {FORMATS.map((fmt) => (
              <button
                key={fmt.value}
                onClick={() => handleFormatChange(fmt.value)}
                aria-pressed={activeFormat === fmt.value}
                className={`inline-flex items-center gap-2 border-2 border-[#0f1b3d] px-4 py-2 text-xs font-bold uppercase tracking-widest focus-ring cursor-pointer ${
                  activeFormat === fmt.value
                    ? 'bg-[#0f1b3d] text-white'
                    : 'text-[#0f1b3d] hover:bg-[#e8edf3]'
                }`}
              >
                <span className="material-symbols-outlined text-base">{fmt.icon}</span>
                {fmt.value}
              </button>
            ))}
          </fieldset>
        </div>

        <div>
          <SectionHeading eyebrow="Library" title={`${filteredItems.length} Knowledge Items`} />
          {paginatedItems.length === 0 ? (
            <div className="border-2 border-dashed border-[#0f1b3d]/30 p-12 text-center">
              <p className="text-base font-bold text-[#33415c]">
                No items match your current filters.
              </p>
              <button
                onClick={() => {
                  setActiveTheme('All');
                  setActiveFormat('All');
                  setPage(1);
                }}
                className={`mt-6 ${btnPrimary}`}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedItems.map((item) => (
                <article
                  key={item.id}
                  className="relative flex flex-col border-2 border-[#0f1b3d] bg-white overflow-hidden group"
                >
                  <div className="relative aspect-[16/9] bg-[#e8edf3]">
                    {hasPlayOverlay(item.format) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#0f1b3d]/15 z-10">
                        <div className="w-16 h-16 rounded-full bg-[#0f1b3d]/85 flex items-center justify-center border-4 border-white shadow-lg group-hover:bg-[#0f1b3d] transition-colors">
                          <span className="material-symbols-outlined text-white text-4xl">
                            {item.format === 'Video' ? 'play_circle' : 'play_arrow'}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 bg-white border-2 border-[#0f1b3d] px-3 py-1.5">
                      <span className="material-symbols-outlined text-[#0f1b3d] text-sm">
                        {getFormatIcon(item.format)}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#0f1b3d]">
                        {getFormatLabel(item)}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                      <span className="material-symbols-outlined text-8xl text-[#245a86]/40">
                        {getFormatIcon(item.format)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-block bg-[#e8edf3] text-[#0f1b3d] px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                        {item.theme}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold uppercase text-[#0f1b3d] leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-[#33415c] flex-1">
                      {item.summary}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-[#0f1b3d]/15 text-[11px] font-bold uppercase tracking-widest text-[#5b6b85]">
                      <span>{item.language}</span>
                      <span>{item.year}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <Pagination
            page={page}
            pageCount={totalPages}
            onChange={setPage}
            label="Knowledge hub pagination"
          />
        </div>
      </section>

      <section className="bg-[#e8edf3] border-y-2 border-[#0f1b3d]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-[#245a86] text-3xl flex-shrink-0 mt-0.5">
              accessibility_new
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#245a86] mb-2">
                Accessibility
              </p>
              <p className="text-base font-bold text-[#0f1b3d]">
                All knowledge items are available in accessible formats on request.
              </p>
            </div>
          </div>
          <Link to="/contact" className={`${btnPrimary} flex-shrink-0`}>
            Request accessible version
          </Link>
        </div>
      </section>
    </div>
  );
};
