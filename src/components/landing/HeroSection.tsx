import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  PlusCircle,
  Users,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import heroImg from '../../assets/images/hero_event_collaborate_1790603053041.jpg';

export const HeroSection: React.FC = () => {
  const { setActiveTab, setIsDemoGuideOpen } = useApp();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200 dark:border-slate-800/80">
      {/* Subtle background ambient gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Contextual human editorial kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>The Next-Generation Event Platform</span>
              <span aria-hidden="true">·</span>
              <span className="font-normal text-indigo-500 dark:text-indigo-400">Inter-Collegiate Edition</span>
            </div>

            {/* Main Headline with balanced wrap */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] font-display max-w-2xl">
              Don’t Just Attend.{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Experience the Event.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-lg sm:text-xl font-medium text-slate-600 dark:text-slate-300">
              Discover. Connect. Collaborate. Create.
            </p>

            <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
              EventSphere turns every hackathon, workshop, and conference into a collaborative journey. Match with compatible teammates, brainstorm in real-time rooms, participate in live stages, and build your verifiable digital Event Passport.
            </p>

            {/* Two Prominent Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => setActiveTab('explore')}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm sm:text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Events</span>
              </button>

              <button
                onClick={() => setActiveTab('create-event')}
                className="px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-sm sm:text-base shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <PlusCircle className="w-4 h-4 text-indigo-500" />
                <span>Create an Event</span>
              </button>

              <button
                onClick={() => setIsDemoGuideOpen(true)}
                className="px-4 py-3 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Take Demo Tour</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Claim-to-Proof Adjacency: Real Quantified Metric Row */}
            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 w-full grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                  2,480+
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Collegiate Innovators
                </p>
              </div>

              <div>
                <p className="text-xl sm:text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 tabular-nums">
                  94.8%
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Teammate Match Rate
                </p>
              </div>

              <div>
                <p className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                  $45K+
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Prizes & Grants
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Animated Visual Showing Events, People, Teams & Collaboration */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 group">
              
              {/* High-Fidelity Hero Image generated specifically for EventSphere */}
              <div className="relative h-72 sm:h-96 w-full overflow-hidden">
                <img
                  src={heroImg}
                  alt="Students and innovators collaborating in modern hackathon venue"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              </div>

              {/* Interactive Floating Micro-Card 1: Live Event Pulse */}
              <div className="absolute top-4 left-4 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white shadow-xl max-w-[240px] animate-float">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                    Live Arena Active
                  </span>
                </div>
                <p className="text-xs font-semibold mt-1">HackSphere Sprint 1</p>
                <p className="text-[11px] text-slate-300 font-mono mt-0.5">
                  428 participants connected
                </p>
              </div>

              {/* Interactive Floating Micro-Card 2: Team Matchmaking Success */}
              <div className="absolute bottom-4 right-4 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white shadow-xl max-w-[260px]">
                <div className="flex items-center justify-between text-xs text-indigo-400 font-semibold mb-1.5">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    Team Match Complete
                  </span>
                  <span className="text-emerald-400 font-mono text-[10px]">98% Compatible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                      className="w-6 h-6 rounded-full border border-slate-900 object-cover"
                      alt="Member"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&auto=format&fit=crop&q=80"
                      className="w-6 h-6 rounded-full border border-slate-900 object-cover"
                      alt="Member"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                      className="w-6 h-6 rounded-full border border-slate-900 object-cover"
                      alt="Member"
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-200">
                    NeuralCreators (Full)
                  </span>
                </div>
              </div>

              {/* Bottom Quick Bar inside visual */}
              <div className="p-4 bg-slate-950/95 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Instant Workspace Rooms
                </span>
                <button
                  onClick={() => setActiveTab('teams')}
                  className="text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
                >
                  Join a Team →
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
