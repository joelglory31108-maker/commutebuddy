import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  BellRing,
  Send,
  User,
  Phone,
  Clock,
  MapPin,
  Edit2,
  AlertTriangle,
  HeartHandshake
} from 'lucide-react';
import { CheckInRecord, EmergencyContact } from '../types';

interface SafetyCheckInSectionProps {
  checkIns: CheckInRecord[];
  savedContact: EmergencyContact;
  onUpdateContact: (contact: EmergencyContact) => void;
  onSendCheckIn: (location: string, note?: string) => void;
}

export const SafetyCheckInSection: React.FC<SafetyCheckInSectionProps> = ({
  checkIns,
  savedContact,
  onUpdateContact,
  onSendCheckIn,
}) => {
  const [selectedLocation, setSelectedLocation] = useState('Campus Gate / Academic Quad');
  const [customNote, setCustomNote] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [recentSentAlert, setRecentSentAlert] = useState<string | null>(null);

  // Edit contact state
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactName, setContactName] = useState(savedContact.name);
  const [contactRelation, setContactRelation] = useState(savedContact.relation);
  const [contactPhone, setContactPhone] = useState(savedContact.phone);

  const handleTapReachedSafely = () => {
    setIsSending(true);
    setTimeout(() => {
      onSendCheckIn(selectedLocation, customNote || undefined);
      setIsSending(false);
      setRecentSentAlert(`Notification successfully dispatched to ${savedContact.name}!`);
      setTimeout(() => setRecentSentAlert(null), 5000);
      setCustomNote('');
    }, 600);
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateContact({
      name: contactName.trim() || 'Parent/Guardian',
      relation: contactRelation.trim() || 'Emergency Contact',
      phone: contactPhone.trim() || '+1 (555) 000-0000',
    });
    setIsEditingContact(false);
  };

  const presetLocations = [
    'Campus Gate / Academic Quad',
    'Main University Library',
    'North Campus Student Housing',
    'Engineering & Science Labs',
    'Metro Station (Headed Home)',
  ];

  return (
    <div className="space-y-8 pb-16 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Automated Peace of Mind</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Safety Check-In</h1>
        <p className="text-sm text-slate-600 max-w-lg mx-auto">
          One single tap lets family or roommates know you made it safely across the last mile, without juggling phones
          while walking.
        </p>
      </div>

      {/* Main Check-In Action Card */}
      <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-8 text-center space-y-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-emerald-50 rounded-full blur-2xl pointer-events-none" />

        {/* Location Dropdown / Chip Selector */}
        <div className="space-y-2 max-w-md mx-auto text-left">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            Where have you arrived?
          </label>
          <div className="flex flex-wrap gap-1.5">
            {presetLocations.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setSelectedLocation(loc)}
                className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                  selectedLocation === loc
                    ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* The Big Prominent "I've Reached Safely" Button */}
        <div className="py-2">
          <button
            id="reach-safely-main-btn"
            onClick={handleTapReachedSafely}
            disabled={isSending}
            className={`group relative inline-flex flex-col items-center justify-center w-52 h-52 sm:w-56 sm:h-56 rounded-full transition-all duration-300 transform active:scale-95 cursor-pointer ${
              isSending
                ? 'bg-slate-200 text-slate-400 cursor-wait'
                : 'bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 text-white shadow-xl shadow-emerald-700/25 hover:shadow-2xl hover:shadow-emerald-600/35 hover:scale-102'
            }`}
          >
            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-20 group-hover:animate-ping pointer-events-none" />

            <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>

            <span className="text-lg sm:text-xl font-extrabold tracking-tight">
              {isSending ? 'Sending Ping...' : "I've Reached Safely"}
            </span>

            <span className="text-[11px] text-emerald-100 font-medium mt-1">Tap to notify {savedContact.name.split(' ')[0]}</span>
          </button>
        </div>

        {/* Optional Add Quick Note */}
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Optional note: e.g. With roommate at library"
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-hidden text-slate-800 placeholder:text-slate-400 text-center"
          />
        </div>

        {/* Instant Notification Banner simulation */}
        {recentSentAlert && (
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-3 text-left animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-1 bg-emerald-500 text-white rounded-full shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <span className="font-bold block text-sm text-emerald-950">Dispatched to {savedContact.name}!</span>
              <p className="text-slate-600 text-xs">
                Simulated SMS text: &ldquo;CommuteBuddy: Student arrived safely at {selectedLocation} at{' '}
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* Contact Recipient info pill */}
        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-500">
          <Send className="w-3.5 h-3.5 text-emerald-600" />
          <span>Notification automatically sent to:</span>
          <span className="font-bold text-slate-800">{savedContact.name}</span>
          <span className="text-slate-400">({savedContact.phone})</span>
        </div>
      </div>

      {/* Saved Emergency / Trusted Contact Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Saved Check-In Contact</h3>
          </div>
          <button
            id="edit-contact-btn"
            onClick={() => setIsEditingContact(!isEditingContact)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <Edit2 className="w-3 h-3" />
            <span>{isEditingContact ? 'Cancel' : 'Edit Contact'}</span>
          </button>
        </div>

        {!isEditingContact ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm">
                {savedContact.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{savedContact.name}</div>
                <span className="text-xs text-slate-500 font-medium">{savedContact.relation}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-700 bg-white px-3 py-2 rounded-lg border border-slate-200">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-mono font-medium">{savedContact.phone}</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveContact} className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Contact Name</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Mom / Dad / Roommate"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-emerald-500 outline-hidden"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Relationship</label>
                <input
                  type="text"
                  required
                  value={contactRelation}
                  onChange={(e) => setContactRelation(e.target.value)}
                  placeholder="e.g. Parent / Roommate"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-emerald-500 outline-hidden"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-emerald-500 outline-hidden font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsEditingContact(false)}
                className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-700 text-white rounded-lg font-semibold hover:bg-emerald-800 shadow-xs"
              >
                Save Contact
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Log of Past Check-Ins */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-bold text-slate-900">Check-In Activity Log</h3>
          </div>
          <span className="text-xs text-slate-500">{checkIns.length} recorded check-ins</span>
        </div>

        <div className="divide-y divide-slate-100">
          {checkIns.map((record) => (
            <div key={record.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{record.location}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {record.status}
                  </span>
                </div>
                <div className="text-slate-500 flex items-center gap-2">
                  <span>Sent to: {record.contactName}</span>
                  {record.note && (
                    <>
                      <span>&bull;</span>
                      <span className="italic text-slate-600">&ldquo;{record.note}&rdquo;</span>
                    </>
                  )}
                </div>
              </div>

              <div className="text-slate-600 font-medium shrink-0 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{record.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campus Emergency Support Assistance Footer */}
      <div className="bg-slate-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs border border-slate-200 text-slate-700">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <span className="font-bold text-slate-900 block">Campus Security Escort Available</span>
            <span className="text-slate-500">24/7 student walking escorts from Metro Exit 2 to campus dorms</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono bg-white px-2.5 py-1 rounded border border-slate-200 font-semibold text-slate-900">
            Ext: 4100
          </span>
        </div>
      </div>
    </div>
  );
};
