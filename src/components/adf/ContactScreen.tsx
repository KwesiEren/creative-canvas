import React, { useState } from 'react';
import { PageBanner } from './ui';

export const ContactScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: 'General Inquiry',
    message: '',
    accessibilityRequirement: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="animate-fade-in">
      <PageBanner
        title="Contact"
        crumbs={[
          { label: 'Home' },
          { label: 'Contact' },
        ]}
      />

      {/* Map */}
      <div className="w-full h-[400px] bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.76!3d9.02!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDEnMTIuMCJOIDM4wrA0NSczNi4wIkU!5e0!3m2!1sen!2set!4v1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="ADF Office Location"
        />
      </div>

      {/* Contact bar */}
      <section className="bg-[var(--adf-main)] py-12">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4 text-white">
            <span className="material-symbols-outlined text-3xl text-[var(--adf-gold)]">call</span>
            <div>
              <h3 className="font-bold text-lg">Call Us</h3>
              <p className="text-white/80 text-sm mt-1">+251 11 663 8210</p>
            </div>
          </div>
          <div className="flex items-start gap-4 text-white">
            <span className="material-symbols-outlined text-3xl text-[var(--adf-gold)]">mail</span>
            <div>
              <h3 className="font-bold text-lg">Email Us</h3>
              <p className="text-white/80 text-sm mt-1">info@adf-africa.org</p>
            </div>
          </div>
          <div className="flex items-start gap-4 text-white">
            <span className="material-symbols-outlined text-3xl text-[var(--adf-gold)]">location_on</span>
            <div>
              <h3 className="font-bold text-lg">Visit Us</h3>
              <p className="text-white/80 text-sm mt-1">Bole Sub-City, Woreda 03, Addis Ababa, Ethiopia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form */}
          <div className="lg:col-span-7 bg-white border border-black/10 p-8 shadow-sm adf-card">
            <h2 className="text-2xl font-bold text-[var(--adf-charcoal)] mb-2">
              Send Us a Direct Message
            </h2>
            <p className="text-sm text-[var(--adf-muted)] mb-6">
              We respond to inquiries within 2 business days. If you require accessible communication formats (e.g. sign language video call), please specify below.
            </p>

            {submitted ? (
              <div className="p-6 bg-green-50 border border-green-200 rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl text-green-600">check_circle</span>
                  <h3 className="text-lg font-bold text-green-800">Message Delivered Successfully!</h3>
                </div>
                <p className="text-sm text-green-700">
                  Thank you for reaching out to the African Disability Forum Secretariat. A representative from the relevant directorate will contact you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', organization: '', subject: 'General Inquiry', message: '', accessibilityRequirement: '' });
                  }}
                  className="mt-2 px-4 py-2 bg-[var(--adf-main)] text-white font-bold text-xs rounded-lg"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--adf-charcoal)] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Kwame Mensah"
                      className="w-full p-3 bg-[var(--adf-bg)] border border-black/10 rounded-lg text-sm text-[var(--adf-charcoal)] focus:outline-none focus:ring-2 focus:ring-[var(--adf-main)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--adf-charcoal)] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. kwame@organization.org"
                      className="w-full p-3 bg-[var(--adf-bg)] border border-black/10 rounded-lg text-sm text-[var(--adf-charcoal)] focus:outline-none focus:ring-2 focus:ring-[var(--adf-main)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--adf-charcoal)] mb-1">
                      Organization / OPD Name
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={e => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Ghana Federation of Disability Organisations"
                      className="w-full p-3 bg-[var(--adf-bg)] border border-black/10 rounded-lg text-sm text-[var(--adf-charcoal)] focus:outline-none focus:ring-2 focus:ring-[var(--adf-main)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--adf-charcoal)] mb-1">
                      Subject Area
                    </label>
                    <select
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full p-3 bg-[var(--adf-bg)] border border-black/10 rounded-lg text-sm text-[var(--adf-charcoal)] focus:outline-none focus:ring-2 focus:ring-[var(--adf-main)]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="OPD Membership Application">OPD Membership Application</option>
                      <option value="Policy Research & Publications">Policy Research & Publications</option>
                      <option value="Media & Press Inquiries">Media & Press Inquiries</option>
                      <option value="Donor & Partnership Proposals">Donor & Partnership Proposals</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--adf-charcoal)] mb-1">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can ADF assist your organization?"
                    className="w-full p-3 bg-[var(--adf-bg)] border border-black/10 rounded-lg text-sm text-[var(--adf-charcoal)] focus:outline-none focus:ring-2 focus:ring-[var(--adf-main)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--adf-main)] mb-1">
                    Accessibility Accommodation Requests (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.accessibilityRequirement}
                    onChange={e => setFormData({ ...formData, accessibilityRequirement: e.target.value })}
                    placeholder="e.g. Prefer reply in French Easy-Read, or request screen reader attachment"
                    className="w-full p-3 bg-[var(--adf-bg)] border border-black/10 rounded-lg text-sm text-[var(--adf-charcoal)] focus:outline-none focus:ring-2 focus:ring-[var(--adf-main)]"
                  />
                </div>

                <button
                  type="submit"
                  className="adf-btn adf-btn-secondary w-full focus-ring"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Offices */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[var(--adf-main)] text-white p-6 space-y-4 adf-card">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--adf-gold)]">location_city</span>
                <span>Continental Headquarters</span>
              </h3>
              <div className="text-sm text-white/80 space-y-1.5 leading-relaxed">
                <p className="font-bold text-white">Addis Ababa Secretariat</p>
                <p>Bole Sub-City, Woreda 03, House No. 482</p>
                <p>P.O. Box 1012, Addis Ababa, Ethiopia</p>
                <p><strong>Email:</strong> info@adf-africa.org</p>
                <p><strong>Phone:</strong> +251 11 663 8210</p>
              </div>
            </div>

            <div className="bg-[var(--adf-bg)] border border-black/10 p-6 space-y-4 adf-card">
              <h3 className="text-lg font-bold text-[var(--adf-charcoal)] flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--adf-main)]">hub</span>
                <span>Regional Hub Secretariats</span>
              </h3>
              <div className="divide-y divide-black/10 text-sm space-y-3 pt-1">
                <div className="pt-2">
                  <p className="font-bold text-[var(--adf-charcoal)]">East Africa Hub (Nairobi)</p>
                  <p className="text-[var(--adf-muted)]">UDPK Complex, Waiyaki Way, Nairobi, Kenya</p>
                  <p className="text-[var(--adf-muted)]">eastafrica@adf-africa.org</p>
                </div>
                <div className="pt-3">
                  <p className="font-bold text-[var(--adf-charcoal)]">West Africa Hub (Dakar)</p>
                  <p className="text-[var(--adf-muted)]">Sacré-Cœur 3, Villa 92, Dakar, Senegal</p>
                  <p className="text-[var(--adf-muted)]">westafrica@adf-africa.org</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
