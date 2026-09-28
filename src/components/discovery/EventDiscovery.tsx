import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { EventCard } from '../landing/EventCard';
import { EventCategory, Event } from '../../types';
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  Calendar,
  DollarSign,
  MapPin,
  CheckCircle2,
  X,
  Clock,
  Users,
} from 'lucide-react';

const CATEGORIES: EventCategory[] = [
  'Hackathons',
  'Technical Events',
  'Workshops',
  'Cultural Events',
  'Sports',
  'Competitions',
  'Conferences',
  'College Events',
  'Networking',
];

export const EventDiscovery: React.FC = () => {
  const {
    events,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setActiveEventForDetails,
    registerForEvent,
    user,
  } = useApp();

  const [dateFilter, setDateFilter] = useState<'all' | 'weekend' | 'month'>('all');
  const [formatFilter, setFormatFilter] = useState<'all' | 'online' | 'offline'>('all');
  const [feeFilter, setFeeFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [availableSeatsOnly, setAvailableSeatsOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'upcoming' | 'popular' | 'seats'>('upcoming');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Filtering & Sorting Logic
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = event.title.toLowerCase().includes(query);
        const matchesDesc = event.description.toLowerCase().includes(query);
        const matchesTags = event.tags.some(t => t.toLowerCase().includes(query));
        const matchesCategory = event.category.toLowerCase().includes(query);
        const matchesLocation = event.location.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesTags && !matchesCategory && !matchesLocation) {
          return false;
        }
      }

      // Category
      if (selectedCategory && event.category !== selectedCategory) {
        return false;
      }

      // Format: online vs offline
      if (formatFilter === 'online' && !event.isOnline) return false;
      if (formatFilter === 'offline' && event.isOnline) return false;

      // Fee: free vs paid
      if (feeFilter === 'free' && event.fee > 0) return false;
      if (feeFilter === 'paid' && event.fee === 0) return false;

      // Available seats
      if (availableSeatsOnly && event.registeredCount >= event.maxSeats) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        return b.registeredCount - a.registeredCount;
      }
      if (sortBy === 'seats') {
        return (b.maxSeats - b.registeredCount) - (a.maxSeats - a.registeredCount);
      }
      return 0; // default order
    });
  }, [events, searchQuery, selectedCategory, formatFilter, feeFilter, availableSeatsOnly, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setDateFilter('all');
    setFormatFilter('all');
    setFeeFilter('all');
    setAvailableSeatsOnly(false);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory ||
    formatFilter !== 'all' ||
    feeFilter !== 'all' ||
    availableSeatsOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title & Search Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            Interactive Event Discovery
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Browse hackathons, workshops, and student summits across all campuses
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-96 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search events, workshops, competitions..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Horizontal Filter Segmented Control */}
      <div className="py-4 overflow-x-auto no-scrollbar flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            selectedCategory === null
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          All Categories
        </button>

        {CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Secondary Filter & Sort Bar */}
      <div className="py-4 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          
          {/* Format Toggle */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              onClick={() => setFormatFilter('all')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                formatFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-medium shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Formats
            </button>
            <button
              onClick={() => setFormatFilter('offline')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                formatFilter === 'offline'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-medium shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              On-Campus
            </button>
            <button
              onClick={() => setFormatFilter('online')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                formatFilter === 'online'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-medium shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Online
            </button>
          </div>

          {/* Fee Toggle */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              onClick={() => setFeeFilter('all')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                feeFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-medium shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Any Fee
            </button>
            <button
              onClick={() => setFeeFilter('free')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                feeFilter === 'free'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-medium shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Free Only
            </button>
            <button
              onClick={() => setFeeFilter('paid')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                feeFilter === 'paid'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-medium shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Paid
            </button>
          </div>

          {/* Available Seats Checkbox button */}
          <button
            onClick={() => setAvailableSeatsOnly(!availableSeatsOnly)}
            className={`px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
              availableSeatsOnly
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${availableSeatsOnly ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span>Available Seats Only</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-rose-500 hover:underline cursor-pointer ml-1"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Right Sort & View Controls */}
        <div className="flex items-center gap-3 text-xs">
          
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="upcoming">Upcoming Date</option>
              <option value="popular">Most Popular</option>
              <option value="seats">Most Open Seats</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              className={`p-1.5 rounded-md cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              aria-label="List view"
              className={`p-1.5 rounded-md cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Event Results Counter */}
      <div className="pt-2 pb-6 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <span>
          Showing <strong className="text-slate-900 dark:text-white font-mono tabular-nums">{filteredEvents.length}</strong> events
        </span>
      </div>

      {/* Grid or List Display */}
      {filteredEvents.length === 0 ? (
        <div className="py-20 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-8">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No events match your selected filters
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or clearing the category and format filters.
          </p>
          <button
            onClick={clearAllFilters}
            className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredEvents.map(event => {
            const isRegistered = user.registeredEventIds.includes(event.id);
            return (
              <div
                key={event.id}
                onClick={() => setActiveEventForDetails(event)}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:shadow-md"
              >
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">{event.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{event.isOnline ? 'Online' : event.location.split(',')[0]}</span>
                      {event.isLive && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-rose-500 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                            LIVE
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white truncate mt-1">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {event.tagline}
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="tabular-nums font-mono">{event.registeredCount} / {event.maxSeats}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  {isRegistered ? (
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                      Registered
                    </span>
                  ) : (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        registerForEvent(event.id);
                      }}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer"
                    >
                      Quick Register
                    </button>
                  )}
                  <button
                    onClick={() => setActiveEventForDetails(event)}
                    className="px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
