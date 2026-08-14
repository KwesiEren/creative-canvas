import React, { useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { YOUTH_OPPORTUNITIES, YOUTH_STORIES, YOUTH_POLLS, KNOWLEDGE_ITEMS } from '@/data/extraData';
import type { PollItem } from '@/types';
import { PageHero, SectionHeading, btnPrimary, btnGhost } from './ui';
import { FilterChips, Pagination } from './ui-extra';

interface QuizQuestion {
  id: string;
  question: string;
  options: { id: string; label: string }[];
  correctId: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Which AU treaty specifically addresses disability rights in Africa?',
    options: [
      { id: 'a', label: 'African Disability Protocol' },
      { id: 'b', label: 'CRPD' },
      { id: 'c', label: 'Maputo Protocol' },
      { id: 'd', label: 'Abuja Declaration' },
    ],
    correctId: 'a',
  },
  {
    id: 'q2',
    question: 'CRPD article 24 covers?',
    options: [
      { id: 'a', label: 'Accessibility' },
      { id: 'b', label: 'Education' },
      { id: 'c', label: 'Employment' },
      { id: 'd', label: 'Health' },
    ],
    correctId: 'b',
  },
  {
    id: 'q3',
    question: 'ADF youth fellowship programme?',
    options: [
      { id: 'a', label: 'Emerging Leaders Programme' },
      { id: 'b', label: 'Youth Catalyst Fellowship' },
      { id: 'c', label: 'Young Advocates Fellowship' },
      { id: 'd', label: 'Continental Youth Corps' },
    ],
    correctId: 'c',
  },
];

const DISCUSSION_PROMPTS = [
  'How accessible is your university campus?',
  'What one law would you change in your country?',
  'How can OPDs better center youth leadership?',
];

