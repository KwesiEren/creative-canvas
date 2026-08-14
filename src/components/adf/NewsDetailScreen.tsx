import React from 'react';
import { Link } from '@tanstack/react-router';
import { NEWS_DATA } from '@/data/mockData';
import { findByTitleSlug, slugify } from '@/lib/slug';
import { Breadcrumbs, MetaRow, ShareRow, Prose, EmptyState } from '@/components/adf/ui-extra';
import { btnGhost } from '@/components/adf/ui';

interface NewsDetailScreenProps {
  slug: string;
}

export const NewsDetailScreen: React.FC<NewsDetailScreenProps> = ({ slug }) => {
  const item = findByTitleSlug(NEWS_DATA, slug);

  if (!item) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-20">
        <EmptyState message="News article not found." />
        <div className="mt-8 flex justify-center">
          <Link to="/news" className={btnGhost}>
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  const paragraphs = item.content
    .split('. ')
    .map((p) => (p.endsWith('.') ? p : p + '.'));

  const relatedStories = NEWS_DATA.filter((n) => n.id !== item.id).slice(0, 3);

  return (
    <article className="animate-fade-in">
      <Breadcrumbs
        trail={[
          { label: 'Home', to: '/' },
          { label: 'News', to: '/news' },
          { label: item.title },
        ]}
      />

      {item.image && (
        <section className="relative w-full min-h-[360px] flex items-center overflow-hidden bg-[#0a1128]">
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="hero-scrim absolute inset-0" aria-hidden="true" />
          <div className="relative w-full max-w-[1280px] mx-auto px-4 md:px-10 py-16 md:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a8c6e4]">
              {item.category}
            </p>
            <h1 className="mt-4 text-white uppercase text-3xl sm:text-4xl md:text-5xl max-w-4xl">
              {item.title}
            </h1>
          </div>
        </section>
      )}

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {!item.image && (
              <header className="space-y-6 border-b border-[#0f1b3d]/20 pb-10">
                <span className="bg-[#0f1b3d] text-white text-xs font-bold px-3 py-1.5 uppercase tracking-widest">
                  {item.category}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0f1b3d] uppercase leading-tight">
                  {item.title}
                </h1>
              </header>
            )}

            {item.image && (
              <div className="flex items-center gap-3">
                <span className="bg-[#0f1b3d] text-white text-xs font-bold px-3 py-1.5 uppercase tracking-widest">
                  {item.category}
                </span>
              </div>
            )}

            <MetaRow
              items={[
                { label: 'Published', value: item.date },
                { label: 'Category', value: item.category },
                { label: 'Source', value: 'ADF Secretariat' },
                { label: 'Reading Time', value: '3 min read' },
              ]}
            />

            <div className="border-l-4 border-[#245a86] pl-6">
              <p className="text-xl md:text-2xl font-bold text-[#0f1b3d] leading-snug">
                {item.summary}
              </p>
            </div>

            <Prose paragraphs={paragraphs} />

            <ShareRow title={item.title} path={`/news/${slug}`} />
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="border-2 border-[#0f1b3d] bg-white">
              <div className="bg-[#0f1b3d] px-5 py-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#a8c6e4]">
                  Related Stories
                </h3>
              </div>
              <div className="p-5 space-y-5">
                {relatedStories.length > 0 ? (
                  relatedStories.map((story) => (
                    <Link
                      key={story.id}
                      to={`/news/${slugify(story.title)}`}
                      className="block group border-b border-[#0f1b3d]/15 pb-5 last:border-b-0 last:pb-0 focus-ring"
                    >
                      <div className="flex gap-4">
                        <img
                          src={story.image}
                          alt={story.title}
                          className="w-20 h-20 object-cover border border-[#0f1b3d]/20 shrink-0"
                        />
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#245a86]">
                            {story.category}
                          </span>
                          <h4 className="text-sm font-bold text-[#0f1b3d] leading-snug group-hover:text-[#245a86] transition-colors line-clamp-3">
                            {story.title}
                          </h4>
                          <time
                            dateTime={story.datetime}
                            className="text-[10px] font-bold uppercase tracking-widest text-[#5b6b85]"
                          >
                            {story.date}
                          </time>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-[#5b6b85] font-medium">
                    No related stories available.
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
};
