import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { NEWS_DATA, EVENTS_DATA } from "@/data/mockData";
import { NavTab, ProgrammeId } from "@/types";
import { btnDonate, btnPrimary } from "./ui";
import { assetUrl } from "@/lib/assetUrl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Props {
  onNavigate: (tab: NavTab, extra?: { programmeId?: ProgrammeId }) => void;
  onOpenTakeAction: () => void;
  onOpenDonate: () => void;
}

const HERO_SLIDES = [
  {
    title: "Advancing The Rights of Persons With Disability.",
    subtitle: "We are here to support you every step of the way",
    image: assetUrl("/images/adf-event-2.jpg"),
    alt: "ADF members advocating for disability rights at a continental meeting",
  },
  {
    title: "Strengthening OPD Capacity To Promote Rights",
    subtitle: "We are here to support you every step of the way",
    image: assetUrl("/images/adf-event-3.jpg"),
    alt: "Organizations of persons with disabilities in a capacity-building workshop",
  },
  {
    title: "Make A Difference Now.",
    subtitle: "We are here to support you every step of the way",
    image: assetUrl("/images/adf-event-4.jpg"),
    alt: "Community advocates working together for inclusion across Africa",
  },
];

const FEATURE_TILES = [
  {
    title: "ADF Professional Programmes",
    body: "Get involved in our continuous professional programmes.",
    icon: "school",
    tab: "programmes" as NavTab,
  },
  {
    title: "Technical Resources",
    body: "Access all our technical reports and other documentation.",
    icon: "menu_book",
    tab: "resources" as NavTab,
  },
  {
    title: "OPD Membership",
    body: "Become a member of our organisation.",
    icon: "groups",
    tab: "membership" as NavTab,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "To strengthen the representative voice of persons with disabilities in Africa, build the institutional capacity of national OPDs, and hold governments accountable to the UN CRPD and the African Disability Protocol.",
    name: "ADF Secretariat",
    role: "Mission Statement",
    rating: 5,
  },
  {
    quote:
      "ADF's continental coordination gives national OPDs the evidence, training and platforms we need to engage governments with confidence.",
    name: "Regional OPD Network",
    role: "East Africa",
    rating: 5,
  },
  {
    quote:
      "Partnership with ADF has helped us align disability-inclusive programming with the African Disability Protocol ratification agenda.",
    name: "Development Partner",
    role: "Multilateral Funder",
    rating: 5,
  },
];

const CAUSES = [
  {
    tag: "Medical",
    title: "Disability-Inclusive Healthcare",
    body: "Accessible healthcare facilities, telemedicine, health information and disability-sensitive health policies.",
    raised: 25270,
    goal: 30000,
    pct: 84,
  },
  {
    tag: "Education",
    title: "Assistive Technology",
    body: "Access to affordable wheelchairs, hearing technologies, screen readers, communication devices and other assistive products.",
    raised: 25270,
    goal: 30000,
    pct: 84,
  },
  {
    tag: "Food",
    title: "Inclusive Humanitarian Action",
    body: "Ensuring persons with disabilities are not left behind during conflicts, disasters, and epidemics.",
    raised: 25270,
    goal: 30000,
    pct: 84,
  },
];

const OBJECTIVES = [
  { num: "01", title: "We Support Persons With Disability", icon: "volunteer_activism" },
  { num: "02", title: "We Enhance The Lives of PWD", icon: "diversity_3" },
  { num: "03", title: "We Ensure PWD Receive Health Care", icon: "health_and_safety" },
];

function formatEventDate(iso: string) {
  const d = new Date(iso);
  return {
    day: d.getDate(),
    month: d.toLocaleString("en-GB", { month: "short" }),
  };
}

