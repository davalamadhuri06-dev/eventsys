export type EventCategory =
  | 'Hackathons'
  | 'Technical Events'
  | 'Workshops'
  | 'Cultural Events'
  | 'Sports'
  | 'Competitions'
  | 'Conferences'
  | 'College Events'
  | 'Networking';

export type EventTimelineItem = {
  id: string;
  time: string;
  title: string;
  description: string;
  speaker?: string;
  status: 'completed' | 'active' | 'upcoming';
};

export type Event = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: EventCategory;
  date: string;
  time: string;
  endDate: string;
  location: string;
  isOnline: boolean;
  venue: string;
  fee: number; // 0 for Free
  organizer: {
    name: string;
    avatar: string;
    role: string;
    college: string;
    verified: boolean;
  };
  image: string;
  registeredCount: number;
  maxSeats: number;
  deadline: string;
  rules: string[];
  eligibility: string;
  timeline: EventTimelineItem[];
  isLive?: boolean;
  liveDetails?: {
    currentSession: string;
    sessionEndsInMinutes: number;
    nextSession: string;
    liveParticipants: number;
    roomCode?: string;
  };
  tags: string[];
  featured?: boolean;
  trending?: boolean;
  college?: string;
};

export type UserRole =
  | 'Developer'
  | 'Designer'
  | 'Presenter'
  | 'Researcher'
  | 'Content Creator'
  | 'Team Leader';

export type UserBadge = {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedDate: string;
};

export type Certificate = {
  id: string;
  eventId: string;
  eventName: string;
  issueDate: string;
  organizer: string;
  credentialId: string;
  recipientName: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  role: UserRole;
  skills: string[];
  interests: string[];
  experience: 'Beginner' | 'Intermediate' | 'Advanced';
  college: string;
  points: number;
  badges: UserBadge[];
  registeredEventIds: string[];
  savedEventIds: string[];
  teams: string[];
  certificates: Certificate[];
};

export type TeamMember = {
  userId: string;
  name: string;
  avatar: string;
  role: UserRole;
  skills: string[];
};

export type Team = {
  id: string;
  eventId: string;
  eventTitle: string;
  name: string;
  tagline: string;
  description: string;
  leaderId: string;
  members: TeamMember[];
  neededRoles: UserRole[];
  maxMembers: number;
  openToInvites: boolean;
};

export type TeamInvite = {
  id: string;
  teamId: string;
  teamName: string;
  eventId: string;
  eventTitle: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: string;
};

export type ChatMessage = {
  id: string;
  eventId: string;
  teamId?: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole?: string;
  content: string;
  timestamp: string;
  isSystem?: boolean;
};

export type SharedIdea = {
  id: string;
  eventId: string;
  teamId?: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  likedByUser: boolean;
  comments: Array<{
    id: string;
    authorName: string;
    authorAvatar: string;
    content: string;
    timestamp: string;
  }>;
  timestamp: string;
};

export type KanbanColumn = 'todo' | 'in_progress' | 'completed';

export type TaskItem = {
  id: string;
  eventId: string;
  teamId?: string;
  title: string;
  description?: string;
  column: KanbanColumn;
  assigneeName: string;
  assigneeAvatar?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
};

export type SharedResource = {
  id: string;
  eventId: string;
  teamId?: string;
  title: string;
  type: 'link' | 'doc' | 'github' | 'figma' | 'note';
  url: string;
  addedBy: string;
  timestamp: string;
};

export type LivePoll = {
  id: string;
  eventId: string;
  question: string;
  options: Array<{
    id: string;
    text: string;
    votes: number;
  }>;
  userVotedOptionId?: string;
  totalVotes: number;
  isActive: boolean;
};

export type EventFeedback = {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  rating: number;
  experienceTags: string[];
  comment: string;
  timestamp: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  type: 'registration' | 'team' | 'badge' | 'live' | 'announcement';
  timestamp: string;
  read: boolean;
  linkTab?: string;
  linkId?: string;
};
