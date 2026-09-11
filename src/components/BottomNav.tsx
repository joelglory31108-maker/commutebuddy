import React from 'react';
import { Home, Users, ShieldCheck, Clock, Info } from 'lucide-react';
import { PageTab } from '../types';

interface BottomNavProps {
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs: { id: PageTab; label: string; icon: React.ElementType }[] = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'find-ride', label: 'Find Ride', icon: Users },
    { id: 'safety', label: 'Safety', icon: ShieldCheck },
    { id: 'wait-time', label: 'Wait Times', icon: Clock },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 py-1.5 shadow-lg">
      <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`mobile-nav-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 rounded-lg transition-colors duration-150 ${
                isActive ? 'text-emerald-700 font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className={`p-1 rounded-md transition-colors ${isActive ? 'bg-emerald-50 text-emerald-700' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
