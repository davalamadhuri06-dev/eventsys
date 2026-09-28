import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Event,
  User,
  Team,
  TeamInvite,
  ChatMessage,
  SharedIdea,
  TaskItem,
  SharedResource,
  LivePoll,
  NotificationItem,
  KanbanColumn,
  Certificate,
  EventFeedback,
} from '../types';
import {
  INITIAL_EVENTS,
  INITIAL_USER,
  INITIAL_TEAMS,
  CANDIDATE_USERS,
  INITIAL_CHAT_MESSAGES,
  INITIAL_IDEAS,
  INITIAL_TASKS,
  INITIAL_RESOURCES,
  INITIAL_POLLS,
  INITIAL_NOTIFICATIONS,
} from '../data/seedData';

type TabType =
  | 'home'
  | 'explore'
  | 'my-events'
  | 'teams'
  | 'collab'
  | 'live'
  | 'leaderboard'
  | 'passport'
  | 'organizer'
  | 'create-event'
  | 'profile';

interface AppContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  events: Event[];
  user: User;
  teams: Team[];
  candidateUsers: User[];
  teamInvites: TeamInvite[];
  chatMessages: ChatMessage[];
  ideas: SharedIdea[];
  tasks: TaskItem[];
  resources: SharedResource[];
  polls: LivePoll[];
  notifications: NotificationItem[];
  feedbacks: EventFeedback[];
  
  // Selection and Modals
  activeEventForDetails: Event | null;
  setActiveEventForDetails: (ev: Event | null) => void;
  activeEventForCollab: Event | null;
  setActiveEventForCollab: (ev: Event | null) => void;
  activeCertificate: Certificate | null;
  setActiveCertificate: (cert: Certificate | null) => void;
  activeFeedbackEvent: Event | null;
  setActiveFeedbackEvent: (ev: Event | null) => void;
  isDemoGuideOpen: boolean;
  setIsDemoGuideOpen: (open: boolean) => void;

  // Search & Filter Global Jump
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;

  // Actions
  registerForEvent: (eventId: string) => void;
  unregisterFromEvent: (eventId: string) => void;
  toggleSaveEvent: (eventId: string) => void;
  createEvent: (newEvent: Omit<Event, 'id' | 'registeredCount'>) => void;
  updateEvent: (eventId: string, partial: Partial<Event>) => void;
  deleteEvent: (eventId: string) => void;
  createTeam: (name: string, tagline: string, description: string, eventId: string, neededRoles: any[]) => void;
  joinTeam: (teamId: string) => void;
  leaveTeam: (teamId: string) => void;
  sendTeamInvite: (toUserId: string, teamId: string) => void;
  respondTeamInvite: (inviteId: string, accept: boolean) => void;
  sendMessage: (content: string, eventId: string, teamId?: string) => void;
  addIdea: (title: string, description: string, tags: string[], eventId: string, teamId?: string) => void;
  toggleLikeIdea: (ideaId: string) => void;
  addCommentToIdea: (ideaId: string, comment: string) => void;
  addTask: (title: string, column: KanbanColumn, priority: 'low' | 'medium' | 'high', assigneeName: string, eventId: string, teamId?: string) => void;
  updateTaskColumn: (taskId: string, column: KanbanColumn) => void;
  deleteTask: (taskId: string) => void;
  addResource: (title: string, type: 'link' | 'doc' | 'github' | 'figma' | 'note', url: string, eventId: string, teamId?: string) => void;
  votePoll: (pollId: string, optionId: string) => void;
  submitFeedback: (eventId: string, rating: number, tags: string[], comment: string) => void;
  awardPoints: (amount: number, reason: string) => void;
  claimCertificate: (eventId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addLiveAnnouncement: (eventId: string, text: string) => void;
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PREFIX = 'eventsphere_v1_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}theme`);
    return (saved as 'dark' | 'light') || 'dark';
  });

  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Core entities
  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}events`);
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}user`);
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [teams, setTeams] = useState<Team[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}teams`);
    return saved ? JSON.parse(saved) : INITIAL_TEAMS;
  });

  const [candidateUsers] = useState<User[]>(CANDIDATE_USERS);

  const [teamInvites, setTeamInvites] = useState<TeamInvite[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}invites`);
    return saved ? JSON.parse(saved) : [];
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}chat`);
    return saved ? JSON.parse(saved) : INITIAL_CHAT_MESSAGES;
  });

  const [ideas, setIdeas] = useState<SharedIdea[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}ideas`);
    return saved ? JSON.parse(saved) : INITIAL_IDEAS;
  });

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}tasks`);
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [resources, setResources] = useState<SharedResource[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}resources`);
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  const [polls, setPolls] = useState<LivePoll[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}polls`);
    return saved ? JSON.parse(saved) : INITIAL_POLLS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [feedbacks, setFeedbacks] = useState<EventFeedback[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}feedback`);
    return saved ? JSON.parse(saved) : [];
  });

  // Modals & Active Viewers
  const [activeEventForDetails, setActiveEventForDetails] = useState<Event | null>(null);
  const [activeEventForCollab, setActiveEventForCollab] = useState<Event | null>(null);
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);
  const [activeFeedbackEvent, setActiveFeedbackEvent] = useState<Event | null>(null);
  const [isDemoGuideOpen, setIsDemoGuideOpen] = useState(false);

  // Sync theme to root class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}theme`, theme);
  }, [theme]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}events`, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}user`, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}teams`, JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}tasks`, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}ideas`, JSON.stringify(ideas));
  }, [ideas]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}chat`, JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}resources`, JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}polls`, JSON.stringify(polls));
  }, [polls]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}notifications`, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}feedback`, JSON.stringify(feedbacks));
  }, [feedbacks]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#6366F1', '#EC4899', '#10B981', '#F59E0B'],
      });
    } catch {
      // safe fallback
    }
  };

  const awardPoints = (amount: number, reason: string) => {
    setUser(prev => {
      const newPoints = prev.points + amount;
      // Check for badge unlocks
      const currentBadges = [...prev.badges];
      if (newPoints >= 500 && !currentBadges.some(b => b.id === 'badge_champion')) {
        currentBadges.push({
          id: 'badge_champion',
          name: 'Event Champion',
          icon: '🏆',
          description: 'Accumulated over 500 total community & event achievement points',
          earnedDate: new Date().toISOString().split('T')[0],
        });
        addNotification(
          'New Badge Unlocked: Event Champion 🏆',
          'You reached 500+ points and joined the top tier of EventSphere!',
          'badge',
          'passport'
        );
      }
      return {
        ...prev,
        points: newPoints,
        badges: currentBadges,
      };
    });

    addNotification(
      `+${amount} Points Earned`,
      reason,
      'badge'
    );
  };

  const addNotification = (title: string, message: string, type: NotificationItem['type'], linkTab?: TabType, linkId?: string) => {
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title,
      message,
      type,
      timestamp: 'Just now',
      read: false,
      linkTab,
      linkId,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const registerForEvent = (eventId: string) => {
    const targetEvent = events.find(e => e.id === eventId);
    if (!targetEvent) return;

    if (user.registeredEventIds.includes(eventId)) return;

    setUser(prev => ({
      ...prev,
      registeredEventIds: [...prev.registeredEventIds, eventId],
    }));

    setEvents(prev =>
      prev.map(e => (e.id === eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e))
    );

    triggerCelebration();
    awardPoints(50, `Registered for ${targetEvent.title}`);
    addNotification(
      'Registration Confirmed! 🎉',
      `You are officially registered for ${targetEvent.title}. Your Event Passport has been stamped.`,
      'registration',
      'my-events',
      eventId
    );
  };

  const unregisterFromEvent = (eventId: string) => {
    setUser(prev => ({
      ...prev,
      registeredEventIds: prev.registeredEventIds.filter(id => id !== eventId),
    }));
    setEvents(prev =>
      prev.map(e => (e.id === eventId ? { ...e, registeredCount: Math.max(0, e.registeredCount - 1) } : e))
    );
    addNotification('Registration Cancelled', 'You have cancelled your seat registration.', 'registration');
  };

  const toggleSaveEvent = (eventId: string) => {
    setUser(prev => {
      const isSaved = prev.savedEventIds.includes(eventId);
      return {
        ...prev,
        savedEventIds: isSaved
          ? prev.savedEventIds.filter(id => id !== eventId)
          : [...prev.savedEventIds, eventId],
      };
    });
  };

  const createEvent = (newEventData: Omit<Event, 'id' | 'registeredCount'>) => {
    const newId = `ev_custom_${Date.now()}`;
    const newEvent: Event = {
      ...newEventData,
      id: newId,
      registeredCount: 1,
    };

    setEvents(prev => [newEvent, ...prev]);
    // Also auto register the creator
    setUser(prev => ({
      ...prev,
      registeredEventIds: [...prev.registeredEventIds, newId],
    }));

    triggerCelebration();
    awardPoints(100, `Published new event: ${newEvent.title}`);
    addNotification(
      'Event Published Successfully! 🚀',
      `Your event "${newEvent.title}" is now live and discoverable for students.`,
      'announcement',
      'explore'
    );
  };

  const updateEvent = (eventId: string, partial: Partial<Event>) => {
    setEvents(prev => prev.map(e => (e.id === eventId ? { ...e, ...partial } : e)));
    addNotification('Event Updated', 'Organizer settings and event schedule saved.', 'announcement');
  };

  const deleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    setUser(prev => ({
      ...prev,
      registeredEventIds: prev.registeredEventIds.filter(id => id !== eventId),
    }));
    addNotification('Event Deleted', 'The event was removed by organizer.', 'announcement');
  };

  const createTeam = (name: string, tagline: string, description: string, eventId: string, neededRoles: any[]) => {
    const targetEvent = events.find(e => e.id === eventId);
    const newTeamId = `team_${Date.now()}`;
    const newTeam: Team = {
      id: newTeamId,
      eventId,
      eventTitle: targetEvent?.title || 'Collaborative Event',
      name,
      tagline,
      description,
      leaderId: user.id,
      members: [
        {
          userId: user.id,
          name: user.name,
          avatar: user.avatar,
          role: user.role,
          skills: user.skills,
        },
      ],
      neededRoles,
      maxMembers: 4,
      openToInvites: true,
    };

    setTeams(prev => [newTeam, ...prev]);
    setUser(prev => ({
      ...prev,
      teams: [...prev.teams, newTeamId],
    }));

    // Post initial room greeting
    const welcomeMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      eventId,
      teamId: newTeamId,
      senderId: 'sys',
      senderName: 'EventSphere Hub',
      senderAvatar: '',
      content: `Team ${name} created! Welcome to your private collaboration workspace.`,
      timestamp: 'Just now',
      isSystem: true,
    };
    setChatMessages(prev => [...prev, welcomeMsg]);

    triggerCelebration();
    awardPoints(60, `Created team "${name}"`);
    addNotification(
      'Team Created!',
      `Team "${name}" is now recruiting candidates in Find Your Team.`,
      'team',
      'teams'
    );
  };

  const joinTeam = (teamId: string) => {
    const targetTeam = teams.find(t => t.id === teamId);
    if (!targetTeam) return;

    if (targetTeam.members.some(m => m.userId === user.id)) return;

    const newMember = {
      userId: user.id,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      skills: user.skills,
    };

    setTeams(prev =>
      prev.map(t =>
        t.id === teamId
          ? {
              ...t,
              members: [...t.members, newMember],
              neededRoles: t.neededRoles.filter(r => r !== user.role),
            }
          : t
      )
    );

    setUser(prev => ({
      ...prev,
      teams: [...prev.teams, teamId],
      registeredEventIds: prev.registeredEventIds.includes(targetTeam.eventId)
        ? prev.registeredEventIds
        : [...prev.registeredEventIds, targetTeam.eventId],
    }));

    const joinMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      eventId: targetTeam.eventId,
      teamId,
      senderId: 'sys',
      senderName: 'EventSphere Hub',
      senderAvatar: '',
      content: `${user.name} joined as ${user.role}! Say hello and check out the Ideas board.`,
      timestamp: 'Just now',
      isSystem: true,
    };
    setChatMessages(prev => [...prev, joinMsg]);

    triggerCelebration();
    awardPoints(50, `Joined team "${targetTeam.name}"`);
    addNotification(
      'Joined Team Successfully!',
      `You are now a member of ${targetTeam.name}. Entered Collaboration Room.`,
      'team',
      'collab'
    );
  };

  const leaveTeam = (teamId: string) => {
    setTeams(prev =>
      prev.map(t =>
        t.id === teamId
          ? { ...t, members: t.members.filter(m => m.userId !== user.id) }
          : t
      )
    );
    setUser(prev => ({
      ...prev,
      teams: prev.teams.filter(id => id !== teamId),
    }));
    addNotification('Left Team', 'You have left the team workspace.', 'team');
  };

  const sendTeamInvite = (toUserId: string, teamId: string) => {
    const targetTeam = teams.find(t => t.id === teamId);
    const candidate = candidateUsers.find(c => c.id === toUserId);
    if (!targetTeam || !candidate) return;

    const newInvite: TeamInvite = {
      id: `inv_${Date.now()}`,
      teamId,
      teamName: targetTeam.name,
      eventId: targetTeam.eventId,
      eventTitle: targetTeam.eventTitle,
      fromUserId: user.id,
      fromUserName: user.name,
      toUserId,
      status: 'pending',
      timestamp: 'Just now',
    };

    setTeamInvites(prev => [newInvite, ...prev]);
    awardPoints(15, `Sent team invitation to ${candidate.name}`);
    addNotification(
      'Invitation Sent!',
      `Team invitation sent to ${candidate.name} (${candidate.role}).`,
      'team'
    );

    // Simulate candidate accepting after 3.5 seconds for incredible demo feel!
    setTimeout(() => {
      const acceptedMember = {
        userId: candidate.id,
        name: candidate.name,
        avatar: candidate.avatar,
        role: candidate.role,
        skills: candidate.skills,
      };

      setTeams(prevTeams =>
        prevTeams.map(t =>
          t.id === teamId
            ? {
                ...t,
                members: [...t.members, acceptedMember],
                neededRoles: t.neededRoles.filter(r => r !== candidate.role),
              }
            : t
        )
      );

      const acceptMsg: ChatMessage = {
        id: `msg_${Date.now()}_acc`,
        eventId: targetTeam.eventId,
        teamId,
        senderId: candidate.id,
        senderName: candidate.name,
        senderAvatar: candidate.avatar,
        senderRole: candidate.role,
        content: `Hi everyone! I accepted the invitation. Excited to build with ${targetTeam.name}!`,
        timestamp: 'Just now',
      };
      setChatMessages(prevMsg => [...prevMsg, acceptMsg]);

      addNotification(
        'Invitation Accepted! 🤝',
        `${candidate.name} joined ${targetTeam.name} as ${candidate.role}!`,
        'team',
        'collab'
      );
    }, 3500);
  };

  const respondTeamInvite = (inviteId: string, accept: boolean) => {
    const invite = teamInvites.find(i => i.id === inviteId);
    if (!invite) return;

    setTeamInvites(prev =>
      prev.map(i => (i.id === inviteId ? { ...i, status: accept ? 'accepted' : 'rejected' } : i))
    );

    if (accept) {
      joinTeam(invite.teamId);
    }
  };

  const sendMessage = (content: string, eventId: string, teamId?: string) => {
    if (!content.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      eventId,
      teamId: teamId || 'team_neural_creators',
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      senderRole: user.role,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages(prev => [...prev, newMsg]);

    // Teammate reply simulation after 2 seconds
    if (Math.random() > 0.4) {
      setTimeout(() => {
        const replies = [
          'Agreed! Let me update the Figma prototype to match.',
          'Great point. I just verified this works with our API pipeline.',
          'Love how fast we are iterating on this!',
          'Added a task card for this on the board.',
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const botMsg: ChatMessage = {
          id: `msg_${Date.now()}_reply`,
          eventId,
          teamId: teamId || 'team_neural_creators',
          senderId: 'user_priya',
          senderName: 'Priya Sharma',
          senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
          senderRole: 'Designer',
          content: randomReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setChatMessages(prev => [...prev, botMsg]);
      }, 2000);
    }
  };

  const addIdea = (title: string, description: string, tags: string[], eventId: string, teamId?: string) => {
    const newIdea: SharedIdea = {
      id: `idea_${Date.now()}`,
      eventId,
      teamId: teamId || 'team_neural_creators',
      authorId: user.id,
      authorName: user.name,
      authorAvatar: user.avatar,
      title,
      description,
      tags,
      likes: 1,
      likedByUser: true,
      comments: [],
      timestamp: 'Just now',
    };

    setIdeas(prev => [newIdea, ...prev]);
    triggerCelebration();
    awardPoints(40, `Posted new brainstorm idea: "${title}"`);
    addNotification('Idea Shared!', `Your brainstorm idea was posted to the team board.`, 'announcement', 'collab');
  };

  const toggleLikeIdea = (ideaId: string) => {
    setIdeas(prev =>
      prev.map(item => {
        if (item.id === ideaId) {
          const wasLiked = item.likedByUser;
          return {
            ...item,
            likedByUser: !wasLiked,
            likes: wasLiked ? item.likes - 1 : item.likes + 1,
          };
        }
        return item;
      })
    );
  };

  const addCommentToIdea = (ideaId: string, content: string) => {
    if (!content.trim()) return;
    const newComment = {
      id: `c_${Date.now()}`,
      authorName: user.name,
      authorAvatar: user.avatar,
      content,
      timestamp: 'Just now',
    };

    setIdeas(prev =>
      prev.map(i => (i.id === ideaId ? { ...i, comments: [...i.comments, newComment] } : i))
    );
    awardPoints(10, 'Commented on a team idea');
  };

  const addTask = (
    title: string,
    column: KanbanColumn,
    priority: 'low' | 'medium' | 'high',
    assigneeName: string,
    eventId: string,
    teamId?: string
  ) => {
    const newTask: TaskItem = {
      id: `task_${Date.now()}`,
      eventId,
      teamId: teamId || 'team_neural_creators',
      title,
      column,
      priority,
      assigneeName: assigneeName || user.name,
      assigneeAvatar: user.avatar,
      dueDate: 'Today',
    };

    setTasks(prev => [...prev, newTask]);
    awardPoints(20, `Created task: "${title}"`);
  };

  const updateTaskColumn = (taskId: string, column: KanbanColumn) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          if (column === 'completed' && t.column !== 'completed') {
            awardPoints(30, `Completed task: "${t.title}"`);
            triggerCelebration();
          }
          return { ...t, column };
        }
        return t;
      })
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const addResource = (
    title: string,
    type: 'link' | 'doc' | 'github' | 'figma' | 'note',
    url: string,
    eventId: string,
    teamId?: string
  ) => {
    const newRes: SharedResource = {
      id: `res_${Date.now()}`,
      eventId,
      teamId: teamId || 'team_neural_creators',
      title,
      type,
      url,
      addedBy: user.name,
      timestamp: 'Just now',
    };
    setResources(prev => [newRes, ...prev]);
    awardPoints(15, `Added shared resource: "${title}"`);
  };

  const votePoll = (pollId: string, optionId: string) => {
    setPolls(prev =>
      prev.map(p => {
        if (p.id === pollId) {
          if (p.userVotedOptionId === optionId) return p;
          const updatedOptions = p.options.map(opt => {
            if (opt.id === optionId) return { ...opt, votes: opt.votes + 1 };
            if (opt.id === p.userVotedOptionId) return { ...opt, votes: Math.max(0, opt.votes - 1) };
            return opt;
          });
          return {
            ...p,
            options: updatedOptions,
            userVotedOptionId: optionId,
            totalVotes: p.userVotedOptionId ? p.totalVotes : p.totalVotes + 1,
          };
        }
        return p;
      })
    );

    triggerCelebration();
    awardPoints(25, 'Voted in live event poll');
    addNotification('Poll Vote Recorded! 📊', 'Your vote was submitted to the live event tally.', 'live');
  };

  const submitFeedback = (eventId: string, rating: number, tags: string[], comment: string) => {
    const newFeedback: EventFeedback = {
      id: `fb_${Date.now()}`,
      eventId,
      userId: user.id,
      userName: user.name,
      rating,
      experienceTags: tags,
      comment,
      timestamp: 'Just now',
    };

    setFeedbacks(prev => [newFeedback, ...prev]);
    awardPoints(35, 'Submitted post-event feedback');
    triggerCelebration();
    addNotification(
      'Feedback Received! ⭐',
      'Thank you for rating the event. Your feedback helps organizers improve.',
      'announcement'
    );
  };

  const claimCertificate = (eventId: string) => {
    const targetEvent = events.find(e => e.id === eventId);
    if (!targetEvent) return;

    if (user.certificates.some(c => c.eventId === eventId)) {
      const existing = user.certificates.find(c => c.eventId === eventId)!;
      setActiveCertificate(existing);
      return;
    }

    const newCert: Certificate = {
      id: `cert_${Date.now()}`,
      eventId,
      eventName: targetEvent.title,
      issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      organizer: targetEvent.organizer.name,
      credentialId: `ESP-CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      recipientName: user.name,
    };

    setUser(prev => ({
      ...prev,
      certificates: [newCert, ...prev.certificates],
    }));

    setActiveCertificate(newCert);
    triggerCelebration();
    awardPoints(150, `Earned Certificate of Completion for ${targetEvent.title}`);
    addNotification(
      'Certificate Awarded! 🎓',
      `Official verified certificate for ${targetEvent.title} is now available in your Event Passport.`,
      'badge',
      'passport'
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addLiveAnnouncement = (eventId: string, text: string) => {
    addNotification('Organizer Announcement 📣', text, 'announcement', 'live');
  };

  const resetToDefaults = () => {
    localStorage.clear();
    setEvents(INITIAL_EVENTS);
    setUser(INITIAL_USER);
    setTeams(INITIAL_TEAMS);
    setChatMessages(INITIAL_CHAT_MESSAGES);
    setIdeas(INITIAL_IDEAS);
    setTasks(INITIAL_TASKS);
    setResources(INITIAL_RESOURCES);
    setPolls(INITIAL_POLLS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setFeedbacks([]);
    addNotification('Workspace Reset', 'Demo data reinitialized to fresh initial state.', 'announcement');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        events,
        user,
        teams,
        candidateUsers,
        teamInvites,
        chatMessages,
        ideas,
        tasks,
        resources,
        polls,
        notifications,
        feedbacks,
        activeEventForDetails,
        setActiveEventForDetails,
        activeEventForCollab,
        setActiveEventForCollab,
        activeCertificate,
        setActiveCertificate,
        activeFeedbackEvent,
        setActiveFeedbackEvent,
        isDemoGuideOpen,
        setIsDemoGuideOpen,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        registerForEvent,
        unregisterFromEvent,
        toggleSaveEvent,
        createEvent,
        updateEvent,
        deleteEvent,
        createTeam,
        joinTeam,
        leaveTeam,
        sendTeamInvite,
        respondTeamInvite,
        sendMessage,
        addIdea,
        toggleLikeIdea,
        addCommentToIdea,
        addTask,
        updateTaskColumn,
        deleteTask,
        addResource,
        votePoll,
        submitFeedback,
        awardPoints,
        claimCertificate,
        markNotificationRead,
        markAllNotificationsRead,
        addLiveAnnouncement,
        resetToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
