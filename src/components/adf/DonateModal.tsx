import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DonateModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('50');
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('monthly');
  const [donated, setDonated] = useState(false);

  if (!isOpen) return null;

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setDonated(true);
  };

  const selectedValue = amount === 'custom' ? customAmount : amount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white text-[#0a1128] rounded-none max-w-lg w-full p-6 border-2 border-[#245a86] shadow-lg relative">
        <div className="flex justify-between items-center mb-4 border-b border-[#c4c6cf] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#245a86] text-3xl">volunteer_activism</span>
            <h2 className="text-2xl font-bold text-[#0f1b3d]">Support ADF Missions</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-[#33415c] hover:bg-[#e8edf3] rounded-full"
            aria-label="Close donate modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {donated ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-[#a8c6e4] text-[#245a86] rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
              ♥
            </div>
            <h3 className="text-2xl font-bold text-[#0f1b3d]">Generous Support Received</h3>
            <p className="text-[#33415c]">
              Your contribution of <strong>${selectedValue} USD</strong> directly powers grassroots OPD capacity building, youth leadership workshops, and continental legal advocacy across Africa.
            </p>
            <button
              onClick={() => { setDonated(false); onClose(); }}
              className="mt-4 px-6 py-2 bg-[#0f1b3d] text-white font-bold rounded hover:bg-[#1e3a5f]"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleDonate} className="space-y-5">
            <div className="flex rounded border-2 border-[#5b6b85] overflow-hidden">
              <button
                type="button"
                onClick={() => setFrequency('monthly')}
                className={`flex-1 py-2 font-bold text-center transition-colors ${
                  frequency === 'monthly' ? 'bg-[#245a86] text-white' : 'bg-[#e8edf3] text-[#0a1128]'
                }`}
              >
                Monthly Gift
              </button>
              <button
                type="button"
                onClick={() => setFrequency('once')}
                className={`flex-1 py-2 font-bold text-center transition-colors ${
                  frequency === 'once' ? 'bg-[#245a86] text-white' : 'bg-[#e8edf3] text-[#0a1128]'
                }`}
              >
                One-Time Gift
              </button>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Select Donation Amount (USD)</label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {['25', '50', '100', '250'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val)}
                    className={`py-3 rounded font-bold border-2 transition-all ${
                      amount === val
                        ? 'border-[#245a86] bg-[#a8c6e4] text-[#0f1b3d]'
                        : 'border-[#c4c6cf] hover:border-[#245a86] text-[#0a1128]'
                    }`}
                  >
                    ${val}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Or enter custom amount ($)"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setAmount('custom');
                }}
                className="w-full p-3 border-2 border-[#5b6b85] rounded bg-[#f4f7fa]"
              />
            </div>

            <div className="p-3 bg-[#e8edf3] rounded-none text-sm text-[#33415c] border-l-4 border-[#245a86]">
              <strong>Direct Impact:</strong> $50 provides accessible learning toolkits for 5 youth leaders with sensory disabilities in grassroots OPD workshops.
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#245a86] hover:bg-[#0f1b3d] text-white font-bold text-lg rounded shadow transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">favorite</span>
              <span>Donate ${selectedValue || '50'} {frequency === 'monthly' ? '/ Month' : ''}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
