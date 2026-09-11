import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  TrendingUp,
  Plus,
  X,
  CheckCircle2,
  Users,
  Car,
  Bus,
  Sparkles,
  Info,
  ChevronRight,
  Filter
} from 'lucide-react';
import { TransitStopWaitTime } from '../types';

interface WaitTimesSectionProps {
  waitTimes: TransitStopWaitTime[];
  onReportWaitTime: (report: {
    stopId: string;
    waitMinutes: number;
    crowdLevel: 'Low' | 'Moderate' | 'High';
    tip?: string;
  }) => void;
}

export const WaitTimesSection: React.FC<WaitTimesSectionProps> = ({ waitTimes, onReportWaitTime }) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedStopId, setSelectedStopId] = useState(waitTimes[0]?.id || '');
  const [reportedMinutes, setReportedMinutes] = useState(5);
  const [reportedCrowd, setReportedCrowd] = useState<'Low' | 'Moderate' | 'High'>('Low');
  const [reportedTip, setReportedTip] = useState('');
  const [filterCrowd, setFilterCrowd] = useState<'All' | 'Low' | 'Moderate' | 'High'>('All');

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReportWaitTime({
      stopId: selectedStopId,
      waitMinutes: Number(reportedMinutes),
      crowdLevel: reportedCrowd,
      tip: reportedTip.trim() || undefined,
    });
    setShowReportModal(false);
    setReportedTip('');
  };

  const filteredWaitTimes = waitTimes.filter((item) => {
    if (filterCrowd === 'All') return true;
    return item.crowdLevel === filterCrowd;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Crowd-Sourced Transit Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Community Wait Times</h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Real-time average wait times reported by fellow students at key transit stations and auto bays before you
            arrive.
          </p>
        </div>

        <button
          id="open-report-wait-btn"
          onClick={() => setShowReportModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Report Your Wait Time</span>
        </button>
      </div>

      {/* Quick Status Pill Bar */}
      <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-950">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-semibold">Crowd data refreshed continuously by college student network.</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-600">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span>Filter:</span>
          {(['All', 'Low', 'Moderate', 'High'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterCrowd(lvl)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                filterCrowd === lvl ? 'bg-emerald-800 text-white' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Table for Desktop / Card List for Mobile */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-6">Commute Stop & Landmark</th>
                <th className="py-3.5 px-4">Primary Mode</th>
                <th className="py-3.5 px-4">Average Wait</th>
                <th className="py-3.5 px-4">Congestion Level</th>
                <th className="py-3.5 px-6">Latest Community Tip</th>
                <th className="py-3.5 px-4 text-right">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredWaitTimes.map((stop) => (
                <tr key={stop.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 text-sm">{stop.stopName}</div>
                    <div className="text-slate-500 text-xs flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <span>{stop.landmark}</span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                      {stop.primaryMode === 'Shared Auto' && <Car className="w-3 h-3 text-amber-600" />}
                      {stop.primaryMode === 'Bus' && <Bus className="w-3 h-3 text-sky-600" />}
                      {stop.primaryMode === 'E-Rickshaw' && <Sparkles className="w-3 h-3 text-teal-600" />}
                      {stop.primaryMode === 'Campus Shuttle' && <Users className="w-3 h-3 text-emerald-600" />}
                      <span>{stop.primaryMode}</span>
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-extrabold text-slate-900">{stop.avgWaitMinutes}</span>
                      <span className="text-slate-500 font-medium">mins</span>
                    </div>
                    <span className="text-[10px] text-slate-600">based on {stop.reportsCount} reports</span>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        stop.crowdLevel === 'Low'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : stop.crowdLevel === 'Moderate'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          stop.crowdLevel === 'Low'
                            ? 'bg-emerald-500'
                            : stop.crowdLevel === 'Moderate'
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                      />
                      <span>{stop.crowdLevel} Wait</span>
                    </span>
                  </td>

                  <td className="py-4 px-6 max-w-xs">
                    <p className="text-slate-600 text-xs italic leading-relaxed">
                      &ldquo;{stop.recentTip}&rdquo;
                    </p>
                  </td>

                  <td className="py-4 px-4 text-right text-slate-600 font-medium text-xs whitespace-nowrap">
                    {stop.lastUpdated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List View */}
        <div className="md:hidden divide-y divide-slate-100">
          {filteredWaitTimes.map((stop) => (
            <div key={stop.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{stop.stopName}</h3>
                  <div className="text-slate-500 text-xs flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{stop.landmark}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-lg font-extrabold text-slate-900">{stop.avgWaitMinutes}m</div>
                  <span className="text-[10px] text-slate-600">avg wait</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                  {stop.primaryMode}
                </span>

                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                    stop.crowdLevel === 'Low'
                      ? 'bg-emerald-50 text-emerald-800'
                      : stop.crowdLevel === 'Moderate'
                      ? 'bg-amber-50 text-amber-800'
                      : 'bg-rose-50 text-rose-800'
                  }`}
                >
                  {stop.crowdLevel} Rush
                </span>

                <span className="text-[11px] text-slate-600 ml-auto">{stop.lastUpdated}</span>
              </div>

              <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                &ldquo;{stop.recentTip}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Report Your Wait Time Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl space-y-4 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowReportModal(false)}
              className="absolute right-5 top-5 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                <Users className="w-3.5 h-3.5" />
                <span>Help Fellow Students</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Report Your Wait Time</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Waiting at a transit hub right now? Help nearby classmates plan their commute.
              </p>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Transit Stop</label>
                <select
                  value={selectedStopId}
                  onChange={(e) => setSelectedStopId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-hidden font-medium"
                >
                  {waitTimes.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.stopName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  How long did you wait? <span className="text-emerald-700 font-bold">{reportedMinutes} minutes</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="35"
                  step="1"
                  value={reportedMinutes}
                  onChange={(e) => setReportedMinutes(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-600 px-1 mt-1">
                  <span>&lt; 2 min (instant)</span>
                  <span>10 mins</span>
                  <span>20 mins</span>
                  <span>30+ mins</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Crowd Rush Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Low', 'Moderate', 'High'] as const).map((level) => (
                    <button
                      type="button"
                      key={level}
                      onClick={() => setReportedCrowd(level)}
                      className={`py-2 px-2 text-center rounded-xl font-medium border text-xs ${
                        reportedCrowd === level
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-500 font-bold'
                          : 'border-slate-200 text-slate-600 bg-white'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Commuter Tip / Condition Note (Optional)</label>
                <textarea
                  rows={2}
                  value={reportedTip}
                  onChange={(e) => setReportedTip(e.target.value)}
                  placeholder="e.g., Drivers are gathering near Pillar 4. Plenty of rickshaws available."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-hidden resize-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-800 transition-colors shadow-xs"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
