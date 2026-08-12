import React, { useState } from 'react';

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
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-10 space-y-12 animate-fade-in">
      {/* Header */}
      <div className="bg-white/95 dark:bg-[#1a1c1c]/95 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl border border-white/80">
        <span className="text-xs font-bold uppercase tracking-wider text-[#126e0c] dark:text-[#9bf585]">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#002045] dark:text-[#d6e3ff] mt-1">
          Contact the African Disability Forum
        </h1>
        <p className="text-[#43474e] dark:text-[#c4c6cf] text-base md:text-lg max-w-3xl leading-relaxed mt-2">
          Connect with our continental headquarters in Addis Ababa or our regional hub offices in Nairobi and Dakar for partnership, media, research, or membership queries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form Column */}
        <div className="lg:col-span-7 bg-white dark:bg-[#1a1c1c] border-2 border-[#002045] rounded-2xl p-6 md:p-8 shadow-md">
          <h2 className="text-2xl font-bold text-[#002045] dark:text-white mb-2">
            Send Us a Direct Message
          </h2>
          <p className="text-xs text-[#74777f] mb-6">
            We respond to inquiries within 2 business days. If you require accessible communication formats (e.g. sign language video call), please specify below.
          </p>

          {submitted ? (
            <div className="p-6 bg-[#e8f5e9] border border-[#2e7d32] text-[#1b5e20] rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-2xl">check_circle</span>
                <h3 className="text-lg font-bold">Message Delivered Successfully!</h3>
              </div>
              <p className="text-sm">
                Thank you for reaching out to the African Disability Forum Secretariat. A representative from the relevant directorate will contact you shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', organization: '', subject: 'General Inquiry', message: '', accessibilityRequirement: '' });
                }}
                className="mt-2 px-4 py-2 bg-[#1b5e20] text-white font-bold text-xs rounded-lg"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#002045] dark:text-[#d6e3ff] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Kwame Mensah"
                    className="w-full p-2.5 bg-[#f9f9f9] dark:bg-[#2f3131] border border-[#c4c6cf] rounded-lg text-sm text-[#1a1c1c] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#002045] dark:text-[#d6e3ff] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. kwame@organization.org"
                    className="w-full p-2.5 bg-[#f9f9f9] dark:bg-[#2f3131] border border-[#c4c6cf] rounded-lg text-sm text-[#1a1c1c] dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#002045] dark:text-[#d6e3ff] mb-1">
                    Organization / OPD Name
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={e => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Ghana Federation of Disability Organisations"
                    className="w-full p-2.5 bg-[#f9f9f9] dark:bg-[#2f3131] border border-[#c4c6cf] rounded-lg text-sm text-[#1a1c1c] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#002045] dark:text-[#d6e3ff] mb-1">
                    Subject Area
                  </label>
                  <select
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-2.5 bg-[#f9f9f9] dark:bg-[#2f3131] border border-[#c4c6cf] rounded-lg text-sm text-[#1a1c1c] dark:text-white"
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
                <label className="block text-xs font-bold text-[#002045] dark:text-[#d6e3ff] mb-1">
                  Message Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can ADF assist your organization?"
                  className="w-full p-2.5 bg-[#f9f9f9] dark:bg-[#2f3131] border border-[#c4c6cf] rounded-lg text-sm text-[#1a1c1c] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#126e0c] dark:text-[#9bf585] mb-1">
                  Accessibility Accommodation Requests (Optional)
                </label>
                <input
                  type="text"
                  value={formData.accessibilityRequirement}
                  onChange={e => setFormData({ ...formData, accessibilityRequirement: e.target.value })}
                  placeholder="e.g. Prefer reply in French Easy-Read, or request screen reader attachment"
                  className="w-full p-2.5 bg-[#f9f9f9] dark:bg-[#2f3131] border border-[#c4c6cf] rounded-lg text-sm text-[#1a1c1c] dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#126e0c] hover:bg-[#005300] text-white font-bold rounded-lg transition-colors cursor-pointer text-sm shadow"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Regional Offices Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#002045] text-white rounded-2xl p-6 space-y-4 shadow-md">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[#9bf585]">location_city</span>
              <span>Continental Headquarters</span>
            </h3>
            <div className="text-xs text-[#d6e3ff] space-y-1.5 leading-relaxed">
              <p className="font-bold text-white text-sm">Addis Ababa Secretariat</p>
              <p>Bole Sub-City, Woreda 03, House No. 482</p>
              <p>P.O. Box 1012, Addis Ababa, Ethiopia</p>
              <p><strong>Email:</strong> info@adf-africa.org</p>
              <p><strong>Phone:</strong> +251 11 663 8210</p>
            </div>
          </div>

          <div className="bg-[#f3f3f3] dark:bg-[#2f3131] border border-[#c4c6cf] rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#002045] dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#126e0c]">hub</span>
              <span>Regional Hub Secretariats</span>
            </h3>
            <div className="divide-y divide-[#c4c6cf] dark:divide-[#43474e] text-xs space-y-3 pt-1">
              <div className="pt-2">
                <p className="font-bold text-[#002045] dark:text-[#d6e3ff]">East Africa Hub (Nairobi)</p>
                <p className="text-[#43474e] dark:text-[#c4c6cf]">UDPK Complex, Waiyaki Way, Nairobi, Kenya</p>
                <p className="text-[#74777f]">eastafrica@adf-africa.org</p>
              </div>
              <div className="pt-3">
                <p className="font-bold text-[#002045] dark:text-[#d6e3ff]">West Africa Hub (Dakar)</p>
                <p className="text-[#43474e] dark:text-[#c4c6cf]">Sacré-Cœur 3, Villa 92, Dakar, Senegal</p>
                <p className="text-[#74777f]">westafrica@adf-africa.org</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
