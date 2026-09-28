import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Event, LivePoll } from '../../types';
import {
  Radio,
  Clock,
  Users,
  Vote,
  Sparkles,
  MessageCircle,
  ThumbsUp,
  AlertCircle,
  Send,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface QAQuestion {
  id: string;
  author: string;
  role: string;
  avatar: string;
  text: string;
  upvotes: number;
  hasUpvoted: boolean;
  time: string;
}

export const LiveEventMode: React.FC = () => {
  const {
    events,
    polls,
    votePoll,
    user,
    awardPoints,
    claimCertificate,
    setActiveTab,
    setActiveEventForCollab,
  } = useApp();

  // Find live event or default to HackSphere 2026
  const liveEvents = events.filter(e => e.isLive);
  const [selectedLiveEventId, setSelectedLiveEventId] = useState(
    liveEvents[0]?.id || events[0].id
  );

  const currentEvent = events.find(e => e.id === selectedLiveEventId) || events[0];

  // Active countdown timer (e.g. 24 mins 36 seconds, decrements every second)
  const [secondsRemaining, setSecondsRemaining] = useState(24 * 60 + 36);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 25 * 60));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Poll for current event
  const currentPoll = polls.find(p => p.eventId === currentEvent.id) || polls[0];

  // Live Q&A state
  const [qaQuestions, setQaQuestions] = useState<QAQuestion[]>([
    {
      id: 'qa_1',
      author: 'David Chen',
      role: 'Hardware Lead',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      text: 'Are we permitted to run edge models locally on student laptops or do we have to call cloud endpoints?',
      upvotes: 28,
      hasUpvoted: false,
      time: '12m ago',
    },
    {
      id: 'qa_2',
      author: 'Elena Rostova',
      role: 'Full-Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80',
      text: 'When will the mentor checkpoint rooms open for architecture code reviews?',
      upvotes: 19,
      hasUpvoted: true,
      time: '20m ago',
    },
    {
      id: 'qa_3',
      author: 'Priya Sharma',
      role: 'UI Designer',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80',
      text: 'Can we submit interactive Figma prototypes alongside the live GitHub repository link?',
      upvotes: 14,
      hasUpvoted: false,
      time: '35m ago',
    },
  ]);

  const [newQuestionText, setNewQuestionText] = useState('');

  const handleUpvoteQuestion = (qId: string) => {
    setQaQuestions(prev =>
      prev.map(q => {
        if (q.id === qId) {
          const wasUpvoted = q.hasUpvoted;
          return {
            ...q,
            hasUpvoted: !wasUpvoted,
            upvotes: wasUpvoted ? q.upvotes - 1 : q.upvotes + 1,
          };
        }
        return q;
      })
    );
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newQ: QAQuestion = {
      id: `qa_${Date.now()}`,
      author: user.name,
      role: user.role,
      avatar: user.avatar,
      text: newQuestionText,
      upvotes: 1,
      hasUpvoted: true,
      time: 'Just now',
    };

    setQaQuestions(prev => [newQ, ...prev]);
    setNewQuestionText('');
    awardPoints(20, 'Posted question in live event stage');
  };

  // Live announcements
  const announcements = [
    {
      id: 'a1',
      title: 'Mentor Office Hours Now Open',
      desc: 'Technical architects from sponsor labs are available in breakout rooms 1-4.',
      time: '5m ago',
    },
    {
      id: 'a2',
      title: 'Hardware Lab Check-out Extended',
      desc: 'Microcontroller and sensor kits can be retained until 06:00 PM.',
      time: '25m ago',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Live Header & Stage Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>INTERACTIVE LIVE EVENT ARENA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            Live Event Mode
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Real-time sessions, interactive attendee polls, session countdowns & Q&A
          </p>
        </div>

        {/* Live Stage Selector */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">Broadcasting:</span>
          <select
            value={selectedLiveEventId}
            onChange={e => setSelectedLiveEventId(e.target.value)}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            {events.map(ev => (
              <option key={ev.id} value={ev.id}>
                {ev.title.slice(0, 36)} {ev.isLive ? '🔴' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Broadcast Stage Hero Banner */}
      <div className="mt-8 rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl relative">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={currentEvent.image}
            alt={currentEvent.title}
            className="w-full h-full object-cover opacity-35 filter blur-[1px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />

          {/* Overlay Content */}
          <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between text-white">
            
            {/* Top Bar inside broadcast: Live badge & Participant Counter */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  LIVE NOW
                </span>
                <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                  {currentEvent.category} · {currentEvent.venue}
                </span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-emerald-400">
                <Users className="w-3.5 h-3.5" />
                <span className="tabular-nums font-mono">
                  {currentEvent.liveDetails?.liveParticipants || 428} Participants Connected
                </span>
              </div>
            </div>

            {/* Middle: Current Session & Large Countdown */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto">
              <div className="md:col-span-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 block mb-1">
                  CURRENT SESSION
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-white leading-tight">
                  {currentEvent.liveDetails?.currentSession || 'Sprint 1: Architecture & Prototype Phase'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2">
                  Next Up:{' '}
                  <strong className="text-white font-medium">
                    {currentEvent.liveDetails?.nextSession || 'Mid-Point Architecture Checkpoint'}
                  </strong>
                </p>
              </div>

              {/* Ticking Countdown Box */}
              <div className="md:col-span-4 flex flex-col items-start md:items-end">
                <div className="p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 text-center min-w-[200px]">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    SESSION ENDS IN
                  </span>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-amber-400 tracking-wider tabular-nums">
                    {formatCountdown(secondsRemaining)}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Auto-advancing to next milestone
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions inside Stage */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span>Room Code:</span>
                <span className="font-mono text-white font-bold bg-white/10 px-2 py-0.5 rounded">
                  {currentEvent.liveDetails?.roomCode || 'ESP-HACK-LIVE'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setActiveEventForCollab(currentEvent);
                    setActiveTab('collab');
                  }}
                  className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold transition-colors cursor-pointer"
                >
                  Open Team Room
                </button>
                <button
                  onClick={() => claimCertificate(currentEvent.id)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors cursor-pointer shadow-sm"
                >
                  Claim Certificate (+150 pts)
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Grid: Interactive Live Poll & Live Announcements */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Live Poll (⭐⭐⭐) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                <Vote className="w-4 h-4" />
                <span>INTERACTIVE LIVE POLL</span>
              </div>
              <span className="text-xs font-mono text-slate-400 tabular-nums">
                {currentPoll.totalVotes} total votes
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {currentPoll.question}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
              Vote now to influence the live mentor breakout topics. Earns +25 points!
            </p>

            {/* Poll Options */}
            <div className="space-y-3">
              {currentPoll.options.map(option => {
                const percentage =
                  currentPoll.totalVotes > 0
                    ? Math.round((option.votes / currentPoll.totalVotes) * 100)
                    : 0;
                const isSelected = currentPoll.userVotedOptionId === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => votePoll(currentPoll.id, option.id)}
                    className={`relative w-full p-4 rounded-xl border text-left transition-all overflow-hidden cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 ring-1 ring-indigo-500'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-slate-300'
                    }`}
                  >
                    {/* Animated Percentage Fill Bar */}
                    <div
                      className={`absolute top-0 bottom-0 left-0 transition-all duration-500 opacity-20 pointer-events-none ${
                        isSelected ? 'bg-indigo-600' : 'bg-slate-400 dark:bg-slate-600'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />

                    <div className="relative z-10 flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-600 text-white'
                              : 'border-slate-300 dark:border-slate-600'
                          }`}
                        >
                          {isSelected && <span className="text-[10px]">✓</span>}
                        </div>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {option.text}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                          {percentage}%
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono tabular-nums">
                          ({option.votes})
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {currentPoll.userVotedOptionId && (
              <p className="mt-4 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Your vote was counted. You can switch your answer anytime.</span>
              </p>
            )}
          </div>

          {/* Live Q&A Section */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                <MessageCircle className="w-4 h-4" />
                <span>AUDIENCE Q&A STREAM</span>
              </div>
              <span className="text-xs text-slate-400 font-mono tabular-nums">
                {qaQuestions.length} Questions
              </span>
            </div>

            {/* Question Input */}
            <form onSubmit={handleAskQuestion} className="mb-5 flex gap-2">
              <input
                type="text"
                value={newQuestionText}
                onChange={e => setNewQuestionText(e.target.value)}
                placeholder="Ask mentors or organizers a question (+20 pts)..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={!newQuestionText.trim()}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Questions List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {qaQuestions.map(q => (
                <div
                  key={q.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={q.avatar}
                      alt={q.author}
                      className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {q.author}
                        </span>
                        <span className="text-slate-400">· {q.role}</span>
                        <span className="text-slate-400 font-mono text-[10px]">
                          {q.time}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 mt-1 leading-relaxed">
                        {q.text}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleUpvoteQuestion(q.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                      q.hasUpvoted
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-white'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span className="font-mono tabular-nums">{q.upvotes}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Announcements & Schedule Tracker */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Live Announcements Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 mb-4">
              <Sparkles className="w-4 h-4" />
              <span>LIVE ORGANIZER ANNOUNCEMENTS</span>
            </div>

            <div className="space-y-3">
              {announcements.map(ann => (
                <div
                  key={ann.id}
                  className="p-3.5 rounded-xl border border-amber-200/80 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 text-xs"
                >
                  <div className="flex items-center justify-between text-amber-800 dark:text-amber-300 font-bold mb-1">
                    <span>{ann.title}</span>
                    <span className="text-[10px] text-amber-600 font-mono">{ann.time}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {ann.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Live Schedule Tracker */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Stage Agenda Milestones
            </h3>

            <div className="space-y-3">
              {currentEvent.timeline.map((item, idx) => {
                const isActive = item.status === 'active';
                const isCompleted = item.status === 'completed';

                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                      isActive
                        ? 'border-rose-400 bg-rose-50/60 dark:bg-rose-950/20 dark:border-rose-900'
                        : isCompleted
                        ? 'border-emerald-200 dark:border-emerald-900/30 bg-emerald-50/30 dark:bg-emerald-950/10'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {item.time}
                      </span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {item.title}
                      </span>
                    </div>

                    {isActive && (
                      <span className="text-[10px] font-bold text-rose-500 bg-rose-100 dark:bg-rose-950 px-2 py-0.5 rounded">
                        NOW
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-[10px] font-bold text-emerald-600">
                        ✓ Done
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
