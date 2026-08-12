import React, { useState, useRef, useEffect } from 'react';
import { NavTab, AboutSubSection, ProgrammeId } from '@/types';
import { RESOURCES_DATA, NEWS_DATA, EVENTS_DATA, PROGRAMMES_DATA } from '@/data/mockData';

interface Props {
  currentTab: NavTab;
  onNavigate: (tab: NavTab, extra?: { subSection?: AboutSubSection; programmeId?: ProgrammeId; filterCategory?: string }) => void;
  onOpenAccessibility: () => void;
  onOpenTakeAction: () => void;
  onOpenDonate: () => void;
}

export const Header: React.FC<Props> = ({
  currentTab,
  onNavigate,
  onOpenAccessibility,
  onOpenTakeAction,
  onOpenDonate
}) => {
  const [lang, setLang] = useState<'EN' | 'KIS'>('EN');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Site-wide Search modal state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (
    tab: NavTab,
    extra?: { subSection?: AboutSubSection; programmeId?: ProgrammeId; filterCategory?: string }
  ) => {
    onNavigate(tab, extra);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  // Search Results
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();

    const res = RESOURCES_DATA.filter(r => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)).map(r => ({
      type: 'Resource' as const,
      title: r.title,
      sub: `${r.category} (${r.year})`,
      action: () => { handleNavClick('resources', { filterCategory: r.category }); setSearchOpen(false); }
    }));

    const news = NEWS_DATA.filter(n => n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q)).map(n => ({
      type: 'News' as const,
      title: n.title,
      sub: n.date,
      action: () => { handleNavClick('news'); setSearchOpen(false); }
    }));

    const evts = EVENTS_DATA.filter(e => e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)).map(e => ({
      type: 'Event' as const,
      title: e.title,
      sub: `${e.type} • ${e.date}`,
      action: () => { handleNavClick('advocacy'); setSearchOpen(false); }
    }));

    const progs = PROGRAMMES_DATA.filter(p => p.name.toLowerCase().includes(q) || p.acronym.toLowerCase().includes(q)).map(p => ({
      type: 'Programme' as const,
      title: `${p.acronym} - ${p.name}`,
      sub: p.leadRegion,
      action: () => { handleNavClick('programmes', { programmeId: p.id }); setSearchOpen(false); }
    }));

    return [...progs, ...evts, ...res, ...news].slice(0, 8);
  }, [searchQuery]);

  return (
    <header className="bg-white/90 dark:bg-[#1a1c1c]/90 backdrop-blur-md border-b-2 border-[#002045] shadow-sm w-full sticky top-0 z-40">
      <div className="flex justify-between items-center w-full px-4 md:px-10 max-w-[1280px] mx-auto h-20">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          aria-label="African Disability Forum Home"
          className="font-bold text-xl md:text-2xl text-[#002045] dark:text-[#d6e3ff] focus-ring flex items-center gap-2.5 cursor-pointer text-left"
        >
          <div className="w-10 h-10 rounded-full bg-[#002045] text-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              accessibility_new
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-lg md:text-xl leading-none">African Disability Forum</span>
            <span className="text-[10px] uppercase font-bold text-[#126e0c] tracking-widest mt-0.5">Forum Africain des Personnes Handicapées</span>
          </div>
        </button>

        {/* Primary Navigation Links (Desktop) */}
        <nav ref={dropdownRef} aria-label="Primary Navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* ABOUT DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'about' ? null : 'about')}
              onMouseEnter={() => setOpenDropdown('about')}
              className={`font-bold text-sm xl:text-base px-3 py-2 rounded-lg transition-colors focus-ring flex items-center gap-1 cursor-pointer ${
                currentTab === 'about'
                  ? 'text-[#126e0c] bg-[#e8f5e9] dark:bg-[#1f3a22]'
                  : 'text-[#002045] dark:text-[#c4c6cf] hover:bg-[#e8e8e8] dark:hover:bg-[#2f3131]'
              }`}
            >
              <span>About</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>

            {openDropdown === 'about' && (
              <div
                onMouseLeave={() => setOpenDropdown(null)}
                className="absolute left-0 top-full mt-1 w-64 bg-white dark:bg-[#252828] border-2 border-[#002045] rounded-xl shadow-xl p-2 z-50 animate-fade-in space-y-1"
              >
                <button
                  onClick={() => handleNavClick('about', { subSection: 'who' })}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-[#002045] dark:text-white hover:bg-[#e8f5e9] dark:hover:bg-[#3a3d3d] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base text-[#126e0c]">info</span>
                  <span>Who We Are</span>
                </button>
                <button
                  onClick={() => handleNavClick('about', { subSection: 'history' })}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-[#002045] dark:text-white hover:bg-[#e8f5e9] dark:hover:bg-[#3a3d3d] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base text-[#126e0c]">history</span>
                  <span>Our History</span>
                </button>
                <button
                  onClick={() => handleNavClick('about', { subSection: 'vision' })}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-[#002045] dark:text-white hover:bg-[#e8f5e9] dark:hover:bg-[#3a3d3d] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base text-[#126e0c]">visibility</span>
                  <span>Vision & Mission</span>
                </button>
                <button
                  onClick={() => handleNavClick('about', { subSection: 'leadership' })}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-[#002045] dark:text-white hover:bg-[#e8f5e9] dark:hover:bg-[#3a3d3d] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base text-[#126e0c]">groups</span>
                  <span>Leadership</span>
                </button>
                <button
                  onClick={() => handleNavClick('about', { subSection: 'membership' })}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-[#002045] dark:text-white hover:bg-[#e8f5e9] dark:hover:bg-[#3a3d3d] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base text-[#126e0c]">how_to_reg</span>
                  <span>Membership (+PANPPD)</span>
                </button>
              </div>
            )}
          </div>

          {/* PROGRAMMES DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'programmes' ? null : 'programmes')}
              onMouseEnter={() => setOpenDropdown('programmes')}
              className={`font-bold text-sm xl:text-base px-3 py-2 rounded-lg transition-colors focus-ring flex items-center gap-1 cursor-pointer ${
                currentTab === 'programmes'
                  ? 'text-[#126e0c] bg-[#e8f5e9] dark:bg-[#1f3a22]'
                  : 'text-[#002045] dark:text-[#c4c6cf] hover:bg-[#e8e8e8] dark:hover:bg-[#2f3131]'
              }`}
            >
              <span>Programmes</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>

            {openDropdown === 'programmes' && (
              <div
                onMouseLeave={() => setOpenDropdown(null)}
                className="absolute left-0 top-full mt-1 w-72 bg-white dark:bg-[#252828] border-2 border-[#002045] rounded-xl shadow-xl p-2 z-50 animate-fade-in space-y-1"
              >
                {PROGRAMMES_DATA.map(prog => (
                  <button
                    key={prog.id}
                    onClick={() => handleNavClick('programmes', { programmeId: prog.id })}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-[#002045] dark:text-white hover:bg-[#e8f5e9] dark:hover:bg-[#3a3d3d] flex items-center justify-between"
                  >
                    <span className="font-extrabold text-[#126e0c]">{prog.acronym}</span>
                    <span className="truncate max-w-[170px] text-[#43474e] dark:text-[#c4c6cf] font-medium">{prog.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* NEWS & EVENTS DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'news' ? null : 'news')}
              onMouseEnter={() => setOpenDropdown('news')}
              className={`font-bold text-sm xl:text-base px-3 py-2 rounded-lg transition-colors focus-ring flex items-center gap-1 cursor-pointer ${
                currentTab === 'news' || currentTab === 'advocacy'
                  ? 'text-[#126e0c] bg-[#e8f5e9] dark:bg-[#1f3a22]'
                  : 'text-[#002045] dark:text-[#c4c6cf] hover:bg-[#e8e8e8] dark:hover:bg-[#2f3131]'
              }`}
            >
              <span>News & Events</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>

            {openDropdown === 'news' && (
              <div
                onMouseLeave={() => setOpenDropdown(null)}
                className="absolute left-0 top-full mt-1 w-64 bg-white dark:bg-[#252828] border-2 border-[#002045] rounded-xl shadow-xl p-2 z-50 animate-fade-in space-y-1"
              >
                <button
                  onClick={() => handleNavClick('news')}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-[#002045] dark:text-white hover:bg-[#e8f5e9] dark:hover:bg-[#3a3d3d] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base text-[#126e0c]">newspaper</span>
                  <span>News & Articles</span>
                </button>
                <button
                  onClick={() => handleNavClick('advocacy')}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-[#002045] dark:text-white hover:bg-[#e8f5e9] dark:hover:bg-[#3a3d3d] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base text-[#126e0c]">event</span>
                  <span>Events Calendar</span>
                </button>
              </div>
            )}
          </div>

          {/* RESOURCES DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'resources' ? null : 'resources')}
              onMouseEnter={() => setOpenDropdown('resources')}
              className={`font-bold text-sm xl:text-base px-3 py-2 rounded-lg transition-colors focus-ring flex items-center gap-1 cursor-pointer ${
                currentTab === 'resources'
                  ? 'text-[#126e0c] bg-[#e8f5e9] dark:bg-[#1f3a22]'
                  : 'text-[#002045] dark:text-[#c4c6cf] hover:bg-[#e8e8e8] dark:hover:bg-[#2f3131]'
              }`}
            >
              <span>Resources</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>

            {openDropdown === 'resources' && (
              <div
                onMouseLeave={() => setOpenDropdown(null)}
                className="absolute left-0 top-full mt-1 w-64 bg-white dark:bg-[#252828] border-2 border-[#002045] rounded-xl shadow-xl p-2 z-50 animate-fade-in space-y-1"
              >
                <button
                  onClick={() => handleNavClick('resources', { filterCategory: 'All' })}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-[#002045] dark:text-white hover:bg-[#e8f5e9] dark:hover:bg-[#3a3d3d] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base text-[#126e0c]">folder</span>
                  <span>Publications Repository</span>
                </button>
                <button
                  onClick={() => handleNavClick('resources', { filterCategory: 'Policy Brief' })}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-[#002045] dark:text-white hover:bg-[#e8f5e9] dark:hover:bg-[#3a3d3d] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base text-[#126e0c]">gavel</span>
                  <span>Policy Briefs</span>
                </button>
                <button
                  onClick={() => handleNavClick('resources', { filterCategory: 'Research Paper' })}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-[#002045] dark:text-white hover:bg-[#e8f5e9] dark:hover:bg-[#3a3d3d] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base text-[#126e0c]">menu_book</span>
                  <span>Knowledge Hub</span>
                </button>
              </div>
            )}
          </div>

          {/* CAREERS (Single Link) */}
          <button
            onClick={() => handleNavClick('careers')}
            className={`font-bold text-sm xl:text-base px-3 py-2 rounded-lg transition-colors focus-ring cursor-pointer ${
              currentTab === 'careers'
                ? 'text-[#126e0c] bg-[#e8f5e9] dark:bg-[#1f3a22]'
                : 'text-[#002045] dark:text-[#c4c6cf] hover:bg-[#e8e8e8] dark:hover:bg-[#2f3131]'
            }`}
          >
            Careers
          </button>

          {/* CONTACT (Single Link) */}
          <button
            onClick={() => handleNavClick('contact')}
            className={`font-bold text-sm xl:text-base px-3 py-2 rounded-lg transition-colors focus-ring cursor-pointer ${
              currentTab === 'contact'
                ? 'text-[#126e0c] bg-[#e8f5e9] dark:bg-[#1f3a22]'
                : 'text-[#002045] dark:text-[#c4c6cf] hover:bg-[#e8e8e8] dark:hover:bg-[#2f3131]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Utility Elements (Top-Right, Separate from Nav) */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search ADF Website"
            className="text-[#002045] dark:text-[#c4c6cf] hover:bg-[#e8e8e8] dark:hover:bg-[#2f3131] p-2 rounded-full focus-ring transition-colors flex items-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">search</span>
          </button>

          {/* Accessibility Settings Trigger */}
          <button
            onClick={onOpenAccessibility}
            aria-label="Accessibility Settings"
            className="text-[#002045] dark:text-[#c4c6cf] hover:bg-[#e8e8e8] dark:hover:bg-[#2f3131] p-2 rounded-full focus-ring transition-colors flex items-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">settings_accessibility</span>
          </button>

          {/* Language Toggle (EN / KIS) */}
          <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-[#002045] dark:text-[#c4c6cf] bg-[#e2e2e2] dark:bg-[#2f3131] p-1 rounded-lg">
            <button
              onClick={() => setLang('EN')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                lang === 'EN' ? 'bg-[#002045] text-white' : 'hover:bg-[#d0d0d0]'
              }`}
            >
              EN
            </button>
            <span>/</span>
            <button
              onClick={() => setLang('KIS')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                lang === 'KIS' ? 'bg-[#002045] text-white' : 'hover:bg-[#d0d0d0]'
              }`}
            >
              KIS
            </button>
          </div>

          {/* Take Action Button */}
          <button
            onClick={onOpenTakeAction}
            className="hidden md:inline-flex items-center justify-center bg-[#e8f5e9] text-[#126e0c] font-bold text-xs xl:text-sm px-4 py-2 rounded-lg border border-[#a5d6a7] hover:bg-[#c8e6c9] focus-ring transition-colors cursor-pointer"
          >
            Take Action
          </button>

          {/* Donate Button — Styled distinctly as primary conversion action */}
          <button
            onClick={onOpenDonate}
            className="inline-flex items-center justify-center bg-[#126e0c] hover:bg-[#005300] text-white font-extrabold text-xs xl:text-sm px-5 py-2.5 rounded-lg shadow-md focus-ring cursor-pointer transition-all hover:scale-105"
          >
            Donate
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="lg:hidden text-[#002045] dark:text-[#c4c6cf] p-2 rounded focus-ring cursor-pointer"
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#1a1c1c] border-b-2 border-[#002045] px-4 py-4 space-y-3 animate-fade-in max-h-[80vh] overflow-y-auto">
          {/* About Group */}
          <div className="space-y-1">
            <div className="text-xs font-bold text-[#126e0c] uppercase">About ADF</div>
            <div className="pl-2 space-y-1 border-l-2 border-[#126e0c]">
              <button onClick={() => handleNavClick('about', { subSection: 'who' })} className="block text-sm font-bold py-1 text-[#002045] dark:text-white">Who We Are</button>
              <button onClick={() => handleNavClick('about', { subSection: 'history' })} className="block text-sm font-bold py-1 text-[#002045] dark:text-white">Our History</button>
              <button onClick={() => handleNavClick('about', { subSection: 'vision' })} className="block text-sm font-bold py-1 text-[#002045] dark:text-white">Vision & Mission</button>
              <button onClick={() => handleNavClick('about', { subSection: 'leadership' })} className="block text-sm font-bold py-1 text-[#002045] dark:text-white">Leadership</button>
              <button onClick={() => handleNavClick('about', { subSection: 'membership' })} className="block text-sm font-bold py-1 text-[#002045] dark:text-white">Membership (+PANPPD)</button>
            </div>
          </div>

          {/* Programmes Group */}
          <div className="space-y-1 pt-2 border-t border-[#e2e2e2]">
            <div className="text-xs font-bold text-[#126e0c] uppercase">Programmes</div>
            <div className="pl-2 space-y-1 border-l-2 border-[#126e0c]">
              {PROGRAMMES_DATA.map(p => (
                <button key={p.id} onClick={() => handleNavClick('programmes', { programmeId: p.id })} className="block text-sm font-bold py-1 text-[#002045] dark:text-white">
                  {p.acronym} - {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* News & Events */}
          <div className="space-y-1 pt-2 border-t border-[#e2e2e2]">
            <div className="text-xs font-bold text-[#126e0c] uppercase">News & Events</div>
            <div className="pl-2 space-y-1 border-l-2 border-[#126e0c]">
              <button onClick={() => handleNavClick('news')} className="block text-sm font-bold py-1 text-[#002045] dark:text-white">News & Articles</button>
              <button onClick={() => handleNavClick('advocacy')} className="block text-sm font-bold py-1 text-[#002045] dark:text-white">Events Calendar</button>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-1 pt-2 border-t border-[#e2e2e2]">
            <div className="text-xs font-bold text-[#126e0c] uppercase">Resources</div>
            <div className="pl-2 space-y-1 border-l-2 border-[#126e0c]">
              <button onClick={() => handleNavClick('resources')} className="block text-sm font-bold py-1 text-[#002045] dark:text-white">Publications Repository</button>
            </div>
          </div>

          {/* Direct Links */}
          <div className="pt-2 border-t border-[#e2e2e2] flex justify-between">
            <button onClick={() => handleNavClick('careers')} className="text-sm font-bold text-[#002045] dark:text-white">Careers</button>
            <button onClick={() => handleNavClick('contact')} className="text-sm font-bold text-[#002045] dark:text-white">Contact</button>
          </div>

          <div className="pt-2 flex gap-2">
            <button onClick={() => { setMobileMenuOpen(false); onOpenTakeAction(); }} className="flex-1 py-2 bg-[#e8f5e9] text-[#126e0c] font-bold text-xs rounded-lg border border-[#a5d6a7]">
              Take Action
            </button>
            <button onClick={() => { setMobileMenuOpen(false); onOpenDonate(); }} className="flex-1 py-2 bg-[#126e0c] text-white font-bold text-xs rounded-lg">
              Donate
            </button>
          </div>
        </div>
      )}

      {/* Site-Wide Search Overlay Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-20 p-4">
          <div className="bg-white dark:bg-[#252828] rounded-2xl max-w-2xl w-full p-6 border-2 border-[#002045] shadow-2xl space-y-4 animate-fade-in">
            <div className="flex justify-between items-center border-b border-[#c4c6cf] pb-3">
              <div className="flex items-center gap-2 text-[#002045] dark:text-white font-bold text-lg">
                <span className="material-symbols-outlined text-[#126e0c]">search</span>
                <span>Search ADF Website & Publications</span>
              </div>
              <button onClick={() => setSearchOpen(false)} className="p-1 text-[#43474e] dark:text-[#c4c6cf] hover:bg-[#e8e8e8] rounded-full">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                autoFocus
                placeholder="Search policy briefs, events, programmes, news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 pl-10 bg-[#f9f9f9] dark:bg-[#2f3131] border-2 border-[#002045] rounded-xl text-sm font-bold text-[#1a1c1c] dark:text-white focus:outline-none"
              />
              <span className="material-symbols-outlined absolute left-3 top-3 text-[#74777f]">search</span>
            </div>

            {/* Results list */}
            <div className="max-h-80 overflow-y-auto space-y-2">
              {searchQuery.trim() === '' ? (
                <div className="text-xs text-[#74777f] italic py-4 text-center">
                  Type keywords to search across resources, events, programmes, and articles.
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-xs text-[#74777f] py-4 text-center">
                  No matching items found for "{searchQuery}".
                </div>
              ) : (
                searchResults.map((res, idx) => (
                  <button
                    key={idx}
                    onClick={res.action}
                    className="w-full text-left p-3 rounded-lg hover:bg-[#f3f3f3] dark:hover:bg-[#3a3d3d] border border-[#c4c6cf] flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#126e0c] uppercase">{res.type}</div>
                      <div className="text-sm font-bold text-[#002045] dark:text-white">{res.title}</div>
                      <div className="text-xs text-[#74777f]">{res.sub}</div>
                    </div>
                    <span className="material-symbols-outlined text-sm text-[#002045] dark:text-[#86a0cd]">chevron_right</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
