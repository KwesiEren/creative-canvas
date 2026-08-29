import React, { useState } from "react";
import { NavTab, ProgrammeId } from "@/types";
import { btnDonate, btnPrimary } from "./ui";
import { assetUrl } from "@/lib/assetUrl";
import { NEWS_DATA, EVENTS_DATA } from "@/data/mockData";

interface Props {
  onNavigate: (tab: NavTab, extra?: { programmeId?: ProgrammeId }) => void;
  onOpenTakeAction: () => void;
  onOpenDonate: () => void;
}

export const HomeScreen: React.FC<Props> = ({ onNavigate, onOpenTakeAction, onOpenDonate }) => {
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
      {/* 1. HERO SECTION */}
      <section 
        className="relative min-h-[640px] md:min-h-[738px] flex items-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${assetUrl("/images/home_hero_bg.jpg")})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        
        <div className="relative max-w-[1200px] w-full mx-auto px-4 md:px-6 z-10 py-16 md:py-24">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Think <span className="text-[var(--adf-gold)]">&amp;</span> <br />
              Give Charity.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-lg leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <button 
                type="button" 
                onClick={onOpenDonate} 
                className="px-8 py-3.5 bg-[var(--adf-gold)] hover:bg-[var(--adf-gold)]/90 text-white font-bold rounded-lg transition-colors shadow-md"
              >
                Discover More
              </button>
              <button 
                type="button" 
                onClick={() => onNavigate("contact")} 
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-md"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE HIGHLIGHT CARDS */}
      <section className="relative -mt-16 z-20 max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-cyan-500 p-8 flex flex-col justify-between hover:shadow-xl transition-shadow min-h-[280px]">
            <div>
              <span className="text-xs uppercase tracking-wider text-cyan-600 font-semibold">EDUCATION</span>
              <h3 className="text-2xl font-bold mt-2 text-[var(--adf-charcoal)]">Give Education</h3>
              <p className="mt-3 text-sm text-[var(--adf-muted)] leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
              </p>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <button 
                onClick={() => onNavigate("programmes")}
                className="h-10 w-10 rounded-full bg-slate-100 hover:bg-cyan-500 hover:text-white flex items-center justify-center transition-colors"
                aria-label="View details about Education programme"
              >
                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-amber-500 p-8 flex flex-col justify-between hover:shadow-xl transition-shadow min-h-[280px]">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-600 font-semibold">FOOD</span>
              <h3 className="text-2xl font-bold mt-2 text-[var(--adf-charcoal)]">Give Food</h3>
              <p className="mt-3 text-sm text-[var(--adf-muted)] leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
              </p>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <button 
                onClick={() => onNavigate("programmes")}
                className="h-10 w-10 rounded-full bg-slate-100 hover:bg-amber-500 hover:text-white flex items-center justify-center transition-colors"
                aria-label="View details about Food programme"
              >
                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-red-500 p-8 flex flex-col justify-between hover:shadow-xl transition-shadow min-h-[280px]">
            <div>
              <span className="text-xs uppercase tracking-wider text-red-600 font-semibold">WATER</span>
              <h3 className="text-2xl font-bold mt-2 text-[var(--adf-charcoal)]">Give Water</h3>
              <p className="mt-3 text-sm text-[var(--adf-muted)] leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
              </p>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <button 
                onClick={() => onNavigate("programmes")}
                className="h-10 w-10 rounded-full bg-slate-100 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"
                aria-label="View details about Water programme"
              >
                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NON-PROFIT CHARITY ORGANIZATION INTRODUCTION */}
      <section className="py-20 max-w-[1200px] mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Circular images placeholder layout */}
        <div className="relative flex justify-center items-center h-[570px]">
          {/* Main Round Image Container */}
          <div className="relative w-[380px] h-[380px] rounded-full overflow-hidden border-4 border-white shadow-2xl z-10">
            <img 
              src={assetUrl("/images/about_nonprofit.jpg")} 
              alt="Volunteers at Charity Event" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Overlapping Circle Graphic elements matching mockup */}
          <div className="absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-[55%] w-[420px] h-[420px] rounded-full border-2 border-dashed border-amber-400 pointer-events-none" />
          <div className="absolute top-[20%] right-[10%] w-[120px] h-[120px] rounded-full bg-gray-200 opacity-60 flex items-center justify-center text-xs font-semibold text-gray-500 shadow-sm z-0">
            269X269
          </div>
          <div className="absolute bottom-[10%] left-[5%] w-[160px] h-[160px] rounded-full bg-gray-300 opacity-50 flex items-center justify-center text-xs font-semibold text-gray-600 shadow-sm z-20">
            571X570
          </div>
          {/* Blue Play Button Circle */}
          <button 
            type="button" 
            onClick={onOpenTakeAction}
            className="absolute top-[40%] left-[20%] h-14 w-14 rounded-md bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 z-20"
            aria-label="Play video or audio"
          >
            <span className="material-symbols-outlined text-2xl">play_arrow</span>
          </button>
        </div>

        {/* Right Side Details */}
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">WELCOME TO ADF</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--adf-charcoal)] mt-2 leading-tight">
            We&apos;re Non-profit <br />
            Charity Organisation
          </h2>
          <p className="mt-6 text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="mt-6 bg-slate-50 border-l-4 border-amber-500 p-4 rounded-r-lg font-medium text-slate-700">
            &ldquo;Join us and make a difference today.&rdquo;
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-amber-500 text-2xl shrink-0">check_circle</span>
              <div>
                <h4 className="font-bold text-slate-800">Our Mission</h4>
                <p className="text-xs text-gray-500 mt-1">Lorem ipsum dolor sit amet, consectetur elit.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-amber-500 text-2xl shrink-0">check_circle</span>
              <div>
                <h4 className="font-bold text-slate-800">Our Vision</h4>
                <p className="text-xs text-gray-500 mt-1">Lorem ipsum dolor sit amet, consectetur elit.</p>
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
            <span className="material-symbols-outlined text-blue-700 text-4xl mb-2">savings</span>
            <div className="text-3xl md:text-5xl font-extrabold text-slate-800">66M+</div>
            <p className="text-xs text-gray-500 mt-1 font-semibold uppercase tracking-wider">Raised</p>
          </div>
          <div className="text-center">
            <span className="material-symbols-outlined text-amber-500 text-4xl mb-2">groups</span>
            <div className="text-3xl md:text-5xl font-extrabold text-slate-800">48k+</div>
            <p className="text-xs text-gray-500 mt-1 font-semibold uppercase tracking-wider">Volunteers</p>
          </div>
          <div className="text-center">
            <span className="material-symbols-outlined text-blue-700 text-4xl mb-2">workspace_premium</span>
            <div className="text-3xl md:text-5xl font-extrabold text-slate-800">38k+</div>
            <p className="text-xs text-gray-500 mt-1 font-semibold uppercase tracking-wider">Projects</p>
          </div>
          <div className="text-center">
            <span className="material-symbols-outlined text-amber-500 text-4xl mb-2">location_on</span>
            <div className="text-3xl md:text-5xl font-extrabold text-slate-800">230+</div>
            <p className="text-xs text-gray-500 mt-1 font-semibold uppercase tracking-wider">Branches</p>
          </div>
        </div>
      </section>

      {/* 5. MID-PAGE DARK CTA */}
      <section className="bg-neutral-900 py-20 text-center">
        <div className="max-w-[800px] mx-auto px-4 md:px-6">
          <span className="text-xs uppercase tracking-widest text-[var(--adf-gold)] font-bold">HELP EACH OTHER</span>
          <h2 className="text-3xl md:text-5xl text-white font-extrabold mt-3 leading-tight">
            Fundraising for the People and <br />
            Causes you Care About
          </h2>
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

      {/* 6. UPCOMING EVENTS */}
      <section className="py-20 max-w-[1200px] mx-auto px-4 md:px-6 grid lg:grid-cols-5 gap-12">
        {/* Left Side Info */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">LATEST EVENTS</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--adf-charcoal)] mt-2 leading-tight">
            Upcoming Events
          </h2>
          <p className="mt-6 text-gray-600 leading-relaxed">
            Stay updated with our latest advocacy sessions, workshops, summits, and disability rights campaigns across the continent.
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

        {/* Right Side: Red Background Connector Box */}
        <div className="lg:col-span-3 bg-red-500 rounded-2xl p-8 md:p-12 relative flex flex-col gap-6">
          {/* Vertical Blue Timeline Line */}
          <div className="absolute left-[34px] md:left-[50px] top-12 bottom-12 w-0.5 bg-blue-600" />

          {EVENTS_DATA.slice(0, 2).map((event, index) => {
            const dateObj = new Date(event.date);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString("en-US", { month: "short" });
            return (
              <div key={event.id} className="relative flex gap-6 z-10">
                {/* Date Bubble and Timeline Node */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="h-[60px] w-[60px] rounded-full bg-blue-600 text-white font-extrabold text-sm flex flex-col items-center justify-center shadow-lg">
                    <span>{day}</span>
                    <span className="uppercase text-[10px] tracking-wider leading-none mt-0.5">{month}</span>
                  </div>
                </div>

                {/* Event White Card Container */}
                <div className="bg-white rounded-xl p-6 shadow-md flex-1">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-amber-600 font-semibold mb-2">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {event.location}
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

      {/* 7. FIND POPULAR CAUSES */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">SUPPORT US</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--adf-charcoal)] mt-2">
              Find Popular Causes
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column: Interactive Donation Form */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8 md:p-10">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Start Donating</h3>
              {donateSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center font-medium mb-6 animate-pulse">
                  Thank you for your generous pledge!
                </div>
              ) : null}
              <form onSubmit={handleDonateSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">First Name</label>
                    <input 
                      type="text" 
                      required 
                      value={donateForm.firstName}
                      onChange={(e) => setDonateForm({ ...donateForm, firstName: e.target.value })}
                      placeholder="First Name" 
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Last Name</label>
                    <input 
                      type="text" 
                      value={donateForm.lastName}
                      onChange={(e) => setDonateForm({ ...donateForm, lastName: e.target.value })}
                      placeholder="Last Name" 
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-slate-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={donateForm.email}
                    onChange={(e) => setDonateForm({ ...donateForm, email: e.target.value })}
                    placeholder="Email Address" 
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Pledge Amount ($)</label>
                  <input 
                    type="number" 
                    required 
                    value={donateForm.amount}
                    onChange={(e) => setDonateForm({ ...donateForm, amount: e.target.value })}
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
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden flex flex-col justify-between">
              <div className="relative h-[340px] md:h-[400px]">
                <img 
                  src={assetUrl("/images/popular_cause_featured.jpg")} 
                  alt="Inclusive Education" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-amber-400 p-6 flex flex-col sm:flex-row justify-around items-center text-white gap-4 font-bold">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-white text-2xl">check_circle</span>
                  <span>Medical Help</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-white text-2xl">check_circle</span>
                  <span>Clean Water</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHAT THEY'RE TALKING ABOUT US */}
      <section className="py-20 max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold font-sans">TESTIMONIALS</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--adf-charcoal)] mt-2 font-sans">
            What They&apos;re Talking About Us
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8 flex flex-col justify-between min-h-[260px]">
            <div>
              {/* Star Rating */}
              <div className="flex gap-1 text-amber-500 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="material-symbols-outlined text-xl">star</span>
                ))}
              </div>
              <p className="text-gray-600 italic leading-relaxed">
                &ldquo;ADF&apos;s support has been instrumental in strengthening our local disability group. Their advocacy training has empowered our members to demand rights.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-slate-100">
              <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-blue-700 text-sm">
                AM
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Amina Mensah</h4>
                <p className="text-xs text-gray-500">Local Advocate, Ghana</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8 flex flex-col justify-between min-h-[260px]">
            <div>
              {/* Star Rating */}
              <div className="flex gap-1 text-amber-500 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="material-symbols-outlined text-xl">star</span>
                ))}
              </div>
              <p className="text-gray-600 italic leading-relaxed">
                &ldquo;The collaborative platform ADF creates has allowed our regional organisation to share technical research on accessibility standardisation with great ease.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-slate-100">
              <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-blue-700 text-sm">
                JK
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">John Kamau</h4>
                <p className="text-xs text-gray-500">Technical Officer, Kenya</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SPONSORS BAND */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-300 py-8 text-center text-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex flex-wrap justify-around items-center gap-6 font-extrabold tracking-wider text-xl md:text-2xl uppercase opacity-85">
          <span>EPICURE</span>
          <span>BROOKS</span>
          <span>SPONSOR</span>
          <span>COOPER</span>
          <span>PARTNER</span>
        </div>
      </section>

      {/* 10. NEWS & ARTICLES */}
      <section className="py-20 max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold font-sans">LATEST UPDATES</span>
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
              <article key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-shadow group">
                <div className="relative h-[220px]">
                  <img 
                    src={assetUrl(item.image)} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-amber-400 text-white font-extrabold text-xs py-2 px-3.5 rounded-lg text-center shadow-md">
                    <span className="block text-sm leading-none">{day}</span>
                    <span className="block text-[10px] uppercase leading-none mt-0.5">{month}</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">{item.category}</span>
                    <h3 className="text-lg font-bold text-slate-800 mt-2 line-clamp-2 leading-snug group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <button 
                    type="button"
                    onClick={() => onNavigate("news")}
                    className="mt-6 text-sm font-bold text-slate-600 hover:text-amber-500 transition-colors flex items-center gap-1"
                  >
                    Read More 
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 11. INSTAGRAM/GALLERY BANNER */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-2 px-2 py-4 bg-slate-50 border-t border-slate-200">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="aspect-square rounded-lg bg-slate-200 overflow-hidden relative group cursor-pointer shadow-sm">
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
              <span className="material-symbols-outlined text-white text-3xl">image</span>
            </div>
            <img 
              src={assetUrl(`/images/home_hero_bg.jpg`)} 
              alt="Gallery thumbnail" 
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
          </div>
        ))}
      </section>
    </div>
  );
};
