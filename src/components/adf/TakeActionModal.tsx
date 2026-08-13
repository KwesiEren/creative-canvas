import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TakeActionModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [actionType, setActionType] = useState('advocate');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('Kenya');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white text-[#0a1128] rounded-none max-w-lg w-full p-6 border-2 border-[#0f1b3d] shadow-lg relative max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 border-b border-[#c4c6cf] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#245a86] text-2xl">campaign</span>
            <h2 className="text-2xl font-bold text-[#0f1b3d]">Take Action with ADF</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-[#33415c] hover:bg-[#e8edf3] rounded-full"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-[#a8c6e4] text-[#245a86] rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-[#0f1b3d]">Thank You for Standing with ADF!</h3>
            <p className="text-[#33415c] max-w-md mx-auto">
              Your pledge has been recorded. Our advocacy coordination team will contact you with regional toolkits and campaign resources.
            </p>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="mt-4 px-6 py-2 bg-[#0f1b3d] text-white font-bold rounded hover:bg-[#1e3a5f]"
            >
              Return to Website
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-[#33415c]">
              Join thousands of citizens, activists, and allies advocating for the ratification of the African Disability Protocol and full implementation of CRPD rights across Africa.
            </p>

            <div>
              <label className="block text-sm font-bold mb-1">Choose How to Participate</label>
              <select
                value={actionType}
                onChange={(e) => setActionType(e.target.value)}
                className="w-full p-3 border-2 border-[#5b6b85] rounded bg-[#f4f7fa] text-[#0a1128] font-medium"
              >
                <option value="advocate">Pledge Support for African Disability Protocol Ratification</option>
                <option value="youth">Join Youth Leadership & Intersectional Network</option>
                <option value="opd">Connect Local OPD to Continental Forum</option>
                <option value="volunteer">Volunteer Technical/Legal Skills</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kwame Mensah"
                className="w-full p-3 border-2 border-[#5b6b85] rounded bg-[#f4f7fa]"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. kwame@example.org"
                className="w-full p-3 border-2 border-[#5b6b85] rounded bg-[#f4f7fa]"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Country of Residence</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-3 border-2 border-[#5b6b85] rounded bg-[#f4f7fa]"
              >
                <option value="Kenya">Kenya</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Nigeria">Nigeria</option>
                <option value="South Africa">South Africa</option>
                <option value="Senegal">Senegal</option>
                <option value="Ghana">Ghana</option>
                <option value="Uganda">Uganda</option>
                <option value="Egypt">Egypt</option>
                <option value="Other">Other African State / International</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#245a86] hover:bg-[#0f1b3d] text-white font-bold text-lg rounded transition-colors shadow"
              >
                Submit Action Pledge
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
