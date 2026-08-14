import React from 'react';
import { Link } from '@tanstack/react-router';

/** Additional editorial primitives: breadcrumbs, meta rows, share links, charts, pagination. */

export const Breadcrumbs: React.FC<{ trail: { label: string; to?: string }[] }> = ({ trail }) => (
  <nav aria-label="Breadcrumb" className="bg-[#e8edf3] border-b border-[#0f1b3d]/15">
    <ol className="max-w-[1280px] mx-auto px-4 md:px-10 py-3 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#33415c]">
      {trail.map((crumb, i) => (
        <li key={`${crumb.label}-${i}`} className="flex items-center gap-2">
          {crumb.to ? (
            <Link to={crumb.to} className="text-[#245a86] hover:underline focus-ring">
              {crumb.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-[#0f1b3d]">{crumb.label}</span>
          )}
          {i < trail.length - 1 && <span aria-hidden="true" className="text-[#8fa8c4]">/</span>}
        </li>
      ))}
    </ol>
  </nav>
);

export const MetaRow: React.FC<{ items: { label: string; value: string }[] }> = ({ items }) => (
  <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#0f1b3d]/20">
    {items.map((item) => (
      <div key={item.label} className="border-b border-r border-[#0f1b3d]/20 p-5">
        <dt className="text-[11px] font-bold uppercase tracking-widest text-[#245a86]">{item.label}</dt>
        <dd className="mt-2 text-base font-bold text-[#0f1b3d]">{item.value}</dd>
      </div>
    ))}
  </dl>
);

export const ShareRow: React.FC<{ title: string; path: string }> = ({ title, path }) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedPath = encodeURIComponent(path);
  const links = [
    { label: 'Share on X', href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedPath}` },
    { label: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedPath}` },
    { label: 'Share by email', href: `mailto:?subject=${encodedTitle}&body=${encodedPath}` },
  ];
  return (
    <div className="flex flex-wrap items-center gap-4 border-t border-[#0f1b3d]/20 pt-6">
      <span className="text-xs font-bold uppercase tracking-widest text-[#245a86]">Share this page</span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          rel="noreferrer noopener"
          target="_blank"
          className="text-sm font-bold text-[#0f1b3d] underline underline-offset-4 hover:text-[#245a86] focus-ring"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

export const Prose: React.FC<{ paragraphs: string[] }> = ({ paragraphs }) => (
  <div className="space-y-6 text-lg leading-relaxed text-[#33415c]">
    {paragraphs.map((paragraph, i) => (
      <p key={i}>{paragraph}</p>
    ))}
  </div>
);

interface BarChartProps {
  caption: string;
  unit: string;
  data: { label: string; value: number }[];
}

/** Accessible bar chart: visual bars plus an equivalent data table. */
export const BarChart: React.FC<BarChartProps> = ({ caption, unit, data }) => {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <figure className="border-2 border-[#0f1b3d]">
      <figcaption className="bg-[#0f1b3d] px-5 py-3 text-xs font-bold uppercase tracking-widest text-white">
        {caption}
      </figcaption>
      <div className="p-5 space-y-4" role="presentation">
        {data.map((d) => (
          <div key={d.label}>
            <div className="flex justify-between text-sm font-bold text-[#0f1b3d]">
              <span>{d.label}</span>
              <span>
                {d.value} {unit}
              </span>
            </div>
            <div className="mt-1 h-3 w-full bg-[#e8edf3]">
              <div className="h-3 bg-[#245a86]" style={{ width: `${(d.value / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      <details className="border-t border-[#0f1b3d]/20 p-5">
        <summary className="cursor-pointer text-xs font-bold uppercase tracking-widest text-[#245a86] focus-ring">
          View data table
        </summary>
        <table className="mt-4 w-full border-collapse text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              <th scope="col" className="border border-[#0f1b3d]/20 bg-[#e8edf3] p-2 text-left">Item</th>
              <th scope="col" className="border border-[#0f1b3d]/20 bg-[#e8edf3] p-2 text-left">{unit}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.label}>
                <th scope="row" className="border border-[#0f1b3d]/20 p-2 text-left font-medium">{d.label}</th>
                <td className="border border-[#0f1b3d]/20 p-2">{d.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
};

interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  label: string;
}

export const Pagination: React.FC<PaginationProps> = ({ page, pageCount, onChange, label }) => {
  if (pageCount <= 1) return null;
  return (
    <nav aria-label={label} className="flex items-center justify-center gap-2 pt-12">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="border-2 border-[#0f1b3d] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#0f1b3d] disabled:opacity-40 focus-ring cursor-pointer"
      >
        Previous
      </button>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          aria-current={n === page ? 'page' : undefined}
          className={`px-4 py-2 text-xs font-bold focus-ring cursor-pointer border-2 border-[#0f1b3d] ${
            n === page ? 'bg-[#0f1b3d] text-white' : 'text-[#0f1b3d] hover:bg-[#e8edf3]'
          }`}
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(pageCount, page + 1))}
        disabled={page === pageCount}
        className="border-2 border-[#0f1b3d] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#0f1b3d] disabled:opacity-40 focus-ring cursor-pointer"
      >
        Next
      </button>
    </nav>
  );
};

interface FilterChipsProps {
  legend: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({ legend, options, value, onChange }) => (
  <fieldset className="flex flex-wrap items-center gap-2">
    <legend className="sr-only">{legend}</legend>
    <span aria-hidden="true" className="mr-2 text-xs font-bold uppercase tracking-widest text-[#245a86]">
      {legend}
    </span>
    {options.map((option) => (
      <button
        key={option}
        onClick={() => onChange(option)}
        aria-pressed={value === option}
        className={`border-2 border-[#0f1b3d] px-4 py-2 text-xs font-bold uppercase tracking-widest focus-ring cursor-pointer ${
          value === option ? 'bg-[#0f1b3d] text-white' : 'text-[#0f1b3d] hover:bg-[#e8edf3]'
        }`}
      >
        {option}
      </button>
    ))}
  </fieldset>
);

export const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <p className="border-2 border-dashed border-[#0f1b3d]/30 p-10 text-center text-base font-bold text-[#33415c]">
    {message}
  </p>
);
