import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, User, Team } from '../../types';
import {
  Users,
  UserPlus,
  Sparkles,
  Search,
  Filter,
  Check,
  Send,
  PlusCircle,
  X,
  Shield,
  Code,
  Palette,
  Mic,
  BookOpen,
  Video,
  LogOut,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const ROLES: UserRole[] = [
  'Developer',
  'Designer',
  'Presenter',
  'Researcher',
  'Content Creator',
  'Team Leader',
];

export const TeamBuilder: React.FC = () => {
  const {
    teams,
    candidateUsers,
    user,
    events,
    createTeam,
    joinTeam,
    leaveTeam,
    sendTeamInvite,
    teamInvites,
    setActiveEventForCollab,
    setActiveTab,
  } = useApp();

  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');
  const [candidateSearch, setCandidateSearch] = useState('');
  const [onlyCompatible, setOnlyCompatible] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form for creating a team
  const [teamName, setTeamName] = useState('');
  const [teamTagline, setTeamTagline] = useState('');
  const [teamDesc, setTeamDesc] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || '');
  const [neededRoles, setNeededRoles] = useState<UserRole[]>(['Designer', 'Presenter']);

  // Find user's current team
  const userTeam = teams.find(t => t.members.some(m => m.userId === user.id));

  // Compatibility score calculation
  const calculateCompatibility = (candidate: User): { score: number; reason: string } => {
    let score = 70;
    let reason = 'Active collegiate participant with verified skills';

    // If user has a team that needs this candidate's role
    if (userTeam && userTeam.neededRoles.includes(candidate.role)) {
      score += 25;
      reason = `Matches needed team vacancy: ${candidate.role}`;
    }

    // Shared interests
    const commonInterests = candidate.interests.filter(i => user.interests.includes(i));
    if (commonInterests.length > 0) {
      score += 15;
      reason += ` · Shared focus on ${commonInterests[0]}`;
    }

    return {
      score: Math.min(99, score),
      reason,
    };
  };

  const filteredCandidates = candidateUsers.filter(c => {
    if (selectedRoleFilter !== 'all' && c.role !== selectedRoleFilter) return false;
    if (candidateSearch.trim()) {
      const q = candidateSearch.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchSkill = c.skills.some(s => s.toLowerCase().includes(q));
      const matchRole = c.role.toLowerCase().includes(q);
      if (!matchName && !matchSkill && !matchRole) return false;
    }
    if (onlyCompatible) {
      const comp = calculateCompatibility(c);
      if (comp.score < 80) return false;
    }
    return true;
  });

  const handleCreateTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim() || !selectedEventId) return;

    createTeam(teamName, teamTagline, teamDesc, selectedEventId, neededRoles);
    setIsCreateModalOpen(false);
    setTeamName('');
    setTeamTagline('');
    setTeamDesc('');
  };

  const toggleNeededRole = (r: UserRole) => {
    setNeededRoles(prev =>
      prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Collegiate Matchmaking Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            Find Your Team
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Build complementary cross-functional teams with developers, designers, researchers & presenters
          </p>
        </div>

        <div className="flex items-center gap-3">
          {userTeam ? (
            <button
              onClick={() => {
                const targetEvent = events.find(e => e.id === userTeam.eventId) || events[0];
                setActiveEventForCollab(targetEvent);
                setActiveTab('collab');
              }}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Go to My Team Room</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm flex items-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create a New Team</span>
            </button>
          )}
        </div>
      </div>

      {/* User's Active Team Banner (if user is in a team) */}
      {userTeam && (
        <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-200 dark:border-indigo-900/60">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <span>YOUR ACTIVE TEAM</span>
                <span aria-hidden="true">·</span>
                <span>{userTeam.eventTitle}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {userTeam.name}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
                {userTeam.tagline || userTeam.description}
              </p>

              {/* Members Row */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {userTeam.members.map(member => (
                  <div
                    key={member.userId}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                  >
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-7 h-7 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white block">
                        {member.name}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {member.role}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Open vacancy slots */}
                {userTeam.neededRoles.map((role, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 px-3 rounded-xl border border-dashed border-indigo-300 dark:border-indigo-800 text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Looking for {role}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const ev = events.find(e => e.id === userTeam.eventId) || events[0];
                  setActiveEventForCollab(ev);
                  setActiveTab('collab');
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                Team Collaboration Room
              </button>
              <button
                onClick={() => leaveTeam(userTeam.id)}
                className="px-3 py-2 text-xs font-medium text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
              >
                Leave Team
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section 1: Candidate Search & Matchmaking */}
      <div className="mt-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Find Compatible Teammates</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Algorithm ranks candidates based on complementary skill gaps and shared project interests
            </p>
          </div>

          <button
            onClick={() => setOnlyCompatible(!onlyCompatible)}
            className={`px-3.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
              onlyCompatible
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>High Compatibility Only (80%+)</span>
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setSelectedRoleFilter('all')}
              className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedRoleFilter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Roles
            </button>
            {ROLES.map(role => (
              <button
                key={role}
                onClick={() => setSelectedRoleFilter(role)}
                className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedRoleFilter === role
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={candidateSearch}
              onChange={e => setCandidateSearch(e.target.value)}
              placeholder="Search by skill or candidate name..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredCandidates.map(candidate => {
          const compatibility = calculateCompatibility(candidate);
          const isInvited = teamInvites.some(
            inv => inv.toUserId === candidate.id && inv.status === 'pending'
          );

          return (
            <div
              key={candidate.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Avatar and Match % Header */}
                <div className="flex items-start justify-between">
                  <img
                    src={candidate.avatar}
                    alt={candidate.name}
                    className="w-14 h-14 rounded-xl object-cover ring-2 ring-indigo-500/20"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono">
                      {compatibility.score}% Match
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">
                      {candidate.experience}
                    </span>
                  </div>
                </div>

                {/* Candidate Info */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-3">
                  {candidate.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
                  <span>{candidate.role}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-slate-500 font-normal">{candidate.college.split(' ')[0]}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {candidate.bio}
                </p>

                {/* Skills tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {candidate.skills.slice(0, 3).map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      {sk}
                    </span>
                  ))}
                  {candidate.skills.length > 3 && (
                    <span className="text-[10px] text-slate-400 self-center">
                      +{candidate.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Match reason notice */}
                <p className="mt-3 text-[11px] text-indigo-600/90 dark:text-indigo-400/90 bg-indigo-50/50 dark:bg-indigo-950/30 p-2 rounded-lg leading-tight">
                  💡 {compatibility.reason}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                {isInvited ? (
                  <span className="w-full py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 text-xs font-semibold flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Invitation Sent
                  </span>
                ) : userTeam ? (
                  <button
                    onClick={() => sendTeamInvite(candidate.id, userTeam.id)}
                    className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Invite to {userTeam.name}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="w-full py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Create Team to Invite
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Section 2: Explore Other Teams Looking for Members */}
      <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Open Teams Recruiting Members
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Join existing project teams working towards hackathons and competitions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map(team => {
            const isUserMember = team.members.some(m => m.userId === user.id);
            const isFull = team.members.length >= team.maxMembers;

            return (
              <div
                key={team.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 truncate max-w-[200px] block">
                        {team.eventTitle}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                        {team.name}
                      </h3>
                    </div>
                    <span className="text-xs font-mono tabular-nums text-slate-400">
                      {team.members.length}/{team.maxMembers} Members
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {team.tagline || team.description}
                  </p>

                  {/* Member avatars */}
                  <div className="mt-4">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                      Current Members
                    </span>
                    <div className="flex items-center gap-2">
                      {team.members.map(m => (
                        <div key={m.userId} title={`${m.name} (${m.role})`}>
                          <img
                            src={m.avatar}
                            alt={m.name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-slate-800"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vacant Needed Roles */}
                  <div className="mt-3">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                      Vacancies
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {team.neededRoles.map((role, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[11px] rounded bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40"
                        >
                          Need {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  {isUserMember ? (
                    <button
                      onClick={() => {
                        const ev = events.find(e => e.id === team.eventId) || events[0];
                        setActiveEventForCollab(ev);
                        setActiveTab('collab');
                      }}
                      className="w-full py-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold hover:bg-indigo-100 transition-colors cursor-pointer"
                    >
                      Enter Team Room
                    </button>
                  ) : (
                    <button
                      onClick={() => joinTeam(team.id)}
                      disabled={isFull}
                      className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        isFull
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      {isFull ? 'Team Full' : 'Request to Join Team'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Team Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Create a New Project Team
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Invite compatible teammates and collaborate in real-time
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTeamSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Team Name *
                </label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={e => setTeamName(e.target.value)}
                  placeholder="e.g. NeuralCreators, QuantumForge"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Associated Event *
                </label>
                <select
                  value={selectedEventId}
                  onChange={e => setSelectedEventId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {events.map(ev => (
                    <option key={ev.id} value={ev.id}>
                      {ev.title} ({ev.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tagline / Pitch
                </label>
                <input
                  type="text"
                  value={teamTagline}
                  onChange={e => setTeamTagline(e.target.value)}
                  placeholder="e.g. Building an AI companion for live team brainstorms"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Needed Roles to Recruit
                </label>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {ROLES.filter(r => r !== user.role).map(role => {
                    const isSelected = neededRoles.includes(role);
                    return (
                      <button
                        type="button"
                        key={role}
                        onClick={() => toggleNeededRole(role)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {role} {isSelected && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm cursor-pointer"
                >
                  Create Team (+60 pts)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
