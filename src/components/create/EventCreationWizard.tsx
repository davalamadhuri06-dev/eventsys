import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventCategory, EventTimelineItem } from '../../types';
import heroImg from '../../assets/images/hero_event_collaborate_1790603053041.jpg';
import hackathonImg from '../../assets/images/event_hackathon_banner_1790603067997.jpg';
import workshopImg from '../../assets/images/event_workshop_banner_1790603081432.jpg';
import conferenceImg from '../../assets/images/event_conference_banner_1790603093494.jpg';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  DollarSign,
  Plus,
  Trash2,
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

const BANNER_OPTIONS = [
  { name: 'Hackathon Arena', url: hackathonImg },
  { name: 'Workshop Studio', url: workshopImg },
  { name: 'Conference Auditorium', url: conferenceImg },
  { name: 'Collaboration Hall', url: heroImg },
];

export const EventCreationWizard: React.FC = () => {
  const { createEvent, setActiveTab, user } = useApp();

  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Event Information
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<EventCategory>('Hackathons');
  const [description, setDescription] = useState('');
  const [selectedBanner, setSelectedBanner] = useState(BANNER_OPTIONS[0].url);

  // Step 2: Date & Location
  const [date, setDate] = useState('Nov 18 - 20, 2026');
  const [time, setTime] = useState('09:00 AM - 05:00 PM EST');
  const [endDate, setEndDate] = useState('2026-11-20');
  const [isOnline, setIsOnline] = useState(false);
  const [location, setLocation] = useState('Apex Innovation Center');
  const [venue, setVenue] = useState('Auditorium B, North Campus');

  // Step 3: Rules & Eligibility
  const [eligibility, setEligibility] = useState('Open to all registered undergraduate and graduate students.');
  const [rules, setRules] = useState<string[]>([
    'Teams must be composed of 2 to 4 registered participants.',
    'All prototypes and source code must be created within the event window.',
    'Originality and fair play policy strictly enforced.',
  ]);
  const [newRuleInput, setNewRuleInput] = useState('');

  // Step 4: Schedule
  const [timeline, setTimeline] = useState<EventTimelineItem[]>([
    { id: 't1', time: '09:00 AM', title: 'Check-in & Team Assembly', description: 'Participant badges and breakfast', status: 'upcoming' },
    { id: 't2', time: '10:00 AM', title: 'Opening Ceremony & Keynote', description: 'Briefing and sponsor problem statements', status: 'upcoming' },
    { id: 't3', time: '11:00 AM', title: 'Challenge Kickoff', description: 'Sprint hacking begins in collaboration rooms', status: 'upcoming' },
    { id: 't4', time: '04:00 PM', title: 'Final Demos & Awarding', description: 'Stage presentation to judging panel', status: 'upcoming' },
  ]);
  const [newMilestoneTime, setNewMilestoneTime] = useState('');
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneDesc, setNewMilestoneDesc] = useState('');

  // Step 5: Registration Settings
  const [fee, setFee] = useState<number>(0);
  const [maxSeats, setMaxSeats] = useState<number>(200);
  const [deadline, setDeadline] = useState('Nov 15, 2026');

  const addRule = () => {
    if (!newRuleInput.trim()) return;
    setRules(prev => [...prev, newRuleInput.trim()]);
    setNewRuleInput('');
  };

  const removeRule = (idx: number) => {
    setRules(prev => prev.filter((_, i) => i !== idx));
  };

  const addMilestone = () => {
    if (!newMilestoneTime || !newMilestoneTitle) return;
    const newItem: EventTimelineItem = {
      id: `t_${Date.now()}`,
      time: newMilestoneTime,
      title: newMilestoneTitle,
      description: newMilestoneDesc || 'Official session milestone',
      status: 'upcoming',
    };
    setTimeline(prev => [...prev, newItem]);
    setNewMilestoneTime('');
    setNewMilestoneTitle('');
    setNewMilestoneDesc('');
  };

  const removeMilestone = (id: string) => {
    setTimeline(prev => prev.filter(t => t.id !== id));
  };

  const handlePublish = () => {
    createEvent({
      title: title || 'Collegiate Innovation Sprint 2026',
      tagline: tagline || 'Inter-college collaborative sprint',
      description: description || 'Exciting college challenge hosted on EventSphere.',
      category,
      date,
      time,
      endDate,
      location: isOnline ? 'Online / Global Virtual' : location,
      isOnline,
      venue,
      fee,
      organizer: {
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        college: user.college,
        verified: true,
      },
      image: selectedBanner,
      maxSeats,
      deadline,
      rules,
      eligibility,
      timeline,
      tags: [category, 'College', 'Collab'],
    });

    setActiveTab('explore');
  };

  const stepsList = [
    { num: 1, label: 'Event Info' },
    { num: 2, label: 'Date & Location' },
    { num: 3, label: 'Rules & Eligibility' },
    { num: 4, label: 'Schedule' },
    { num: 5, label: 'Registration' },
    { num: 6, label: 'Preview & Publish' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multi-Step Event Publisher</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
          Create an Event
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Publish your collegiate hackathon, workshop, or competition to the campus community
        </p>
      </div>

      {/* 6-Step Visual Progress Indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-between relative">
          {/* Horizontal line */}
          <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 dark:bg-slate-800 -z-0" />

          {stepsList.map(s => {
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;

            return (
              <div
                key={s.num}
                onClick={() => {
                  if (s.num <= currentStep) setCurrentStep(s.num);
                }}
                className={`flex flex-col items-center relative z-10 cursor-pointer ${
                  s.num <= currentStep ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {isCompleted ? '✓' : s.num}
                </div>
                <span className="hidden sm:block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mt-1.5 whitespace-nowrap">
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Container Form */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs">
        
        {/* STEP 1: Event Information */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 1: Event Information
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Set the foundational identity and category for your event
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Event Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Apex Collegiate HackSphere 2026"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tagline / Catchphrase
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={e => setTagline(e.target.value)}
                  placeholder="e.g. 36 Hours of code, hardware & AI prototyping"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Description *
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Detail the event objectives, sponsor tracks, mentorship opportunities, and hardware kits provided..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Choose High-Fidelity Banner Asset
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BANNER_OPTIONS.map(opt => (
                  <button
                    type="button"
                    key={opt.name}
                    onClick={() => setSelectedBanner(opt.url)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all p-1 text-left cursor-pointer ${
                      selectedBanner === opt.url
                        ? 'border-indigo-600 ring-2 ring-indigo-500/30'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <img
                      src={opt.url}
                      alt={opt.name}
                      className="w-full h-16 object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                    <span className="block text-[10px] font-semibold text-slate-700 dark:text-slate-300 mt-1 truncate">
                      {opt.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Date & Location */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 2: Date and Location
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Specify scheduling and physical or virtual venues
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Event Dates *
                </label>
                <input
                  type="text"
                  required
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  placeholder="e.g. Nov 18 - 20, 2026"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Daily Time Hours *
                </label>
                <input
                  type="text"
                  required
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  placeholder="e.g. 09:00 AM - 06:00 PM EST"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Event Format
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsOnline(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                    !isOnline
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  On-Campus (Physical)
                </button>
                <button
                  type="button"
                  onClick={() => setIsOnline(true)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                    isOnline
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Online / Virtual Stage
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Location / City *
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="e.g. Apex Tech Campus, Boston"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Specific Venue / Hall *
                </label>
                <input
                  type="text"
                  required
                  value={venue}
                  onChange={e => setVenue(e.target.value)}
                  placeholder="e.g. Auditorium Hall 2, Science Center"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Rules & Eligibility */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 3: Rules and Eligibility
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Establish team guidelines, code of conduct, and participation criteria
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Eligibility Statement *
              </label>
              <textarea
                rows={2}
                required
                value={eligibility}
                onChange={e => setEligibility(e.target.value)}
                placeholder="e.g. Open to all students with a valid college ID..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Event Guidelines & Rules
              </label>
              <div className="space-y-2 mb-3">
                {rules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs"
                  >
                    <span>{rule}</span>
                    <button
                      type="button"
                      onClick={() => removeRule(idx)}
                      className="text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newRuleInput}
                  onChange={e => setNewRuleInput(e.target.value)}
                  placeholder="Add another rule..."
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                />
                <button
                  type="button"
                  onClick={addRule}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold cursor-pointer"
                >
                  Add Rule
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Schedule */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 4: Event Timeline & Schedule
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Define the interactive timeline milestones for your attendees
              </p>
            </div>

            <div className="space-y-2 mb-4">
              {timeline.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {item.time}
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </span>
                    <span className="text-slate-400 hidden sm:inline">— {item.description}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMilestone(item.id)}
                    className="text-slate-400 hover:text-rose-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add milestone form */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                + Add Schedule Milestone
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={newMilestoneTime}
                  onChange={e => setNewMilestoneTime(e.target.value)}
                  placeholder="e.g. 02:00 PM"
                  className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                />
                <input
                  type="text"
                  value={newMilestoneTitle}
                  onChange={e => setNewMilestoneTitle(e.target.value)}
                  placeholder="Milestone Title (e.g. Lunch & Sponsor Demos)"
                  className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                />
              </div>
              <input
                type="text"
                value={newMilestoneDesc}
                onChange={e => setNewMilestoneDesc(e.target.value)}
                placeholder="Description / instructions"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
              />
              <button
                type="button"
                onClick={addMilestone}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold cursor-pointer"
              >
                Insert Milestone
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Registration Settings */}
        {currentStep === 5 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 5: Registration Settings
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Set seat capacity limits, participation fee, and registration deadline
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Registration Fee ($)
                </label>
                <input
                  type="number"
                  min={0}
                  value={fee}
                  onChange={e => setFee(Number(e.target.value))}
                  placeholder="0 for Free"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Set 0 to make it free for students
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Maximum Seat Capacity *
                </label>
                <input
                  type="number"
                  min={10}
                  value={maxSeats}
                  onChange={e => setMaxSeats(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Registration Deadline *
                </label>
                <input
                  type="text"
                  required
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  placeholder="e.g. Nov 15, 2026"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Preview and Publish */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 6: Preview and Publish
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Review your event specifications before publishing to EventSphere
              </p>
            </div>

            {/* Preview Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-950 p-6 space-y-4">
              <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={selectedBanner}
                  alt={title || 'Preview'}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                    {category}
                  </span>
                  <h3 className="text-xl font-bold font-display mt-0.5">
                    {title || 'Untitled Event'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">{tagline}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Date</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Venue</span>
                  <span className="font-semibold text-slate-900 dark:text-white truncate block">
                    {venue}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Seat Capacity</span>
                  <span className="font-semibold font-mono text-slate-900 dark:text-white">
                    {maxSeats} Seats
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Fee</span>
                  <span className="font-semibold font-mono text-emerald-600">
                    {fee === 0 ? 'Free' : `$${fee}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation Controls */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
              currentStep === 1
                ? 'opacity-30 cursor-not-allowed text-slate-400'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.min(6, prev + 1))}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePublish}
              className="flex items-center gap-2 px-7 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish Event (+100 pts)</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
