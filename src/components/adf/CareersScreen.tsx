import React, { useState } from 'react';
import { CAREERS_DATA } from '@/data/mockData';
import { CareerItem } from '@/types';

export const CareersScreen: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<CareerItem | null>(null);
  const [appliedJob, setAppliedJob] = useState<string | null>(null);

  const handleApply = (title: string) => {
    setAppliedJob(title);
    setSelectedJob(null);
    setTimeout(() => setAppliedJob(null), 5000);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-10 space-y-10 animate-fade-in">
      {/* Header */}
      <div className="bg-white/95 dark:bg-[#1a1c1c]/95 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl border border-white/80">
        <span className="text-xs font-bold uppercase tracking-wider text-[#126e0c] dark:text-[#9bf585]">
          Join Our Continental Secretariat
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#002045] dark:text-[#d6e3ff] mt-1">
          Careers & Consultancy Opportunities
        </h1>
        <p className="text-[#43474e] dark:text-[#c4c6cf] text-base md:text-lg max-w-3xl leading-relaxed mt-2">
          Work with a dynamic pan-African team dedicated to enforcing the rights of persons with disabilities. We strongly encourage qualified candidates with lived experience of disability to apply.
        </p>
      </div>

      {appliedJob && (
        <div className="p-4 bg-[#e8f5e9] border border-[#2e7d32] text-[#1b5e20] rounded-xl font-bold flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">check_circle</span>
            <span>Thank you! Your application for "{appliedJob}" has been submitted successfully.</span>
          </div>
          <button onClick={() => setAppliedJob(null)} className="text-xs underline">Dismiss</button>
        </div>
      )}

      {/* Diversity & Equal Opportunity Statement */}
      <div className="bg-white/95 dark:bg-[#1a1c1c]/95 backdrop-blur-md border-l-4 border-[#126e0c] p-6 rounded-2xl shadow-xl border border-white/80 space-y-2">
        <h2 className="text-lg font-bold text-[#002045] dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#126e0c]">diversity_3</span>
          <span>Equal Opportunity & Inclusive Hiring Commitment</span>
        </h2>
        <p className="text-sm text-[#1a1c1c] dark:text-[#c4c6cf] leading-relaxed">
          ADF is an equal opportunity employer. All recruitment processes prioritize accessibility. Reasonable accommodations (sign language interpretation, accessible digital formats, flexible interview setups) are guaranteed for all shortlisted applicants upon request.
        </p>
      </div>

      {/* Open Positions List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#002045] dark:text-white">
          Current Vacancies ({CAREERS_DATA.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAREERS_DATA.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-[#1a1c1c] border-2 border-[#c4c6cf] dark:border-[#74777f] rounded-xl p-6 flex flex-col justify-between hover:border-[#002045] dark:hover:border-[#9bf585] transition-all shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="bg-[#002045] text-white text-xs font-bold px-2.5 py-0.5 rounded">
                    {job.type}
                  </span>
                  <span className="text-xs font-bold text-[#d32f2f]">
                    Deadline: {job.deadline}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#002045] dark:text-white leading-snug">
                  {job.title}
                </h3>

                <div className="text-xs text-[#74777f] space-y-1">
                  <div><strong>Department:</strong> {job.department}</div>
                  <div><strong>Location:</strong> {job.location}</div>
                </div>

                <p className="text-xs text-[#1a1c1c] dark:text-[#c4c6cf] line-clamp-3 leading-relaxed">
                  {job.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#c4c6cf] dark:border-[#3a3d3d] flex items-center justify-between">
                <button
                  onClick={() => setSelectedJob(job)}
                  className="text-xs font-bold text-[#002045] dark:text-[#86a0cd] hover:underline cursor-pointer"
                >
                  View Requirements
                </button>
                <button
                  onClick={() => handleApply(job.title)}
                  className="px-4 py-2 bg-[#126e0c] hover:bg-[#005300] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Job Details */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-[#252828] rounded-xl max-w-xl w-full p-6 border-2 border-[#002045] shadow-2xl relative space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-[#c4c6cf] pb-3">
              <div>
                <span className="bg-[#002045] text-white text-xs font-bold px-2.5 py-0.5 rounded">
                  {selectedJob.type}
                </span>
                <h3 className="text-2xl font-bold text-[#002045] dark:text-white mt-1">
                  {selectedJob.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-1 text-[#43474e] dark:text-[#c4c6cf] hover:bg-[#e8e8e8] rounded-full"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="text-xs text-[#74777f] space-y-1">
              <div><strong>Department:</strong> {selectedJob.department}</div>
              <div><strong>Location:</strong> {selectedJob.location}</div>
              <div><strong>Application Deadline:</strong> {selectedJob.deadline}</div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#002045] dark:text-white">Role Summary</h4>
              <p className="text-xs text-[#1a1c1c] dark:text-[#e2e2e2] leading-relaxed">{selectedJob.summary}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#002045] dark:text-white">Requirements & Qualifications</h4>
              <ul className="list-disc pl-5 space-y-1 text-xs text-[#1a1c1c] dark:text-[#e2e2e2]">
                {selectedJob.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#c4c6cf] flex justify-end gap-3">
              <button
                onClick={() => setSelectedJob(null)}
                className="px-4 py-2 border border-[#74777f] text-[#43474e] dark:text-white font-bold text-xs rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => handleApply(selectedJob.title)}
                className="px-5 py-2 bg-[#126e0c] text-white font-bold text-xs rounded-lg"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
