import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sun,
  Moon,
  Bell,
  PlusCircle,
  Menu,
  X,
  Compass,
  Radio,
  Trophy,
  Users,
  Award,
  Sparkles,
  CalendarCheck,
  CheckCircle2,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    theme,
    toggleTheme,
    activeTab,
    setActiveTab,
    user,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setIsDemoGuideOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'explore', label: 'Explore Events' },
    { id: 'my-events', label: 'My Events' },
    { id: 'teams', label: 'Find Your Team' },
    { id: 'live', label: 'Live Stage', badge: 'LIVE' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'passport', label: 'Event Passport' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('home')}
            className="group flex items-center gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg py-1 px-1.5"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:bg-indigo-700 transition-colors">
              ES
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
              EventSphere
            </span>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map(link => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {link.label}
                  {link.badge && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/50 rounded px-1.5 py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                      {link.badge}
                    </span>
                  )}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions, theme, notifications, profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* College Demo Guide Quick Launcher */}
          <button
            onClick={() => setIsDemoGuideOpen(true)}
            title="Interactive Demo Presentation Guide for Judges"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60 hover:bg-amber-500/20 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Judge Demo Walkthrough</span>
          </button>

          {/* Create Event CTA */}
          <button
            onClick={() => setActiveTab('create-event')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Create Event</span>
            <span className="sm:hidden">Create</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              aria-label="Notifications"
              className="relative p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {unreadCount} unread
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-xs text-slate-500">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map(notif => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          markNotificationRead(notif.id);
                          if (notif.linkTab) {
                            setActiveTab(notif.linkTab as any);
                            setNotifDropdownOpen(false);
                          }
                        }}
                        className={`p-3.5 transition-colors cursor-pointer flex gap-3 text-left ${
                          notif.read
                            ? 'bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/40'
                            : 'bg-indigo-50/50 dark:bg-indigo-950/20 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'
                        }`}
                      >
                        <div className="shrink-0 mt-0.5">
                          {notif.type === 'registration' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                          {notif.type === 'live' && <Radio className="w-4 h-4 text-rose-500 animate-pulse" />}
                          {notif.type === 'team' && <Users className="w-4 h-4 text-indigo-500" />}
                          {notif.type === 'badge' && <Award className="w-4 h-4 text-amber-500" />}
                          {notif.type === 'announcement' && <Sparkles className="w-4 h-4 text-sky-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                            {notif.title}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-0.5">
                            {notif.message}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {notif.timestamp}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Points & Profile button */}
          <button
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-500/20"
              referrerPolicy="no-referrer"
            />
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate max-w-[90px]">
                {user.name.split(' ')[0]}
              </span>
              <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 tabular-nums font-semibold">
                {user.points} pts
              </span>
            </div>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-1">
          <button
            onClick={() => {
              setIsDemoGuideOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full mb-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800 text-xs font-semibold cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Open Judge Demo Walkthrough</span>
          </button>

          {navLinks.map(link => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/50 rounded px-1.5 py-0.5">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <button
              onClick={() => {
                setActiveTab('organizer');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600"
            >
              Organizer Dashboard
            </button>
            <button
              onClick={() => {
                setActiveTab('profile');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-xs font-medium text-indigo-600 dark:text-indigo-400"
            >
              View Profile & Passport
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
