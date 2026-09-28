import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KanbanColumn, Event } from '../../types';
import {
  MessageSquare,
  Lightbulb,
  CheckSquare,
  FolderGit2,
  Send,
  Heart,
  MessageCircle,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Users,
  Sparkles,
  Link2,
  FileText,
  Bookmark,
  Share2,
  CheckCircle2,
} from 'lucide-react';

export const CollaborationRoom: React.FC = () => {
  const {
    events,
    user,
    teams,
    activeEventForCollab,
    setActiveEventForCollab,
    chatMessages,
    sendMessage,
    ideas,
    addIdea,
    toggleLikeIdea,
    addCommentToIdea,
    tasks,
    addTask,
    updateTaskColumn,
    deleteTask,
    resources,
    addResource,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'chat' | 'ideas' | 'kanban' | 'resources'>('chat');

  // Active event resolution
  const targetEvent: Event =
    activeEventForCollab ||
    events.find(e => user.registeredEventIds.includes(e.id)) ||
    events[0];

  const userTeam = teams.find(
    t => t.eventId === targetEvent.id && t.members.some(m => m.userId === user.id)
  ) || teams[0];

  // Chat input
  const [chatInput, setChatInput] = useState('');

  // Idea creation form
  const [isIdeaModalOpen, setIsIdeaModalOpen] = useState(false);
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaDesc, setIdeaDesc] = useState('');
  const [ideaTagsInput, setIdeaTagsInput] = useState('UI/UX, AI, Canvas');
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');

  // Task creation form
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskColumn, setTaskColumn] = useState<KanbanColumn>('todo');
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [taskAssignee, setTaskAssignee] = useState(user.name);

  // Resource creation form
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [resTitle, setResTitle] = useState('');
  const [resType, setResType] = useState<'link' | 'doc' | 'github' | 'figma' | 'note'>('link');
  const [resUrl, setResUrl] = useState('');

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendMessage(chatInput, targetEvent.id, userTeam?.id);
    setChatInput('');
  };

  const handleCreateIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaTitle.trim() || !ideaDesc.trim()) return;
    const tags = ideaTagsInput.split(',').map(s => s.trim()).filter(Boolean);
    addIdea(ideaTitle, ideaDesc, tags, targetEvent.id, userTeam?.id);
    setIsIdeaModalOpen(false);
    setIdeaTitle('');
    setIdeaDesc('');
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    addTask(taskTitle, taskColumn, taskPriority, taskAssignee, targetEvent.id, userTeam?.id);
    setIsTaskModalOpen(false);
    setTaskTitle('');
  };

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resTitle.trim() || !resUrl.trim()) return;
    addResource(resTitle, resType, resUrl, targetEvent.id, userTeam?.id);
    setIsResourceModalOpen(false);
    setResTitle('');
    setResUrl('');
  };

  const currentEventMessages = chatMessages.filter(
    m => m.eventId === targetEvent.id || (userTeam && m.teamId === userTeam.id)
  );

  const currentEventIdeas = ideas.filter(
    i => i.eventId === targetEvent.id || (userTeam && i.teamId === userTeam.id)
  );

  const currentEventTasks = tasks.filter(
    t => t.eventId === targetEvent.id || (userTeam && t.teamId === userTeam.id)
  );

  const currentEventResources = resources.filter(
    r => r.eventId === targetEvent.id || (userTeam && r.teamId === userTeam.id)
  );

  const kanbanColumns: Array<{ id: KanbanColumn; label: string; count: number }> = [
    { id: 'todo', label: 'To Do', count: currentEventTasks.filter(t => t.column === 'todo').length },
    { id: 'in_progress', label: 'In Progress', count: currentEventTasks.filter(t => t.column === 'in_progress').length },
    { id: 'completed', label: 'Completed', count: currentEventTasks.filter(t => t.column === 'completed').length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      {/* Room Header with Event Selector & Team Info */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>PRIVATE COLLABORATION ROOM</span>
            <span aria-hidden="true">·</span>
            <span>Team {userTeam ? userTeam.name : 'Workspace'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
            {targetEvent.title}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Active workspace synced across all team members in real-time
          </p>
        </div>

        {/* Workspace Switcher / Event Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Event Room:</span>
            <select
              value={targetEvent.id}
              onChange={e => {
                const found = events.find(ev => ev.id === e.target.value);
                if (found) setActiveEventForCollab(found);
              }}
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {events.map(ev => (
                <option key={ev.id} value={ev.id}>
                  {ev.title.slice(0, 36)}...
                </option>
              ))}
            </select>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-200 dark:border-emerald-800/40">
            <Users className="w-3.5 h-3.5" />
            <span>{userTeam?.members.length || 3} Teammates Active</span>
          </div>
        </div>
      </div>

      {/* Primary Workspace Navigation Tabs */}
      <div className="my-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors border-b-2 cursor-pointer ${
              activeTab === 'chat'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Team Chat</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800">
              {currentEventMessages.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('ideas')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors border-b-2 cursor-pointer ${
              activeTab === 'ideas'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Shared Ideas</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800">
              {currentEventIdeas.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('kanban')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors border-b-2 cursor-pointer ${
              activeTab === 'kanban'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Task Board (Kanban)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800">
              {currentEventTasks.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors border-b-2 cursor-pointer ${
              activeTab === 'resources'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Shared Resources</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800">
              {currentEventResources.length}
            </span>
          </button>
        </div>
      </div>

      {/* TAB 1: Real-Time Team Chat */}
      {activeTab === 'chat' && (
        <div className="flex flex-col h-[540px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          
          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {currentEventMessages.map(msg => {
              const isMe = msg.senderId === user.id;

              if (msg.isSystem) {
                return (
                  <div key={msg.id} className="text-center py-2">
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                      {msg.content}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 max-w-[85%] sm:max-w-[70%] ${
                    isMe ? 'ml-auto flex-row-reverse' : ''
                  }`}
                >
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div
                      className={`flex items-center gap-2 text-[11px] mb-1 ${
                        isMe ? 'justify-end' : ''
                      }`}
                    >
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {isMe ? 'You' : msg.senderName}
                      </span>
                      {msg.senderRole && (
                        <span className="text-slate-400">· {msg.senderRole}</span>
                      )}
                      <span className="text-slate-400 font-mono text-[10px]">
                        {msg.timestamp}
                      </span>
                    </div>

                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? 'bg-indigo-600 text-white rounded-tr-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-xs'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSendChat}
            className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="Message your teammates in real-time..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: Shared Ideas Canvas */}
      {activeTab === 'ideas' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Team Brainstorm Canvas
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Post breakthrough concepts, upvote fellow submissions, and thread feedback
              </p>
            </div>

            <button
              onClick={() => setIsIdeaModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Share an Idea (+40 pts)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentEventIdeas.map(idea => (
              <div
                key={idea.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={idea.authorAvatar}
                        alt={idea.authorName}
                        className="w-5 h-5 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {idea.authorName}
                      </span>
                    </div>
                    <span>{idea.timestamp}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {idea.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {idea.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {idea.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-[11px] font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleLikeIdea(idea.id)}
                      className={`flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                        idea.likedByUser
                          ? 'text-rose-500'
                          : 'text-slate-500 hover:text-rose-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${idea.likedByUser ? 'fill-rose-500' : ''}`} />
                      <span className="tabular-nums font-mono">{idea.likes}</span>
                    </button>

                    <button
                      onClick={() =>
                        setActiveCommentId(activeCommentId === idea.id ? null : idea.id)
                      }
                      className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="tabular-nums font-mono">{idea.comments.length}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      addTask(idea.title, 'todo', 'medium', user.name, targetEvent.id);
                    }}
                    className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    + Convert to Task
                  </button>
                </div>

                {/* Comment Drawer */}
                {activeCommentId === idea.id && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {idea.comments.length === 0 ? (
                        <p className="text-[11px] text-slate-400 italic">No comments yet. Start the thread!</p>
                      ) : (
                        idea.comments.map(c => (
                          <div key={c.id} className="text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                            <span className="font-semibold text-slate-900 dark:text-white mr-1.5">
                              {c.authorName}:
                            </span>
                            <span className="text-slate-600 dark:text-slate-300">{c.content}</span>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={commentInput}
                        onChange={e => setCommentInput(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                      />
                      <button
                        onClick={() => {
                          if (commentInput.trim()) {
                            addCommentToIdea(idea.id, commentInput);
                            setCommentInput('');
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold cursor-pointer"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Collaborative Kanban Board */}
      {activeTab === 'kanban' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Sprint Task Board
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Organize deliverables across sprint columns. Completing tasks earns +30 points!
              </p>
            </div>

            <button
              onClick={() => setIsTaskModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Task</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kanbanColumns.map(col => {
              const colTasks = currentEventTasks.filter(t => t.column === col.id);

              return (
                <div
                  key={col.id}
                  className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4 flex flex-col"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {col.label}
                    </span>
                    <span className="text-[11px] font-mono tabular-nums px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold">
                      {colTasks.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px]">
                    {colTasks.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                        No tasks in {col.label}
                      </div>
                    ) : (
                      colTasks.map(task => (
                        <div
                          key={task.id}
                          className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 transition-all"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                              {task.title}
                            </h4>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                              title="Delete task"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="mt-3 flex items-center justify-between text-[11px]">
                            <span
                              className={`px-2 py-0.5 rounded font-semibold ${
                                task.priority === 'high'
                                  ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600'
                                  : task.priority === 'medium'
                                  ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                              }`}
                            >
                              {task.priority.toUpperCase()}
                            </span>

                            <span className="text-slate-500 font-medium">
                              Assignee: {task.assigneeName.split(' ')[0]}
                            </span>
                          </div>

                          {/* Column Mover Buttons */}
                          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                            {col.id !== 'todo' && (
                              <button
                                onClick={() =>
                                  updateTaskColumn(
                                    task.id,
                                    col.id === 'completed' ? 'in_progress' : 'todo'
                                  )
                                }
                                className="text-slate-500 hover:text-indigo-600 flex items-center gap-0.5 cursor-pointer text-[11px]"
                              >
                                <ChevronLeft className="w-3.5 h-3.5" />
                                <span>Move Left</span>
                              </button>
                            )}

                            {col.id !== 'completed' && (
                              <button
                                onClick={() =>
                                  updateTaskColumn(
                                    task.id,
                                    col.id === 'todo' ? 'in_progress' : 'completed'
                                  )
                                }
                                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-0.5 cursor-pointer text-[11px] ml-auto"
                              >
                                <span>Move Right</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: Shared Resources */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Shared Links & Documentation
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Repositories, Figma design tokens, slide decks, and APIs
              </p>
            </div>

            <button
              onClick={() => setIsResourceModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Resource (+15 pts)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {currentEventResources.map(res => (
              <div
                key={res.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {res.type}
                    </span>
                    <span className="text-[10px] text-slate-400">{res.timestamp}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate mt-2">
                    {res.url}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Added by {res.addedBy}
                  </span>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <span>Open</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Idea Modal */}
      {isIdeaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Post Brainstorm Idea
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Share a feature, architecture concept, or presentation angle with the team
            </p>

            <form onSubmit={handleCreateIdea} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Idea Title *
                </label>
                <input
                  type="text"
                  required
                  value={ideaTitle}
                  onChange={e => setIdeaTitle(e.target.value)}
                  placeholder="e.g. Autonomous Multimodal Summarizer"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={ideaDesc}
                  onChange={e => setIdeaDesc(e.target.value)}
                  placeholder="How does it work and what makes it innovative?"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={ideaTagsInput}
                  onChange={e => setIdeaTagsInput(e.target.value)}
                  placeholder="UI/UX, AI, Canvas"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsIdeaModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white"
                >
                  Post Idea (+40 pts)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Create New Task
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Add a concrete sprint milestone to the collaborative task board
            </p>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={e => setTaskTitle(e.target.value)}
                  placeholder="e.g. Integrate WebRTC voice channel"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Column
                  </label>
                  <select
                    value={taskColumn}
                    onChange={e => setTaskColumn(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={taskPriority}
                    onChange={e => setTaskPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Assignee Name
                </label>
                <input
                  type="text"
                  value={taskAssignee}
                  onChange={e => setTaskAssignee(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white"
                >
                  Create Task (+20 pts)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Resource Modal */}
      {isResourceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Add Shared Resource
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Pin a repository, prototype URL, or rubric document for all teammates
            </p>

            <form onSubmit={handleCreateResource} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Resource Title *
                </label>
                <input
                  type="text"
                  required
                  value={resTitle}
                  onChange={e => setResTitle(e.target.value)}
                  placeholder="e.g. API Docs or Figma System"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Type
                </label>
                <select
                  value={resType}
                  onChange={e => setResType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                >
                  <option value="link">General Link</option>
                  <option value="github">GitHub Repository</option>
                  <option value="figma">Figma Canvas</option>
                  <option value="doc">Document / PDF</option>
                  <option value="note">Notes / Spec</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  URL / Link *
                </label>
                <input
                  type="url"
                  required
                  value={resUrl}
                  onChange={e => setResUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsResourceModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white"
                >
                  Save Resource (+15 pts)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
