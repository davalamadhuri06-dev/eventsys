import React, { useState } from 'react';
import { Event } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle,
  Share2,
  CalendarPlus,
  MessageSquare,
  Users2,
  AlertCircle,
  Radio,
  Download,
  Copy,
  Check,
} from 'lucide-react';

interface EventDetailsModalProps {
  event: Event;
  onClose: () => void;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, onClose }) => {
  const {
    user,
    registerForEvent,
    unregisterFromEvent,
    setActiveEventForCollab,
    setActiveTab,
    awardPoints,
  } = useApp();

  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedTimelineStage, setSelectedTimelineStage] = useState<string | null>(
    event.timeline.find(t => t.status === 'active')?.id || event.timeline[0]?.id || null
  );

  const isRegistered = user.registeredEventIds.includes(event.id);
  const isSoldOut = event.registeredCount >= event.maxSeats;
  const availableSeats = Math.max(0, event.maxSeats - event.registeredCount);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddToCalendar = () => {
    // Generate standard .ics calendar format
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EventSphere//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description.replace(/\n/g, ' ')}
LOCATION:${event.venue}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}-invite.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    awardPoints(10, 'Exported event to personal calendar');
  };

  const handleGoToCollab = () => {
    onClose();
    setActiveEventForCollab(event);
    setActiveTab('collab');
  };

  const handleFindTeam = () => {
    onClose();
    setActiveTab('teams');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl my-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-slate-100 flex flex-col max-h-[92vh]">
        
        {/* Banner with close button */}
        <div className="relative h-60 sm:h-72 w-full shrink-0 bg-slate-900">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-md bg-indigo-600/90 text-white text-xs font-semibold backdrop-blur-sm">
              {event.category}
            </span>
            {event.isLive && (
              <span className="px-3 py-1 rounded-md bg-rose-500/90 text-white text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                LIVE SESSION IN PROGRESS
              </span>
            )}
            <span className="px-3 py-1 rounded-md bg-black/50 text-white text-xs font-mono backdrop-blur-sm">
              {event.fee === 0 ? 'Free' : `$${event.fee}`}
            </span>
          </div>

          {/* Bottom Title on Banner */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight font-display">
              {event.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-1">
              {event.tagline}
            </p>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          
          {/* Key Facts Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Date & Time</span>
              <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                {event.date}
              </span>
              <span className="text-slate-500 text-[11px] block mt-0.5">{event.time}</span>
            </div>

            <div>
              <span className="text-slate-400 block mb-0.5">Location</span>
              <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                {event.isOnline ? 'Online / Virtual' : event.location}
              </span>
              <span className="text-slate-500 text-[11px] block mt-0.5 truncate">{event.venue}</span>
            </div>

            <div>
              <span className="text-slate-400 block mb-0.5">Registration Status</span>
              <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1 font-mono tabular-nums">
                <Users className="w-3.5 h-3.5 text-indigo-500" />
                {event.registeredCount} / {event.maxSeats}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 text-[11px] block mt-0.5 font-medium">
                {availableSeats} seats remaining
              </span>
            </div>

            <div>
              <span className="text-slate-400 block mb-0.5">Deadline</span>
              <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                {event.deadline}
              </span>
              <span className="text-slate-500 text-[11px] block mt-0.5">Registration closes 11:59 PM</span>
            </div>
          </div>

          {/* Organizer Card */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <img
                src={event.organizer.avatar}
                alt={event.organizer.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/20"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {event.organizer.name}
                  </span>
                  {event.organizer.verified && (
                    <ShieldCheck className="w-4 h-4 text-indigo-500" />
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {event.organizer.role} · {event.organizer.college}
                </p>
              </div>
            </div>

            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Verified Organizer
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              About This Event
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Interactive Event Timeline */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Interactive Event Timeline
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Click any stage to inspect milestones and schedule details
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {event.timeline.map((item, idx) => {
                const isSelected = selectedTimelineStage === item.id;
                const isCompleted = item.status === 'completed';
                const isActive = item.status === 'active';

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedTimelineStage(item.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800 ring-1 ring-rose-500/30'
                        : isSelected
                        ? 'bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-800'
                        : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          {isCompleted ? (
                            <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center text-xs font-bold">
                              ✓
                            </span>
                          ) : isActive ? (
                            <span className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-bold animate-pulse">
                              ●
                            </span>
                          ) : (
                            <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center text-xs font-mono">
                              {idx + 1}
                            </span>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                              {item.time}
                            </span>
                            <span className="text-xs text-slate-300 dark:text-slate-700">—</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">
                              {item.title}
                            </span>
                            {isActive && (
                              <span className="text-[10px] font-bold text-rose-500 bg-rose-100 dark:bg-rose-950 px-2 py-0.5 rounded">
                                CURRENT STAGE
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rules & Eligibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">
                Event Guidelines & Rules
              </h4>
              <ul className="space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-300">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">
                Eligibility & Requirements
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {event.eligibility}
              </p>
              <div className="mt-3 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 text-[11px] text-indigo-700 dark:text-indigo-300">
                All registered participants are eligible for official digital certificates, mentorship check-ins, and peer workspace channels.
              </div>
            </div>
          </div>

        </div>

        {/* Footer Action Buttons */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Share event link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Event'}</span>
            </button>

            <button
              onClick={handleAddToCalendar}
              className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download calendar .ics"
            >
              <CalendarPlus className="w-4 h-4 text-indigo-500" />
              <span>Add to Calendar</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleFindTeam}
              className="px-4 py-2.5 rounded-xl border border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Users2 className="w-4 h-4" />
              <span>Find Team</span>
            </button>

            {isRegistered ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleGoToCollab}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enter Collaboration Room</span>
                </button>

                <button
                  onClick={() => unregisterFromEvent(event.id)}
                  className="px-3 py-2 text-xs text-rose-500 hover:text-rose-600 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => registerForEvent(event.id)}
                disabled={isSoldOut}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md flex items-center gap-2 transition-all cursor-pointer active:scale-95 ${
                  isSoldOut
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>{isSoldOut ? 'Event Sold Out' : 'Register Now (+50 pts)'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
