import React, { useState, useMemo } from 'react';
import { EVENTS_DATA } from '@/data/mockData';
import { EventItem, NavTab } from '@/types';
import { assetUrl } from '@/lib/assetUrl';
import { PageBanner } from './ui';

interface Props {
  onNavigate: (tab: NavTab) => void;
  onOpenTakeAction: () => void;
}

export const AdvocacyScreen: React.FC<Props> = ({ onNavigate, onOpenTakeAction }) => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [calendarMonth, setCalendarMonth] = useState<string>('2025-06');
  const [registeredSuccess, setRegisteredSuccess] = useState<string | null>(null);

  const eventTypes = ['All', 'Workshop', 'Conference', 'International Awareness Day', 'Summit', 'Webinar'];

  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter(evt => {
      const matchesType = selectedType === 'All' || evt.type === selectedType;
      const matchesQuery = searchQuery === '' ||
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.country.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesQuery;
    });
  }, [selectedType, searchQuery]);

  const handleAddToCalendar = (evt: EventItem) => {
    const title = encodeURIComponent(evt.title);
    const details = encodeURIComponent(`${evt.description}\n\nLocation: ${evt.location}\nTarget Audience: ${evt.targetAudience}`);
    const location = encodeURIComponent(evt.location);
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank', 'noopener,noreferrer');
  };

  const handleRegister = (evt: EventItem) => {
    setRegisteredSuccess(evt.title);
    setTimeout(() => setRegisteredSuccess(null), 4000);
  };

  return (
    <div className="animate-fade-in">
      <PageBanner
        title="Advocacy & Action"
        crumbs={[{ label: "Home" }, { label: "Advocacy" }]}
        image={assetUrl("/images/adf-event-3.jpg")}
        imageAlt="Pan-African disability rights advocacy"
      />

      <div className="space-y-12 pb-16 max-w-[1280px] mx-auto px-4 md:px-10">

      {/* Dynamic Event Calendar Component */}
      <section className="bg-white dark:bg-[#0a1128] border-2 border-[#c4c6cf] dark:border-[#5b6b85] rounded-none p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#c4c6cf] dark:border-[#5b6b85] pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#245a86] dark:text-[#a8c6e4] font-bold text-sm uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined">calendar_month</span>
              <span>Continental Calendar</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f1b3d] dark:text-[#dbe6f2]">
              Workshops, Conferences & Awareness Days
            </h2>
            <p className="text-sm md:text-base text-[#33415c] dark:text-[#c4c6cf] mt-1">
              Filter by event category, search location or keywords, and add key events directly to your calendar.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#e8edf3] dark:bg-[#152a4a] p-1 rounded-none flex border border-[#c4c6cf]">
              <button
                onClick={() => setActiveView('grid')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm font-bold transition-colors ${
                  activeView === 'grid'
                    ? 'bg-[#0f1b3d] text-white shadow-sm'
                    : 'text-[#33415c] dark:text-[#c4c6cf] hover:bg-[#e8edf3]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">grid_view</span>
                <span>Cards</span>
              </button>
              <button
                onClick={() => setActiveView('list')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm font-bold transition-colors ${
                  activeView === 'list'
                    ? 'bg-[#0f1b3d] text-white shadow-sm'
                    : 'text-[#33415c] dark:text-[#c4c6cf] hover:bg-[#e8edf3]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">view_list</span>
                <span>List View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Success Alert Banner */}
        {registeredSuccess && (
          <div className="mb-6 p-4 bg-[#e8edf3] border border-[#245a86] text-[#0f1b3d] rounded-none flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">check_circle</span>
              <span className="font-bold">You are registered for: {registeredSuccess}! Instructions sent to your email.</span>
            </div>
            <button onClick={() => setRegisteredSuccess(null)} className="text-sm font-bold underline">Dismiss</button>
          </div>
        )}

        {/* Filter Controls */}
        <div className="space-y-4 mb-8">
          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            {eventTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full font-bold text-xs md:text-sm transition-all cursor-pointer ${
                  selectedType === type
                    ? 'bg-[#245a86] text-white shadow'
                    : 'bg-[#e8edf3] dark:bg-[#152a4a] text-[#0f1b3d] dark:text-[#dbe6f2] border border-[#c4c6cf] hover:bg-[#e8edf3]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Search bar & count */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-2">
            <div className="relative w-full sm:w-80">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#5b6b85]">search</span>
              <input
                type="text"
                placeholder="Search events, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#f4f7fa] dark:bg-[#152a4a] border border-[#c4c6cf] dark:border-[#5b6b85] rounded-none text-sm text-[#0a1128] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0f1b3d]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-[#5b6b85] hover:text-[#0a1128]"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="text-xs font-bold text-[#5b6b85] uppercase tracking-wider">
              Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
            </div>
          </div>
        </div>

        {/* Display Events */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-[#f4f7fa] dark:bg-[#152a4a] rounded-none border border-dashed border-[#c4c6cf]">
            <span className="material-symbols-outlined text-4xl text-[#5b6b85]">event_busy</span>
            <p className="font-bold text-lg text-[#0f1b3d] dark:text-white mt-2">No matching events found</p>
            <p className="text-sm text-[#5b6b85]">Try adjusting your search criteria or category filter.</p>
            <button
              onClick={() => { setSelectedType('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-[#0f1b3d] text-white font-bold text-sm rounded-none"
            >
              Reset Filters
            </button>
          </div>
        ) : activeView === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(evt => (
              <div
                key={evt.id}
                className="bg-[#f4f7fa] dark:bg-[#0f1b3d] border border-[#c4c6cf] dark:border-[#5b6b85] rounded-none p-5 flex flex-col justify-between hover:border-[#0f1b3d] dark:hover:border-[#a8c6e4] transition-all shadow-sm hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <span className="inline-block bg-[#0f1b3d] text-white text-xs font-extrabold px-3 py-1 rounded-full">
                      {evt.type}
                    </span>
                    {evt.isVirtual && (
                      <span className="inline-flex items-center gap-1 bg-[#e8edf3] text-[#0f1b3d] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#b7cbe0]">
                        <span className="material-symbols-outlined text-xs">videocam</span> Virtual
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[#0f1b3d] dark:text-white leading-snug">
                    {evt.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-[#33415c] dark:text-[#c4c6cf]">
                    <div className="flex items-center gap-2 font-semibold">
                      <span className="material-symbols-outlined text-base text-[#245a86]">event</span>
                      <span>{evt.date} • {evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-[#245a86]">location_on</span>
                      <span>{evt.location} ({evt.country})</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#0a1128] dark:text-[#e8edf3] line-clamp-3 leading-relaxed pt-1">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#e8edf3] dark:border-[#1e3a5f] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedEvent(evt)}
                    className="text-xs font-bold text-[#0f1b3d] dark:text-[#b7cbe0] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Details</span>
                    <span className="material-symbols-outlined text-xs">info</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAddToCalendar(evt)}
                      title="Add to Google Calendar"
                      className="p-1.5 text-[#0f1b3d] dark:text-white bg-[#e8edf3] dark:bg-[#1e3a5f] hover:bg-[#cfe0f0] rounded-none text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">calendar_add_on</span>
                    </button>
                    <button
                      onClick={() => handleRegister(evt)}
                      className="px-3 py-1.5 bg-[#245a86] hover:bg-[#0f1b3d] text-white text-xs font-bold rounded-none cursor-pointer transition-colors shadow-sm"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-[#c4c6cf] dark:divide-[#5b6b85]">
            {filteredEvents.map(evt => (
              <div key={evt.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#0f1b3d] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {evt.type}
                    </span>
                    <span className="text-xs font-bold text-[#245a86]">{evt.date} ({evt.time})</span>
                  </div>
                  <h3 className="text-base font-bold text-[#0f1b3d] dark:text-white">{evt.title}</h3>
                  <p className="text-xs text-[#5b6b85]">{evt.location} — {evt.targetAudience}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedEvent(evt)}
                    className="px-3 py-1.5 border border-[#0f1b3d] text-[#0f1b3d] dark:text-white text-xs font-bold rounded-none"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleAddToCalendar(evt)}
                    className="px-3 py-1.5 bg-[#e8edf3] dark:bg-[#152a4a] text-[#0f1b3d] dark:text-white text-xs font-bold rounded-none"
                  >
                    + Calendar
                  </button>
                  <button
                    onClick={() => handleRegister(evt)}
                    className="px-4 py-1.5 bg-[#245a86] text-white text-xs font-bold rounded-none"
                  >
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Flagship Policy Frameworks */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f1b3d]">
          Flagship Advocacy Initiatives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#f4f7fa] border border-[#5b6b85] rounded-none p-6 space-y-4">
            <div className="w-12 h-12 bg-[#0f1b3d] text-white rounded-none flex items-center justify-center font-bold text-xl">
              01
            </div>
            <h3 className="text-xl font-bold text-[#0f1b3d]">African Disability Protocol Ratification</h3>
            <p className="text-sm text-[#33415c] leading-relaxed">
              Advocating for state parties to sign, ratify, and domesticate the Protocol to the African Charter on Human and Peoples’ Rights on the Rights of Persons with Disabilities.
            </p>
            <button
              onClick={() => onNavigate('resources')}
              className="text-xs font-bold text-[#245a86] hover:underline flex items-center gap-1"
            >
              <span>Download Domestication Toolkit</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="bg-[#f4f7fa] border border-[#5b6b85] rounded-none p-6 space-y-4">
            <div className="w-12 h-12 bg-[#245a86] text-white rounded-none flex items-center justify-center font-bold text-xl">
              02
            </div>
            <h3 className="text-xl font-bold text-[#0f1b3d]">UN CRPD Shadow Reporting</h3>
            <p className="text-sm text-[#33415c] leading-relaxed">
              Equipping national Organizations of Persons with Disabilities (OPDs) with methodologies to gather empirical evidence and submit shadow reports to the UN CRPD Committee in Geneva.
            </p>
            <button
              onClick={() => onNavigate('resources')}
              className="text-xs font-bold text-[#245a86] hover:underline flex items-center gap-1"
            >
              <span>Access Shadow Report Guides</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="bg-[#f4f7fa] border border-[#5b6b85] rounded-none p-6 space-y-4">
            <div className="w-12 h-12 bg-[#1e3a5f] text-white rounded-none flex items-center justify-center font-bold text-xl">
              03
            </div>
            <h3 className="text-xl font-bold text-[#0f1b3d]">Intersectional Inclusion</h3>
            <p className="text-sm text-[#33415c] leading-relaxed">
              Building targeted policy agendas for women, youth, and indigenous Africans with disabilities to ensure no marginalized sub-group is left behind.
            </p>
            <button
              onClick={onOpenTakeAction}
              className="text-xs font-bold text-[#245a86] hover:underline flex items-center gap-1"
            >
              <span>Get Involved</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-[#0f1b3d] rounded-none max-w-xl w-full p-6 border-2 border-[#0f1b3d] shadow-lg relative space-y-4">
            <div className="flex justify-between items-start border-b border-[#c4c6cf] pb-3">
              <div>
                <span className="bg-[#0f1b3d] text-white text-xs font-bold px-2.5 py-0.5 rounded">
                  {selectedEvent.type}
                </span>
                <h3 className="text-2xl font-extrabold text-[#0f1b3d] dark:text-white mt-2">
                  {selectedEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 text-[#33415c] dark:text-[#c4c6cf] hover:bg-[#e8edf3] rounded-full"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-2 text-sm text-[#0a1128] dark:text-[#e8edf3]">
              <p><strong>Date & Time:</strong> {selectedEvent.date} ({selectedEvent.time})</p>
              <p><strong>Location:</strong> {selectedEvent.location}, {selectedEvent.country}</p>
              <p><strong>Target Audience:</strong> {selectedEvent.targetAudience}</p>
              <p className="pt-2 text-base leading-relaxed">{selectedEvent.description}</p>
            </div>

            <div className="pt-4 border-t border-[#c4c6cf] flex justify-end gap-3">
              <button
                onClick={() => handleAddToCalendar(selectedEvent)}
                className="px-4 py-2 bg-[#e8edf3] text-[#0f1b3d] font-bold text-sm rounded-none flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-base">calendar_add_on</span>
                <span>Add to Calendar</span>
              </button>
              <button
                onClick={() => {
                  handleRegister(selectedEvent);
                  setSelectedEvent(null);
                }}
                className="px-5 py-2 bg-[#245a86] text-white font-bold text-sm rounded-none"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
