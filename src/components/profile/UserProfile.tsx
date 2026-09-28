import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  Calendar,
  CheckCircle2,
  Download,
  GraduationCap,
  Sparkles,
  Trophy,
  Users,
  Edit2,
  Check,
  Plus,
} from 'lucide-react';

export const UserProfile: React.FC = () => {
  const {
    user,
    events,
    teams,
    setActiveCertificate,
    setActiveTab,
    setActiveFeedbackEvent,
  } = useApp();

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState(user.bio);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [skillsList, setSkillsList] = useState(user.skills);

  const registeredEvents = events.filter(e => user.registeredEventIds.includes(e.id));
  const userTeams = teams.filter(t => user.teams.includes(t.id));

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    if (!skillsList.includes(newSkillInput.trim())) {
      setSkillsList(prev => [...prev, newSkillInput.trim()]);
    }
    setNewSkillInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Profile Header Hero */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-indigo-500/20 shadow-md"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                  {user.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {user.email} · {user.college}
              </p>
              
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 max-w-xl">
                {isEditingBio ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      value={bioInput}
                      onChange={e => setBioInput(e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                    />
                    <button
                      onClick={() => setIsEditingBio(false)}
                      className="p-1.5 rounded-lg bg-indigo-600 text-white text-xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <p className="flex items-center gap-2">
                    <span>{bioInput}</span>
                    <button
                      onClick={() => setIsEditingBio(true)}
                      className="text-slate-400 hover:text-indigo-600"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('passport')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Open Event Passport</span>
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-2 cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>{user.points} Points</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <span className="text-[11px] text-slate-400 block">Total Points</span>
            <span className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400 tabular-nums">
              {user.points}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Badges Collected</span>
            <span className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              {user.badges.length}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Events Registered</span>
            <span className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              {user.registeredEventIds.length}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Certificates</span>
            <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
              {user.certificates.length}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Skills, Badges, Events, Teams */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Skills & Interests */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Skills Section */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Skills & Expertise
            </h3>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {skillsList.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>

            <form onSubmit={handleAddSkill} className="flex gap-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={e => setNewSkillInput(e.target.value)}
                placeholder="Add skill (e.g. Docker, GraphQL)..."
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold cursor-pointer"
              >
                Add
              </button>
            </form>
          </div>

          {/* Interests */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Event Interests
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {user.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Visual Badges Showcase */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Achievements & Badges
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {user.badges.map(b => (
                <div
                  key={b.id}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-center bg-slate-50/50 dark:bg-slate-950/40"
                >
                  <span className="text-2xl block mb-1">{b.icon}</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {b.name}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {b.earnedDate}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Registered Events & Teams */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Registered Events */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                My Registered Events ({registeredEvents.length})
              </h3>
              <button
                onClick={() => setActiveTab('explore')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                Explore More →
              </button>
            </div>

            <div className="space-y-3">
              {registeredEvents.map(event => (
                <div
                  key={event.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                      {event.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {event.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {event.date} · {event.venue}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setActiveFeedbackEvent(event)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      Give Feedback
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('collab');
                      }}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
                    >
                      Collab Room
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              My Verified Certificates ({user.certificates.length})
            </h3>

            <div className="space-y-3">
              {user.certificates.map(cert => (
                <div
                  key={cert.id}
                  className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-mono text-emerald-600 font-bold block text-[10px]">
                      {cert.credentialId}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      {cert.eventName}
                    </h4>
                    <span className="text-slate-400">{cert.issueDate}</span>
                  </div>

                  <button
                    onClick={() => setActiveCertificate(cert)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>View</span>
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
