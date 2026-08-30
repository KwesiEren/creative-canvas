import React, { useState, useMemo } from 'react';
import { RESOURCES_DATA } from '@/data/mockData';
import { ResourceItem } from '@/types';
import { assetUrl } from '@/lib/assetUrl';
import { PageBanner } from './ui';

interface Props {
  initialCategory?: string;
}

export const ResourcesScreen: React.FC<Props> = ({ initialCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All Categories');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeResource, setActiveResource] = useState<ResourceItem | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const categories = ['All Categories', 'Policy Brief', 'Annual Report', 'Research Paper'];

  const filteredResources = useMemo(() => {
    return RESOURCES_DATA.filter((res) => {
      const matchesCategory = selectedCategory === 'All Categories' || res.category === selectedCategory;
      const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            res.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage) || 1;
  const paginatedResources = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredResources.slice(start, start + itemsPerPage);
  }, [filteredResources, currentPage]);

  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case 'Policy Brief':
        return 'bg-[#0f1b3d] text-white';
      case 'Annual Report':
        return 'bg-[#245a86] text-white';
      case 'Research Paper':
        return 'bg-[#1e3a5f] text-white';
      default:
        return 'bg-[#e8edf3] text-[#0a1128]';
    }
  };

  return (
    <div className="animate-fade-in">
      <PageBanner
        title="Institutional Knowledge & Research"
        crumbs={[{ label: "Home" }, { label: "Resources" }]}
        image={assetUrl("/images/adf-event-4.jpg")}
        imageAlt="ADF research and publications"
      />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-10 space-y-8">
        <div>
          <p className="text-[#33415c] text-base md:text-lg max-w-3xl leading-relaxed">
            Access continental policy briefs, legal frameworks, disability monitoring research, and ADF annual reports advocating for inclusion across African states.
          </p>
        </div>

      {/* Controls: Search & Category Badges */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-[#0a1128]/95 p-6 rounded-none border border-[#0f1b3d]/15 shadow-none">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Category Filters">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-colors focus-ring cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0f1b3d] text-white shadow'
                  : 'bg-white text-[#33415c] hover:bg-[#e8edf3] border border-[#c4c6cf]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="w-full md:w-80 relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#5b6b85]">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search reports or briefs..."
            className="w-full pl-10 pr-4 py-2 rounded-none border-2 border-[#5b6b85] bg-white text-sm focus:outline-none focus:border-[#0f1b3d]"
          />
        </div>
      </div>

      {/* Resources Table */}
      <div className="bg-white border-2 border-[#5b6b85] rounded-none overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0f1b3d] text-white font-bold text-sm">
                <th className="p-4 border-b border-[#1e3a5f]">Document Title</th>
                <th className="p-4 border-b border-[#1e3a5f]">Category</th>
                <th className="p-4 border-b border-[#1e3a5f]">Year</th>
                <th className="p-4 border-b border-[#1e3a5f] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c4c6cf]">
              {paginatedResources.length > 0 ? (
                paginatedResources.map((res) => (
                  <tr key={res.id} className="hover:bg-[#f4f7fa] transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-[#0f1b3d] text-base mb-1">{res.title}</div>
                      <div className="text-xs text-[#33415c] max-w-xl line-clamp-2">{res.description}</div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded text-xs font-bold ${getCategoryBadgeStyle(res.category)}`}>
                        {res.category}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap font-bold text-[#0a1128] text-sm">
                      {res.year}
                    </td>
                    <td className="p-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => setActiveResource(res)}
                        className="inline-flex items-center gap-1.5 bg-[#245a86] hover:bg-[#0f1b3d] text-white text-xs font-bold px-4 py-2 rounded transition-colors shadow-sm focus-ring cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">download</span>
                        <span>Download PDF</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-[#33415c]">
                    No resources matched your search query. Try choosing another category or clearing search filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="p-4 bg-[#e8edf3] border-t border-[#c4c6cf] flex items-center justify-between">
          <span className="text-xs font-bold text-[#33415c]">
            Showing {filteredResources.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredResources.length)} of {filteredResources.length} resources
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-white border border-[#c4c6cf] rounded text-xs font-bold text-[#0f1b3d] hover:bg-[#e8edf3] disabled:opacity-40 cursor-pointer"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-xs font-bold text-[#0f1b3d]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-white border border-[#c4c6cf] rounded text-xs font-bold text-[#0f1b3d] hover:bg-[#e8edf3] disabled:opacity-40 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* PDF View / Summary Modal */}
      {activeResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-none max-w-xl w-full p-6 border-2 border-[#0f1b3d] shadow-lg relative">
            <div className="flex justify-between items-start mb-4 border-b border-[#c4c6cf] pb-3">
              <div>
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${getCategoryBadgeStyle(activeResource.category)}`}>
                  {activeResource.category} ({activeResource.year})
                </span>
                <h2 className="text-2xl font-bold text-[#0f1b3d] mt-2">{activeResource.title}</h2>
              </div>
              <button
                onClick={() => setActiveResource(null)}
                className="p-1 text-[#33415c] hover:bg-[#e8edf3] rounded-full"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4 text-sm text-[#0a1128]">
              <p className="leading-relaxed">{activeResource.description}</p>
              
              <div className="bg-[#e8edf3] p-4 rounded-none space-y-2 border border-[#c4c6cf]">
                <div className="flex justify-between">
                  <span className="font-bold text-[#33415c]">Document Author:</span>
                  <span className="font-medium">{activeResource.author}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-[#33415c]">Format / Length:</span>
                  <span className="font-medium">Accessible PDF ({activeResource.pages} Pages)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-[#33415c]">Accessibility Compliance:</span>
                  <span className="font-medium text-[#245a86] font-bold">PDF/UA & Screen Reader Verified</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#c4c6cf] flex justify-end gap-3">
              <button
                onClick={() => setActiveResource(null)}
                className="px-4 py-2 border border-[#5b6b85] rounded font-bold text-sm text-[#0f1b3d]"
              >
                Cancel
              </button>
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Downloading document: ${activeResource.title}.pdf`);
                  setActiveResource(null);
                }}
                className="px-6 py-2 bg-[#245a86] hover:bg-[#0f1b3d] text-white font-bold rounded text-sm flex items-center gap-2 shadow"
              >
                <span className="material-symbols-outlined text-base">download</span>
                <span>Confirm Download</span>
              </a>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
