import React from 'react';
import { AccessibilitySettings } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
}

export const AccessibilityModal: React.FC<Props> = ({ isOpen, onClose, settings, onUpdateSettings }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fade-in">
      <div className="bg-white dark:bg-[#1a1c1c] text-[#1a1c1c] dark:text-[#f9f9f9] rounded-xl max-w-md w-full p-6 border-2 border-[#74777f] shadow-2xl relative">
        <div className="flex justify-between items-center mb-6 border-b border-[#c4c6cf] pb-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#002045] dark:text-[#d6e3ff] text-2xl">settings_accessibility</span>
            <h2 className="text-xl font-bold text-[#002045] dark:text-[#d6e3ff]">Accessibility Preferences</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[#43474e] hover:bg-[#e8e8e8] dark:hover:bg-[#2f3131] rounded-full focus-ring"
            aria-label="Close settings"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-5">
          {/* Text Size */}
          <div>
            <label className="block text-sm font-bold text-[#1a1c1c] dark:text-[#f9f9f9] mb-2">Text Scale</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onUpdateSettings({ fontSize: 'normal' })}
                className={`py-2 px-3 rounded border-2 font-bold text-sm ${
                  settings.fontSize === 'normal'
                    ? 'border-[#002045] bg-[#002045] text-white'
                    : 'border-[#c4c6cf] hover:bg-[#f3f3f3] text-[#1a1c1c] dark:text-[#f9f9f9]'
                }`}
              >
                Standard (100%)
              </button>
              <button
                onClick={() => onUpdateSettings({ fontSize: 'large' })}
                className={`py-2 px-3 rounded border-2 font-bold text-base ${
                  settings.fontSize === 'large'
                    ? 'border-[#002045] bg-[#002045] text-white'
                    : 'border-[#c4c6cf] hover:bg-[#f3f3f3] text-[#1a1c1c] dark:text-[#f9f9f9]'
                }`}
              >
                Large (115%)
              </button>
              <button
                onClick={() => onUpdateSettings({ fontSize: 'xlarge' })}
                className={`py-2 px-3 rounded border-2 font-bold text-lg ${
                  settings.fontSize === 'xlarge'
                    ? 'border-[#002045] bg-[#002045] text-white'
                    : 'border-[#c4c6cf] hover:bg-[#f3f3f3] text-[#1a1c1c] dark:text-[#f9f9f9]'
                }`}
              >
                Extra (130%)
              </button>
            </div>
          </div>

          {/* High Contrast Mode */}
          <div className="flex items-center justify-between p-3 bg-[#f3f3f3] dark:bg-[#2f3131] rounded-lg">
            <div>
              <span className="font-bold block text-sm">High Contrast Theme</span>
              <span className="text-xs text-[#43474e] dark:text-[#c4c6cf]">Enhance visual boundary contrast</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ highContrast: !settings.highContrast })}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.highContrast ? 'bg-[#126e0c] justify-end' : 'bg-[#c4c6cf] justify-start'
              }`}
              aria-label="Toggle High Contrast"
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-md block" />
            </button>
          </div>

          {/* Dyslexia-Friendly Font */}
          <div className="flex items-center justify-between p-3 bg-[#f3f3f3] dark:bg-[#2f3131] rounded-lg">
            <div>
              <span className="font-bold block text-sm">Dyslexia-Friendly Spacing</span>
              <span className="text-xs text-[#43474e] dark:text-[#c4c6cf]">Increase letter and line tracking</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ dyslexicFont: !settings.dyslexicFont })}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.dyslexicFont ? 'bg-[#126e0c] justify-end' : 'bg-[#c4c6cf] justify-start'
              }`}
              aria-label="Toggle Dyslexia Spacing"
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-md block" />
            </button>
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between p-3 bg-[#f3f3f3] dark:bg-[#2f3131] rounded-lg">
            <div>
              <span className="font-bold block text-sm">Reduce Motion</span>
              <span className="text-xs text-[#43474e] dark:text-[#c4c6cf]">Disable page transition effects</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ reducedMotion: !settings.reducedMotion })}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.reducedMotion ? 'bg-[#126e0c] justify-end' : 'bg-[#c4c6cf] justify-start'
              }`}
              aria-label="Toggle Reduced Motion"
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-md block" />
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#c4c6cf] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#002045] text-white font-bold rounded hover:bg-[#1a365d] transition-colors focus-ring"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
