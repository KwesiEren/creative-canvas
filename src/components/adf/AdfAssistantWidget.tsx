import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, NavTab } from '@/types';

interface Props {
  onNavigate: (tab: NavTab) => void;
  currentTab: NavTab;
  onOpenSettings: () => void;
}

export const AdfAssistantWidget: React.FC<Props> = ({ onNavigate, currentTab, onOpenSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTabMode, setActiveTabMode] = useState<'chat' | 'quickLinks'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'Hello! I am the ADF AI Assistant. How can I assist you today regarding disability rights, African Disability Protocol, or member OPD resources?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && activeTabMode === 'chat') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, activeTabMode]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });
      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.text || 'The African Disability Forum unifies OPDs across 40+ African nations to ensure full rights and inclusion.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'African Disability Forum (ADF) works to advocate for the African Disability Protocol domestication and UN CRPD implementation.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickTopic = (topic: string) => {
    setInput(topic);
    handleSend(topic);
  };

  return (
    <div className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-50">
      {!isOpen ? (
        /* Floating Toggle Button */
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open ADF Assistant dialog"
          className="bg-[#002045] hover:bg-[#1a365d] text-white p-3 sm:p-3.5 rounded-full shadow-2xl border-2 border-[#9bf585] flex items-center gap-2.5 transition-all duration-200 hover:scale-105 cursor-pointer focus-ring"
        >
          <div className="w-8 h-8 rounded-full bg-[#126e0c] flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-xl">smart_toy</span>
          </div>
          <span className="font-extrabold text-xs sm:text-sm tracking-wide pr-1">ADF Assistant</span>
        </button>
      ) : (
        /* Expanded Dialog Window */
        <div className="w-[340px] sm:w-[380px] bg-white dark:bg-[#1a1c1c] border-2 border-[#002045] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in max-h-[85vh]">
          {/* Dialog Header */}
          <div className="p-4 bg-[#002045] text-white flex items-center justify-between border-b-2 border-[#126e0c]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#126e0c] text-white flex items-center justify-center shadow">
                <span className="material-symbols-outlined text-xl">smart_toy</span>
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-white leading-tight">
                  ADF Assistant
                </h3>
                <p className="text-[10px] text-[#9bf585] font-semibold">
                  Pan-African Rights & Info Bot
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-[#d6e3ff] hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close assistant dialog"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-[#c4c6cf] dark:border-[#3a3d3d] bg-[#f9f9f9] dark:bg-[#252828] text-xs font-bold">
            <button
              onClick={() => setActiveTabMode('chat')}
              className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                activeTabMode === 'chat'
                  ? 'border-[#126e0c] text-[#126e0c] dark:text-[#9bf585] bg-white dark:bg-[#1a1c1c]'
                  : 'border-transparent text-[#74777f] hover:text-[#002045]'
              }`}
            >
              <span className="material-symbols-outlined text-base">chat</span>
              <span>AI Chat</span>
            </button>
            <button
              onClick={() => setActiveTabMode('quickLinks')}
              className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                activeTabMode === 'quickLinks'
                  ? 'border-[#126e0c] text-[#126e0c] dark:text-[#9bf585] bg-white dark:bg-[#1a1c1c]'
                  : 'border-transparent text-[#74777f] hover:text-[#002045]'
              }`}
            >
              <span className="material-symbols-outlined text-base">explore</span>
              <span>Context & Links</span>
            </button>
          </div>

          {/* Dialog Body */}
          {activeTabMode === 'chat' ? (
            <div className="flex flex-col h-[360px] bg-white dark:bg-[#1a1c1c]">
              {/* Message List */}
              <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`p-3 rounded-2xl max-w-[88%] font-medium leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-[#002045] text-white rounded-br-none shadow-sm'
                          : 'bg-[#f3f3f3] text-[#1a1c1c] dark:bg-[#2f3131] dark:text-[#f9f9f9] border border-[#c4c6cf] dark:border-[#43474e] rounded-bl-none shadow-sm'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[10px] text-[#74777f] mt-1 px-1">{m.timestamp}</span>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-2 text-xs text-[#126e0c] font-bold italic p-2 bg-[#e8f5e9] rounded-lg border border-[#a5d6a7]">
                    <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                    <span>Assistant is researching...</span>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Quick Topic Chips */}
              <div className="px-3 py-1.5 bg-[#f3f3f3] dark:bg-[#2f3131] border-t border-[#c4c6cf] dark:border-[#3a3d3d] flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
                <button
                  onClick={() => handleQuickTopic('How can an OPD join ADF?')}
                  className="px-2.5 py-1 bg-white dark:bg-[#1a1c1c] border border-[#c4c6cf] rounded-full text-[#002045] dark:text-white font-bold hover:bg-[#e8e8e8] transition-colors cursor-pointer"
                >
                  Join ADF
                </button>
                <button
                  onClick={() => handleQuickTopic('What is the African Disability Protocol?')}
                  className="px-2.5 py-1 bg-white dark:bg-[#1a1c1c] border border-[#c4c6cf] rounded-full text-[#002045] dark:text-white font-bold hover:bg-[#e8e8e8] transition-colors cursor-pointer"
                >
                  African Disability Protocol
                </button>
                <button
                  onClick={() => handleQuickTopic('Show upcoming workshops and events')}
                  className="px-2.5 py-1 bg-white dark:bg-[#1a1c1c] border border-[#c4c6cf] rounded-full text-[#002045] dark:text-white font-bold hover:bg-[#e8e8e8] transition-colors cursor-pointer"
                >
                  Events
                </button>
              </div>

              {/* Chat Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-2.5 border-t border-[#c4c6cf] dark:border-[#3a3d3d] flex gap-2 bg-[#f9f9f9] dark:bg-[#1a1c1c]"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question or request information..."
                  className="flex-1 px-3 py-2 border border-[#74777f] rounded-xl text-xs bg-white dark:bg-[#2f3131] text-[#1a1c1c] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#002045]"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="px-4 py-2 bg-[#126e0c] hover:bg-[#005300] text-white rounded-xl font-bold text-xs disabled:opacity-40 transition-colors shadow-sm cursor-pointer"
                >
                  Send
                </button>
              </form>
            </div>
          ) : (
            /* Quick Links / Navigation Context Mode */
            <div className="p-4 space-y-3 bg-white dark:bg-[#1a1c1c] h-[360px] overflow-y-auto text-xs">
              <p className="text-[#74777f] font-semibold">
                Select a section to jump directly or choose a topic context:
              </p>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    onNavigate('home');
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-colors cursor-pointer ${
                    currentTab === 'home'
                      ? 'bg-[#e8f5e9] border-[#126e0c] text-[#003900] font-bold'
                      : 'border-[#c4c6cf] dark:border-[#43474e] hover:bg-[#f3f3f3] dark:hover:bg-[#2f3131]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-[#126e0c]">home</span>
                    <span>Home Overview</span>
                  </div>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('about');
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-colors cursor-pointer ${
                    currentTab === 'about'
                      ? 'bg-[#e8f5e9] border-[#126e0c] text-[#003900] font-bold'
                      : 'border-[#c4c6cf] dark:border-[#43474e] hover:bg-[#f3f3f3] dark:hover:bg-[#2f3131]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-[#126e0c]">groups</span>
                    <span>About & OPD Governance</span>
                  </div>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('programmes');
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-colors cursor-pointer ${
                    currentTab === 'programmes'
                      ? 'bg-[#e8f5e9] border-[#126e0c] text-[#003900] font-bold'
                      : 'border-[#c4c6cf] dark:border-[#43474e] hover:bg-[#f3f3f3] dark:hover:bg-[#2f3131]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-[#126e0c]">flag</span>
                    <span>Flagship Programmes (SPADRA, We Can Work)</span>
                  </div>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('resources');
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-colors cursor-pointer ${
                    currentTab === 'resources'
                      ? 'bg-[#e8f5e9] border-[#126e0c] text-[#003900] font-bold'
                      : 'border-[#c4c6cf] dark:border-[#43474e] hover:bg-[#f3f3f3] dark:hover:bg-[#2f3131]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-[#126e0c]">folder</span>
                    <span>Publications & Policy Repository</span>
                  </div>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('advocacy');
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-colors cursor-pointer ${
                    currentTab === 'advocacy'
                      ? 'bg-[#e8f5e9] border-[#126e0c] text-[#003900] font-bold'
                      : 'border-[#c4c6cf] dark:border-[#43474e] hover:bg-[#f3f3f3] dark:hover:bg-[#2f3131]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-[#126e0c]">event</span>
                    <span>Events & Advocacy Workshops</span>
                  </div>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>

                <button
                  onClick={() => {
                    onOpenSettings();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[#c4c6cf] dark:border-[#43474e] hover:bg-[#f3f3f3] dark:hover:bg-[#2f3131] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-[#126e0c]">settings_accessibility</span>
                    <span>Accessibility Options</span>
                  </div>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
