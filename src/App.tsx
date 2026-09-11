import React, { useState, useEffect } from 'react';
import { PageTab, RideMatch, CheckInRecord, EmergencyContact, TransitStopWaitTime } from './types';
import {
  INITIAL_RIDE_MATCHES,
  INITIAL_CHECKINS,
  INITIAL_EMERGENCY_CONTACT,
  INITIAL_WAIT_TIMES,
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { LandingSection } from './components/LandingSection';
import { FindRideSection } from './components/FindRideSection';
import { SafetyCheckInSection } from './components/SafetyCheckInSection';
import { WaitTimesSection } from './components/WaitTimesSection';
import { AboutSection } from './components/AboutSection';
import { Toast } from './components/Toast';
import { Compass, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<PageTab>('landing');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persistent / Mock State
  const [rides, setRides] = useState<RideMatch[]>(() => {
    const saved = localStorage.getItem('commute_buddy_rides');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_RIDE_MATCHES;
  });

  const [checkIns, setCheckIns] = useState<CheckInRecord[]>(() => {
    const saved = localStorage.getItem('commute_buddy_checkins');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_CHECKINS;
  });

  const [savedContact, setSavedContact] = useState<EmergencyContact>(() => {
    const saved = localStorage.getItem('commute_buddy_contact');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_EMERGENCY_CONTACT;
  });

  const [waitTimes, setWaitTimes] = useState<TransitStopWaitTime[]>(() => {
    const saved = localStorage.getItem('commute_buddy_wait_times');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_WAIT_TIMES;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('commute_buddy_rides', JSON.stringify(rides));
  }, [rides]);

  useEffect(() => {
    localStorage.setItem('commute_buddy_checkins', JSON.stringify(checkIns));
  }, [checkIns]);

  useEffect(() => {
    localStorage.setItem('commute_buddy_contact', JSON.stringify(savedContact));
  }, [savedContact]);

  useEffect(() => {
    localStorage.setItem('commute_buddy_wait_times', JSON.stringify(waitTimes));
  }, [waitTimes]);

  // Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  // Handler: Join Ride
  const handleJoinRide = (rideId: string) => {
    setRides((prev) =>
      prev.map((r) => {
        if (r.id === rideId && !r.joined) {
          showToast(`Successfully joined ${r.creatorName}'s ${r.mode} pod! Meet at ${r.startLocation}.`);
          return {
            ...r,
            spotsFilled: Math.min(r.totalSpots, r.spotsFilled + 1),
            joined: true,
          };
        }
        return r;
      })
    );
  };

  // Handler: Create Ride
  const handleCreateRide = (newRideData: Omit<RideMatch, 'id' | 'joined'>) => {
    const newRide: RideMatch = {
      ...newRideData,
      id: `ride-${Date.now()}`,
      joined: true,
    };
    setRides((prev) => [newRide, ...prev]);
    showToast(`Your ${newRide.mode} pod is published! Classmates can now join you.`);
  };

  // Handler: Send Safety Check-in
  const handleSendCheckIn = (location: string, note?: string) => {
    const now = new Date();
    const timeString = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newRecord: CheckInRecord = {
      id: `chk-${Date.now()}`,
      timestamp: timeString,
      location,
      contactName: savedContact.name,
      contactNumber: savedContact.phone,
      status: 'Delivered',
      note,
    };
    setCheckIns((prev) => [newRecord, ...prev]);
    showToast(`Notification sent to ${savedContact.name}: "I've reached ${location} safely."`);
  };

  // Handler: Report Wait Time
  const handleReportWaitTime = (report: {
    stopId: string;
    waitMinutes: number;
    crowdLevel: 'Low' | 'Moderate' | 'High';
    tip?: string;
  }) => {
    setWaitTimes((prev) =>
      prev.map((stop) => {
        if (stop.id === report.stopId) {
          const newReportsCount = stop.reportsCount + 1;
          const newAvg = Math.round(
            (stop.avgWaitMinutes * stop.reportsCount + report.waitMinutes) / newReportsCount
          );
          return {
            ...stop,
            avgWaitMinutes: Math.max(1, newAvg),
            crowdLevel: report.crowdLevel,
            reportsCount: newReportsCount,
            lastUpdated: 'Just now',
            recentTip: report.tip || `Recent student reported ${report.waitMinutes} min wait with ${report.crowdLevel} rush.`,
          };
        }
        return stop;
      })
    );
    showToast(`Thank you! Your wait time report was added to the campus network.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 pb-16 md:pb-0">
      {/* Toast Feedback */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Top Sticky Header */}
      <Navbar currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {currentTab === 'landing' && (
          <LandingSection onNavigate={setCurrentTab} activeMatchesCount={rides.length} />
        )}

        {currentTab === 'find-ride' && (
          <FindRideSection rides={rides} onJoinRide={handleJoinRide} onCreateRide={handleCreateRide} />
        )}

        {currentTab === 'safety' && (
          <SafetyCheckInSection
            checkIns={checkIns}
            savedContact={savedContact}
            onUpdateContact={setSavedContact}
            onSendCheckIn={handleSendCheckIn}
          />
        )}

        {currentTab === 'wait-time' && (
          <WaitTimesSection waitTimes={waitTimes} onReportWaitTime={handleReportWaitTime} />
        )}

        {currentTab === 'about' && <AboutSection onNavigate={setCurrentTab} />}
      </main>

      {/* Mobile Sticky Bottom Nav Bar */}
      <BottomNav currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Minimal Footer */}
      <footer className="border-t border-slate-200 bg-white/70 py-6 px-4 text-xs text-slate-500 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center">
              <Compass className="w-3 h-3" />
            </div>
            <span className="font-bold text-slate-800">CommuteBuddy</span>
            <span>&bull;</span>
            <span>Peer-to-peer campus last-mile coordinator</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setCurrentTab('about')}
              className="hover:text-emerald-700 transition-colors"
            >
              Why Last-Mile Matters
            </button>
            <button
              onClick={() => setCurrentTab('safety')}
              className="hover:text-emerald-700 transition-colors"
            >
              Safety Guidelines
            </button>
            <button
              onClick={() => setCurrentTab('wait-time')}
              className="hover:text-emerald-700 transition-colors"
            >
              Crowd Wait Times
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
