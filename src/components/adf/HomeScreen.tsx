import React, { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { NavTab, ProgrammeId } from "@/types";
import { assetUrl } from "@/lib/assetUrl";
import { NEWS_DATA, EVENTS_DATA } from "@/data/mockData";

interface Props {
  onNavigate: (tab: NavTab, extra?: { programmeId?: ProgrammeId }) => void;
  onOpenTakeAction: () => void;
  onOpenDonate: () => void;
}

const HERO_SLIDES = [
  {
    title: "Advancing the Rights of Persons with Disabilities in Africa",
    description:
      "ADF is a continental forum to unify and amplify the voice of persons with disabilities, their families and organizations in Africa at national, regional and international levels.",
    image: assetUrl("/images/adf-event-2.jpg"),
    alt: "ADF members advocating for disability rights at a continental meeting",
  },
  {
    title: "Make A Difference Now.",
    description:
      "In 2021, approximately 1.3 billion people globally or 16 per cent of the population have disability, of which 80 per cent live in developing countries.",
    image: assetUrl("/images/adf-event-3.jpg"),
    alt: "Community advocates working together for inclusion across Africa",
  },
  {
    title: "Empowering Communities Across Africa",
    description:
      "Transform lives today by donating to help African Disability Forum achieve its goals of inclusion and rights for all persons with disabilities.",
    image: assetUrl("/images/adf-event-4.jpg"),
    alt: "OPD representatives at a capacity-building workshop",
  },
];

const WHAT_WE_DO = [
  {
    tag: "Economic Empowerment",
    title: "Give Economic Empowerment",
    body: "The major issue for persons with disabilities and their families, identified by a majority of survey respondents (63%) throughout Africa, is access to income through employment/self-employment.",
    icon: "savings",
    color: "cyan",
  },
  {
    tag: "Accessibility",
    title: "Give Accessibility",
    body: "This lack of accessibility permeates all spheres of life and deprives people with disabilities from social, economic and political participation.",
    icon: "accessibility_new",
    color: "amber",
  },
  {
    tag: "Education",
    title: "Give Education",
    body: "In most African countries, only a small proportion of children with disabilities attend school, due to lack of disability awareness and teachers trained in inclusive education.",
    icon: "school",
    color: "red",
  },
];

const PARTNER_LOGOS = [
  { name: "International Disability Alliance", abbr: "IDA" },
  { name: "Light For The World", abbr: "LFTW" },
  { name: "Mastercard Foundation", abbr: "MCF" },
  { name: "Humanity & Inclusion", abbr: "HI" },
  { name: "Save the Children", abbr: "STC" },
  { name: "ZOA", abbr: "ZOA" },
  { name: "VNG International", abbr: "VNG" },
  { name: "Abilis Foundation", abbr: "ABF" },
];

const GALLERY_IMAGES = [
  assetUrl("/images/adf-event-1.jpg"),
  assetUrl("/images/adf-event-2.jpg"),
  assetUrl("/images/adf-event-3.jpg"),
  assetUrl("/images/adf-event-4.jpg"),
  assetUrl("/images/adf-event-5.png"),
];

function HeroSlider({ onDonate }: { onDonate: () => void }) {
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
    const timer = window.setInterval(() => emblaApi.scrollNext(), 5000);
    return () => window.clearInterval(timer);
  }, [emblaApi]);

  return (
    <section className="relative overflow-hidden" aria-label="Featured highlights">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {HERO_SLIDES.map((slide) => (
            <div
              key={slide.title}
              className="relative min-w-0 shrink-0 grow-0 basis-full min-h-[640px] md:min-h-[738px]"
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
              <div className="relative z-10 flex h-full min-h-[640px] md:min-h-[738px] items-center">
                <div className="max-w-[1200px] mx-auto px-4 md:px-6 w-full py-16 md:py-24">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight text-white">
                      {slide.title}
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-lg leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-8">
                      <button
                        type="button"
                        onClick={onDonate}
                        className="px-8 py-3.5 bg-[var(--adf-gold)] hover:bg-[var(--adf-gold)]/90 text-white font-bold rounded-lg transition-colors shadow-md"
                      >
                        Donate Here
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigate("contact")}
                        className="px-8 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg transition-colors shadow-md"
                      >
                        Contact Us
                      </button>
                    </div>
                  </div>
                </div>
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
            className={`h-2.5 rounded-full transition-all ${
              selected === i
                ? "w-8 bg-[var(--adf-gold)]"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export const HomeScreen: React.FC<Props> = ({
  onNavigate,
  onOpenTakeAction,
  onOpenDonate,
}) => {
  const [donateForm, setDonateForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    amount: "",
  });
  const [donateSuccess, setDonateSuccess] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (donateForm.firstName && donateForm.email && donateForm.amount) {
      setDonateSuccess(true);
      setTimeout(() => {
        setDonateSuccess(false);
        setDonateForm({ firstName: "", lastName: "", email: "", amount: "" });
      }, 3000);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterSuccess(false);
        setNewsletterEmail("");
      }, 3000);
    }
  };

  return (
    <div className="animate-fade-in font-sans text-slate-800 bg-white">
      {/* 1. HERO CAROUSEL / BANNER */}
      <HeroSlider onDonate={onOpenDonate} />

      {/* 2. THREE FEATURE CARDS */}
      <section className="relative -mt-16 z-20 max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              tag: "Economic Empowerment",
              title: "Give Economic Empowerment",
              body: "Supporting livelihoods, employment, and financial independence for persons with disabilities across Africa.",
              color: "cyan",
              border: "border-cyan-400",
              btnHover: "hover:bg-cyan-500 hover:text-white",
            },
            {
              tag: "Inclusive Education",
              title: "Give Inclusive Education",
              body: "Promoting accessible schooling, learning resources, and teacher training to ensure equal learning opportunities.",
              color: "amber",
              border: "border-amber-400",
              btnHover: "hover:bg-amber-500 hover:text-white",
            },
            {
              tag: "Equal Access",
              title: "Give Equal Access",
              body: "Advocating for physical, digital, and legal accessibility to ensure full participation in all spheres of life.",
              color: "red",
              border: "border-red-400",
              btnHover: "hover:bg-red-500 hover:text-white",
            },
          ].map((card) => (
            <div
              key={card.tag}
              className={`bg-white rounded-xl shadow-lg border-t-4 ${card.border} p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 min-h-[260px]`}
            >
              <div>
                <h3 className="text-xl font-bold text-[var(--adf-charcoal)] leading-snug">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--adf-muted)] leading-relaxed">
                  {card.body}
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => onNavigate("programmes")}
                  className={`h-10 w-10 rounded-full border border-slate-200 bg-slate-50 ${card.btnHover} flex items-center justify-center transition-colors shadow-sm`}
                  aria-label={`Learn more about ${card.title}`}
                >
                  <span className="material-symbols-outlined text-base font-bold">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WELCOME SECTION (WITH ROTATED VERTICAL WISHON TEXT & BLUE ACCENT SQUARE) */}
      <section className="py-24 max-w-[1200px] mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Photo Frame with rotated background typography & accent square */}
        <div className="relative flex justify-center items-center min-h-[460px]">
          {/* Rotated background overlay text 'WISHON' */}
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 select-none opacity-20 hidden md:block">
            <span className="text-8xl font-black text-amber-500 tracking-widest uppercase origin-bottom-left -rotate-90 block">
              WISHON
            </span>
          </div>

          {/* Blue Accent Square */}
          <div className="absolute top-4 right-12 w-6 h-6 bg-blue-600 z-20 shadow-md hidden sm:block" />

          {/* Main Image Container */}
          <div className="relative w-full max-w-[480px] h-[400px] rounded-2xl overflow-hidden shadow-2xl z-10 border-4 border-white">
            <img
              src={assetUrl("/images/adf-event-1.jpg")}
              alt="Welcome to African Disability Forum"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Floating Blue Play / Video Badge */}
          <button
            type="button"
            onClick={onOpenTakeAction}
            className="absolute top-6 right-6 sm:-right-4 h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110 z-30"
            aria-label="Play ADF introductory video"
          >
            <span className="material-symbols-outlined text-xl">play_arrow</span>
          </button>
        </div>

        {/* Right Side Narrative */}
        <div className="lg:pl-6">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--adf-charcoal)] leading-tight">
            Welcome to The African Disability Forum
          </h2>
          <p className="mt-6 text-gray-600 leading-relaxed text-sm md:text-base">
            African Disability Forum (ADF) is the continental organization of Organizations of Persons with Disabilities (OPDs) in Africa. Formally established in 2014, ADF unifies and amplifies the representative voice of Africans with disabilities, their families, and member OPDs across the continent.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
            We work closely with continental and international partners to foster disability-inclusive development, promote human rights under the UN CRPD and the African Disability Protocol, and build grassroots capacity across 44+ member countries.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => onNavigate("about")}
              className="px-8 py-3.5 bg-[var(--adf-gold)] hover:bg-[var(--adf-gold)]/90 text-white font-bold rounded-md transition-colors shadow-md text-sm"
            >
              Read More
            </button>
            <button
              type="button"
              onClick={() => onNavigate("membership")}
              className="px-8 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-md transition-colors shadow-md text-sm"
            >
              Our Membership
            </button>
          </div>
        </div>
      </section>

      {/* 4. ADF HIGHLIGHT BANNER */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 mb-20">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-blue-700 text-white rounded-xl flex items-center justify-center font-extrabold text-2xl tracking-tighter shrink-0 shadow-md">
              ADF
            </div>
            <div>
              <h3 className="font-extrabold text-xl md:text-2xl text-[var(--adf-charcoal)]">
                African Disability Forum
              </h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mt-0.5">
                Continental Network of OPDs
              </p>
            </div>
          </div>
          <div className="bg-neutral-900 text-white px-8 py-4 rounded-xl text-center md:text-left flex-1 max-w-xl shadow-inner">
            <p className="font-bold text-sm md:text-base tracking-wide">
              Amplifying the voice of over 80 Million Africans with disabilities.
            </p>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS / WHAT PARTNERS & DONORS SAY ABOUT US */}
      <section className="py-20 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
        {/* Subtle Map / Grid Decorative Background */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 md:px-6 grid lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-5">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--adf-charcoal)] leading-tight">
              What Partners &amp; Donors Say About Us
            </h2>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              Our partners and donors collaborate with ADF to build sustainable capacity, ensure inclusive policies, and support rights-based initiatives throughout Africa.
            </p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {[
              {
                quote:
                  "ADF's leadership in bringing together OPDs across 44 countries has transformed how disability rights are addressed at the continental level.",
                author: "Amina Mensah",
                role: "Regional OPD Network",
              },
              {
                quote:
                  "Partnering with ADF ensures our development initiatives are authentically guided by persons with disabilities themselves.",
                author: "Development Partner",
                role: "Multilateral Funder",
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-md border border-slate-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-amber-400 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="material-symbols-outlined text-sm">
                        star
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <h4 className="font-bold text-slate-800 text-xs">{t.author}</h4>
                  <p className="text-[11px] text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FIND POPULAR CAUSES */}
      <section className="py-24 max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            JOIN THE CAUSE
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--adf-charcoal)] mt-2">
            Find Popular Causes
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Grassroots OPD Capacity Building",
              desc: "Providing organizational support, legal training, and governance workshops for local disability advocacy groups.",
              image: assetUrl("/images/adf-event-2.jpg"),
              tag: "Advocacy",
              raised: "$45,200",
              goal: "$60,000",
              pct: "75%",
            },
            {
              title: "Inclusive Youth & Women Leadership",
              desc: "Empowering young women and men with disabilities with skills for employment, self-advocacy, and civic participation.",
              image: assetUrl("/images/adf-event-3.jpg"),
              tag: "Empowerment",
              raised: "$32,800",
              goal: "$50,000",
              pct: "65%",
            },
            {
              title: "African Disability Protocol Campaign",
              desc: "Accelerating ratification and legal implementation of the African Disability Protocol across Member States.",
              image: assetUrl("/images/adf-event-4.jpg"),
              tag: "Rights",
              raised: "$88,000",
              goal: "$100,000",
              pct: "88%",
            },
          ].map((cause) => (
            <div
              key={cause.title}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={cause.image}
                  alt={cause.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-4 right-4 bg-[var(--adf-gold)] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow">
                  {cause.tag}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-blue-700 transition-colors">
                    {cause.title}
                  </h3>
                  <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                    {cause.desc}
                  </p>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-500">Raised: <strong className="text-slate-800">{cause.raised}</strong></span>
                    <span className="text-blue-600 font-bold">{cause.pct}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: cause.pct }}
                    />
                  </div>
                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      onClick={onOpenDonate}
                      className="w-full py-2.5 bg-slate-100 hover:bg-[var(--adf-gold)] hover:text-white text-slate-800 text-xs font-bold rounded-lg transition-colors uppercase tracking-wider"
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. DARK CALL TO ACTION BANNER */}
      <section className="bg-neutral-900 py-16 text-center">
        <div className="max-w-[800px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl text-white font-extrabold leading-tight">
            Let&apos;s Make a Difference in the Lives of Others
          </h2>
          <div className="mt-8">
            <button
              type="button"
              onClick={onOpenDonate}
              className="px-10 py-4 bg-[var(--adf-gold)] hover:bg-[var(--adf-gold)]/90 text-white font-bold rounded-md transition-colors shadow-lg uppercase text-sm tracking-wider"
            >
              Donate Now
            </button>
          </div>
        </div>
      </section>

      {/* 8. UPCOMING EVENTS & GOLDEN STAT CARD */}
      <section className="py-24 max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Events List */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
                LATEST UPDATES
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--adf-charcoal)] mt-1">
                Upcoming Events
              </h2>

              <div className="mt-8 space-y-4">
                {EVENTS_DATA.slice(0, 2).map((event) => {
                  const dateObj = new Date(event.date);
                  const day = dateObj.getDate();
                  const month = dateObj.toLocaleString("en-US", { month: "short" });
                  return (
                    <div
                      key={event.id}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex gap-5 items-center hover:bg-white hover:shadow-md transition-all"
                    >
                      <div className="h-14 w-14 rounded-lg bg-blue-700 text-white font-extrabold text-xs flex flex-col items-center justify-center shrink-0 shadow-sm">
                        <span className="text-base leading-none">{day}</span>
                        <span className="uppercase text-[9px] mt-0.5 tracking-wider">
                          {month}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 text-[11px] text-amber-600 font-semibold mb-1">
                          <span>{event.time}</span>
                          <span>•</span>
                          <span>{event.location.split(" &")[0]}</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-800 truncate">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => onNavigate("events")}
                className="px-6 py-3 border border-slate-300 hover:border-blue-600 hover:text-blue-600 font-bold text-xs rounded-lg transition-colors"
              >
                View All Events →
              </button>
            </div>
          </div>

          {/* Right Side Golden Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-xl min-h-[320px]">
            {/* Background Watermark 172 */}
            <div className="absolute right-4 bottom-4 text-9xl font-black text-white/10 select-none pointer-events-none">
              172
            </div>

            <div>
              <span className="material-symbols-outlined text-4xl mb-4 text-amber-100">
                volunteer_activism
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold leading-snug">
                Let&apos;s Make A Difference In The Lives Of Other People
              </h3>
            </div>

            <div className="mt-8 relative z-10">
              <button
                type="button"
                onClick={onOpenDonate}
                className="px-8 py-3 bg-white hover:bg-slate-100 text-amber-600 font-extrabold text-xs uppercase tracking-wider rounded-md shadow transition-colors"
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. HELP EACH OTHER CAN CHANGE WORLD (STACKED VERTICAL IMAGE CARDS) */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Side: 2 Vertical Rectangular Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="h-[340px] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <img
                src={assetUrl("/images/adf-event-5.png")}
                alt="Support OPDs"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-[340px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 mt-8">
              <img
                src={assetUrl("/images/adf-event-6.png")}
                alt="Empowerment workshop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side: Narrative and 3 feature rows */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--adf-charcoal)] leading-tight">
              Help Each Other Can Change World
            </h2>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              Together with our continental partners, member OPDs, and local champions, we build systemic solutions that empower persons with disabilities to lead dignified, independent, and full lives.
            </p>

            <div className="mt-8 space-y-6">
              {[
                {
                  title: "We Support Persons with Disability",
                  desc: "Providing advocacy tools, assistive resources, and direct community outreach programs.",
                  icon: "volunteer_activism",
                },
                {
                  title: "We Empower OPDs Across Africa",
                  desc: "Strengthening local leadership, legal frameworks, and organizational resilience.",
                  icon: "groups",
                },
                {
                  title: "We Promote Rights and Inclusion",
                  desc: "Driving continental treaty implementation, accessible policy creation, and equal rights enforcement.",
                  icon: "gavel",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-2xl">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-base">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. NEWS & ARTICLES */}
      <section className="py-24 max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            OUR BLOG
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--adf-charcoal)] mt-2">
            News &amp; Articles
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {NEWS_DATA.slice(0, 3).map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={assetUrl(item.image)}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-amber-600 font-semibold mb-2">
                    <span>ADF Editor</span>
                    <span>•</span>
                    <span>{item.category}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-[11px] text-gray-500">{item.date}</span>
                  <button
                    type="button"
                    onClick={() => onNavigate("news")}
                    className="text-xs font-bold text-blue-700 hover:text-amber-500 transition-colors"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 11. BLUE NEWSLETTER BAR */}
      <section className="bg-blue-700 text-white py-12">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Give a Helping Hand
            </h3>
            <p className="text-xs md:text-sm text-blue-100 mt-1">
              Subscribe to the ADF newsletter for continental disability updates and news.
            </p>
          </div>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex w-full md:w-auto gap-2 max-w-md"
          >
            <input
              type="email"
              required
              placeholder="Your Email Address..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="px-4 py-3 rounded-lg bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 flex-1 md:w-72"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[var(--adf-gold)] hover:bg-[var(--adf-gold)]/90 text-white font-bold rounded-lg text-xs uppercase tracking-wider shadow transition-colors shrink-0"
            >
              {newsletterSuccess ? "Joined!" : "Submit"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

