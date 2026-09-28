import React from 'react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab, resetToDefaults } = useApp();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-900">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                ES
              </div>
              <span className="text-base font-bold text-slate-900 dark:text-white font-display">
                EventSphere
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
              The collaborative event management & hackathon platform. Discover, connect, build teams, and participate in live stages.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 dark:text-slate-400">
            <button
              onClick={() => setActiveTab('explore')}
              className="hover:text-indigo-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              Explore Events
            </button>
            <button
              onClick={() => setActiveTab('teams')}
              className="hover:text-indigo-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              Find Teammates
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className="hover:text-indigo-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              Live Arena
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className="hover:text-indigo-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              Leaderboard
            </button>
            <button
              onClick={() => setActiveTab('organizer')}
              className="hover:text-indigo-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              Organizer Console
            </button>
            <button
              onClick={resetToDefaults}
              className="text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer font-medium"
              title="Re-seed initial demo events and teams"
            >
              Reset Demo State
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 gap-3">
          <p>© 2026 EventSphere Platform. Designed for inter-collegiate innovation competitions.</p>
          <div className="flex items-center gap-4">
            <span>Real-time Workspace</span>
            <span>·</span>
            <span>Zero-Latency Matchmaking</span>
            <span>·</span>
            <span>Digital Credential Passports</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
