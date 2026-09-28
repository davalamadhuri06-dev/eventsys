import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_LEADERBOARD } from '../../data/seedData';
import {
  Trophy,
  Medal,
  Award,
  Sparkles,
  Flame,
  CheckCircle2,
  Users,
  Calendar,
  Star,
  Zap,
} from 'lucide-react';

export const Leaderboard: React.FC = () => {
  const { user, setActiveTab } = useApp();
  const [timeFilter, setTimeFilter] = useState<'all' | 'month' | 'college'>('all');

  // Dynamically update user's points and rank in the leaderboard list
  const currentLeaderboard = INITIAL_LEADERBOARD.map(entry => {
    if (entry.id === user.id || entry.name === user.name) {
      return {
        ...entry,
        points: user.points,
        badges: user.badges.length,
        eventsAttended: user.registeredEventIds.length + 3,
      };
    }
    return entry;
  }).sort((a, b) => b.points - a.points).map((item, index) => ({
    ...item,
    rank: index + 1,
  }));

  const topThree = currentLeaderboard.slice(0, 3);
  const restOfLeaderboard = currentLeaderboard.slice(3);

  const allBadgesCatalog = [
    {
      id: 'badge_first',
      name: 'First Event',
      icon: '🏅',
      description: 'Registered for your first event on EventSphere',
      points: '+50 pts',
    },
    {
      id: 'badge_team',
      name: 'Team Player',
      icon: '🤝',
      description: 'Formed or joined a cross-functional project team',
      points: '+60 pts',
    },
    {
      id: 'badge_active',
      name: 'Active Participant',
      icon: '🔥',
      description: 'Participated in live sessions and interactive polls',
      points: '+40 pts',
    },
    {
      id: 'badge_idea',
      name: 'Idea Creator',
      icon: '💡',
      description: 'Shared a high-impact idea that received 10+ votes',
      points: '+40 pts',
    },
    {
      id: 'badge_champion',
      name: 'Event Champion',
      icon: '🏆',
      description: 'Accumulated over 500 total community points',
      points: '+100 pts',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>Collegiate Innovation Standings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            EventSphere Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Earn points by attending hackathons, voting in live polls, creating teams, and posting ideas
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
          <button
            onClick={() => setTimeFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              timeFilter === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All-Time
          </button>
          <button
            onClick={() => setTimeFilter('month')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              timeFilter === 'month'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setTimeFilter('college')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              timeFilter === 'college'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            My College Division
          </button>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        
        {/* Silver: Rank 2 */}
        {topThree[1] && (
          <div className="order-2 md:order-1 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center relative hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-sm mx-auto mb-3">
              🥈 2nd
            </div>
            <img
              src={topThree[1].avatar}
              alt={topThree[1].name}
              className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-slate-300 dark:ring-slate-700"
              referrerPolicy="no-referrer"
            />
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-3">
              {topThree[1].name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{topThree[1].college}</p>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-around text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Points</span>
                <span className="font-bold font-mono text-indigo-600 dark:text-indigo-400 text-sm tabular-nums">
                  {topThree[1].points}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Badges</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {topThree[1].badges}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Events</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {topThree[1].eventsAttended}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Gold: Rank 1 (Tall Marquee Center) */}
        {topThree[0] && (
          <div className="order-1 md:order-2 p-8 rounded-3xl bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent border-2 border-amber-400/70 dark:border-amber-500/50 text-center relative shadow-xl hover:shadow-2xl transition-all scale-105">
            <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-base mx-auto mb-3 shadow-md">
              👑 1st
            </div>
            <img
              src={topThree[0].avatar}
              alt={topThree[0].name}
              className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-amber-400"
              referrerPolicy="no-referrer"
            />
            <h3 className="text-lg font-black text-slate-900 dark:text-white mt-3 font-display">
              {topThree[0].name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {topThree[0].college}
            </p>
            <div className="mt-5 pt-4 border-t border-amber-300/40 dark:border-amber-800/40 flex items-center justify-around text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Points</span>
                <span className="font-black font-mono text-amber-500 text-lg tabular-nums">
                  {topThree[0].points}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Badges</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-base">
                  {topThree[0].badges}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Events</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-base">
                  {topThree[0].eventsAttended}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Bronze: Rank 3 */}
        {topThree[2] && (
          <div className="order-3 md:order-3 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center relative hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-full bg-amber-700/20 text-amber-800 dark:text-amber-400 flex items-center justify-center font-bold text-sm mx-auto mb-3">
              🥉 3rd
            </div>
            <img
              src={topThree[2].avatar}
              alt={topThree[2].name}
              className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-amber-700/30"
              referrerPolicy="no-referrer"
            />
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-3">
              {topThree[2].name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{topThree[2].college}</p>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-around text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Points</span>
                <span className="font-bold font-mono text-indigo-600 dark:text-indigo-400 text-sm tabular-nums">
                  {topThree[2].points}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Badges</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {topThree[2].badges}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Events</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {topThree[2].eventsAttended}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Leaderboard Table */}
      <div className="mt-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Full Rankings Roster
          </h3>
          <span className="text-xs text-slate-400">
            Updated in real-time with points telemetry
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-950/50">
                <th className="py-3.5 px-6">Rank</th>
                <th className="py-3.5 px-6">Participant</th>
                <th className="py-3.5 px-6">Role</th>
                <th className="py-3.5 px-6">Badges</th>
                <th className="py-3.5 px-6">Events Attended</th>
                <th className="py-3.5 px-6 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {currentLeaderboard.map(entry => {
                const isCurrentUser = entry.name === user.name;

                return (
                  <tr
                    key={entry.id}
                    className={`transition-colors ${
                      isCurrentUser
                        ? 'bg-indigo-50/70 dark:bg-indigo-950/30 font-semibold'
                        : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-4 px-6 font-mono font-bold">
                      {entry.rank === 1 ? '🥇 1' : entry.rank === 2 ? '🥈 2' : entry.rank === 3 ? '🥉 3' : `#${entry.rank}`}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={entry.avatar}
                          alt={entry.name}
                          className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">
                            {entry.name} {isCurrentUser && '(You)'}
                          </span>
                          <span className="text-[11px] text-slate-400 font-normal">
                            {entry.college}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                      {entry.role}
                    </td>
                    <td className="py-4 px-6 font-mono tabular-nums text-slate-600 dark:text-slate-300">
                      {entry.badges} Badges
                    </td>
                    <td className="py-4 px-6 font-mono tabular-nums text-slate-600 dark:text-slate-300">
                      {entry.eventsAttended} Events
                    </td>
                    <td className="py-4 px-6 text-right font-mono font-bold text-indigo-600 dark:text-indigo-400 tabular-nums text-sm">
                      {entry.points} pts
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Badges Showcase Section */}
      <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Official Badges & Achievements
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Collect badges across your collegiate innovation journey
            </p>
          </div>
          <button
            onClick={() => setActiveTab('passport')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            View Your Passport →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {allBadgesCatalog.map(badge => {
            const hasEarned = user.badges.some(b => b.name === badge.name || b.id === badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  hasEarned
                    ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900/60 shadow-xs'
                    : 'bg-slate-50/50 dark:bg-slate-950/40 border-dashed border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {badge.name}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {badge.description}
                </p>
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {hasEarned ? (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-mono">
                      Locked ({badge.points})
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
