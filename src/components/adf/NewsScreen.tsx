import React, { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { NEWS_DATA } from "@/data/mockData";
import { NewsItem } from "@/types";
import { slugify } from "@/lib/slug";
import { SectionHeading } from "./ui";
import { FilterChips, EmptyState } from "./ui-extra";
import { assetUrl } from "@/lib/assetUrl";

const ITEMS_PER_PAGE = 6;

export const NewsScreen: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [page, setPage] = useState<number>(1);

  const categoryOptions = useMemo(() => {
    const categories = Array.from(new Set(NEWS_DATA.map((item) => item.category)));
    return ["All", ...categories];
  }, []);

  const filteredNews = useMemo(() => {
    if (activeCategory === "All") return NEWS_DATA;
    return NEWS_DATA.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const pageCount = Math.max(1, Math.ceil(filteredNews.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, pageCount);

  const paginatedNews = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNews.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredNews, currentPage]);

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
    setPage(1);
  };

  return (
    <div className="animate-fade-in font-sans pb-20">
      {/* 1. HERO BANNER (1894x378) matching Figma design */}
      <section 
        className="relative min-h-[320px] md:min-h-[378px] flex items-center bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${assetUrl("/images/home_hero_bg.jpg")})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/45" />
        <div className="relative max-w-[1200px] w-full mx-auto px-4 md:px-6 z-10 text-white py-12">
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-wider text-white/70 mb-3">
            <span>Home</span> <span className="mx-1">/</span> <span>Blog</span> <span className="mx-1">/</span> <span className="text-[var(--adf-gold)] font-semibold">Blog</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">Blog Posts</h1>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-16">
        <SectionHeading
          eyebrow="Latest Updates"
          title="Stories & Articles"
          intro="Follow treaty monitoring, policy breakthroughs, programme milestones, and advocacy victories across Africa."
        />

        {/* Category Filter Chips */}
        <div className="mb-10 bg-slate-50 p-6 border border-slate-200 rounded-xl shadow-sm">
          <FilterChips
            legend="Category"
            options={categoryOptions}
            value={activeCategory}
            onChange={handleCategoryChange}
          />
        </div>

        {filteredNews.length === 0 ? (
          <EmptyState message="No stories match this category yet. Try another category." />
        ) : (
          <>
            {/* 3-Column Responsive Grid matching 370x289 Figma Blog Card design */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedNews.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>

            {/* Pagination Controls matching Figma design */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-16 text-sm font-semibold text-slate-600">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage(1)}
                className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center disabled:opacity-40 hover:bg-slate-50 transition-colors"
                aria-label="First page"
              >
                &laquo;
              </button>
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center disabled:opacity-40 hover:bg-slate-50 transition-colors"
                aria-label="Previous page"
              >
                &lsaquo;
              </button>

              {Array.from({ length: pageCount }).map((_, i) => {
                const pNum = i + 1;
                const isActive = pNum === currentPage;
                return (
                  <button
                    key={pNum}
                    type="button"
                    onClick={() => setPage(pNum)}
                    className={`w-10 h-10 rounded-lg font-bold transition-colors ${
                      isActive
                        ? "bg-blue-700 text-white shadow"
                        : "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    {pNum}
                  </button>
                );
              })}

              <button
                type="button"
                disabled={currentPage === pageCount}
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center disabled:opacity-40 hover:bg-slate-50 transition-colors"
                aria-label="Next page"
              >
                &rsaquo;
              </button>
              <button
                type="button"
                disabled={currentPage === pageCount}
                onClick={() => setPage(pageCount)}
                className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center disabled:opacity-40 hover:bg-slate-50 transition-colors"
                aria-label="Last page"
              >
                &raquo;
              </button>

              <span className="ml-3 text-xs text-slate-400 font-medium">
                Page {currentPage} of {pageCount}
              </span>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

const NewsCard: React.FC<{ item: NewsItem }> = ({ item }) => {
  const slug = slugify(item.title);
  const dateObj = new Date(item.date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en-US", { month: "short" });

  return (
    <article className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 group">
      {/* Top Image Container matching 370x289 aspect ratio with Date Badge */}
      <div className="relative aspect-[370/289] overflow-hidden bg-slate-100">
        <img
          src={assetUrl(item.image)}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Blue Date Badge on Top Right */}
        <div className="absolute top-4 right-4 bg-blue-700 text-white font-extrabold text-xs py-2 px-3.5 rounded-lg text-center shadow-md z-10">
          <span className="block text-sm leading-none">{day}</span>
          <span className="block text-[9px] uppercase leading-none mt-0.5 tracking-wider">{month}</span>
        </div>
      </div>

      {/* Bottom Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row with Amber Icons */}
          <div className="flex items-center gap-4 text-xs font-semibold text-amber-500 mb-3">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">person</span>
              ADF Editor
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">folder</span>
              {item.category}
            </span>
          </div>

          {/* Post Title */}
          <h2 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
            <Link to="/news/$slug" params={{ slug: slug }}>
              {item.title}
            </Link>
          </h2>
        </div>

        {/* Uppercase Read More Link */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <Link
            to="/news/$slug"
            params={{ slug: slug }}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-500 hover:text-amber-500 transition-colors tracking-widest uppercase"
          >
            <span className="text-amber-500 text-sm font-bold">&rsaquo;</span> READ MORE
          </Link>
        </div>
      </div>
    </article>
  );
};
