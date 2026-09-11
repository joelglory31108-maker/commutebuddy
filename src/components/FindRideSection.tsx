import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Clock,
  Users,
  Car,
  Footprints,
  Sparkles,
  Check,
  Plus,
  X,
  Navigation,
  MessageSquare,
  DollarSign
} from 'lucide-react';
import { RideMatch, CommuteMode } from '../types';
import { POPULAR_LOCATIONS } from '../data/mockData';

interface FindRideSectionProps {
  rides: RideMatch[];
  onJoinRide: (rideId: string) => void;
  onCreateRide: (newRide: Omit<RideMatch, 'id' | 'joined'>) => void;
}

export const FindRideSection: React.FC<FindRideSectionProps> = ({ rides, onJoinRide, onCreateRide }) => {
  // Form search state
  const [currentStop, setCurrentStop] = useState('');
  const [destination, setDestination] = useState('');
  const [commuteTime, setCommuteTime] = useState('Now (Next 15m)');
  const [modeFilter, setModeFilter] = useState<'All' | CommuteMode>('All');

  // Modal states
  const [selectedRide, setSelectedRide] = useState<RideMatch | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New ride form state
  const [newCreatorName, setNewCreatorName] = useState('');
  const [newOrigin, setNewOrigin] = useState(POPULAR_LOCATIONS.origins[0]);
  const [newDest, setNewDest] = useState(POPULAR_LOCATIONS.destinations[0]);
  const [newTime, setNewTime] = useState('9:00 AM');
  const [newMode, setNewMode] = useState<CommuteMode>('Shared Auto');
  const [newSpots, setNewSpots] = useState(3);
  const [newNotes, setNewNotes] = useState('');

  // Filtering matches
  const filteredRides = rides.filter((ride) => {
    const matchesStop = !currentStop || ride.startLocation.toLowerCase().includes(currentStop.toLowerCase());
    const matchesDest = !destination || ride.destination.toLowerCase().includes(destination.toLowerCase());
    const matchesMode = modeFilter === 'All' || ride.mode === modeFilter;
    return matchesStop && matchesDest && matchesMode;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Soft scroll to results
    const resultsElem = document.getElementById('search-results-anchor');
    if (resultsElem) {
      resultsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCreatorName.trim()) return;

    onCreateRide({
      creatorName: newCreatorName.trim(),
      collegeIdBadge: 'Verified • Class of 2026',
      avatarColor: 'bg-emerald-700 text-white',
      startLocation: newOrigin,
      destination: newDest,
      departureTime: `${newTime} (today)`,
      mode: newMode,
      spotsFilled: 1,
      totalSpots: newSpots,
      fareEstimate: newMode === 'Walk Group' ? 'Free • Walking Group' : '~$0.60 (₹20 split)',
      notes: newNotes.trim() || 'Waiting at station exit. Let’s head to campus together!',
      tags: ['Newly Created', 'Student Verified'],
    });

    setShowCreateModal(false);
    setNewCreatorName('');
    setNewNotes('');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Peer-to-Peer Matcher</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Find a Ride or Walk Group</h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Enter your drop-off station, destination on campus, and arrival time to view classmates ready to share an
            auto or walk together.
          </p>
        </div>

        <button
          id="open-create-ride-modal-btn"
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post Your Commute</span>
        </button>
      </div>

      {/* Mock Search Form */}
      <form
        onSubmit={handleSearchSubmit}
        className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-emerald-600" />
            Route & Timing Details
          </span>
          <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
            Active college transit network
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Current Stop / Origin */}
          <div className="space-y-1.5">
            <label htmlFor="current-stop-input" className="block text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Current Stop / Transit Hub
            </label>
            <div className="relative">
              <input
                id="current-stop-input"
                type="text"
                value={currentStop}
                onChange={(e) => setCurrentStop(e.target.value)}
                placeholder="e.g., Central Metro Exit 2"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-hidden transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-1 pt-1">
              <span className="text-[11px] text-slate-600 mr-1">Popular:</span>
              <button
                type="button"
                onClick={() => setCurrentStop('Central Metro')}
                className="text-[11px] text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-2 py-0.5 rounded-md transition-colors"
              >
                Central Metro
              </button>
              <button
                type="button"
                onClick={() => setCurrentStop('North Gate')}
                className="text-[11px] text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-2 py-0.5 rounded-md transition-colors"
              >
                North Gate Bus
              </button>
            </div>
          </div>

          {/* Destination */}
          <div className="space-y-1.5">
            <label htmlFor="destination-input" className="block text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              Final Campus Destination
            </label>
            <div className="relative">
              <input
                id="destination-input"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g., Engineering Block 3 / Library"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-hidden transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-1 pt-1">
              <span className="text-[11px] text-slate-600 mr-1">Popular:</span>
              <button
                type="button"
                onClick={() => setDestination('Engineering')}
                className="text-[11px] text-teal-700 bg-slate-100 hover:bg-teal-50 px-2 py-0.5 rounded-md transition-colors"
              >
                Engineering
              </button>
              <button
                type="button"
                onClick={() => setDestination('Library')}
                className="text-[11px] text-teal-700 bg-slate-100 hover:bg-teal-50 px-2 py-0.5 rounded-md transition-colors"
              >
                Main Library
              </button>
            </div>
          </div>

          {/* Time & Search Action */}
          <div className="space-y-1.5">
            <label htmlFor="commute-time-select" className="block text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-600" />
              Departure Window
            </label>
            <div className="flex gap-2">
              <select
                id="commute-time-select"
                value={commuteTime}
                onChange={(e) => setCommuteTime(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-hidden transition-all text-slate-900 font-medium"
              >
                <option value="Now (Next 15m)">Leaving Now (Next 15m)</option>
                <option value="In 30 mins">In 30 mins (Around 9:00 AM)</option>
                <option value="In 45 mins">In 45 mins (Around 9:15 AM)</option>
                <option value="Afternoon (1:00 PM)">Afternoon (1:00 PM)</option>
                <option value="Evening (5:00 PM)">Evening (5:00 PM)</option>
              </select>

              <button
                type="submit"
                id="search-rides-btn"
                className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-medium rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-xs"
                title="Search matched rides"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => {
                  setCurrentStop('');
                  setDestination('');
                  setModeFilter('All');
                }}
                className="text-[11px] text-slate-600 hover:text-slate-800 underline underline-offset-2"
              >
                Reset filters
              </button>
              <span className="text-[11px] text-emerald-700 font-medium">{filteredRides.length} matches found</span>
            </div>
          </div>
        </div>
      </form>

      {/* Mode Filters */}
      <div id="search-results-anchor" className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600">Filter Mode:</span>
          {(['All', 'Shared Auto', 'Walk Group', 'E-Rickshaw'] as const).map((mode) => (
            <button
              key={mode}
              id={`filter-mode-${mode.toLowerCase().replace(' ', '-')}`}
              onClick={() => setModeFilter(mode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                modeFilter === mode
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-600">
          Showing verified student pods for <span className="font-semibold text-slate-800">{commuteTime}</span>
        </div>
      </div>

      {/* Matched Student Cards Grid */}
      <div className="space-y-4">
        {filteredRides.length === 0 ? (
          <div className="text-center py-12 px-4 bg-white rounded-2xl border border-dashed border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-800">No student pods match those exact filters</h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try clearing your search location or be the first to post a shared commute for this route!
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentStop('');
                  setDestination('');
                  setModeFilter('All');
                }}
                className="px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                Clear Search Criteria
              </button>
            </div>
          </div>
        ) : (
          filteredRides.map((ride) => {
            const isFull = ride.spotsFilled >= ride.totalSpots;
            const isJoined = ride.joined;

            return (
              <div
                key={ride.id}
                id={`ride-card-${ride.id}`}
                className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all duration-200 hover:shadow-md ${
                  isJoined ? 'border-emerald-500 bg-emerald-50/20 ring-1 ring-emerald-400' : 'border-slate-200/90'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  {/* Left info: Student & Route */}
                  <div className="space-y-3 flex-1">
                    {/* Student Identity Header */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-xs ${ride.avatarColor}`}
                      >
                        {ride.creatorName
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{ride.creatorName}</span>
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200/70 font-semibold px-2 py-0.5 rounded-full">
                            {ride.collegeIdBadge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>Departing {ride.departureTime}</span>
                        </p>
                      </div>
                    </div>

                    {/* Route Line */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-2">
                      <div className="flex items-start gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                        <div>
                          <div className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Pickup / Meeting Point</div>
                          <div className="text-xs font-bold text-slate-900">{ride.startLocation}</div>
                        </div>
                      </div>

                      <div className="ml-1 border-l-2 border-dashed border-slate-300 h-2.5" />

                      <div className="flex items-start gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-teal-600 mt-1 shrink-0" />
                        <div>
                          <div className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Destination</div>
                          <div className="text-xs font-bold text-slate-900">{ride.destination}</div>
                        </div>
                      </div>
                    </div>

                    {/* Note & Tags */}
                    <p className="text-xs text-slate-600 italic">
                      &ldquo;{ride.notes}&rdquo;
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {ride.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right side: Mode, Capacity, Fare & Action */}
                  <div className="sm:w-56 shrink-0 flex flex-col justify-between sm:border-l sm:border-slate-100 sm:pl-5 pt-3 sm:pt-0 border-t border-slate-100">
                    <div className="space-y-2.5">
                      {/* Mode Badge */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600 font-medium">Mode</span>
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                            ride.mode === 'Shared Auto'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : ride.mode === 'Walk Group'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-teal-50 text-teal-800 border border-teal-200'
                          }`}
                        >
                          {ride.mode === 'Shared Auto' && <Car className="w-3 h-3" />}
                          {ride.mode === 'Walk Group' && <Footprints className="w-3 h-3" />}
                          {ride.mode === 'E-Rickshaw' && <Sparkles className="w-3 h-3" />}
                          <span>{ride.mode}</span>
                        </span>
                      </div>

                      {/* Capacity / Filled */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-600 flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-slate-400" />
                            Group Size:
                          </span>
                          <span className="font-bold text-slate-800">
                            {ride.spotsFilled}/{ride.totalSpots} spots
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isFull ? 'bg-amber-500' : 'bg-emerald-600'
                            }`}
                            style={{ width: `${Math.min(100, (ride.spotsFilled / ride.totalSpots) * 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Fare Split Estimate */}
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-slate-600 flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                          Estimated Fare:
                        </span>
                        <span className="font-bold text-emerald-700">{ride.fareEstimate}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 flex flex-col gap-2">
                      {isJoined ? (
                        <div className="w-full py-2.5 px-3 bg-emerald-100 text-emerald-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>You&apos;re in this pod!</span>
                        </div>
                      ) : (
                        <button
                          id={`join-ride-btn-${ride.id}`}
                          onClick={() => onJoinRide(ride.id)}
                          disabled={isFull}
                          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            isFull
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : 'bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white shadow-xs'
                          }`}
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>{isFull ? 'Pod is Full' : 'Join This Pod'}</span>
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedRide(ride)}
                        className="text-[11px] font-semibold text-slate-600 hover:text-slate-800 py-1 transition-colors text-center"
                      >
                        View Meeting Details &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Ride Details / Meetup Modal */}
      {selectedRide && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-xl space-y-5 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedRide(null)}
              className="absolute right-5 top-5 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base ${selectedRide.avatarColor}`}
              >
                {selectedRide.creatorName
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedRide.creatorName}&apos;s Commute Pod</h3>
                <span className="text-xs text-emerald-700 font-semibold">{selectedRide.collegeIdBadge}</span>
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Departure Time</span>
                <span className="font-bold text-slate-800">{selectedRide.departureTime}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Pickup Location</span>
                <span className="font-bold text-slate-800 text-right">{selectedRide.startLocation}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Campus Destination</span>
                <span className="font-bold text-slate-800 text-right">{selectedRide.destination}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Mode & Splitting</span>
                <span className="font-bold text-emerald-700">
                  {selectedRide.mode} &bull; {selectedRide.fareEstimate}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">Meetup Note</span>
                <p className="text-slate-700 italic bg-white p-2.5 rounded-lg border border-slate-200">
                  &ldquo;{selectedRide.notes}&rdquo;
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800">
              <MessageSquare className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>
                When you tap join, you will be added to the peer roster and can coordinate at the station stand.
              </span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedRide(null)}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
              >
                Close
              </button>
              {!selectedRide.joined && (
                <button
                  onClick={() => {
                    onJoinRide(selectedRide.id);
                    setSelectedRide(null);
                  }}
                  className="flex-1 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                >
                  Join Pod Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Post a Ride Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl space-y-4 relative animate-in fade-in zoom-in-95 duration-150 my-8">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute right-5 top-5 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-slate-900">Post a Student Commute Pod</h3>
              <p className="text-xs text-slate-500 mt-0.5">Heading to campus from a station? Invite classmates to join you.</p>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Name & Campus Tag</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin (Design '27)"
                  value={newCreatorName}
                  onChange={(e) => setNewCreatorName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pickup Stop / Station</label>
                <select
                  value={newOrigin}
                  onChange={(e) => setNewOrigin(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-hidden"
                >
                  {POPULAR_LOCATIONS.origins.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Campus Destination</label>
                <select
                  value={newDest}
                  onChange={(e) => setNewDest(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-hidden"
                >
                  {POPULAR_LOCATIONS.destinations.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Departure Time</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="9:00 AM"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Total Spots</label>
                  <select
                    value={newSpots}
                    onChange={(e) => setNewSpots(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-hidden"
                  >
                    <option value={3}>3 Spots (Shared Auto)</option>
                    <option value={4}>4 Spots (E-Rickshaw)</option>
                    <option value={5}>5 Spots (Walking Pod)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Commute Mode</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Shared Auto', 'Walk Group', 'E-Rickshaw'] as CommuteMode[]).map((mode) => (
                    <button
                      type="button"
                      key={mode}
                      onClick={() => setNewMode(mode)}
                      className={`py-2 px-1 text-center rounded-xl font-medium border text-[11px] ${
                        newMode === mode
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-500 font-bold'
                          : 'border-slate-200 text-slate-600 bg-white'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Meetup Details / Landmark</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Waiting by Exit 2 near the coffee stall wearing yellow jacket."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-hidden resize-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-800 transition-colors shadow-xs"
                >
                  Publish Pod
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
