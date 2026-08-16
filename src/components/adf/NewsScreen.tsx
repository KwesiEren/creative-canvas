import React, { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { NEWS_DATA } from "@/data/mockData";
import { NewsItem } from "@/types";
import { slugify } from "@/lib/slug";
import { PageHero, SectionHeading } from "./ui";
import { FilterChips, Pagination, EmptyState } from "./ui-extra";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1600&q=60";

const ITEMS_PER_PAGE = 9;

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
    <div className="animate-fade-in">
      <PageHero
        eyebrow="Newsroom"
        title="News & Articles"
        intro="Statements, campaign updates and continental reporting from the African Disability Forum and its member organisations."
        image={HERO_IMAGE}
        imageAlt="Newspaper and press clippings on a desk"
      />

      <section className="max-w-[1280px] mx-auto px-4 md:px-10 py-16">
        <SectionHeading
          eyebrow="Latest Updates"
          title="Stories from the continent"
          intro="Filter by category to follow treaty monitoring, programme milestones and advocacy victories."
        />

        <div className="mb-10 bg-[#e8edf3] p-6 border-2 border-[#0f1b3d]/10">
          <FilterChips
            legend="Category"
            options={categoryOptions}
            value={activeCategory}
            onChange={handleCategoryChange}
          />
        </div>

        {paginatedNews.length === 0 ? (
          <EmptyState message="No stories match this category yet. Try another category." />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedNews.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>

            <Pagination
              page={currentPage}
              pageCount={pageCount}
              onChange={setPage}
              label="News pagination"
            />
          </>
        )}
      </section>
    </div>
  );
};

const NewsCard: React.FC<{ item: NewsItem }> = ({ item }) => {
  const slug = slugify(item.title);
  return (
    <article className="relative bg-white border-2 border-[#0f1b3d] flex flex-col overflow-hidden">
      <Link to="/news/$slug" params={{ slug: slug }} className="focus-ring block overflow-hidden">
        <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
      </Link>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="bg-[#0f1b3d] text-white px-2.5 py-1 rounded-none uppercase tracking-widest">
            {item.category}
          </span>
          <time dateTime={item.datetime} className="text-[#5b6b85] uppercase tracking-wider">
            {item.date}
          </time>
        </div>
        <h2 className="text-lg font-extrabold text-[#0f1b3d] leading-snug">
          <Link to="/news/$slug" params={{ slug: slug }} className="hover:text-[#245a86] focus-ring">
            {item.title}
          </Link>
        </h2>
        <p className="text-sm text-[#33415c] leading-relaxed flex-1 line-clamp-3">{item.summary}</p>
        <div className="mt-auto pt-4 border-t border-[#0f1b3d]/15">
          <Link
            to="/news/$slug" params={{ slug: slug }}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#245a86] hover:underline focus-ring"
          >
            Read full story
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>
    </article>
  );
};
