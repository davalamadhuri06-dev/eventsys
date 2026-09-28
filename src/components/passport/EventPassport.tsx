import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  Calendar,
  CheckCircle2,
  Download,
  GraduationCap,
  QrCode,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Compass,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const EventPassport: React.FC = () => {
  const { user, events, teams, setActiveCertificate, setActiveTab } = useApp();

  const attendedEvents = events.filter(e => user.registeredEventIds.includes(e.id));
  const userTeams = teams.filter(t => user.teams.includes(t.id));

  // Progress Journey milestones
  const journeyMilestones = [
    {
      id: 'm1',
      title: 'First Step: Modern Web Architecture',
      type: 'Workshop',
      date: 'Completed Sep 2026',
      status: 'completed',
      points: '+50 pts',
    },
    {
      id: 'm2',
      title: 'Flagship Hackathon: HackSphere 2026',
      type: 'Hackathon',
      date: 'In Progress (Sprint 1)',
      status: 'active',
      points: '+150 pts',
    },
    {
      id: 'm3',
      title: 'Collegiate UI/UX Design Derby',
      type: 'Competition',
      date: 'Upcoming Oct 28',
      status: 'upcoming',
      points: '+80 pts',
    },
    {
      id: 'm4',
      title: 'AI & Robotics Research Symposium',
      type: 'Conference',
      date: 'Upcoming Nov 2026',
      status: 'upcoming',
      points: '+100 pts',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Verifiable Digital Credential Ledger</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            Official Event Passport
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Your tamper-evident record of collegiate event milestones, team collaborations, and certificates
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">
            Passport ID: <strong className="text-slate-900 dark:text-white">#ESP-9482-2026</strong>
          </span>
        </div>
      </div>

      {/* Main Digital Passport Pass Card */}
      <div className="my-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/60 text-white p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Identity & Avatar Block */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-indigo-400/40 shadow-xl"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-[10px] text-white font-bold">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
                  {user.name}
                </h2>
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
              </div>
              <p className="text-xs text-indigo-200 mt-0.5">
                {user.role} · {user.college}
              </p>
              <p className="text-[11px] text-slate-400 font-mono mt-1">
                Issued by EventSphere Consortium · Valid through 2028
              </p>
            </div>
          </div>

          {/* Key Passport Totals */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
            <div className="px-3">
              <span className="text-[11px] text-indigo-200 block">Total Points</span>
              <span className="text-xl font-bold font-mono text-amber-400 tabular-nums">
                {user.points}
              </span>
            </div>

            <div className="px-3">
              <span className="text-[11px] text-indigo-200 block">Events Stamped</span>
              <span className="text-xl font-bold font-mono text-white tabular-nums">
                {user.registeredEventIds.length}
              </span>
            </div>

            <div className="px-3">
              <span className="text-[11px] text-indigo-200 block">Certificates</span>
              <span className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
                {user.certificates.length}
              </span>
            </div>

            <div className="px-3">
              <span className="text-[11px] text-indigo-200 block">Badges</span>
              <span className="text-xl font-bold font-mono text-purple-300 tabular-nums">
                {user.badges.length}
              </span>
            </div>
          </div>

          {/* QR Verification Pass */}
          <div className="hidden xl:flex flex-col items-center justify-center p-3 rounded-xl bg-white text-slate-900 shadow-md">
            <QrCode className="w-16 h-16 text-slate-900" />
            <span className="text-[9px] font-mono font-bold tracking-wider mt-1 text-slate-600">
              #ESP-9482
            </span>
          </div>

        </div>
      </div>

      {/* Progress Timeline: "Your Event Journey" (⭐⭐⭐) */}
      <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>ACADEMIC INNOVATION ROADMAP</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
              Your Event Journey
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Progression from initial workshops through flagship competitions
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>Workshop</span>
            <span>→</span>
            <span>Hackathon</span>
            <span>→</span>
            <span>Competition</span>
            <span>→</span>
            <span>Conference</span>
          </div>
        </div>

        {/* Milestone Steps Bar */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-6 left-8 right-8 h-1 bg-slate-100 dark:bg-slate-800 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {journeyMilestones.map((ms, idx) => {
              const isCompleted = ms.status === 'completed';
              const isActive = ms.status === 'active';

              return (
                <div
                  key={ms.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isActive
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                      : isCompleted
                      ? 'border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/10'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : isActive
                          ? 'bg-indigo-600 text-white animate-pulse'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                      }`}
                    >
                      {isCompleted ? '✓' : idx + 1}
                    </span>

                    <span className="text-[11px] font-semibold font-mono text-indigo-600 dark:text-indigo-400">
                      {ms.points}
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    {ms.type}
                  </span>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {ms.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    {ms.date}
                  </p>

                  <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
                    <span
                      className={`text-[10px] font-bold ${
                        isCompleted
                          ? 'text-emerald-600'
                          : isActive
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {isCompleted ? '● Completed' : isActive ? '● Currently Active' : '○ Upcoming Stage'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid: Certificates Ledger & Badges Stamped */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Certificates Ledger */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <GraduationCap className="w-4 h-4" />
                <span>OFFICIAL VERIFIED CERTIFICATES</span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {user.certificates.length} Verified
              </span>
            </div>

            <div className="space-y-4">
              {user.certificates.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                  No certificates claimed yet. Complete an event to earn your first verifiable certificate!
                </div>
              ) : (
                user.certificates.map(cert => (
                  <div
                    key={cert.id}
                    className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block mb-0.5">
                        ID: {cert.credentialId}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {cert.eventName}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Issued on {cert.issueDate} by {cert.organizer}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveCertificate(cert)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>View & Download</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Stamped Events Attended */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Event Passport Stamped History
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {attendedEvents.map(event => (
                <div key={event.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block">
                      {event.title}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {event.date} · {event.venue}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-mono text-[11px] font-bold">
                    ✓ Stamped
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Badges Collection & Teams Joined */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Badges Collection */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-4">
              <Award className="w-4 h-4" />
              <span>COLLECTED PASSPORT BADGES ({user.badges.length})</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {user.badges.map(badge => (
                <div
                  key={badge.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-center"
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {badge.name}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {badge.earnedDate}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Teams Joined */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 mb-3">
              <Users className="w-4 h-4" />
              <span>TEAMS JOINED</span>
            </div>

            <div className="space-y-3">
              {userTeams.map(t => (
                <div
                  key={t.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {t.name}
                    </span>
                    <span className="text-[11px] text-slate-400">{t.eventTitle}</span>
                  </div>

                  <button
                    onClick={() => setActiveTab('collab')}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    Open Workspace →
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
