import React from 'react';
import { ShieldCheck, Users, Clock, ArrowRight, CheckCircle2, DollarSign, MapPin, Sparkles } from 'lucide-react';
import { PageTab } from '../types';

interface LandingSectionProps {
  onNavigate: (tab: PageTab) => void;
  activeMatchesCount: number;
}

export const LandingSection: React.FC<LandingSectionProps> = ({ onNavigate, activeMatchesCount }) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-50 via-teal-50/50 to-slate-50 border border-emerald-100/80 p-6 sm:p-10 lg:p-12 shadow-xs">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-emerald-200 text-xs font-semibold text-emerald-800 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Built for College Commuters</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-700">{activeMatchesCount} active rides near your stops</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Bridge the Last Mile from Metro to Campus,{' '}
            <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy decoration-2 underline-offset-4">
              Together
            </span>
            .
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Public transit drops you off, but the final 1.5 miles to college gate shouldn&apos;t be an expensive,
            exhausting, or unsafe gamble. Coordinate shared autos and walking pods with verified classmates in seconds.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              id="hero-find-ride-btn"
              onClick={() => onNavigate('find-ride')}
              className="w-full sm:w-auto px-7 py-3.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold rounded-xl shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer"
            >
              <Users className="w-5 h-5" />
              <span>Find a Ride or Walk Pod</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              id="hero-safety-btn"
              onClick={() => onNavigate('safety')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Safety Check-In</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Verified College IDs
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Split Auto Fares 3-4 Ways
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Instant &quot;Reached Safely&quot; Ping
            </span>
          </div>
        </div>
      </section>

      {/* Quick Problem vs Solution Snapshot */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          onClick={() => onNavigate('find-ride')}
          className="group cursor-pointer p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all duration-200 space-y-3"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center justify-between">
            <span>Coordinate Last-Mile</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Match with students exiting your exact metro or bus stop heading to your faculty building or campus gate.
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-700">
            <span>View matched pods</span>
            <span>&rarr;</span>
          </div>
        </div>

        <div
          onClick={() => onNavigate('safety')}
          className="group cursor-pointer p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all duration-200 space-y-3"
        >
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center justify-between">
            <span>One-Tap Safety Check-In</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Tap &quot;I&apos;ve reached safely&quot; upon arrival to immediately alert your parents or roommates without
            typing long texts while walking.
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-teal-700">
            <span>Test mock notification</span>
            <span>&rarr;</span>
          </div>
        </div>

        <div
          onClick={() => onNavigate('wait-time')}
          className="group cursor-pointer p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all duration-200 space-y-3"
        >
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Clock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center justify-between">
            <span>Live Community Wait Times</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Know how long the queue is at your station&apos;s auto stand before you exit. Report crowd levels to help
            classmates.
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-sky-700">
            <span>See live transit stops</span>
            <span>&rarr;</span>
          </div>
        </div>
      </section>

      {/* Relatable Student Commute Problem & Benefits Banner */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">The Problem We Solve</span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">Why The Final Mile Hurts College Students</h2>
          </div>
          <button
            id="read-problem-statement-btn"
            onClick={() => onNavigate('about')}
            className="text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-lg border border-emerald-200 transition-colors"
          >
            Read Full Problem Statement &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <DollarSign className="w-4 h-4 text-amber-600" />
              <span>Surge Auto Prices</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Auto drivers frequently charge $2.50 to $4.00 (₹100–₹150) for a short 1.2-mile distance. Splitting among 3
              passengers drops it to under $0.75 (₹25).
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Isolation & Evening Walks</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Walking alone from the metro after 6 PM on dimly lit access roads causes anxiety. Moving in coordinated pods of 3-5
              students provides safety in numbers.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Clock className="w-4 h-4 text-sky-600" />
              <span>Missed Morning Lectures</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Students waste 15-20 minutes pacing the station curb waiting for empty autos. Pre-coordinating with peers
              ensures instant departures.
            </p>
          </div>
        </div>
      </section>

      {/* Live Activity Ticker Simulation */}
      <section className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-semibold flex items-center gap-2">
              <span>Next Shared Departure</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 text-xs">Departing in 6m</span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Ananya S. &bull; Central Metro Exit 2 &rarr; Engineering Block 3 &bull; 1 seat remaining
            </p>
          </div>
        </div>
        <button
          id="join-ticker-ride-btn"
          onClick={() => onNavigate('find-ride')}
          className="w-full sm:w-auto px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition-colors shrink-0"
        >
          Browse All Rides &rarr;
        </button>
      </section>
    </div>
  );
};
