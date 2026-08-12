import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const MembershipModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [opdName, setOpdName] = useState('');
  const [country, setCountry] = useState('Kenya');
  const [regNumber, setRegNumber] = useState('');
  const [representative, setRepresentative] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white text-[#1a1c1c] rounded-xl max-w-lg w-full p-6 border-2 border-[#002045] shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 border-b border-[#c4c6cf] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#002045] text-2xl">groups</span>
            <h2 className="text-2xl font-bold text-[#002045]">ADF OPD Membership Application</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-[#43474e] hover:bg-[#e8e8e8] rounded-full"
            aria-label="Close membership modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-[#9bf585] text-[#126e0c] rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-[#002045]">Application Received</h3>
            <p className="text-[#43474e]">
              Thank you, <strong>{opdName}</strong>. Your membership dossier has been routed to the ADF Executive Secretariat in Addis Ababa for credential verification.
            </p>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="mt-4 px-6 py-2 bg-[#002045] text-white font-bold rounded hover:bg-[#1a365d]"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-[#43474e]">
              National, regional, and continental Organizations of Persons with Disabilities (OPDs) registered within African states are invited to apply for full ADF voting membership.
            </p>

            <div>
              <label className="block text-sm font-bold mb-1">Organization Name (OPD)</label>
              <input
                type="text"
                required
                value={opdName}
                onChange={(e) => setOpdName(e.target.value)}
                placeholder="e.g. Federation of Persons with Disabilities"
                className="w-full p-3 border-2 border-[#74777f] rounded bg-[#f9f9f9]"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Country of Registration</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-3 border-2 border-[#74777f] rounded bg-[#f9f9f9]"
              >
                <option value="Kenya">Kenya</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Nigeria">Nigeria</option>
                <option value="South Africa">South Africa</option>
                <option value="Senegal">Senegal</option>
                <option value="Ghana">Ghana</option>
                <option value="Uganda">Uganda</option>
                <option value="Egypt">Egypt</option>
                <option value="Other">Other African Union Member State</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Official Registration Number</label>
              <input
                type="text"
                required
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                placeholder="e.g. NGO-REG-88492"
                className="w-full p-3 border-2 border-[#74777f] rounded bg-[#f9f9f9]"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Lead Representative Name</label>
              <input
                type="text"
                required
                value={representative}
                onChange={(e) => setRepresentative(e.target.value)}
                placeholder="e.g. Dr. Samuel Kiprono"
                className="w-full p-3 border-2 border-[#74777f] rounded bg-[#f9f9f9]"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Official Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. info@opd-national.org"
                className="w-full p-3 border-2 border-[#74777f] rounded bg-[#f9f9f9]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#002045] hover:bg-[#1a365d] text-white font-bold text-lg rounded shadow transition-colors"
              >
                Submit Membership Dossier
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
