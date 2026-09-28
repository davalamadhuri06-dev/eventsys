import React, { useState } from 'react';
import { Event } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Star, Sparkles, CheckCircle2 } from 'lucide-react';

interface FeedbackModalProps {
  event: Event;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ event, onClose }) => {
  const { submitFeedback } = useApp();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Well Organized', 'Great Mentors']);
  const [comment, setComment] = useState('');

  const tagsList = [
    'Well Organized',
    'Great Mentors',
    'Challenging Problems',
    'Engaging Stage',
    'Smooth Team Match',
    'High Quality Food',
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFeedback(event.id, rating, selectedTags, comment);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Event Feedback & Rating
            </h3>
            <p className="text-xs text-slate-500 truncate max-w-[260px]">{event.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Rating */}
          <div className="text-center py-2">
            <span className="text-xs text-slate-500 block mb-2 font-medium">
              How was your experience?
            </span>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  className="p-1 text-2xl transition-transform hover:scale-125 cursor-pointer text-amber-400"
                >
                  <Star
                    className={`w-7 h-7 ${
                      (hoverRating ?? rating) >= star
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Highlight Tags
            </label>
            <div className="flex flex-wrap gap-1.5">
              {tagsList.map(tag => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-800'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {tag} {isSelected && '✓'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Suggestions */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Suggestions & Comments
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="What did you enjoy most? What could organizers improve?"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs cursor-pointer"
            >
              Submit Feedback (+35 pts)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
