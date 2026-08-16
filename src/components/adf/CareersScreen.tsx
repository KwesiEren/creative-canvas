import React, { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { CAREERS_DATA } from "@/data/mockData";
import { CareerItem } from "@/types";
import { slugify } from "@/lib/slug";
import { FilterChips, Pagination, EmptyState } from "./ui-extra";

const ITEMS_PER_PAGE = 9;

export const CareersScreen: React.FC = () => {
  const [activeDepartment, setActiveDepartment] = useState<string>("All");
  const [page, setPage] = useState<number>(1);

  const departmentOptions = useMemo(() => {
    const departments = Array.from(new Set(CAREERS_DATA.map((job) => job.department)));
    return ["All", ...departments];
  }, []);

  const filteredJobs = useMemo(() => {
    if (activeDepartment === "All") return CAREERS_DATA;
    return CAREERS_DATA.filter((job) => job.department === activeDepartment);
  }, [activeDepartment]);

  const pageCount = Math.max(1, Math.ceil(filteredJobs.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, pageCount);

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredJobs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  const handleDepartmentChange = (value: string) => {
    setActiveDepartment(value);
    setPage(1);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-10 space-y-10 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-[#0a1128]/95 rounded-none p-6 md:p-8 shadow-none border border-[#0f1b3d]/15">
        <span className="text-xs font-bold uppercase tracking-wider text-[#245a86] dark:text-[#a8c6e4]">
          Join Our Continental Secretariat
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f1b3d] dark:text-[#dbe6f2] mt-1">
          Careers & Consultancy Opportunities
        </h1>
        <p className="text-[#33415c] dark:text-[#c4c6cf] text-base md:text-lg max-w-3xl leading-relaxed mt-2">
          Work with a dynamic pan-African team dedicated to enforcing the rights of persons with
          disabilities. We strongly encourage qualified candidates with lived experience of
          disability to apply.
        </p>
      </div>

      {/* Diversity & Equal Opportunity Statement */}
      <div className="bg-white dark:bg-[#0a1128]/95 border-l-4 border-[#245a86] p-6 rounded-none shadow-none border border-[#0f1b3d]/15 space-y-2">
        <h2 className="text-lg font-bold text-[#0f1b3d] dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#245a86]">diversity_3</span>
          <span>Equal Opportunity & Inclusive Hiring Commitment</span>
        </h2>
        <p className="text-sm text-[#0a1128] dark:text-[#c4c6cf] leading-relaxed">
          ADF is an equal opportunity employer. All recruitment processes prioritize accessibility.
          Reasonable accommodations (sign language interpretation, accessible digital formats,
          flexible interview setups) are guaranteed for all shortlisted applicants upon request.
        </p>
      </div>

      {/* Open Positions List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#0f1b3d] dark:text-white">
          Current Vacancies ({filteredJobs.length})
        </h2>

        <div className="bg-[#e8edf3] p-6 border-2 border-[#0f1b3d]/10">
          <FilterChips
            legend="Department"
            options={departmentOptions}
            value={activeDepartment}
            onChange={handleDepartmentChange}
          />
        </div>

        {paginatedJobs.length === 0 ? (
          <EmptyState message="No vacancies match this department right now. Try another department." />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedJobs.map((job) => (
                <CareerCard key={job.id} job={job} />
              ))}
            </div>

            <Pagination
              page={currentPage}
              pageCount={pageCount}
              onChange={setPage}
              label="Careers pagination"
            />
          </>
        )}
      </div>
    </div>
  );
};

const CareerCard: React.FC<{ job: CareerItem }> = ({ job }) => {
  const slug = slugify(job.title);
  return (
    <div className="bg-white dark:bg-[#0a1128] border-2 border-[#c4c6cf] dark:border-[#5b6b85] rounded-none p-6 flex flex-col justify-between hover:border-[#0f1b3d] dark:hover:border-[#a8c6e4] transition-all shadow-sm">
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-2">
          <span className="bg-[#0f1b3d] text-white text-xs font-bold px-2.5 py-0.5 rounded-none uppercase tracking-widest">
            {job.type}
          </span>
          <span className="text-xs font-bold text-[#d32f2f]">Deadline: {job.deadline}</span>
        </div>

        <h3 className="text-xl font-bold text-[#0f1b3d] dark:text-white leading-snug">
          <Link to={`/careers/${slug}`} className="hover:text-[#245a86] focus-ring">
            {job.title}
          </Link>
        </h3>

        <div className="text-xs text-[#5b6b85] space-y-1">
          <div>
            <strong>Department:</strong> {job.department}
          </div>
          <div>
            <strong>Location:</strong> {job.location}
          </div>
        </div>

        <p className="text-xs text-[#0a1128] dark:text-[#c4c6cf] line-clamp-3 leading-relaxed">
          {job.summary}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-[#c4c6cf] dark:border-[#1e3a5f] flex items-center justify-between">
        <Link
          to={`/careers/${slug}`}
          className="text-xs font-bold text-[#0f1b3d] dark:text-[#b7cbe0] hover:underline focus-ring"
        >
          View Requirements
        </Link>
        <Link
          to={`/careers/${slug}`}
          className="px-4 py-2 bg-[#245a86] hover:bg-[#0f1b3d] text-white text-xs font-bold rounded-none cursor-pointer transition-colors"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};
