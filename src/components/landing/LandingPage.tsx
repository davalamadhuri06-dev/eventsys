import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeroSection } from './HeroSection';
import { EventCard } from './EventCard';
import {
  Compass,
  Flame,
  Radio,
  Sparkles,
  MapPin,
  Clock,
  Layers,
  ArrowRight,
  Code2,
  Cpu,
  GraduationCap,
  Palette,
  Trophy,
  Users2,
} from 'lucide-react';
import { EventCategory } from '../../types';

export const LandingPage: React.FC = () => {
  const { events, user, setActiveTab, setSelectedCategory } = useApp();

  const liveEvents = events.filter(e => e.isLive);
  const trendingEvents = events.filter(e => e.trending);
  const upcomingEvents = events.slice(0, 4);
  const eventsNearYou = events.filter(e => !e.isOnline);
  const recentlyAdded = [...events].reverse().slice(0, 3);

  // Smart Recommendations based on user profile skills & interests
  const recommendedEvents = events.filter(e =>
    e.tags.some(tag =>
      user.skills.concat(user.interests).some(s => s.toLowerCase().includes(tag.toLowerCase()))
    )
  );

  const categories: Array<{ name: EventCategory; icon: any; count: number }> = [
    { name: 'Hackathons', icon: Code2, count: events.filter(e => e.category === 'Hackathons').length },
    { name: 'Workshops', icon: GraduationCap, count: events.filter(e => e.category === 'Workshops').length },
    { name: 'Conferences', icon: Cpu, count: events.filter(e => e.category === 'Conferences').length },
    { name: 'Competitions', icon: Trophy, count: events.filter(e => e.category === 'Competitions').length },
    { name: 'Cultural Events', icon: Palette, count: events.filter(e => e.category === 'Cultural Events').length },
    { name: 'Networking', icon: Users2, count: events.filter(e => e.category === 'Networking').length },
  ];

  const handleCategoryClick = (cat: EventCategory) => {
    setSelectedCategory(cat);
    setActiveTab('explore');
  };

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Smart Event Recommendations: "Events You May Like" */}
      {recommendedEvents.length > 0 && (
        <section className="py-12 bg-indigo-50/50 dark:bg-indigo-950/20 border-b border-indigo-100 dark:border-indigo-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span>Curated for {user.name.split(' ')[0]}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Events You May Like
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Matched to your skills in React, TypeScript, and AI agents
                </p>
              </div>

              <button
                onClick={() => setActiveTab('explore')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
              >
                <span>View all recommendations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedEvents.slice(0, 3).map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Live Events Banner & Cards */}
      {liveEvents.length > 0 && (
        <section className="py-12 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
                  <Radio className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    Live Events Happening Now
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Interact directly with mentors, live stages, and real-time attendee polls
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('live')}
                className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Enter Live Arena</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {liveEvents.map(event => (
                <EventCard key={event.id} event={event} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Popular Categories Grid */}
      <section className="py-12 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Explore Popular Categories
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Browse competitions, summits, and workshops across collegiate disciplines
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all text-center group cursor-pointer shadow-xs hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate w-full">
                    {cat.name}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">
                    {cat.count} {cat.count === 1 ? 'event' : 'events'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Trending Events */}
      <section className="py-12 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Trending Events
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Fastest filling registrations and community discussions this week
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('explore')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>See all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Upcoming Events */}
      <section className="py-12 border-b border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Upcoming Events Schedule
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Mark your calendar for upcoming inter-collegiate hackathons and keynotes
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('explore')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Full Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Events Near You (On-Campus / In-Person) */}
      <section className="py-12 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Events Near You (On-Campus)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  In-person gatherings, lab demonstrations, and hardware competitions
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('explore')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View On-Campus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsNearYou.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Recently Added Events */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Recently Added Events
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Fresh opportunities published by student clubs and partner departments
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('explore')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentlyAdded.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