export const YouthScreen: React.FC = () => {
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>(null);
  const [opportunityFilter, setOpportunityFilter] = useState<string>('All');
  const [opportunityPage, setOpportunityPage] = useState<number>(1);
  const [polls, setPolls] = useState<PollItem[]>(
    YOUTH_POLLS.map((p) => ({
      ...p,
      options: p.options.map((o) => ({ ...o })),
    })),
  );
  const [votedPolls, setVotedPolls] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const itemsPerPage = 6;
  const opportunityKinds = ['All', 'Internship', 'Fellowship', 'Volunteering', 'Grant'];

  const filteredOpportunities = useMemo(() => {
    if (opportunityFilter === 'All') return YOUTH_OPPORTUNITIES;
    return YOUTH_OPPORTUNITIES.filter((o) => o.kind === opportunityFilter);
  }, [opportunityFilter]);

  const totalOppPages = Math.ceil(filteredOpportunities.length / itemsPerPage) || 1;
  const paginatedOpportunities = useMemo(() => {
    const start = (opportunityPage - 1) * itemsPerPage;
    return filteredOpportunities.slice(start, start + itemsPerPage);
  }, [filteredOpportunities, opportunityPage]);

  const knowledgeCards = useMemo(() => {
    const easyRead = KNOWLEDGE_ITEMS.find((k) => k.format === 'Easy Read');
    const infographic = KNOWLEDGE_ITEMS.find((k) => k.format === 'Infographic');
    const report = KNOWLEDGE_ITEMS.find((k) => k.format === 'Report');
    return [
      { label: 'Easy Read Summary', item: easyRead, accent: '#f5b301' },
      { label: 'At-a-glance Infographic', item: infographic, accent: '#245a86' },
      { label: 'Full Report', item: report, accent: '#0f1b3d' },
    ];
  }, []);

  const handleVote = (pollId: string, optionId: string) => {
    if (votedPolls.has(pollId)) return;
    setPolls((prev) =>
      prev.map((p) => {
        if (p.id !== pollId) return p;
        return {
          ...p,
          options: p.options.map((o) =>
            o.id === optionId ? { ...o, votes: o.votes + 1 } : o,
          ),
        };
      }),
    );
    setVotedPolls((prev) => new Set(prev).add(pollId));
  };

  const quizScore = useMemo(() => {
    return QUIZ_QUESTIONS.reduce((score, q) => {
      return quizAnswers[q.id] === q.correctId ? score + 1 : score;
    }, 0);
  }, [quizAnswers]);

  return (
    <div className="space-y-20 animate-fade-in">
      <PageHero
        eyebrow="Youth Empowerment"
        title="Youth Hub"
        intro="Young leaders with disabilities driving change across Africa. Stories, opportunities, surveys, challenges and action."
        image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=60"
        imageAlt="Group of diverse young people collaborating together"
      />

      <section className="max-w-[1280px] mx-auto px-4 md:px-10">
        <SectionHeading
          eyebrow="Youth Stories"
          title="Young Leaders Shaping Change"
          intro="Meet the advocates, innovators and campaigners leading disability-inclusive action in their communities."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {YOUTH_STORIES.map((story) => (
            <article
              key={story.id}
              className="bg-white border-2 border-[#0f1b3d] flex flex-col overflow-hidden"
            >
              <div className="relative h-56 overflow-hidden border-b-2 border-[#0f1b3d]">
                <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0f1b3d] uppercase">{story.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-[#0f1b3d]">{story.name}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#245a86] bg-[#e8edf3] px-2 py-0.5">
                      {story.country}
                    </span>
                  </div>
                </div>
                <p className="italic text-[#f5b301] font-medium leading-relaxed border-l-4 border-[#f5b301] pl-4">
                  "{story.quote}"
                </p>
                <div
                  className={`text-sm text-[#33415c] leading-relaxed ${
                    expandedStoryId === story.id ? '' : 'line-clamp-3'
                  }`}
                >
                  {story.body}
                </div>
                <button
                  onClick={() =>
                    setExpandedStoryId(expandedStoryId === story.id ? null : story.id)
                  }
                  className={btnGhost + ' mt-auto w-full'}
                >
                  {expandedStoryId === story.id ? 'Collapse' : 'Read story'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#e8edf3] py-20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <SectionHeading
            eyebrow="Learning Resources"
            title="Executive Summaries & Infographics"
            intro="Accessible formats designed for rapid understanding and classroom use."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {knowledgeCards.map(({ label, item, accent }) => (
              <div
                key={label}
                className="bg-white border-2 p-8 flex flex-col"
                style={{ borderColor: accent }}
              >
                <span
                  className="text-xs font-bold uppercase tracking-widest inline-block px-3 py-1 self-start mb-4"
                  style={{
                    backgroundColor: accent,
                    color: accent === '#f5b301' ? '#0f1b3d' : 'white',
                  }}
                >
                  {label}
                </span>
                {item ? (
                  <>
                    <h3 className="text-lg font-bold text-[#0f1b3d] leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-[#33415c] leading-relaxed flex-1">
                      {item.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.accessibleFormats.slice(0, 3).map((fmt) => (
                        <span
                          key={fmt}
                          className="text-[10px] font-bold uppercase tracking-widest text-[#245a86] border border-[#245a86]/30 px-2 py-0.5"
                        >
                          {fmt}
                        </span>
                      ))}
                    </div>
                    <Link to="/resources" className={btnPrimary + ' mt-6 text-xs justify-center'}>
                      <span className="material-symbols-outlined text-base">description</span>
                      View resource
                    </Link>
                  </>
                ) : (
                  <p className="text-sm text-[#5b6b85]">Coming soon.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 md:px-10">
        <SectionHeading
          eyebrow="Opportunities"
          title="Opportunities Board"
          intro="Fellowships, internships, volunteering positions and grant programmes for young disability advocates."
          action={
            <FilterChips
              legend="Filter by kind"
              options={opportunityKinds}
              value={opportunityFilter}
              onChange={(v) => {
                setOpportunityFilter(v);
                setOpportunityPage(1);
              }}
            />
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="bg-white border-2 border-[#0f1b3d] p-6 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#0f1b3d] text-white px-3 py-1 rounded-full">
                  {opp.kind}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#f5b301] whitespace-nowrap">
                  DEADLINE: {opp.deadline}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#0f1b3d] leading-tight">{opp.title}</h3>
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-[#245a86] font-bold">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {opp.location}
                </span>
              </div>
              <p className="text-sm text-[#33415c] leading-relaxed flex-1">{opp.summary}</p>
              <Link to="/contact" className={btnPrimary + ' justify-center text-xs'}>
                <span className="material-symbols-outlined text-base">send</span>
                Apply
              </Link>
            </div>
          ))}
        </div>
        <Pagination
          page={opportunityPage}
          pageCount={totalOppPages}
          onChange={setOpportunityPage}
          label="Opportunities pagination"
        />
      </section>

      <section className="bg-[#0f1b3d] py-20 text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <SectionHeading
            eyebrow="Surveys & Polls"
            title="Polls & Surveys"
            intro="Share your perspective. Every vote shapes ADF youth advocacy priorities."
            light
          />
          <div className="space-y-8">
            {polls.map((poll) => {
              const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);
              const hasVoted = votedPolls.has(poll.id);
              return (
                <div
                  key={poll.id}
                  className="bg-white/5 border-2 border-white/20 p-6 md:p-8"
                >
                  <h3 className="text-xl font-bold leading-tight mb-6">{poll.question}</h3>
                  <div className="space-y-4" role="radiogroup" aria-label={poll.question}>
                    {poll.options.map((option) => {
                      const pct = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleVote(poll.id, option.id)}
                          disabled={hasVoted}
                          className={`block w-full text-left cursor-pointer border-2 p-4 transition-colors ${
                            hasVoted
                              ? 'border-white/20 cursor-default'
                              : 'border-white/20 hover:border-[#f5b301] hover:bg-white/5 focus:outline-none focus:border-[#f5b301]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 flex-1">
                              <span
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                  hasVoted && quizAnswers[poll.id] === option.id
                                    ? 'border-[#f5b301]'
                                    : 'border-white/60'
                                }`}
                              >
                                {hasVoted && quizAnswers[poll.id] === option.id && (
                                  <span className="w-2 h-2 rounded-full bg-[#f5b301]" />
                                )}
                              </span>
                              <span className="font-medium">{option.label}</span>
                            </div>
                            <span className="text-xs font-bold text-[#a8c6e4] whitespace-nowrap">
                              {option.votes} votes ({pct}%)
                            </span>
                          </div>
                          <div className="mt-3 h-2 w-full bg-white/10">
                            <div
                              className="h-2 bg-[#f5b301] transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#a8c6e4]">
                      TOTAL VOTES CAST: {totalVotes}
                    </p>
                    {hasVoted && (
                      <p className="text-sm font-bold text-[#f5b301] bg-[#f5b301]/10 border border-[#f5b301]/30 px-4 py-2">
                        Thank you — your vote has been counted.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 md:px-10">
        <SectionHeading
          eyebrow="Conversation Starters"
          title="Discussion Prompts"
          intro="Questions to spark debate in your campus, OPD youth wing or social media circle."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DISCUSSION_PROMPTS.map((prompt, i) => (
            <div
              key={i}
              className="bg-[#e8edf3] border-2 border-[#0f1b3d] p-8 flex flex-col"
            >
              <span className="text-5xl font-display text-[#f5b301] leading-none mb-4">
                0{i + 1}
              </span>
              <p className="text-lg font-bold text-[#0f1b3d] leading-relaxed flex-1">
                {prompt}
              </p>
              <div className="mt-6 pt-6 border-t border-[#0f1b3d]/20 flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(prompt + ' #ADFYouth #DisabilityRights')}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-xs font-bold uppercase tracking-widest text-[#245a86] hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">share</span>
                  Post on X
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#e8edf3] py-20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <SectionHeading
            eyebrow="Test Your Knowledge"
            title="Knowledge Challenge Quiz"
            intro="Three quick questions on disability rights treaties and ADF programmes."
          />
          <div className="bg-white border-2 border-[#0f1b3d] p-6 md:p-10 max-w-3xl mx-auto">
            <div className="space-y-8">
              {QUIZ_QUESTIONS.map((q, idx) => (
                <div key={q.id} className="space-y-3">
                  <p className="font-bold text-[#0f1b3d]">
                    <span className="text-[#f5b301]">Q{idx + 1}.</span> {q.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt) => {
                      const isSelected = quizAnswers[q.id] === opt.id;
                      const isCorrect = quizSubmitted && opt.id === q.correctId;
                      const isWrong = quizSubmitted && isSelected && opt.id !== q.correctId;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          disabled={quizSubmitted}
                          onClick={() =>
                            setQuizAnswers((prev) => ({ ...prev, [q.id]: opt.id }))
                          }
                          className={`text-left p-4 border-2 font-medium text-sm transition-colors cursor-pointer disabled:cursor-default ${
                            isCorrect
                              ? 'border-[#245a86] bg-[#245a86]/10 text-[#0f1b3d]'
                              : isWrong
                                ? 'border-red-600 bg-red-50 text-[#0f1b3d]'
                                : isSelected
                                  ? 'border-[#0f1b3d] bg-[#0f1b3d] text-white'
                                  : 'border-[#0f1b3d]/20 text-[#0f1b3d] hover:border-[#0f1b3d] hover:bg-[#e8edf3]'
                          }`}
                        >
                          <span className="font-bold mr-2 uppercase">{opt.id}.</span>
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-[#0f1b3d]/20 flex flex-col gap-4">
              {!quizSubmitted ? (
                <button
                  type="button"
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
                  className={
                    btnPrimary + ' justify-center disabled:opacity-40 disabled:cursor-not-allowed'
                  }
                >
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  Submit answers
                </button>
              ) : (
                <>
                  <div
                    className={`p-6 text-center border-2 ${
                      quizScore === 3
                        ? 'border-[#245a86] bg-[#245a86]/10'
                        : quizScore >= 2
                          ? 'border-[#f5b301] bg-[#f5b301]/10'
                          : 'border-[#0f1b3d] bg-[#e8edf3]'
                    }`}
                  >
                    <p className="text-xs font-bold uppercase tracking-widest text-[#245a86]">
                      Your result
                    </p>
                    <p className="mt-2 text-4xl font-display text-[#0f1b3d]">
                      {quizScore}
                      <span className="text-2xl">/3</span>
                    </p>
                    <p className="mt-3 text-base text-[#0f1b3d] font-medium">
                      You scored {quizScore}/3. Keep learning in the Knowledge Hub!
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/resources" className={btnPrimary + ' justify-center text-xs'}>
                      <span className="material-symbols-outlined text-base">menu_book</span>
                      Visit Knowledge Hub
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setQuizAnswers({});
                        setQuizSubmitted(false);
                      }}
                      className={btnGhost + ' justify-center text-xs'}
                    >
                      <span className="material-symbols-outlined text-base">refresh</span>
                      Try again
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
