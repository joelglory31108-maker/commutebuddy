import React from 'react';
import {
  ShieldCheck,
  DollarSign,
  Footprints,
  Heart,
  Users,
  Compass,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PageTab } from '../types';

interface AboutSectionProps {
  onNavigate: (tab: PageTab) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <Heart className="w-3.5 h-3.5 text-emerald-600" />
          <span>Our Empathic Mission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Solving the Daily Last-Mile Struggle
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          For thousands of students, public transit gets them 85% of the way to college. But that final 1.5-mile gap
          between the transit station and campus gates is where daily stress, unnecessary expense, and safety worries
          pile up.
        </p>
      </div>

      {/* 3 Core Friction Points */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Friction 1: Connectivity */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">The Transit Drop-Off Void</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Metros and buses stop at major arterial junctions. Getting from the station exit through ring roads, highway
            crossings, and campus perimeters is fragmented, uncoordinated, and exhausting before a long day of classes.
          </p>
          <div className="pt-2 text-xs font-semibold text-sky-800 flex items-center gap-1">
            <span>Our fix:</span>
            <span className="text-slate-600 font-normal">Designated station meetup points for classmates.</span>
          </div>
        </div>

        {/* Friction 2: Cost */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Surge Pricing on Student Budgets</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Local auto drivers know students are rushing for 8:30 AM attendance and quote steep solo rates ($3.00 to
            $4.50 / ₹120+). Paying that twice a day adds up to a crippling monthly expense for college students on tight
            allowances.
          </p>
          <div className="pt-2 text-xs font-semibold text-amber-800 flex items-center gap-1">
            <span>Our fix:</span>
            <span className="text-slate-600 font-normal">Splitting rides 3-4 ways cuts daily costs by up to 75%.</span>
          </div>
        </div>

        {/* Friction 3: Safety */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Safety & Solitary Evening Walks</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Walking alone along dim access roads after late laboratory sessions or library study groups causes acute
            anxiety—especially for women commuters. Strangers, poorly lit pathways, and deserted streets present genuine
            concerns.
          </p>
          <div className="pt-2 text-xs font-semibold text-emerald-800 flex items-center gap-1">
            <span>Our fix:</span>
            <span className="text-slate-600 font-normal">Walking pods + instant one-tap family safety check-in.</span>
          </div>
        </div>
      </div>

      {/* Comparison: Solo Commute vs CommuteBuddy */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">The Commute Comparison</h2>
          <p className="text-xs text-slate-500 mt-0.5">How CommuteBuddy transforms the final mile experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Old Way */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              <span>Solo Commute (The Hard Way)</span>
            </div>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">&times;</span>
                <span>Haggling solo with auto drivers who inflate fares during rush hour.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">&times;</span>
                <span>Walking 20 minutes alone on quiet campus access stretches after sunset.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">&times;</span>
                <span>Fumbling to call parents while carrying heavy bags and textbooks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">&times;</span>
                <span>Arriving at stations blind, with zero knowledge of queue wait times.</span>
              </li>
            </ul>
          </div>

          {/* CommuteBuddy Way */}
          <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200 space-y-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-emerald-950 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>With CommuteBuddy (The Smart Way)</span>
            </div>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">&check;</span>
                <span>Split auto fare 3-4 ways; ride for pocket change with verified peers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">&check;</span>
                <span>Walk in coordinated groups of 3-5 classmates: strength and safety in numbers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">&check;</span>
                <span>One-tap &ldquo;I&apos;ve reached safely&rdquo; button auto-notifies saved family contacts.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">&check;</span>
                <span>Check live community wait times before stepping off the metro train.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Community Safety Pledge */}
      <section className="bg-gradient-to-tr from-slate-900 via-slate-850 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">The CommuteBuddy Campus Safety Charter</h2>
            <p className="text-xs text-slate-300">Built on mutual accountability and student trust</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-1.5">
            <span className="font-bold text-white block">1. Verified College Community</span>
            <p>Riders and pod creators show verified student tags to keep the group exclusively student-focused.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-1.5">
            <span className="font-bold text-white block">2. Public Meeting Pillars</span>
            <p>Always coordinate meetups at well-lit, designated station pillars or official auto bay kiosks.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-1.5">
            <span className="font-bold text-white block">3. Fair Split Ethics</span>
            <p>Fares are calculated openly and split evenly down to the exact coin with zero markup.</p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <span className="text-xs text-slate-300">Ready to coordinate your next commute?</span>
          <button
            id="about-cta-find-ride-btn"
            onClick={() => onNavigate('find-ride')}
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Browse Rides Heading to Campus</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