function HomeHeroSlider({ onDonate }: { onDonate: () => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const timer = window.setInterval(() => emblaApi.scrollNext(), 6000);
    return () => window.clearInterval(timer);
  }, [emblaApi]);

  return (
    <section className="home-hero relative overflow-hidden" aria-label="Featured highlights">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {HERO_SLIDES.map((slide) => (
            <div key={slide.title} className="relative min-w-0 shrink-0 grow-0 basis-full min-h-[520px] md:min-h-[600px]">
              {/* Split layout: blue gradient left, image right */}
              <div className="absolute inset-0 flex">
                <div className="w-full md:w-1/2 bg-gradient-to-br from-[var(--adf-main)] via-[#023aa3] to-[#022d80] flex items-center">
                  <div className="max-w-[1200px] mx-auto px-8 md:px-16 w-full py-16">
                    <h2 className="max-w-xl text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                      {slide.title}
                    </h2>
                    <p className="mt-4 max-w-md text-lg text-white/90">{slide.subtitle}</p>
                    <div className="flex flex-wrap gap-4 mt-8">
                      <button type="button" onClick={onDonate} className="adf-btn adf-btn-primary adf-btn-circle">
                        DONATE NOW
                      </button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block w-1/2 relative">
                  <img src={slide.image} alt={slide.alt} className="absolute inset-0 h-full w-full object-cover" />
                </div>
              </div>
              {/* Mobile fallback: image background */}
              <div className="md:hidden absolute inset-0">
                <img src={slide.image} alt={slide.alt} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[var(--adf-main)]/70" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={selected === i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2.5 rounded-full transition-all ${selected === i ? "w-8 bg-[var(--adf-gold)]" : "w-2.5 bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </section>
  );
}

export const HomeScreen: React.FC<Props> = ({ onNavigate, onOpenTakeAction, onOpenDonate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) setNewsletterSent(true);
  };

  return (
    <div className="animate-fade-in">
      <HomeHeroSlider onDonate={onOpenDonate} />

      {/* Welcome intro */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div className="relative">
          <img
            src={assetUrl("/images/adf-event-1.jpg")}
            alt="Members of the African Disability Forum at a continental convening"
            className="w-full rounded-sm object-cover aspect-[4/3]"
            loading="lazy"
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
              <span className="material-symbols-outlined text-sm text-green-600">check</span>
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--adf-main)]">Welcome</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-[var(--adf-charcoal)] font-bold">
            Welcome to The African Disability Forum
          </h2>
          <p className="mt-5 text-[var(--adf-muted)] leading-relaxed">
            ADF is the continental membership organisation of Disabled Persons&apos; Organisations (DPOs/OPDs) in Africa,
            formally established in 2014. We strengthen and unify representative voices of Africans with disabilities,
            their families and organisations.
          </p>
          <p className="mt-4 text-[var(--adf-muted)] leading-relaxed">
            Africa&apos;s size and regional diversity make direct representation by one organisation difficult; ADF
            therefore builds on existing organisations, networks, capacities and successes. Governance is independent and
            democratic, with particular attention given to women and youth with disabilities.
          </p>
          <button type="button" onClick={() => onNavigate("about")} className={`${btnPrimary} mt-8`}>
            About Us
          </button>
        </div>
      </section>

      {/* Feature tiles */}
      <section className="bg-[var(--adf-bg)]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 grid md:grid-cols-3 gap-6">
          {FEATURE_TILES.map((tile) => (
            <article
              key={tile.title}
              className="home-feature-tile bg-white p-8 text-center shadow-sm hover:shadow-md transition-shadow adf-card"
            >
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--adf-main)]/10 text-[var(--adf-main)]">
                <span className="material-symbols-outlined text-3xl">{tile.icon}</span>
              </span>
              <h3 className="mt-6 text-xl text-[var(--adf-charcoal)] font-bold">{tile.title}</h3>
              <p className="mt-3 text-sm text-[var(--adf-muted)] leading-relaxed">{tile.body}</p>
              <button
                type="button"
                onClick={() => onNavigate(tile.tab)}
                className="mt-6 text-sm font-semibold text-[var(--adf-main)] hover:underline focus-ring"
              >
                Learn More
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Mission band */}
      <section
        className="relative py-20 md:py-28 bg-cover bg-center"
        style={{ backgroundImage: `url(${assetUrl("/images/adf-event-5.png")})` }}
      >
        <div className="absolute inset-0 bg-[var(--adf-main)]/85" aria-hidden="true" />
        <div className="relative max-w-[900px] mx-auto px-4 md:px-6 text-center text-white">
          <h3 className="text-2xl md:text-4xl leading-snug font-bold">
            Unifying the Voice of 10+ Million Africans with Disabilities
          </h3>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl text-[var(--adf-charcoal)] font-bold">What Partners &amp; Donors Say About Us</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <blockquote
              key={item.name}
              className="home-testimonial bg-[var(--adf-bg)] p-8 flex flex-col adf-card"
            >
              {/* Star rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[var(--adf-gold)] text-xl">star</span>
                ))}
              </div>
              <span className="material-symbols-outlined text-4xl text-[var(--adf-gold)]" aria-hidden="true">
                format_quote
              </span>
              <p className="mt-4 text-[var(--adf-muted)] leading-relaxed flex-1">&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-6 pt-4 border-t border-black/10">
                <cite className="not-italic font-semibold text-[var(--adf-charcoal)]">{item.name}</cite>
                <p className="text-sm text-[var(--adf-muted)]">{item.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
        <div className="text-center mt-10">
          <button type="button" onClick={onOpenDonate} className={btnPrimary}>
            Start Donating
          </button>
        </div>
      </section>

      {/* Popular causes */}
      <section className="bg-[var(--adf-bg)] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl text-center text-[var(--adf-charcoal)] mb-12 font-bold">Find Popular Causes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {CAUSES.map((cause) => (
              <article key={cause.title} className="home-cause-card bg-white overflow-hidden shadow-sm adf-card">
                <div className="p-6">
                  <span className="inline-block rounded-full bg-[var(--adf-main)]/10 px-3 py-1 text-xs font-semibold text-[var(--adf-main)] uppercase">
                    {cause.tag}
                  </span>
                  <h3 className="mt-4 text-xl text-[var(--adf-charcoal)] font-bold">{cause.title}</h3>
                  <p className="mt-3 text-sm text-[var(--adf-muted)] leading-relaxed">{cause.body}</p>
                  <div className="mt-6">
                    <div className="flex justify-between text-xs font-semibold text-[var(--adf-charcoal)] mb-2">
                      <span>{cause.pct}%</span>
                      <span>Pledge so far</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#e5e5e5] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--adf-gold)]"
                        style={{ width: `${cause.pct}%` }}
                      />
                    </div>
                    <div className="mt-3 flex justify-between text-sm text-[var(--adf-muted)]">
                      <span>${cause.raised.toLocaleString()} Raised</span>
                      <span>${cause.goal.toLocaleString()} Goal</span>
                    </div>
                  </div>
                  <button type="button" onClick={onOpenDonate} className={`${btnDonate} w-full mt-6`}>
                    Donate now
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="bg-[var(--adf-main)] py-14">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <h3 className="text-2xl md:text-3xl text-center md:text-left font-bold">
            Let&apos;s Make a Difference in the Lives of Others
          </h3>
          <button type="button" onClick={onOpenDonate} className="adf-btn adf-btn-primary adf-btn-circle">
            DONATE NOW
          </button>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--adf-main)]">Our Latest Events</p>
            <h2 className="mt-2 text-3xl md:text-4xl text-[var(--adf-charcoal)] font-bold">Upcoming Events</h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("events")}
            className="text-sm font-semibold text-[var(--adf-main)] hover:underline focus-ring self-start md:self-auto"
          >
            View all events
          </button>
        </div>
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {EVENTS_DATA.slice(0, 4).map((event) => {
              const { day, month } = formatEventDate(event.date);
              return (
                <CarouselItem key={event.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
                  <article className="home-event-card border border-black/10 p-6 h-full bg-white hover:shadow-md transition-shadow adf-card">
                    <div className="flex gap-4">
                      <div className="home-event-date shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-[var(--adf-main)] text-white rounded-lg">
                        <span className="text-2xl font-display leading-none">{day}</span>
                        <span className="text-xs uppercase mt-0.5">{month}</span>
                      </div>
                      <div className="min-w-0">
                        <ul className="text-xs text-[var(--adf-muted)] space-y-0.5">
                          <li>{event.time.split(" - ")[0]}</li>
                          <li>{event.location.split(" &")[0]}</li>
                        </ul>
                        <h3 className="mt-2 text-base font-semibold text-[var(--adf-charcoal)] leading-snug line-clamp-2">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 border-[var(--adf-main)] text-[var(--adf-main)]" />
          <CarouselNext className="hidden md:flex -right-4 border-[var(--adf-main)] text-[var(--adf-main)]" />
        </Carousel>
      </section>

      {/* Objectives */}
      <section
        className="relative py-16 md:py-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${assetUrl("/images/adf-event-6.png")})` }}
      >
        <div className="absolute inset-0 bg-[var(--adf-charcoal)]/90" aria-hidden="true" />
        <div className="relative max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--adf-gold)]">
              Let&apos;s Make a Difference in the Lives of Other People
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Help Each Other Can Change World</h2>
            <p className="mt-4 text-white/80 leading-relaxed">
              When we support one another, we create opportunities, restore hope, and build stronger communities.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {OBJECTIVES.map((obj) => (
              <article key={obj.num} className="home-objective bg-white/10 backdrop-blur-sm p-8 text-white text-center adf-card">
                <span className="text-sm font-semibold text-[var(--adf-gold)]">Objective {obj.num}</span>
                <span className="material-symbols-outlined text-4xl mt-4 block text-[var(--adf-gold)]">{obj.icon}</span>
                <h3 className="mt-4 text-lg text-white font-bold">{obj.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* News & articles */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--adf-main)]">
              Watch Our Latest Blogs
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl text-[var(--adf-charcoal)] font-bold">News &amp; Articles</h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("news")}
            className="text-sm font-semibold text-[var(--adf-main)] hover:underline focus-ring self-start md:self-auto"
          >
            Read more
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {NEWS_DATA.map((item) => (
            <article key={item.id} className="home-news-card group">
              <button
                type="button"
                onClick={() => onNavigate("news")}
                className="w-full text-left focus-ring overflow-hidden border border-black/10 bg-white hover:shadow-md transition-shadow adf-card"
              >
                <div className="relative">
                  <img
                    src={assetUrl(item.image)}
                    alt=""
                    className="w-full h-48 object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="adf-card-date">
                    <span className="block text-xl font-bold leading-none">
                      {new Date(item.date).getDate()}
                    </span>
                    <span className="block text-xs uppercase">
                      {new Date(item.date).toLocaleString("en-GB", { month: "short" })}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg text-[var(--adf-charcoal)] leading-snug group-hover:text-[var(--adf-main)] transition-colors font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--adf-muted)]">
                    {item.category}
                  </p>
                </div>
              </button>
            </article>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-10">
          <span className="adf-pagination-btn adf-pagination-active">1</span>
          <button type="button" className="adf-pagination-btn">2</button>
          <button type="button" className="adf-pagination-btn">3</button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="home-newsletter bg-[var(--adf-main)] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--adf-gold)]">Join Newsletter</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Give a Helping Hand</h2>
            <p className="mt-4 text-white/85 leading-relaxed max-w-md">
              Subscribe for ADF updates on advocacy, events, publications and opportunities to support disability rights
              across Africa.
            </p>
          </div>
          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 rounded-lg border-0 px-5 py-3.5 text-[var(--adf-charcoal)] focus:outline-none focus:ring-2 focus:ring-[var(--adf-gold)]"
            />
            <button type="submit" className="adf-btn adf-btn-primary adf-btn-circle shrink-0">
              SUBSCRIBE
            </button>
          </form>
          {newsletterSent && (
            <p className="lg:col-span-2 text-sm text-[var(--adf-gold)]" role="status">
              Thank you for subscribing. We&apos;ll be in touch with ADF updates.
            </p>
          )}
        </div>
      </section>

      {/* Take action strip */}
      <section className="bg-[var(--adf-bg)] py-12">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex flex-wrap items-center justify-center gap-4">
          <button type="button" onClick={onOpenTakeAction} className={btnPrimary}>
            Take Action
          </button>
          <button type="button" onClick={() => onNavigate("get-involved")} className={btnPrimary}>
            Become a Volunteer
          </button>
          <button type="button" onClick={() => onNavigate("contact")} className="adf-btn adf-btn-outline focus-ring">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};
