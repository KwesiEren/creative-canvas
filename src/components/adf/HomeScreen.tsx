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

  return (
    <div className="animate-fade-in font-sans">
      {/* 1. HERO CAROUSEL */}
      <HeroSlider onDonate={onOpenDonate} />

      {/* 2. THREE WHAT WE DO CARDS */}
      <section className="relative -mt-16 z-20 max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {WHAT_WE_DO.map((card) => {
            const borderClass =
              card.color === "cyan"
                ? "border-cyan-500"
                : card.color === "amber"
                  ? "border-amber-500"
                  : "border-red-500";
            const iconColor =
              card.color === "cyan"
                ? "text-cyan-600"
                : card.color === "amber"
                  ? "text-amber-600"
                  : "text-red-600";
            const hoverBg =
              card.color === "cyan"
                ? "hover:bg-cyan-500"
                : card.color === "amber"
                  ? "hover:bg-amber-500"
                  : "hover:bg-red-500";

            return (
              <div
                key={card.tag}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 ${borderClass} p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 min-h-[280px]`}
              >
                <div>
                  <span
                    className={`text-xs uppercase tracking-wider ${iconColor} font-semibold`}
                  >
                    {card.tag}
                  </span>
                  <h3 className="text-2xl font-bold mt-2 text-[var(--adf-charcoal)]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--adf-muted)] leading-relaxed">
                    {card.body}
                  </p>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={() => onNavigate("programmes")}
                    className={`h-10 w-10 rounded-full bg-slate-100 ${hoverBg} hover:text-white flex items-center justify-center transition-colors`}
                    aria-label={`View details about ${card.tag}`}
                  >
                    <span className="material-symbols-outlined text-sm font-bold">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. NON-PROFIT INTRODUCTION */}
      <section className="py-20 max-w-[1200px] mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Circular images layout */}
        <div className="relative flex justify-center items-center h-[570px]">
          <div className="relative w-[380px] h-[380px] rounded-full overflow-hidden border-4 border-white shadow-2xl z-10">
            <img
              src={assetUrl("/images/adf-event-1.jpg")}
              alt="Members of the African Disability Forum at a continental convening"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-[55%] w-[420px] h-[420px] rounded-full border-2 border-dashed border-amber-400 pointer-events-none" />
          <div className="absolute top-[20%] right-[10%] w-[120px] h-[120px] rounded-full overflow-hidden shadow-sm z-0">
            <img
              src={assetUrl("/images/adf-event-5.png")}
              alt="ADF community event"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-[10%] left-[5%] w-[160px] h-[160px] rounded-full overflow-hidden shadow-sm z-20">
            <img
              src={assetUrl("/images/adf-event-6.png")}
              alt="ADF workshop participants"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={onOpenTakeAction}
            className="absolute top-[40%] left-[20%] h-14 w-14 rounded-md bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 z-20"
            aria-label="Play video or audio"
          >
            <span className="material-symbols-outlined text-2xl">
              play_arrow
            </span>
          </button>
        </div>

        {/* Right Side Details */}
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            WELCOME TO ADF
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--adf-charcoal)] mt-2 leading-tight">
            African Disability Forum
          </h2>
          <p className="mt-6 text-gray-600 leading-relaxed">
            ADF is the continental membership organization of Disabled
            Persons&apos; Organizations (DPOs) in Africa. Formally established
            in 2014, ADF seeks to strengthen and unify the representative voices
            of Africans with disabilities, their families and organizations.
          </p>

          <div className="mt-6 bg-slate-50 border-l-4 border-amber-500 p-4 rounded-r-lg font-medium text-slate-700">
            &ldquo;We must break down the barriers that prevent people with
            disabilities from participating fully in society.&rdquo;
            <span className="block text-xs text-gray-500 mt-1">
              — Thomas Sankara
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-amber-500 text-2xl shrink-0">
                check_circle
              </span>
              <div>
                <h4 className="font-bold text-slate-800">Our Mission</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Promote the rights and inclusion of persons with disabilities
                  and their families in Africa through empowerment and
                  participation.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-amber-500 text-2xl shrink-0">
                check_circle
              </span>
              <div>
                <h4 className="font-bold text-slate-800">Our Vision</h4>
                <p className="text-xs text-gray-500 mt-1">
                  An inclusive Africa where all persons with disabilities and
                  their families have their rights and voices respected.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate("about")}
            className="mt-10 px-8 py-3.5 bg-[var(--adf-gold)] hover:bg-[var(--adf-gold)]/90 text-white font-bold rounded-lg transition-colors shadow-md"
          >
            Read More
          </button>
        </div>
      </section>

      {/* 4. STATS COUNTER BAND */}
      <section className="bg-slate-100 border-y border-slate-200 py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <span className="material-symbols-outlined text-blue-700 text-4xl mb-2">
              savings
            </span>
            <div className="text-3xl md:text-5xl font-extrabold text-slate-800">
              44+
            </div>
            <p className="text-xs text-gray-500 mt-1 font-semibold uppercase tracking-wider">
              Member Countries
            </p>
          </div>
          <div className="text-center">
            <span className="material-symbols-outlined text-amber-500 text-4xl mb-2">
              groups
            </span>
            <div className="text-3xl md:text-5xl font-extrabold text-slate-800">
              8
            </div>
            <p className="text-xs text-gray-500 mt-1 font-semibold uppercase tracking-wider">
              Continental DPOs
            </p>
          </div>
          <div className="text-center">
            <span className="material-symbols-outlined text-blue-700 text-4xl mb-2">
              workspace_premium
            </span>
            <div className="text-3xl md:text-5xl font-extrabold text-slate-800">
              4
            </div>
            <p className="text-xs text-gray-500 mt-1 font-semibold uppercase tracking-wider">
              Sub-Regional Federations
            </p>
          </div>
          <div className="text-center">
            <span className="material-symbols-outlined text-amber-500 text-4xl mb-2">
              public
            </span>
            <div className="text-3xl md:text-5xl font-extrabold text-slate-800">
              5
            </div>
            <p className="text-xs text-gray-500 mt-1 font-semibold uppercase tracking-wider">
              Regions Covered
            </p>
          </div>
        </div>
      </section>

      {/* 5. MID-PAGE DARK CTA */}
      <section className="bg-neutral-900 py-20 text-center">
        <div className="max-w-[800px] mx-auto px-4 md:px-6">
          <span className="text-xs uppercase tracking-widest text-[var(--adf-gold)] font-bold">
            MAKE A DIFFERENCE
          </span>
          <h2 className="text-3xl md:text-5xl text-white font-extrabold mt-3 leading-tight">
            Transform Lives Today By Donating
          </h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            Your contribution directly powers grassroots OPD capacity building,
            youth leadership workshops and continental legal advocacy.
          </p>
          <div className="mt-8">
            <button
              type="button"
              onClick={onOpenDonate}
              className="px-8 py-3.5 bg-[var(--adf-gold)] hover:bg-[var(--adf-gold)]/90 text-white font-bold rounded-lg transition-colors shadow-md"
            >
              Donate Now
            </button>
          </div>
        </div>
      </section>

      {/* 6. OUR PROJECTS */}
      <section className="py-20 max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            OUR PROJECTS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--adf-charcoal)] mt-2">
            What We Do
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              title: "We Are Able!",
              body: "A programme that helps people with disabilities achieve a sustainable, fully-fledged place in their community, so that they have greater food security.",
              countries: "Burundi, DR Congo, Ethiopia, South Sudan, Sudan, Uganda",
              image: assetUrl("/images/adf-event-1.jpg"),
            },
            {
              title: "SPADRA",
              body: "Strengthening Partnerships to Advance Disability Rights in Africa — advancing gender and disability rights through strengthening OPD capacity.",
              countries: "Ghana, Benin, Malawi, Zambia",
              image: assetUrl("/images/adf-event-2.jpg"),
            },
            {
              title: "We Can Work",
              body: "Enabling young women and men with disabilities to access dignified and fulfilling work across seven countries in Africa by 2030.",
              countries: "Ethiopia, Kenya, Uganda, Rwanda, Ghana, Nigeria, Senegal",
              image: assetUrl("/images/adf-event-3.jpg"),
            },
          ].map((project) => (
            <article
              key={project.title}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-[var(--adf-charcoal)]">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--adf-muted)] leading-relaxed flex-1">
                  {project.body}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-amber-600 font-semibold">
                  <span className="material-symbols-outlined text-sm">
                    location_on
                  </span>
                  {project.countries}
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate("programmes")}
                  className="mt-4 text-xs font-extrabold text-slate-500 hover:text-amber-500 transition-colors tracking-widest uppercase"
                >
                  READ MORE →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. UPCOMING EVENTS */}
      <section className="py-20 max-w-[1200px] mx-auto px-4 md:px-6 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2 flex flex-col justify-center">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            LATEST EVENTS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--adf-charcoal)] mt-2 leading-tight">
            Upcoming Events
          </h2>
          <p className="mt-6 text-gray-600 leading-relaxed">
            ADF is actively engaging African OPDs all over Africa, organizing
            education programmes and assisting African OPDs with strengthening
            their efforts on the ground.
          </p>
          <div className="mt-8">
            <button
              type="button"
              onClick={() => onNavigate("events")}
              className="px-8 py-3.5 bg-[var(--adf-gold)] hover:bg-[var(--adf-gold)]/90 text-white font-bold rounded-lg transition-colors shadow-md"
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="lg:col-span-3 bg-red-500 rounded-2xl p-8 md:p-12 relative flex flex-col gap-6">
          <div className="absolute left-[34px] md:left-[50px] top-12 bottom-12 w-0.5 bg-blue-600" />

          {EVENTS_DATA.slice(0, 2).map((event) => {
            const dateObj = new Date(event.date);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString("en-US", { month: "short" });
            return (
              <div key={event.id} className="relative flex gap-6 z-10">
                <div className="flex flex-col items-center shrink-0">
                  <div className="h-[60px] w-[60px] rounded-full bg-blue-600 text-white font-extrabold text-sm flex flex-col items-center justify-center shadow-lg">
                    <span>{day}</span>
                    <span className="uppercase text-[10px] tracking-wider leading-none mt-0.5">
                      {month}
                    </span>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md flex-1">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-amber-600 font-semibold mb-2">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">
                        schedule
                      </span>
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">
                        location_on
                      </span>
                      {event.location.split(" &")[0]}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 leading-snug hover:text-blue-700 transition-colors">
                    {event.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. FIND POPULAR CAUSES */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
              SUPPORT US
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--adf-charcoal)] mt-2">
              Find Popular Causes
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column: Interactive Donation Form */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 md:p-10">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">
                Start Donating
              </h3>
              {donateSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center font-medium mb-6 animate-pulse">
                  Thank you for your generous pledge!
                </div>
              ) : null}
              <form onSubmit={handleDonateSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={donateForm.firstName}
                      onChange={(e) =>
                        setDonateForm({
                          ...donateForm,
                          firstName: e.target.value,
                        })
                      }
                      placeholder="First Name"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={donateForm.lastName}
                      onChange={(e) =>
                        setDonateForm({
                          ...donateForm,
                          lastName: e.target.value,
                        })
                      }
                      placeholder="Last Name"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-slate-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={donateForm.email}
                    onChange={(e) =>
                      setDonateForm({ ...donateForm, email: e.target.value })
                    }
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Pledge Amount ($)
                  </label>
                  <input
                    type="number"
                    required
                    value={donateForm.amount}
                    onChange={(e) =>
                      setDonateForm({ ...donateForm, amount: e.target.value })
                    }
                    placeholder="Pledge Amount"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-slate-50"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg transition-colors shadow-md mt-4 uppercase tracking-wider text-sm"
                >
                  Start Donate
                </button>
              </form>
            </div>

            {/* Right Column: Featured image with yellow bottom check bar */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden flex flex-col justify-between">
              <div className="relative h-[340px] md:h-[400px]">
                <img
                  src={assetUrl("/images/adf-event-3.jpg")}
                  alt="Inclusive education workshop"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-amber-400 p-6 flex flex-col sm:flex-row justify-around items-center text-white gap-4 font-bold">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-white text-2xl">
                    check_circle
                  </span>
                  <span>Medical Help</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-white text-2xl">
                    check_circle
                  </span>
                  <span>Clean Water</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section className="py-20 max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--adf-charcoal)] mt-2">
            What They&apos;re Talking About Us
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 flex flex-col justify-between min-h-[260px]">
            <div>
              <div className="flex gap-1 text-amber-500 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className="material-symbols-outlined text-xl"
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-gray-600 italic leading-relaxed">
                &ldquo;ADF&apos;s support has been instrumental in strengthening
                our local disability group. Their advocacy training has empowered
                our members to demand rights and inclusion in our
                communities.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-slate-100">
              <div className="h-12 w-12 rounded-full bg-blue-700 flex items-center justify-center font-bold text-white text-sm">
                AM
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">
                  Amina Mensah
                </h4>
                <p className="text-xs text-gray-500">
                  Regional OPD Network, East Africa
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 flex flex-col justify-between min-h-[260px]">
            <div>
              <div className="flex gap-1 text-amber-500 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className="material-symbols-outlined text-xl"
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-gray-600 italic leading-relaxed">
                &ldquo;Partnership with ADF has helped us align
                disability-inclusive programming with the African Disability
                Protocol ratification agenda.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-slate-100">
              <div className="h-12 w-12 rounded-full bg-amber-500 flex items-center justify-center font-bold text-white text-sm">
                DP
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">
                  Development Partner
                </h4>
                <p className="text-xs text-gray-500">Multilateral Funder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. PARTNERS / SPONSORS BAND */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-300 py-10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <p className="text-center text-white/80 text-xs uppercase tracking-widest font-bold mb-6">
            Our Partners &amp; Supporters
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PARTNER_LOGOS.map((partner) => (
              <div
                key={partner.abbr}
                className="bg-white/20 rounded-xl h-16 flex items-center justify-center backdrop-blur-sm"
              >
                <span className="text-white font-extrabold text-sm tracking-wider">
                  {partner.abbr}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. NEWS & ARTICLES */}
      <section className="py-20 max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            LATEST UPDATES
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--adf-charcoal)] mt-2">
            News &amp; Articles
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {NEWS_DATA.slice(0, 3).map((item) => {
            const dateObj = new Date(item.date);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString("en-US", { month: "short" });
            return (
              <article
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-[220px] overflow-hidden">
                  <img
                    src={assetUrl(item.image)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-blue-700 text-white font-extrabold text-xs py-2 px-3.5 rounded-lg text-center shadow-md">
                    <span className="block text-sm leading-none">{day}</span>
                    <span className="block text-[10px] uppercase leading-none mt-0.5 tracking-wider">
                      {month}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-semibold text-amber-500 mb-2">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">
                          person
                        </span>
                        ADF Editor
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">
                          folder
                        </span>
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mt-2 line-clamp-2 leading-snug group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate("news")}
                    className="mt-6 text-xs font-extrabold text-slate-500 hover:text-amber-500 transition-colors tracking-widest uppercase"
                  >
                    <span className="text-amber-500 text-sm font-bold">
                      &rsaquo;
                    </span>{" "}
                    READ MORE
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 12. GALLERY BANNER */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-2 px-2 py-4 bg-slate-50 border-t border-slate-200">
        {GALLERY_IMAGES.map((img, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer shadow-sm"
          >
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
              <span className="material-symbols-outlined text-white text-3xl">
                image
              </span>
            </div>
            <img
              src={img}
              alt={`Gallery thumbnail ${i + 1}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
          </div>
        ))}
      </section>
    </div>
  );
};
