import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Event } from '../../types';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  TrendingUp,
  Star,
  PlusCircle,
  Trash2,
  Edit3,
  Megaphone,
  Vote,
  BarChart3,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react';

export const OrganizerDashboard: React.FC = () => {
  const {
    events,
    deleteEvent,
    updateEvent,
    feedbacks,
    addLiveAnnouncement,
    setActiveTab,
  } = useApp();

  const [announcementText, setAnnouncementText] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || '');
  const [announcementSent, setAnnouncementSent] = useState(false);

  // Edit Event Modal State
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editTagline, setEditTagline] = useState('');
  const [editVenue, setEditVenue] = useState('');
  const [editMaxSeats, setEditMaxSeats] = useState(500);

  // Registrations Roster Modal
  const [rosterEvent, setRosterEvent] = useState<Event | null>(null);

  const totalRegistrations = events.reduce((acc, ev) => acc + ev.registeredCount, 0);
  const totalMaxSeats = events.reduce((acc, ev) => acc + ev.maxSeats, 0);
  const avgAttendance = Math.round((totalRegistrations / totalMaxSeats) * 100);

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    addLiveAnnouncement(selectedEventId, announcementText);
    setAnnouncementSent(true);
    setAnnouncementText('');
    setTimeout(() => setAnnouncementSent(false), 3000);
  };

  const handleOpenEdit = (ev: Event) => {
    setEditingEvent(ev);
    setEditTitle(ev.title);
    setEditTagline(ev.tagline);
    setEditVenue(ev.venue);
    setEditMaxSeats(ev.maxSeats);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    updateEvent(editingEvent.id, {
      title: editTitle,
      tagline: editTagline,
      venue: editVenue,
      maxSeats: editMaxSeats,
    });

    setEditingEvent(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-2">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Collegiate Host Administration Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            Organizer Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Manage registrations, dispatch live stage announcements, inspect analytics and participant rosters
          </p>
        </div>

        <button
          onClick={() => setActiveTab('create-event')}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Event</span>
        </button>
      </div>

      {/* Statistics Row with Tabular Figures */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Total Participants</span>
            <Users className="w-4 h-4 text-indigo-500" />
          </div>
          <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            1,437
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 block mt-1">
            +18% from last semester
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Total Registrations</span>
            <CalendarCheck className="w-4 h-4 text-indigo-500" />
          </div>
          <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {totalRegistrations}
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">
            across {events.length} campus events
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Capacity Fill Rate</span>
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
          <span className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 tabular-nums">
            {avgAttendance}%
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 block mt-1">
            High attendance velocity
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Engagement Rate</span>
            <BarChart3 className="w-4 h-4 text-indigo-500" />
          </div>
          <span className="text-2xl font-bold font-mono text-purple-600 dark:text-purple-400 tabular-nums">
            89.4%
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">
            Chat, ideas & live polls
          </span>
        </div>

        <div className="col-span-2 lg:col-span-1 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Feedback Score</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <span className="text-2xl font-bold font-mono text-amber-500 tabular-nums">
            4.9 / 5.0
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">
            184 student reviews
          </span>
        </div>

      </div>

      {/* Analytics Charts & Dispatch Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Post Live Announcement & Quick Actions */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Dispatch Announcement Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 mb-3">
              <Megaphone className="w-4 h-4" />
              <span>DISPATCH LIVE ANNOUNCEMENT</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Push notifications directly to connected participants in the Live Arena
            </p>

            <form onSubmit={handlePostAnnouncement} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Event
                </label>
                <select
                  value={selectedEventId}
                  onChange={e => setSelectedEventId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                >
                  {events.map(ev => (
                    <option key={ev.id} value={ev.id}>
                      {ev.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Announcement Message
                </label>
                <textarea
                  rows={3}
                  required
                  value={announcementText}
                  onChange={e => setAnnouncementText(e.target.value)}
                  placeholder="e.g. Mentor breakout rooms are now open in Hall B..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Broadcast to Participants</span>
                <Megaphone className="w-3.5 h-3.5" />
              </button>

              {announcementSent && (
                <p className="text-xs text-emerald-600 text-center font-medium flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Broadcast delivered to all attendees!
                </p>
              )}
            </form>
          </div>

          {/* Category Distribution Bar Chart */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Event Category Breakdown
            </h3>

            <div className="space-y-3 text-xs">
              {[
                { label: 'Hackathons', count: 384, max: 500, color: 'bg-indigo-600' },
                { label: 'Workshops', count: 220, max: 250, color: 'bg-purple-600' },
                { label: 'Conferences', count: 310, max: 400, color: 'bg-emerald-600' },
                { label: 'Competitions', count: 88, max: 120, color: 'bg-amber-600' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {item.label}
                    </span>
                    <span className="font-mono text-slate-400">
                      {item.count} / {item.max} seats ({Math.round((item.count / item.max) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${(item.count / item.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Managed Events Table & Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Active Events Managed ({events.length})
              </h3>
              <span className="text-xs text-slate-400">
                Live seat counters & action controls
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 uppercase font-semibold">
                    <th className="py-2.5 px-3">Event</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Seats Filled</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {events.map(ev => (
                    <tr key={ev.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-900 dark:text-white block truncate max-w-[200px]">
                          {ev.title}
                        </span>
                        <span className="text-[10px] text-slate-400">{ev.date}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                        {ev.category}
                      </td>
                      <td className="py-3 px-3 font-mono tabular-nums">
                        {ev.registeredCount} / {ev.maxSeats}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setRosterEvent(ev)}
                            className="px-2 py-1 text-[11px] rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 font-medium cursor-pointer"
                          >
                            Roster
                          </button>
                          <button
                            onClick={() => handleOpenEdit(ev)}
                            className="p-1 rounded text-slate-500 hover:text-indigo-600 cursor-pointer"
                            title="Edit event"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteEvent(ev.id)}
                            className="p-1 rounded text-slate-400 hover:text-rose-500 cursor-pointer"
                            title="Delete event"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Student Feedback & Ratings Stream */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              Recent Attendee Feedback
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Real-time survey ratings submitted by verified attendees
            </p>

            <div className="space-y-3">
              {[
                {
                  id: 'f1',
                  user: 'Liam O’Connor',
                  event: 'HackSphere 2026',
                  rating: 5,
                  tag: 'Well Organized',
                  comment: 'The team matching feature helped our squad find an awesome presenter in under 10 minutes!',
                },
                {
                  id: 'f2',
                  user: 'Zainab Al-Hassan',
                  event: 'Modern Architecture Workshop',
                  rating: 5,
                  tag: 'Great Mentors',
                  comment: 'Code review breakout sessions were super clear and the digital passport is awesome for LinkedIn.',
                },
              ].map(f => (
                <div
                  key={f.id}
                  className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {f.user} · {f.event}
                    </span>
                    <div className="flex items-center text-amber-500">
                      {'★'.repeat(f.rating)}
                    </div>
                  </div>
                  <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 mb-1">
                    {f.tag}
                  </span>
                  <p className="text-slate-600 dark:text-slate-300">{f.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Edit Event Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Edit Event Settings
              </h3>
              <button
                onClick={() => setEditingEvent(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={editTagline}
                  onChange={e => setEditTagline(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Venue / Location
                </label>
                <input
                  type="text"
                  value={editVenue}
                  onChange={e => setEditVenue(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Max Seats
                </label>
                <input
                  type="number"
                  value={editMaxSeats}
                  onChange={e => setEditMaxSeats(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Registrations Roster Modal */}
      {rosterEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Participant Roster: {rosterEvent.title}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  {rosterEvent.registeredCount} confirmed participants
                </p>
              </div>
              <button
                onClick={() => setRosterEvent(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
              {[
                { name: 'Alex Morgan', role: 'Developer', college: 'Apex Tech', status: 'Checked In' },
                { name: 'Priya Sharma', role: 'Designer', college: 'Apex Tech', status: 'Checked In' },
                { name: 'Marcus Vance', role: 'Researcher', college: 'Apex Tech', status: 'Confirmed' },
                { name: 'Chloe Kim', role: 'Presenter', college: 'Metropolitan Design', status: 'Confirmed' },
                { name: 'David Chen', role: 'Team Leader', college: 'National Tech', status: 'Checked In' },
              ].map((p, idx) => (
                <div key={idx} className="pt-2 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {p.name}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {p.role} · {p.college}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
                    {p.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setRosterEvent(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white"
              >
                Close Roster
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
