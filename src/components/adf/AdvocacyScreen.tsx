import React, { useState, useMemo } from 'react';
import { EVENTS_DATA } from '@/data/mockData';
import { EventItem, NavTab } from '@/types';

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
    <div className="space-y-12 pb-16 animate-fade-in max-w-[1280px] mx-auto px-4 md:px-10">
      {/* Advocacy Banner */}
      <section className="bg-gradient-to-r from-[#002045] to-[#126e0c] text-white rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-block bg-[#9bf585] text-[#003900] font-bold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full">
            Advocacy & Action
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Mobilizing Pan-African Policy Change & Regional Awareness
          </h1>
          <p className="text-lg md:text-xl text-[#d6e3ff] leading-relaxed">
            Discover upcoming regional workshops, international summits, and awareness campaigns designed to advance disability rights and track UN CRPD domestication across African Union nations.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onOpenTakeAction}
              className="bg-[#9bf585] text-[#003900] hover:bg-[#83dd6d] font-bold px-6 py-3 rounded-lg shadow transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined">campaign</span>
              <span>Join Advocacy Network</span>
            </button>
            <button
              onClick={() => onNavigate('resources')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-lg border border-white/30 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined">description</span>
              <span>Policy Briefs</span>
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Event Calendar Component */}
      <section className="bg-white dark:bg-[#1a1c1c] border-2 border-[#c4c6cf] dark:border-[#74777f] rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#c4c6cf] dark:border-[#74777f] pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#126e0c] dark:text-[#9bf585] font-bold text-sm uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined">calendar_month</span>
              <span>Continental Calendar</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#002045] dark:text-[#d6e3ff]">
              Workshops, Conferences & Awareness Days
            </h2>
            <p className="text-sm md:text-base text-[#43474e] dark:text-[#c4c6cf] mt-1">
              Filter by event category, search location or keywords, and add key events directly to your calendar.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#f3f3f3] dark:bg-[#2f3131] p-1 rounded-lg flex border border-[#c4c6cf]">
              <button
                onClick={() => setActiveView('grid')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm font-bold transition-colors ${
                  activeView === 'grid'
                    ? 'bg-[#002045] text-white shadow-sm'
                    : 'text-[#43474e] dark:text-[#c4c6cf] hover:bg-[#e8e8e8]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">grid_view</span>
                <span>Cards</span>
              </button>
              <button
                onClick={() => setActiveView('list')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm font-bold transition-colors ${
                  activeView === 'list'
                    ? 'bg-[#002045] text-white shadow-sm'
                    : 'text-[#43474e] dark:text-[#c4c6cf] hover:bg-[#e8e8e8]'
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
          <div className="mb-6 p-4 bg-[#e8f5e9] border border-[#2e7d32] text-[#1b5e20] rounded-xl flex items-center justify-between animate-fade-in">
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
                    ? 'bg-[#126e0c] text-white shadow'
                    : 'bg-[#f3f3f3] dark:bg-[#2f3131] text-[#002045] dark:text-[#d6e3ff] border border-[#c4c6cf] hover:bg-[#e2e2e2]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Search bar & count */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-2">
            <div className="relative w-full sm:w-80">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#74777f]">search</span>
              <input
                type="text"
                placeholder="Search events, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#f9f9f9] dark:bg-[#2f3131] border border-[#c4c6cf] dark:border-[#74777f] rounded-lg text-sm text-[#1a1c1c] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#002045]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-[#74777f] hover:text-[#1a1c1c]"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="text-xs font-bold text-[#74777f] uppercase tracking-wider">
              Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
            </div>
          </div>
        </div>

        {/* Display Events */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-[#f9f9f9] dark:bg-[#2f3131] rounded-xl border border-dashed border-[#c4c6cf]">
            <span className="material-symbols-outlined text-4xl text-[#74777f]">event_busy</span>
            <p className="font-bold text-lg text-[#002045] dark:text-white mt-2">No matching events found</p>
            <p className="text-sm text-[#74777f]">Try adjusting your search criteria or category filter.</p>
            <button
              onClick={() => { setSelectedType('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-[#002045] text-white font-bold text-sm rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : activeView === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(evt => (
              <div
                key={evt.id}
                className="bg-[#f9f9f9] dark:bg-[#252828] border border-[#c4c6cf] dark:border-[#74777f] rounded-xl p-5 flex flex-col justify-between hover:border-[#002045] dark:hover:border-[#9bf585] transition-all shadow-sm hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <span className="inline-block bg-[#002045] text-white text-xs font-extrabold px-3 py-1 rounded-full">
                      {evt.type}
                    </span>
                    {evt.isVirtual && (
                      <span className="inline-flex items-center gap-1 bg-[#e8f5e9] text-[#1b5e20] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#a5d6a7]">
                        <span className="material-symbols-outlined text-xs">videocam</span> Virtual
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[#002045] dark:text-white leading-snug">
                    {evt.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-[#43474e] dark:text-[#c4c6cf]">
                    <div className="flex items-center gap-2 font-semibold">
                      <span className="material-symbols-outlined text-base text-[#126e0c]">event</span>
                      <span>{evt.date} • {evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-[#126e0c]">location_on</span>
                      <span>{evt.location} ({evt.country})</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#1a1c1c] dark:text-[#e2e2e2] line-clamp-3 leading-relaxed pt-1">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#e2e2e2] dark:border-[#3a3d3d] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedEvent(evt)}
                    className="text-xs font-bold text-[#002045] dark:text-[#86a0cd] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Details</span>
                    <span className="material-symbols-outlined text-xs">info</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAddToCalendar(evt)}
                      title="Add to Google Calendar"
                      className="p-1.5 text-[#002045] dark:text-white bg-[#e2e2e2] dark:bg-[#3a3d3d] hover:bg-[#d0d0d0] rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">calendar_add_on</span>
                    </button>
                    <button
                      onClick={() => handleRegister(evt)}
                      className="px-3 py-1.5 bg-[#126e0c] hover:bg-[#005300] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-[#c4c6cf] dark:divide-[#74777f]">
            {filteredEvents.map(evt => (
              <div key={evt.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#002045] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {evt.type}
                    </span>
                    <span className="text-xs font-bold text-[#126e0c]">{evt.date} ({evt.time})</span>
                  </div>
                  <h3 className="text-base font-bold text-[#002045] dark:text-white">{evt.title}</h3>
                  <p className="text-xs text-[#74777f]">{evt.location} — {evt.targetAudience}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedEvent(evt)}
                    className="px-3 py-1.5 border border-[#002045] text-[#002045] dark:text-white text-xs font-bold rounded-lg"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleAddToCalendar(evt)}
                    className="px-3 py-1.5 bg-[#e2e2e2] dark:bg-[#2f3131] text-[#002045] dark:text-white text-xs font-bold rounded-lg"
                  >
                    + Calendar
                  </button>
                  <button
                    onClick={() => handleRegister(evt)}
                    className="px-4 py-1.5 bg-[#126e0c] text-white text-xs font-bold rounded-lg"
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
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#002045]">
          Flagship Advocacy Initiatives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#f9f9f9] border border-[#74777f] rounded-xl p-6 space-y-4">
            <div className="w-12 h-12 bg-[#002045] text-white rounded-xl flex items-center justify-center font-bold text-xl">
              01
            </div>
            <h3 className="text-xl font-bold text-[#002045]">African Disability Protocol Ratification</h3>
            <p className="text-sm text-[#43474e] leading-relaxed">
              Advocating for state parties to sign, ratify, and domesticate the Protocol to the African Charter on Human and Peoples’ Rights on the Rights of Persons with Disabilities.
            </p>
            <button
              onClick={() => onNavigate('resources')}
              className="text-xs font-bold text-[#126e0c] hover:underline flex items-center gap-1"
            >
              <span>Download Domestication Toolkit</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="bg-[#f9f9f9] border border-[#74777f] rounded-xl p-6 space-y-4">
            <div className="w-12 h-12 bg-[#126e0c] text-white rounded-xl flex items-center justify-center font-bold text-xl">
              02
            </div>
            <h3 className="text-xl font-bold text-[#002045]">UN CRPD Shadow Reporting</h3>
            <p className="text-sm text-[#43474e] leading-relaxed">
              Equipping national Organizations of Persons with Disabilities (OPDs) with methodologies to gather empirical evidence and submit shadow reports to the UN CRPD Committee in Geneva.
            </p>
            <button
              onClick={() => onNavigate('resources')}
              className="text-xs font-bold text-[#126e0c] hover:underline flex items-center gap-1"
            >
              <span>Access Shadow Report Guides</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="bg-[#f9f9f9] border border-[#74777f] rounded-xl p-6 space-y-4">
            <div className="w-12 h-12 bg-[#1a365d] text-white rounded-xl flex items-center justify-center font-bold text-xl">
              03
            </div>
            <h3 className="text-xl font-bold text-[#002045]">Intersectional Inclusion</h3>
            <p className="text-sm text-[#43474e] leading-relaxed">
              Building targeted policy agendas for women, youth, and indigenous Africans with disabilities to ensure no marginalized sub-group is left behind.
            </p>
            <button
              onClick={onOpenTakeAction}
              className="text-xs font-bold text-[#126e0c] hover:underline flex items-center gap-1"
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
          <div className="bg-white dark:bg-[#252828] rounded-xl max-w-xl w-full p-6 border-2 border-[#002045] shadow-2xl relative space-y-4">
            <div className="flex justify-between items-start border-b border-[#c4c6cf] pb-3">
              <div>
                <span className="bg-[#002045] text-white text-xs font-bold px-2.5 py-0.5 rounded">
                  {selectedEvent.type}
                </span>
                <h3 className="text-2xl font-extrabold text-[#002045] dark:text-white mt-2">
                  {selectedEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 text-[#43474e] dark:text-[#c4c6cf] hover:bg-[#e8e8e8] rounded-full"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-2 text-sm text-[#1a1c1c] dark:text-[#e2e2e2]">
              <p><strong>Date & Time:</strong> {selectedEvent.date} ({selectedEvent.time})</p>
              <p><strong>Location:</strong> {selectedEvent.location}, {selectedEvent.country}</p>
              <p><strong>Target Audience:</strong> {selectedEvent.targetAudience}</p>
              <p className="pt-2 text-base leading-relaxed">{selectedEvent.description}</p>
            </div>

            <div className="pt-4 border-t border-[#c4c6cf] flex justify-end gap-3">
              <button
                onClick={() => handleAddToCalendar(selectedEvent)}
                className="px-4 py-2 bg-[#e2e2e2] text-[#002045] font-bold text-sm rounded-lg flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-base">calendar_add_on</span>
                <span>Add to Calendar</span>
              </button>
              <button
                onClick={() => {
                  handleRegister(selectedEvent);
                  setSelectedEvent(null);
                }}
                className="px-5 py-2 bg-[#126e0c] text-white font-bold text-sm rounded-lg"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
