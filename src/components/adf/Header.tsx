import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { NavTab, AboutSubSection, ProgrammeId } from "@/types";
import { RESOURCES_DATA, NEWS_DATA, EVENTS_DATA, PROGRAMMES_DATA } from "@/data/mockData";
import { t, type Locale } from "@/lib/i18n";
import adfLogo from "@/assets/adf-logo.png.asset.json";


interface Props {
  currentTab: NavTab;
  onNavigate: (
    tab: NavTab,
    extra?: { subSection?: AboutSubSection; programmeId?: ProgrammeId; filterCategory?: string },
  ) => void;
  onOpenAccessibility: () => void;
  onOpenTakeAction: () => void;
  onOpenDonate: () => void;
  lang: Locale;
  setLang: (locale: Locale) => void;
}

export const Header: React.FC<Props> = ({
  currentTab,
  onNavigate,
  onOpenAccessibility,
  onOpenTakeAction,
  onOpenDonate,
  lang,
  setLang,
}) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Site-wide Search modal state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (
    tab: NavTab,
    extra?: { subSection?: AboutSubSection; programmeId?: ProgrammeId; filterCategory?: string },
  ) => {
    onNavigate(tab, extra);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  // Search Results
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();

    const res = RESOURCES_DATA.filter(
      (r) => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q),
    ).map((r) => ({
      type: "Resource" as const,
      title: r.title,
      sub: `${r.category} (${r.year})`,
      action: () => {
        handleNavClick("resources", { filterCategory: r.category });
        setSearchOpen(false);
      },
    }));

    const news = NEWS_DATA.filter(
      (n) => n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q),
    ).map((n) => ({
      type: "News" as const,
      title: n.title,
      sub: n.date,
      action: () => {
        handleNavClick("news");
        setSearchOpen(false);
      },
    }));

    const evts = EVENTS_DATA.filter(
      (e) => e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q),
    ).map((e) => ({
      type: "Event" as const,
      title: e.title,
      sub: `${e.type} • ${e.date}`,
      action: () => {
        handleNavClick("advocacy");
        setSearchOpen(false);
      },
    }));

    const progs = PROGRAMMES_DATA.filter(
      (p) => p.name.toLowerCase().includes(q) || p.acronym.toLowerCase().includes(q),
    ).map((p) => ({
      type: "Programme" as const,
      title: `${p.acronym} - ${p.name}`,
      sub: p.leadRegion,
      action: () => {
        handleNavClick("programmes", { programmeId: p.id });
        setSearchOpen(false);
      },
    }));

    return [...progs, ...evts, ...res, ...news].slice(0, 8);
  }, [searchQuery]);

  return (
    <header className="w-full sticky top-0 z-40">
      {/* Navy utility bar */}
      <div className="bg-[#0f1b3d] text-[#dbe6f2]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 h-9 flex items-center justify-between text-xs">
          <div className="hidden sm:flex items-center gap-6">
            <a
              href="mailto:info@africandisabilityforum.org"
              className="hover:text-white focus-ring"
            >
              info@africandisabilityforum.org
            </a>
            <span className="hidden md:inline text-[#8fa8c4]">Addis Ababa, Ethiopia</span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-1 hover:text-white focus-ring cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">search</span>
              <span className="hidden sm:inline uppercase tracking-widest font-bold">
                {t(lang, "common.search")}
              </span>
            </button>
            <button
              onClick={onOpenAccessibility}
              className="flex items-center gap-1 hover:text-white focus-ring cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">settings_accessibility</span>
              <span className="hidden sm:inline uppercase tracking-widest font-bold">
                {t(lang, "common.accessibility")}
              </span>
            </button>
            <div className="flex items-center gap-1 font-bold uppercase tracking-widest">
              {(["en", "fr", "kis"] as const).map((locale, i) => (
                <React.Fragment key={locale}>
                  {i > 0 && <span className="text-[#5b7ba4]">/</span>}
                  <button
                    onClick={() => setLang(locale)}
                    aria-pressed={lang === locale}
                    className={`px-1 cursor-pointer focus-ring ${lang === locale ? "text-[#f5b301]" : "hover:text-white"}`}
                  >
                    {locale === "kis" ? "KIS" : locale.toUpperCase()}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0a1128] border-b border-[#0f1b3d]/20">
        <div className="flex justify-between items-center w-full px-3 md:px-5 max-w-[1280px] mx-auto h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick("home")}
            aria-label="African Disability Forum Home"
            className="focus-ring cursor-pointer text-left"
          >
            <img
              src={adfLogo.url}
              alt="African Disability Forum logo"
              className="h-10 w-auto dark:invert"
            />
          </button>

          {/* Primary Navigation Links (Desktop) */}
          <nav
            ref={dropdownRef}
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2"
          >
            {/* ABOUT DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "about" ? null : "about")}
                onMouseEnter={() => setOpenDropdown("about")}
                className={`font-bold text-sm xl:text-base px-3 py-2 rounded-none transition-colors focus-ring flex items-center gap-1 cursor-pointer ${
                  currentTab === "about"
                    ? "text-[#245a86] bg-[#e8edf3] dark:bg-[#152a4a]"
                    : "text-[#0f1b3d] dark:text-[#c4c6cf] hover:bg-[#e8edf3] dark:hover:bg-[#152a4a]"
                }`}
              >
                <span>About</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>

              {openDropdown === "about" && (
                <div
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute left-0 top-full mt-1 w-64 bg-white dark:bg-[#0f1b3d] border-2 border-[#0f1b3d] rounded-none shadow-none p-2 z-50 animate-fade-in space-y-1"
                >
                  <button
                    onClick={() => handleNavClick("about", { subSection: "who" })}
                    className="w-full text-left px-3 py-2 rounded-none text-xs font-bold text-[#0f1b3d] dark:text-white hover:bg-[#e8edf3] dark:hover:bg-[#1e3a5f] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base text-[#245a86]">info</span>
                    <span>Who We Are</span>
                  </button>
                  <button
                    onClick={() => handleNavClick("about", { subSection: "history" })}
                    className="w-full text-left px-3 py-2 rounded-none text-xs font-bold text-[#0f1b3d] dark:text-white hover:bg-[#e8edf3] dark:hover:bg-[#1e3a5f] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base text-[#245a86]">
                      history
                    </span>
                    <span>Our History</span>
                  </button>
                  <button
                    onClick={() => handleNavClick("about", { subSection: "vision" })}
                    className="w-full text-left px-3 py-2 rounded-none text-xs font-bold text-[#0f1b3d] dark:text-white hover:bg-[#e8edf3] dark:hover:bg-[#1e3a5f] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base text-[#245a86]">
                      visibility
                    </span>
                    <span>Vision & Mission</span>
                  </button>
                  <button
                    onClick={() => handleNavClick("about", { subSection: "leadership" })}
                    className="w-full text-left px-3 py-2 rounded-none text-xs font-bold text-[#0f1b3d] dark:text-white hover:bg-[#e8edf3] dark:hover:bg-[#1e3a5f] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base text-[#245a86]">
                      groups
                    </span>
                    <span>Leadership</span>
                  </button>
                  <button
                    onClick={() => handleNavClick("about", { subSection: "membership" })}
                    className="w-full text-left px-3 py-2 rounded-none text-xs font-bold text-[#0f1b3d] dark:text-white hover:bg-[#e8edf3] dark:hover:bg-[#1e3a5f] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base text-[#245a86]">
                      how_to_reg
                    </span>
                    <span>Membership (+PANPPD)</span>
                  </button>
                </div>
              )}
            </div>

            {/* PROGRAMMES DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "programmes" ? null : "programmes")}
                onMouseEnter={() => setOpenDropdown("programmes")}
                className={`font-bold text-sm xl:text-base px-3 py-2 rounded-none transition-colors focus-ring flex items-center gap-1 cursor-pointer ${
                  currentTab === "programmes"
                    ? "text-[#245a86] bg-[#e8edf3] dark:bg-[#152a4a]"
                    : "text-[#0f1b3d] dark:text-[#c4c6cf] hover:bg-[#e8edf3] dark:hover:bg-[#152a4a]"
                }`}
              >
                <span>Programmes</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>

              {openDropdown === "programmes" && (
                <div
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute left-0 top-full mt-1 w-72 bg-white dark:bg-[#0f1b3d] border-2 border-[#0f1b3d] rounded-none shadow-none p-2 z-50 animate-fade-in space-y-1"
                >
                  {PROGRAMMES_DATA.map((prog) => (
                    <button
                      key={prog.id}
                      onClick={() => handleNavClick("programmes", { programmeId: prog.id })}
                      className="w-full text-left px-3 py-2 rounded-none text-xs font-bold text-[#0f1b3d] dark:text-white hover:bg-[#e8edf3] dark:hover:bg-[#1e3a5f] flex items-center justify-between"
                    >
                      <span className="font-extrabold text-[#245a86]">{prog.acronym}</span>
                      <span className="truncate max-w-[170px] text-[#33415c] dark:text-[#c4c6cf] font-medium">
                        {prog.name}
                      </span>
                    </button>
                  ))}
                  <button
                    onClick={() => handleNavClick("spadra")}
                    className="w-full text-left px-3 py-2 rounded-none text-xs font-bold text-[#0f1b3d] dark:text-white hover:bg-[#e8edf3] dark:hover:bg-[#1e3a5f] flex items-center justify-between border-t-2 border-[#0f1b3d]/15 mt-1 pt-2"
                  >
                    <span className="font-extrabold text-[#f5b301]">SPADRA Portal</span>
                    <span className="truncate max-w-[170px] text-[#33415c] dark:text-[#c4c6cf] font-medium">
                      Data, research & stakeholders
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* NEWS & EVENTS DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "news" ? null : "news")}
                onMouseEnter={() => setOpenDropdown("news")}
                className={`font-bold text-sm xl:text-base px-3 py-2 rounded-none transition-colors focus-ring flex items-center gap-1 cursor-pointer ${
                  currentTab === "news" || currentTab === "advocacy"
                    ? "text-[#245a86] bg-[#e8edf3] dark:bg-[#152a4a]"
                    : "text-[#0f1b3d] dark:text-[#c4c6cf] hover:bg-[#e8edf3] dark:hover:bg-[#152a4a]"
                }`}
              >
                <span>News & Events</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>

              {openDropdown === "news" && (
                <div
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute left-0 top-full mt-1 w-64 bg-white dark:bg-[#0f1b3d] border-2 border-[#0f1b3d] rounded-none shadow-none p-2 z-50 animate-fade-in space-y-1"
                >
                  <button
                    onClick={() => handleNavClick("news")}
                    className="w-full text-left px-3 py-2 rounded-none text-xs font-bold text-[#0f1b3d] dark:text-white hover:bg-[#e8edf3] dark:hover:bg-[#1e3a5f] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base text-[#245a86]">
                      newspaper
                    </span>
                    <span>News & Articles</span>
                  </button>
                  <button
                    onClick={() => handleNavClick("advocacy")}
                    className="w-full text-left px-3 py-2 rounded-none text-xs font-bold text-[#0f1b3d] dark:text-white hover:bg-[#e8edf3] dark:hover:bg-[#1e3a5f] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base text-[#245a86]">
                      event
                    </span>
                    <span>Events Calendar</span>
                  </button>
                </div>
              )}
            </div>

            {/* RESOURCES DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "resources" ? null : "resources")}
                onMouseEnter={() => setOpenDropdown("resources")}
                className={`font-bold text-sm xl:text-base px-3 py-2 rounded-none transition-colors focus-ring flex items-center gap-1 cursor-pointer ${
                  currentTab === "resources"
                    ? "text-[#245a86] bg-[#e8edf3] dark:bg-[#152a4a]"
                    : "text-[#0f1b3d] dark:text-[#c4c6cf] hover:bg-[#e8edf3] dark:hover:bg-[#152a4a]"
                }`}
              >
                <span>Resources</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>

              {openDropdown === "resources" && (
                <div
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute left-0 top-full mt-1 w-64 bg-white dark:bg-[#0f1b3d] border-2 border-[#0f1b3d] rounded-none shadow-none p-2 z-50 animate-fade-in space-y-1"
                >
                  <button
                    onClick={() => handleNavClick("resources", { filterCategory: "All" })}
                    className="w-full text-left px-3 py-2 rounded-none text-xs font-bold text-[#0f1b3d] dark:text-white hover:bg-[#e8edf3] dark:hover:bg-[#1e3a5f] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base text-[#245a86]">
                      folder
                    </span>
                    <span>Publications Repository</span>
                  </button>
                  <button
                    onClick={() => handleNavClick("resources", { filterCategory: "Policy Brief" })}
                    className="w-full text-left px-3 py-2 rounded-none text-xs font-bold text-[#0f1b3d] dark:text-white hover:bg-[#e8edf3] dark:hover:bg-[#1e3a5f] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base text-[#245a86]">
                      gavel
                    </span>
                    <span>Policy Briefs</span>
                  </button>
                  <button
                    onClick={() =>
                      handleNavClick("resources", { filterCategory: "Research Paper" })
                    }
                    className="w-full text-left px-3 py-2 rounded-none text-xs font-bold text-[#0f1b3d] dark:text-white hover:bg-[#e8edf3] dark:hover:bg-[#1e3a5f] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base text-[#245a86]">
                      menu_book
                    </span>
                    <span>Knowledge Hub</span>
                  </button>
                </div>
              )}
            </div>

            {/* CAREERS (Single Link) */}
            <button
              onClick={() => handleNavClick("careers")}
              className={`font-bold text-sm xl:text-base px-3 py-2 rounded-none transition-colors focus-ring cursor-pointer ${
                currentTab === "careers"
                  ? "text-[#245a86] bg-[#e8edf3] dark:bg-[#152a4a]"
                  : "text-[#0f1b3d] dark:text-[#c4c6cf] hover:bg-[#e8edf3] dark:hover:bg-[#152a4a]"
              }`}
            >
              Careers
            </button>

            {/* CONTACT (Single Link) */}
            <button
              onClick={() => handleNavClick("contact")}
              className={`font-bold text-sm xl:text-base px-3 py-2 rounded-none transition-colors focus-ring cursor-pointer ${
                currentTab === "contact"
                  ? "text-[#245a86] bg-[#e8edf3] dark:bg-[#152a4a]"
                  : "text-[#0f1b3d] dark:text-[#c4c6cf] hover:bg-[#e8edf3] dark:hover:bg-[#152a4a]"
              }`}
            >
              Contact
            </button>

            {/* MEMBERSHIP (Single Link) */}
            <button
              onClick={() => handleNavClick("membership")}
              className={`font-bold text-sm xl:text-base px-3 py-2 rounded-none transition-colors focus-ring cursor-pointer ${
                currentTab === "membership"
                  ? "text-[#245a86] bg-[#e8edf3] dark:bg-[#152a4a]"
                  : "text-[#0f1b3d] dark:text-[#c4c6cf] hover:bg-[#e8edf3] dark:hover:bg-[#152a4a]"
              }`}
            >
              Membership
            </button>

            {/* GET INVOLVED (Single Link) */}
            <button
              onClick={() => handleNavClick("get-involved")}
              className={`font-bold text-sm xl:text-base px-3 py-2 rounded-none transition-colors focus-ring cursor-pointer ${
                currentTab === "get-involved"
                  ? "text-[#245a86] bg-[#e8edf3] dark:bg-[#152a4a]"
                  : "text-[#0f1b3d] dark:text-[#c4c6cf] hover:bg-[#e8edf3] dark:hover:bg-[#152a4a]"
              }`}
            >
              Get Involved
            </button>
          </nav>

          {/* Conversion actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenTakeAction}
              className="hidden md:inline-flex items-center justify-center border-2 border-[#0f1b3d] text-[#0f1b3d] font-bold uppercase tracking-widest text-xs px-5 py-3 hover:bg-[#0f1b3d] hover:text-white focus-ring transition-colors cursor-pointer"
            >
              Take Action
            </button>

            <button
              onClick={onOpenDonate}
              className="inline-flex items-center justify-center bg-[#f5b301] text-[#0f1b3d] font-bold uppercase tracking-widest text-xs px-6 py-3 hover:bg-[#ffc933] focus-ring cursor-pointer transition-colors"
            >
              Donate
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden text-[#0f1b3d] dark:text-[#c4c6cf] p-2 focus-ring cursor-pointer"
            >
              <span className="material-symbols-outlined">{mobileMenuOpen ? "close" : "menu"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0a1128] border-b-2 border-[#0f1b3d] px-4 py-4 space-y-3 animate-fade-in max-h-[80vh] overflow-y-auto">
          {/* About Group */}
          <div className="space-y-1">
            <div className="text-xs font-bold text-[#245a86] uppercase">About ADF</div>
            <div className="pl-2 space-y-1 border-l-2 border-[#245a86]">
              <button
                onClick={() => handleNavClick("about", { subSection: "who" })}
                className="block text-sm font-bold py-1 text-[#0f1b3d] dark:text-white"
              >
                Who We Are
              </button>
              <button
                onClick={() => handleNavClick("about", { subSection: "history" })}
                className="block text-sm font-bold py-1 text-[#0f1b3d] dark:text-white"
              >
                Our History
              </button>
              <button
                onClick={() => handleNavClick("about", { subSection: "vision" })}
                className="block text-sm font-bold py-1 text-[#0f1b3d] dark:text-white"
              >
                Vision & Mission
              </button>
              <button
                onClick={() => handleNavClick("about", { subSection: "leadership" })}
                className="block text-sm font-bold py-1 text-[#0f1b3d] dark:text-white"
              >
                Leadership
              </button>
              <button
                onClick={() => handleNavClick("about", { subSection: "membership" })}
                className="block text-sm font-bold py-1 text-[#0f1b3d] dark:text-white"
              >
                Membership (+PANPPD)
              </button>
            </div>
          </div>

          {/* Programmes Group */}
          <div className="space-y-1 pt-2 border-t border-[#e8edf3]">
            <div className="text-xs font-bold text-[#245a86] uppercase">Programmes</div>
            <div className="pl-2 space-y-1 border-l-2 border-[#245a86]">
              {PROGRAMMES_DATA.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleNavClick("programmes", { programmeId: p.id })}
                  className="block text-sm font-bold py-1 text-[#0f1b3d] dark:text-white"
                >
                  {p.acronym} - {p.name}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("spadra")}
                className="block text-sm font-bold py-1 text-[#f5b301]"
              >
                SPADRA Portal
              </button>
            </div>
          </div>

          {/* News & Events */}
          <div className="space-y-1 pt-2 border-t border-[#e8edf3]">
            <div className="text-xs font-bold text-[#245a86] uppercase">News & Events</div>
            <div className="pl-2 space-y-1 border-l-2 border-[#245a86]">
              <button
                onClick={() => handleNavClick("news")}
                className="block text-sm font-bold py-1 text-[#0f1b3d] dark:text-white"
              >
                News & Articles
              </button>
              <button
                onClick={() => handleNavClick("advocacy")}
                className="block text-sm font-bold py-1 text-[#0f1b3d] dark:text-white"
              >
                Events Calendar
              </button>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-1 pt-2 border-t border-[#e8edf3]">
            <div className="text-xs font-bold text-[#245a86] uppercase">Resources</div>
            <div className="pl-2 space-y-1 border-l-2 border-[#245a86]">
              <button
                onClick={() => handleNavClick("resources")}
                className="block text-sm font-bold py-1 text-[#0f1b3d] dark:text-white"
              >
                Publications Repository
              </button>
            </div>
          </div>

          {/* Direct Links */}
          <div className="pt-2 border-t border-[#e8edf3] flex flex-wrap justify-between gap-2">
            <button
              onClick={() => handleNavClick("careers")}
              className="text-sm font-bold text-[#0f1b3d] dark:text-white"
            >
              Careers
            </button>
            <button
              onClick={() => handleNavClick("membership")}
              className="text-sm font-bold text-[#0f1b3d] dark:text-white"
            >
              Membership
            </button>
            <button
              onClick={() => handleNavClick("get-involved")}
              className="text-sm font-bold text-[#0f1b3d] dark:text-white"
            >
              Get Involved
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="text-sm font-bold text-[#0f1b3d] dark:text-white"
            >
              Contact
            </button>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTakeAction();
              }}
              className="flex-1 py-2 bg-[#e8edf3] text-[#245a86] font-bold text-xs rounded-none border border-[#b7cbe0]"
            >
              Take Action
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDonate();
              }}
              className="flex-1 py-2 bg-[#245a86] text-white font-bold text-xs rounded-none"
            >
              Donate
            </button>
          </div>
        </div>
      )}

      {/* Site-Wide Search Overlay Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-20 p-4">
          <div className="bg-white dark:bg-[#0f1b3d] rounded-none max-w-2xl w-full p-6 border-2 border-[#0f1b3d] shadow-lg space-y-4 animate-fade-in">
            <div className="flex justify-between items-center border-b border-[#c4c6cf] pb-3">
              <div className="flex items-center gap-2 text-[#0f1b3d] dark:text-white font-bold text-lg">
                <span className="material-symbols-outlined text-[#245a86]">search</span>
                <span>Search ADF Website & Publications</span>
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-[#33415c] dark:text-[#c4c6cf] hover:bg-[#e8edf3] rounded-full"
              >
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
                className="w-full p-3 pl-10 bg-[#f4f7fa] dark:bg-[#152a4a] border-2 border-[#0f1b3d] rounded-none text-sm font-bold text-[#0a1128] dark:text-white focus:outline-none"
              />
              <span className="material-symbols-outlined absolute left-3 top-3 text-[#5b6b85]">
                search
              </span>
            </div>

            {/* Results list */}
            <div className="max-h-80 overflow-y-auto space-y-2">
              {searchQuery.trim() === "" ? (
                <div className="text-xs text-[#5b6b85] italic py-4 text-center">
                  Type keywords to search across resources, events, programmes, and articles.
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-xs text-[#5b6b85] py-4 text-center">
                  No matching items found for "{searchQuery}".
                </div>
              ) : (
                searchResults.map((res, idx) => (
                  <button
                    key={idx}
                    onClick={res.action}
                    className="w-full text-left p-3 rounded-none hover:bg-[#e8edf3] dark:hover:bg-[#1e3a5f] border border-[#c4c6cf] flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#245a86] uppercase">{res.type}</div>
                      <div className="text-sm font-bold text-[#0f1b3d] dark:text-white">
                        {res.title}
                      </div>
                      <div className="text-xs text-[#5b6b85]">{res.sub}</div>
                    </div>
                    <span className="material-symbols-outlined text-sm text-[#0f1b3d] dark:text-[#b7cbe0]">
                      chevron_right
                    </span>
                  </button>
                ))
              )}
            </div>

            <button
              onClick={() => {
                setSearchOpen(false);
                void navigate({ to: "/search", search: { q: searchQuery.trim() } });
              }}
              className="w-full py-3 bg-[#0f1b3d] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#1e3a5f] transition-colors cursor-pointer"
            >
              Open full search page
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
