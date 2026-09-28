import React from 'react';
import { Event } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Bookmark,
  CheckCircle,
  ArrowUpRight,
  Radio,
} from 'lucide-react';

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, featured = false }) => {
  const {
    user,
    registerForEvent,
    toggleSaveEvent,
    setActiveEventForDetails,
    setActiveEventForCollab,
    setActiveTab,
  } = useApp();

  const isRegistered = user.registeredEventIds.includes(event.id);
  const isSaved = user.savedEventIds.includes(event.id);
  const isSoldOut = event.registeredCount >= event.maxSeats;

  const handleCardClick = () => {
    setActiveEventForDetails(event);
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isRegistered && !isSoldOut) {
      registerForEvent(event.id);
    }
  };

  const handleCollabClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveEventForCollab(event);
    setActiveTab('collab');
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveEvent(event.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-400 dark:hover:border-indigo-600/80 transition-all duration-200 hover:shadow-lg cursor-pointer ${
        featured ? 'sm:col-span-2 lg:col-span-2' : ''
      }`}
    >
      {/* Event Image Banner with Scrim Overlay */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none" />

        {/* Top Floating Controls: Save & Live indicator */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {event.isLive && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-rose-500/90 text-white text-[11px] font-bold backdrop-blur-sm shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                LIVE NOW
              </span>
            )}
            {event.fee === 0 ? (
              <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-emerald-500/30">
                Free
              </span>
            ) : (
              <span className="text-[11px] font-semibold text-amber-200 bg-amber-950/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-amber-500/30 font-mono">
                ${event.fee}
              </span>
            )}
          </div>

          <button
            onClick={handleSaveClick}
            aria-label={isSaved ? 'Remove from saved' : 'Save event'}
            className="p-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors cursor-pointer"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
        </div>

        {/* Bottom image metadata: clean unboxed text */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
            <span>{event.category}</span>
            <span aria-hidden="true">·</span>
            <span>{event.isOnline ? 'Virtual' : event.location.split(',')[0]}</span>
          </div>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
            {event.title}
          </h3>

          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {event.tagline || event.description}
          </p>

          {/* Clean Unboxed Metadata with Typographic Separators */}
          <div className="mt-3.5 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>{event.date}</span>
              <span aria-hidden="true">·</span>
              <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>{event.time.split('-')[0]}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span className="tabular-nums font-mono">
                {event.registeredCount} / {event.maxSeats} registered
              </span>
              <span aria-hidden="true">·</span>
              <span className="truncate">By {event.organizer.name}</span>
            </div>
          </div>

          {/* Seat Capacity Progress hairline */}
          <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                event.registeredCount / event.maxSeats > 0.85
                  ? 'bg-rose-500'
                  : 'bg-indigo-500'
              }`}
              style={{ width: `${Math.min(100, (event.registeredCount / event.maxSeats) * 100)}%` }}
            />
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          {isRegistered ? (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="w-3.5 h-3.5" />
                Registered
              </span>
              <button
                onClick={handleCollabClick}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 hover:bg-indigo-100 transition-colors cursor-pointer"
              >
                Collab Room
              </button>
            </div>
          ) : (
            <button
              onClick={handleRegisterClick}
              disabled={isSoldOut}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                isSoldOut
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm active:scale-95'
              }`}
            >
              {isSoldOut ? 'Sold Out' : 'Register Now'}
            </button>
          )}

          <button
            onClick={handleCardClick}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
