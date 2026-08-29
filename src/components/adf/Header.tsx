import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { NavTab, AboutSubSection, ProgrammeId } from "@/types";
import { RESOURCES_DATA, NEWS_DATA, EVENTS_DATA, PROGRAMMES_DATA } from "@/data/mockData";
import { t, type Locale } from "@/lib/i18n";
import { assetUrl } from "@/lib/assetUrl";

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

const navActive = (active: boolean) => (active ? "text-[var(--adf-charcoal)]" : undefined);

const dropdownPanel =
  "absolute left-0 top-full mt-0 min-w-[15rem] bg-white shadow-lg rounded-sm py-2 z-50 animate-fade-in";

const dropdownItem =
  "w-full text-left px-4 py-2.5 text-sm text-[#252525] hover:bg-[var(--adf-main)] hover:text-white transition-colors focus-ring flex items-center gap-2";

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <header className="w-full sticky top-0 z-40 shadow-sm">
      {/* Top utility bar */}
      <div className="bg-[var(--adf-topbar)] text-[var(--adf-topbar-muted)] text-sm">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-9 flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-5">
            <a href="mailto:info@adf-africa.org" className="hover:text-white focus-ring">
              info@adf-africa.org
            </a>
            <span className="hidden md:inline">Addis Ababa, Ethiopia</span>
          </div>
          <div className="flex items-center gap-4 ml-auto text-xs">
            <button
              type="button"
              onClick={onOpenAccessibility}
              className="hidden sm:flex items-center gap-1 hover:text-white focus-ring cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">settings_accessibility</span>
              <span>{t(lang, "common.accessibility")}</span>
            </button>
            <div className="flex items-center gap-1 font-semibold">
              {(["en", "fr", "kis"] as const).map((locale, i) => (
                <React.Fragment key={locale}>
                  {i > 0 && <span className="opacity-50">/</span>}
                  <button
                    type="button"
                    onClick={() => setLang(locale)}
                    aria-pressed={lang === locale}
                    className={`px-1 cursor-pointer focus-ring ${lang === locale ? "text-[var(--adf-gold)]" : "hover:text-white"}`}
                  >
                    {locale === "kis" ? "KIS" : locale.toUpperCase()}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white">
        <div className="max-w-[1200px] mx-auto flex items-stretch justify-between">
          <button
            type="button"
            onClick={() => handleNavClick("home")}
            aria-label="African Disability Forum Home"
            className="adf-header-logo shrink-0 focus-ring cursor-pointer"
          >
            <img
              src={assetUrl("/images/adf-logo.png")}
              alt="African Disability Forum logo"
              className="h-8 w-auto brightness-0 invert"
            />
          </button>

          <nav
            ref={dropdownRef}
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-6 lg:gap-8 mx-6 flex-1 justify-center"
          >
            <button
              type="button"
              onClick={() => handleNavClick("home")}
              data-active={currentTab === "home"}
              className={`adf-nav-link focus-ring ${navActive(currentTab === "home") ?? ""}`}
            >
              Home
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "about" ? null : "about")}
                onMouseEnter={() => setOpenDropdown("about")}
                data-active={currentTab === "about"}
                className={`adf-nav-link focus-ring flex items-center gap-1 cursor-pointer ${navActive(currentTab === "about") ?? ""}`}
              >
                ADF
                <span className="material-symbols-outlined text-base">expand_more</span>
              </button>
              {openDropdown === "about" && (
                <div onMouseLeave={() => setOpenDropdown(null)} className={dropdownPanel}>
                  <button type="button" onClick={() => handleNavClick("about", { subSection: "who" })} className={dropdownItem}>
                    About Us
                  </button>
                  <button type="button" onClick={() => handleNavClick("membership")} className={dropdownItem}>
                    OPD Membership
                  </button>
                  <button type="button" onClick={() => handleNavClick("get-involved")} className={dropdownItem}>
                    Volunteers
                  </button>
                  <button type="button" onClick={() => handleNavClick("governance")} className={dropdownItem}>
                    Governance
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "programmes" ? null : "programmes")}
                onMouseEnter={() => setOpenDropdown("programmes")}
                data-active={currentTab === "programmes"}
                className={`adf-nav-link focus-ring flex items-center gap-1 cursor-pointer ${navActive(currentTab === "programmes") ?? ""}`}
              >
                Programmes
                <span className="material-symbols-outlined text-base">expand_more</span>
              </button>
              {openDropdown === "programmes" && (
                <div onMouseLeave={() => setOpenDropdown(null)} className={`${dropdownPanel} min-w-[18rem]`}>
                  {PROGRAMMES_DATA.map((prog) => (
                    <button
                      key={prog.id}
                      type="button"
                      onClick={() => handleNavClick("programmes", { programmeId: prog.id })}
                      className={dropdownItem}
                    >
                      <span className="font-semibold text-[var(--adf-main)] group-hover:text-white">{prog.acronym}</span>
                      <span className="truncate">{prog.name}</span>
                    </button>
                  ))}
                  <button type="button" onClick={() => handleNavClick("spadra")} className={`${dropdownItem} border-t border-black/10 mt-1`}>
                    SPADRA Portal
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "news" ? null : "news")}
                onMouseEnter={() => setOpenDropdown("news")}
                data-active={currentTab === "news" || currentTab === "advocacy" || currentTab === "events"}
                className={`adf-nav-link focus-ring flex items-center gap-1 cursor-pointer ${navActive(currentTab === "news" || currentTab === "advocacy" || currentTab === "events") ?? ""}`}
              >
                Events
                <span className="material-symbols-outlined text-base">expand_more</span>
              </button>
              {openDropdown === "news" && (
                <div onMouseLeave={() => setOpenDropdown(null)} className={dropdownPanel}>
                  <button type="button" onClick={() => handleNavClick("advocacy")} className={dropdownItem}>
                    Events Calendar
                  </button>
                  <button type="button" onClick={() => handleNavClick("events")} className={dropdownItem}>
                    All Events
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "resources" ? null : "resources")}
                onMouseEnter={() => setOpenDropdown("resources")}
                data-active={currentTab === "resources" || currentTab === "news"}
                className={`adf-nav-link focus-ring flex items-center gap-1 cursor-pointer ${navActive(currentTab === "resources" || currentTab === "news") ?? ""}`}
              >
                Blog
                <span className="material-symbols-outlined text-base">expand_more</span>
              </button>
              {openDropdown === "resources" && (
                <div onMouseLeave={() => setOpenDropdown(null)} className={dropdownPanel}>
                  <button type="button" onClick={() => handleNavClick("news")} className={dropdownItem}>
                    Blog Posts
                  </button>
                  <button type="button" onClick={() => handleNavClick("resources")} className={dropdownItem}>
                    Publications
                  </button>
                  <button type="button" onClick={() => handleNavClick("resources", { filterCategory: "Policy Brief" })} className={dropdownItem}>
                    Policy Briefs
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleNavClick("contact")}
              data-active={currentTab === "contact"}
              className={`adf-nav-link focus-ring ${navActive(currentTab === "contact") ?? ""}`}
            >
              Contact
            </button>

            <button
              type="button"
              onClick={() => handleNavClick("spadra")}
              data-active={currentTab === "spadra"}
              className={`adf-nav-link focus-ring ${navActive(currentTab === "spadra") ?? ""}`}
            >
              SPADRA
            </button>
          </nav>

          <div className="flex items-center gap-3 pr-4 md:pr-6 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={t(lang, "common.search")}
              className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--adf-charcoal)] hover:text-[var(--adf-main)] focus-ring cursor-pointer"
            >
              <span className="material-symbols-outlined">search</span>
            </button>
            <button type="button" onClick={onOpenDonate} className="adf-btn adf-btn-primary hidden sm:inline-flex focus-ring">
              Donate Now
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              className="xl:hidden inline-flex flex-col justify-center gap-1.5 p-2 focus-ring cursor-pointer"
            >
              <span className={`block h-0.5 w-6 bg-[var(--adf-main)] transition-transform ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-[var(--adf-main)] transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-[var(--adf-main)] transition-transform ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile offcanvas */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[var(--adf-main)] text-white px-4 py-5 space-y-4 animate-fade-in max-h-[80vh] overflow-y-auto">
          <button type="button" onClick={() => handleNavClick("home")} className="block w-full text-left py-2 font-semibold">
            Home
          </button>
          <div className="space-y-1 border-t border-white/20 pt-3">
            <p className="text-xs uppercase tracking-wider text-white/70">ADF</p>
            <button type="button" onClick={() => handleNavClick("about", { subSection: "who" })} className="block w-full text-left py-1.5 text-sm">
              About Us
            </button>
            <button type="button" onClick={() => handleNavClick("membership")} className="block w-full text-left py-1.5 text-sm">
              OPD Membership
            </button>
            <button type="button" onClick={() => handleNavClick("get-involved")} className="block w-full text-left py-1.5 text-sm">
              Get Involved
            </button>
          </div>
          <div className="space-y-1 border-t border-white/20 pt-3">
            <p className="text-xs uppercase tracking-wider text-white/70">Programmes</p>
            {PROGRAMMES_DATA.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleNavClick("programmes", { programmeId: p.id })}
                className="block w-full text-left py-1.5 text-sm"
              >
                {p.acronym}
              </button>
            ))}
          </div>
          <div className="space-y-1 border-t border-white/20 pt-3">
            <p className="text-xs uppercase tracking-wider text-white/70">Events &amp; Blog</p>
            <button type="button" onClick={() => handleNavClick("advocacy")} className="block w-full text-left py-1.5 text-sm">
              Events
            </button>
            <button type="button" onClick={() => handleNavClick("news")} className="block w-full text-left py-1.5 text-sm">
              Blog
            </button>
            <button type="button" onClick={() => handleNavClick("resources")} className="block w-full text-left py-1.5 text-sm">
              Publications
            </button>
          </div>
          <div className="flex flex-wrap gap-3 border-t border-white/20 pt-3">
            <button type="button" onClick={() => handleNavClick("contact")} className="text-sm font-semibold">
              Contact
            </button>
            <button type="button" onClick={() => handleNavClick("careers")} className="text-sm font-semibold">
              Careers
            </button>
            <button type="button" onClick={() => handleNavClick("spadra")} className="text-sm font-semibold">
              SPADRA
            </button>
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={() => { setMobileMenuOpen(false); onOpenTakeAction(); }} className="adf-btn adf-btn-outline border-white text-white flex-1 focus-ring">
              Take Action
            </button>
            <button type="button" onClick={() => { setMobileMenuOpen(false); onOpenDonate(); }} className="adf-btn adf-btn-primary flex-1 focus-ring">
              Donate Now
            </button>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-20 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 shadow-xl space-y-4 animate-fade-in">
            <div className="flex justify-between items-center border-b border-black/10 pb-3">
              <div className="flex items-center gap-2 text-[var(--adf-charcoal)] font-semibold text-lg">
                <span className="material-symbols-outlined text-[var(--adf-main)]">search</span>
                <span>Search ADF Website</span>
              </div>
              <button type="button" onClick={() => setSearchOpen(false)} className="p-1 text-[var(--adf-muted)] hover:text-[var(--adf-charcoal)] rounded-full focus-ring">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="relative">
              <input
                type="search"
                autoFocus
                placeholder="Search policy briefs, events, programmes, news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 pl-10 bg-[#f2f2f2] border border-black/10 rounded-full text-sm text-[var(--adf-charcoal)] focus:outline-none focus:ring-2 focus:ring-[var(--adf-main)]"
              />
              <span className="material-symbols-outlined absolute left-3 top-3 text-[var(--adf-muted)]">search</span>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-2">
              {searchQuery.trim() === "" ? (
                <p className="text-sm text-[var(--adf-muted)] italic py-4 text-center">
                  Type keywords to search across resources, events, programmes, and articles.
                </p>
              ) : searchResults.length === 0 ? (
                <p className="text-sm text-[var(--adf-muted)] py-4 text-center">
                  No matching items found for &ldquo;{searchQuery}&rdquo;.
                </p>
              ) : (
                searchResults.map((res, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={res.action}
                    className="w-full text-left p-3 rounded-lg hover:bg-[#f2f2f2] border border-black/10 flex items-center justify-between transition-colors focus-ring"
                  >
                    <div>
                      <div className="text-xs font-semibold text-[var(--adf-main)] uppercase">{res.type}</div>
                      <div className="text-sm font-semibold text-[var(--adf-charcoal)]">{res.title}</div>
                      <div className="text-xs text-[var(--adf-muted)]">{res.sub}</div>
                    </div>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                ))
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setSearchOpen(false);
                void navigate({ to: "/search", search: { q: searchQuery.trim() } });
              }}
              className="adf-btn adf-btn-secondary w-full focus-ring"
            >
              Open full search page
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
