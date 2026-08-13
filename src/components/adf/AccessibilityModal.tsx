import React from 'react';
import { AccessibilitySettings } from '@/types';

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
      <div className="bg-white dark:bg-[#0a1128] text-[#0a1128] dark:text-[#f4f7fa] rounded-none max-w-md w-full p-6 border-2 border-[#5b6b85] shadow-lg relative">
        <div className="flex justify-between items-center mb-6 border-b border-[#c4c6cf] pb-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#0f1b3d] dark:text-[#dbe6f2] text-2xl">settings_accessibility</span>
            <h2 className="text-xl font-bold text-[#0f1b3d] dark:text-[#dbe6f2]">Accessibility Preferences</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[#33415c] hover:bg-[#e8edf3] dark:hover:bg-[#152a4a] rounded-full focus-ring"
            aria-label="Close settings"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-5">
          {/* Text Size */}
          <div>
            <label className="block text-sm font-bold text-[#0a1128] dark:text-[#f4f7fa] mb-2">Text Scale</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onUpdateSettings({ fontSize: 'normal' })}
                className={`py-2 px-3 rounded border-2 font-bold text-sm ${
                  settings.fontSize === 'normal'
                    ? 'border-[#0f1b3d] bg-[#0f1b3d] text-white'
                    : 'border-[#c4c6cf] hover:bg-[#e8edf3] text-[#0a1128] dark:text-[#f4f7fa]'
                }`}
              >
                Standard (100%)
              </button>
              <button
                onClick={() => onUpdateSettings({ fontSize: 'large' })}
                className={`py-2 px-3 rounded border-2 font-bold text-base ${
                  settings.fontSize === 'large'
                    ? 'border-[#0f1b3d] bg-[#0f1b3d] text-white'
                    : 'border-[#c4c6cf] hover:bg-[#e8edf3] text-[#0a1128] dark:text-[#f4f7fa]'
                }`}
              >
                Large (115%)
              </button>
              <button
                onClick={() => onUpdateSettings({ fontSize: 'xlarge' })}
                className={`py-2 px-3 rounded border-2 font-bold text-lg ${
                  settings.fontSize === 'xlarge'
                    ? 'border-[#0f1b3d] bg-[#0f1b3d] text-white'
                    : 'border-[#c4c6cf] hover:bg-[#e8edf3] text-[#0a1128] dark:text-[#f4f7fa]'
                }`}
              >
                Extra (130%)
              </button>
            </div>
          </div>

          {/* High Contrast Mode */}
          <div className="flex items-center justify-between p-3 bg-[#e8edf3] dark:bg-[#152a4a] rounded-none">
            <div>
              <span className="font-bold block text-sm">High Contrast Theme</span>
              <span className="text-xs text-[#33415c] dark:text-[#c4c6cf]">Enhance visual boundary contrast</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ highContrast: !settings.highContrast })}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.highContrast ? 'bg-[#245a86] justify-end' : 'bg-[#c4c6cf] justify-start'
              }`}
              aria-label="Toggle High Contrast"
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-md block" />
            </button>
          </div>

          {/* Dyslexia-Friendly Font */}
          <div className="flex items-center justify-between p-3 bg-[#e8edf3] dark:bg-[#152a4a] rounded-none">
            <div>
              <span className="font-bold block text-sm">Dyslexia-Friendly Spacing</span>
              <span className="text-xs text-[#33415c] dark:text-[#c4c6cf]">Increase letter and line tracking</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ dyslexicFont: !settings.dyslexicFont })}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.dyslexicFont ? 'bg-[#245a86] justify-end' : 'bg-[#c4c6cf] justify-start'
              }`}
              aria-label="Toggle Dyslexia Spacing"
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-md block" />
            </button>
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between p-3 bg-[#e8edf3] dark:bg-[#152a4a] rounded-none">
            <div>
              <span className="font-bold block text-sm">Reduce Motion</span>
              <span className="text-xs text-[#33415c] dark:text-[#c4c6cf]">Disable page transition effects</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ reducedMotion: !settings.reducedMotion })}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.reducedMotion ? 'bg-[#245a86] justify-end' : 'bg-[#c4c6cf] justify-start'
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
            className="px-6 py-2 bg-[#0f1b3d] text-white font-bold rounded hover:bg-[#1e3a5f] transition-colors focus-ring"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
