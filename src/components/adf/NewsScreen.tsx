import React, { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { NEWS_DATA } from "@/data/mockData";
import { NewsItem } from "@/types";
import { slugify } from "@/lib/slug";
import { PageBanner, SectionHeading } from "./ui";
import { FilterChips, Pagination, EmptyState } from "./ui-extra";
import { assetUrl } from "@/lib/assetUrl";

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
      <PageBanner
        title="Blog"
        crumbs={[
          { label: "Home", onClick: () => {} },
          { label: "Blog" },
        ]}
      />

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-16">
        <SectionHeading
          eyebrow="Latest Updates"
          title="Stories from the continent"
          intro="Filter by category to follow treaty monitoring, programme milestones and advocacy victories."
        />

        <div className="mb-10 bg-[var(--adf-bg)] p-6 border border-black/10">
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
    <article className="relative bg-white border border-black/10 flex flex-col overflow-hidden adf-card">
      <Link to="/news/$slug" params={{ slug: slug }} className="focus-ring block overflow-hidden relative">
        <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
        <div className="adf-card-date">
          <span className="block text-xl font-bold leading-none">
            {new Date(item.date).getDate()}
          </span>
          <span className="block text-xs uppercase">
            {new Date(item.date).toLocaleString("en-GB", { month: "short" })}
          </span>
        </div>
      </Link>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="bg-[var(--adf-main)] text-white px-2.5 py-1 rounded-full uppercase tracking-widest">
            {item.category}
          </span>
        </div>
        <h2 className="text-lg font-bold text-[var(--adf-charcoal)] leading-snug">
          <Link to="/news/$slug" params={{ slug: slug }} className="hover:text-[var(--adf-main)] focus-ring">
            {item.title}
          </Link>
        </h2>
        <p className="text-sm text-[var(--adf-muted)] leading-relaxed flex-1 line-clamp-3">{item.summary}</p>
        <div className="mt-auto pt-4 border-t border-black/10">
          <Link
            to="/news/$slug" params={{ slug: slug }}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--adf-main)] hover:underline focus-ring"
          >
            Read full story
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>
    </article>
  );
};
