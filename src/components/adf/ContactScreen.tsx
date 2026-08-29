import React, { useState } from "react";
import { assetUrl } from "@/lib/assetUrl";

export const ContactScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      }, 4000);
    }
  };

  return (
    <div className="animate-fade-in font-sans pb-20">
      {/* 1. HERO BANNER (1894x378) with community photo background and dark overlay */}
      <section 
        className="relative min-h-[320px] md:min-h-[378px] flex items-center bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${assetUrl("/images/home_hero_bg.jpg")})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/45" />
        <div className="relative max-w-[1200px] w-full mx-auto px-4 md:px-6 z-10 text-white py-12">
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-wider text-white/70 mb-3">
            <span>Home</span> <span className="mx-1">/</span> <span className="text-[var(--adf-gold)] font-semibold">Contact</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Contact</h1>
        </div>
      </section>

      {/* 2. RECTANGULAR MAP & INFO CARD CONTAINER */}
      <section className="max-w-[1000px] mx-auto px-4 md:px-6 -mt-16 z-20 relative">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col">
          {/* Google Maps iFrame */}
          <div className="w-full h-[400px] bg-slate-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.76!3d9.02!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDEnMTIuMCJOIDM4wrA0NSczNi4wIkU!5e0!3m2!1sen!2set!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ADF Office Location Map"
            />
          </div>

          {/* Gold Details Bar matching mockup */}
          <div className="bg-amber-400 p-6 md:p-8 grid md:grid-cols-3 gap-6 md:gap-4 text-white text-sm font-semibold">
            {/* Emails */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-white text-amber-500 flex items-center justify-center shadow shrink-0">
                <span className="material-symbols-outlined text-xl">mail</span>
              </div>
              <div className="min-w-0">
                <a href="mailto:needhelp@adf-africa.org" className="block hover:underline truncate">needhelp@adf-africa.org</a>
                <a href="mailto:info@adf-africa.org" className="block hover:underline truncate">info@adf-africa.org</a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-white text-amber-500 flex items-center justify-center shadow shrink-0">
                <span className="material-symbols-outlined text-xl">call</span>
              </div>
              <div>
                <a href="tel:+251116638210" className="block hover:underline truncate">+251 116 638 210</a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-white text-amber-500 flex items-center justify-center shadow shrink-0">
                <span className="material-symbols-outlined text-xl">location_on</span>
              </div>
              <div>
                <p className="leading-tight">Addis Ababa, Ethiopia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTACT FORM SECTION */}
      <section className="max-w-[760px] mx-auto px-4 md:px-6 mt-20">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Contact With us</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--adf-charcoal)] mt-2 font-display">
            Leave a Message
          </h2>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center font-medium animate-pulse mb-8">
            <span className="material-symbols-outlined text-3xl block mb-2">check_circle</span>
            Thank you! Your message has been sent successfully.
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name"
                className="w-full px-4 py-3.5 rounded-lg border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm text-[var(--adf-charcoal)]"
              />
            </div>
            <div>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                className="w-full px-4 py-3.5 rounded-lg border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm text-[var(--adf-charcoal)]"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Phone"
                className="w-full px-4 py-3.5 rounded-lg border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm text-[var(--adf-charcoal)]"
              />
            </div>
            <div>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Subject"
                className="w-full px-4 py-3.5 rounded-lg border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm text-[var(--adf-charcoal)]"
              />
            </div>
          </div>

          <div>
            <textarea
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Message"
              className="w-full px-4 py-3.5 rounded-lg border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm text-[var(--adf-charcoal)]"
            />
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="px-10 py-4 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg transition-colors shadow-md uppercase tracking-wider text-xs"
            >
              Send a Message
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
