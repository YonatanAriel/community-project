import { Home, Bot, Users, User, Calendar } from 'lucide-react';

export const SIDEBAR_LINKS = {
  DASHBOARD: '/dashboard',
  AI_MATCHING: '/ai-matching',
  CONNECTIONS_REQUESTS: '/connections',
  PROFILE: '/userprofile',
  EVENTS: '/events',
};

export const SIDEBAR_LABELS = {
  DASHBOARD: 'Dashboard',
  AI_MATCHING: 'AI Matching',
  CONNECTIONS_REQUESTS: 'Connections',
  PROFILE: 'Profile',
  EVENTS: 'Events',
  LOGOUT: 'Logout',
};

export const NAVIGATION_ITEMS = [
  {
    href: SIDEBAR_LINKS.DASHBOARD,
    icon: Home,
    label: SIDEBAR_LABELS.DASHBOARD,
  },
  {
    href: SIDEBAR_LINKS.AI_MATCHING,
    icon: Bot,
    label: SIDEBAR_LABELS.AI_MATCHING,
  },
  {
    href: SIDEBAR_LINKS.CONNECTIONS_REQUESTS,
    icon: Users,
    label: SIDEBAR_LABELS.CONNECTIONS_REQUESTS,
  },
  {
    href: SIDEBAR_LINKS.EVENTS,
    icon: Calendar,
    label: SIDEBAR_LABELS.EVENTS,
  },
  {
    href: SIDEBAR_LINKS.PROFILE,
    icon: User,
    label: SIDEBAR_LABELS.PROFILE,
  },
];

export const CONNECTION_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  CONNECTED: 'connected',
};
