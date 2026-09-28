import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  ArrowRight,
  Compass,
  FileText,
  UserCheck,
  Users,
  MessageSquare,
  Lightbulb,
  CheckSquare,
  Radio,
  Award,
  GraduationCap,
} from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  actionLabel: string;
  icon: any;
  targetTab?: string;
  runAction?: () => void;
}

export const DemoGuideModal: React.FC = () => {
  const {
    isDemoGuideOpen,
    setIsDemoGuideOpen,
    setActiveTab,
    events,
    setActiveEventForDetails,
    registerForEvent,
    setActiveEventForCollab,
    addIdea,
    addTask,
    votePoll,
    claimCertificate,
    user,
  } = useApp();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isDemoGuideOpen) return null;

  const hackathon = events.find(e => e.id === 'ev_hackathon_2026') || events[0];

  const demoSteps: Step[] = [
    {
      id: 1,
      title: 'Discover an Event',
      description: 'Explore curated collegiate hackathons, workshops, and symposiums with rich filters and search.',
      actionLabel: 'Go to Explore Events',
      icon: Compass,
      targetTab: 'explore',
      runAction: () => {
        setActiveTab('explore');
      },
    },
    {
      id: 2,
      title: 'Open Event Details & Interactive Timeline',
      description: 'Inspect full schedule, rules, eligibility, venue, and milestones for HackSphere 2026.',
      actionLabel: 'Open HackSphere Details',
      icon: FileText,
      runAction: () => {
        setActiveEventForDetails(hackathon);
      },
    },
    {
      id: 3,
      title: 'Register & Earn Points',
      description: 'Register with instant seat confirmation, confetti celebration, and +50 points added to your score.',
      actionLabel: 'Register for HackSphere',
      icon: UserCheck,
      runAction: () => {
        registerForEvent(hackathon.id);
        setActiveEventForDetails(hackathon);
      },
    },
    {
      id: 4,
      title: 'Find Compatible Teammates',
      description: 'Explore the "Find Your Team" builder where candidates are matched by complementary roles and skills.',
      actionLabel: 'Open Team Builder',
      icon: Users,
      targetTab: 'teams',
      runAction: () => {
        setActiveEventForDetails(null);
        setActiveTab('teams');
      },
    },
    {
      id: 5,
      title: 'Enter Collaboration Room',
      description: 'Each registered event features a private room with real-time Team Chat, Ideas Board, and Kanban.',
      actionLabel: 'Enter Collaboration Room',
      icon: MessageSquare,
      targetTab: 'collab',
      runAction: () => {
        setActiveEventForCollab(hackathon);
        setActiveTab('collab');
      },
    },
    {
      id: 6,
      title: 'Post a Brainstorm Idea',
      description: 'Add an idea to the team canvas. Teammates can like, comment, and convert thoughts to tasks.',
      actionLabel: 'Post Demo Idea (+40 pts)',
      icon: Lightbulb,
      targetTab: 'collab',
      runAction: () => {
        setActiveEventForCollab(hackathon);
        setActiveTab('collab');
        addIdea(
          'Multimodal Voice to Kanban Bridge',
          'Listen to team brainstorms and automatically synthesize action cards on the task board.',
          ['AI', 'Real-time', 'Voice'],
          hackathon.id
        );
      },
    },
    {
      id: 7,
      title: 'Manage Kanban Task Board',
      description: 'Assign tasks across To Do, In Progress, and Completed. Moving to Completed earns +30 points!',
      actionLabel: 'Add Task to Board',
      icon: CheckSquare,
      targetTab: 'collab',
      runAction: () => {
        setActiveEventForCollab(hackathon);
        setActiveTab('collab');
        addTask('Deploy Live Demo to Vercel/Edge', 'in_progress', 'high', user.name, hackathon.id);
      },
    },
    {
      id: 8,
      title: 'Participate in Live Event & Polls',
      description: 'Experience Live Event mode: ticking session countdowns, live participant count, and interactive voting.',
      actionLabel: 'Vote in Live Poll (+25 pts)',
      icon: Radio,
      targetTab: 'live',
      runAction: () => {
        setActiveTab('live');
        votePoll('poll_hackathon_1', 'opt_ai');
      },
    },
    {
      id: 9,
      title: 'Claim Verified Digital Certificate',
      description: 'After participating, receive an authentic certificate with unique credential ID and gold seal.',
      actionLabel: 'Generate & View Certificate',
      icon: GraduationCap,
      runAction: () => {
        claimCertificate(hackathon.id);
      },
    },
    {
      id: 10,
      title: 'Inspect Updated Event Passport & Leaderboard',
      description: 'Check your digital stamped passport, unlocked badges, and your rising rank on the EventSphere Leaderboard.',
      actionLabel: 'View Digital Passport',
      icon: Award,
      targetTab: 'passport',
      runAction: () => {
        setActiveTab('passport');
      },
    },
  ];

  const step = demoSteps[currentStepIndex];
  const StepIcon = step.icon;

  const handleNext = () => {
    if (currentStepIndex < demoSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-600 dark:to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <div>
              <h2 className="text-sm font-bold tracking-tight font-display text-white">
                College Project Demo Tour
              </h2>
              <p className="text-[11px] text-indigo-100">
                End-to-End Interactive Event Experience Flow
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDemoGuideOpen(false)}
            className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="bg-slate-100 dark:bg-slate-800 h-1.5 w-full">
          <div
            className="bg-indigo-600 h-full transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / demoSteps.length) * 100}%` }}
          />
        </div>

        {/* Body Content */}
        <div className="p-6">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              STEP {currentStepIndex + 1} OF {demoSteps.length}
            </span>
            <span className="tabular-nums font-mono text-[11px]">
              {Math.round(((currentStepIndex + 1) / demoSteps.length) * 100)}% Completed
            </span>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400">
              <StepIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>

          {/* Quick Execution Action Button */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                if (step.runAction) step.runAction();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <span>{step.actionLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`flex items-center gap-1 font-medium cursor-pointer ${
              currentStepIndex === 0
                ? 'opacity-30 cursor-not-allowed text-slate-400'
                : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-[11px] text-slate-400">
            Click action button to test in real-time
          </span>

          {currentStepIndex < demoSteps.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setIsDemoGuideOpen(false)}
              className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              <span>Finish Tour</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
