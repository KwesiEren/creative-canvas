import React, { useState } from 'react';
import { NEWS_DATA } from '@/data/mockData';
import { NewsItem } from '@/types';

export const NewsScreen: React.FC = () => {
  const [selected, setSelected] = useState<NewsItem | null>(null);

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-10 space-y-8 animate-fade-in">
      <div className="bg-white dark:bg-[#0a1128]/95 rounded-none p-6 md:p-8 shadow-none border border-[#0f1b3d]/15">
        <span className="text-xs font-bold uppercase tracking-wider text-[#245a86] dark:text-[#a8c6e4]">
          Newsroom
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0f1b3d] dark:text-[#dbe6f2] mt-1">
          News & Articles
        </h1>
        <p className="text-[#33415c] dark:text-[#c4c6cf] text-base md:text-lg max-w-3xl leading-relaxed mt-2">
          Statements, campaign updates and continental reporting from the African Disability Forum and its member organisations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {NEWS_DATA.map((item) => (
          <article
            key={item.id}
            className="bg-white dark:bg-[#0a1128] rounded-none overflow-hidden border border-[#c4c6cf] shadow-sm flex flex-col"
          >
            <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
            <div className="p-5 flex flex-col gap-3 flex-1">
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="bg-[#0f1b3d] text-white px-2.5 py-1 rounded">{item.category}</span>
                <time dateTime={item.datetime} className="text-[#5b6b85]">{item.date}</time>
              </div>
              <h2 className="text-lg font-extrabold text-[#0f1b3d] dark:text-white leading-snug">
                {item.title}
              </h2>
              <p className="text-sm text-[#33415c] dark:text-[#c4c6cf] leading-relaxed flex-1">
                {item.summary}
              </p>
              <button
                onClick={() => setSelected(item)}
                className="self-start text-sm font-bold text-[#245a86] hover:underline cursor-pointer"
              >
                Read full story
              </button>
            </div>
          </article>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-[#0a1128] rounded-none max-w-2xl w-full p-6 border-2 border-[#0f1b3d] shadow-lg max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start gap-4 border-b border-[#c4c6cf] pb-3 mb-4">
              <div>
                <span className="bg-[#0f1b3d] text-white text-xs font-bold px-2.5 py-1 rounded">
                  {selected.category}
                </span>
                <h2 className="text-2xl font-extrabold text-[#0f1b3d] dark:text-white mt-2">
                  {selected.title}
                </h2>
                <time dateTime={selected.datetime} className="text-xs font-bold text-[#5b6b85]">
                  {selected.date}
                </time>
              </div>
              <button
                onClick={() => setSelected(null)}
                aria-label="Close article"
                className="p-1 text-[#33415c] hover:bg-[#e8edf3] rounded-full cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-sm md:text-base text-[#0a1128] dark:text-[#e8edf3] leading-relaxed">
              {selected.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
