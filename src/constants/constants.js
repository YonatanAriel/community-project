import { Home, Bot, Users, User } from 'lucide-react';

export const SIDEBAR_LINKS = {
  DASHBOARD: '/dashboard',
  AI_MATCHING: '/ai-matching',
  CONNECTIONS_REQUESTS: '/connections-requests',
  USER_PROFILE: '/profile',
};

export const SIDEBAR_LABELS = {
  DASHBOARD: 'Dashboard',
  AI_MATCHING: 'AI Matching',
  CONNECTIONS_REQUESTS: 'Connections Requests',
  USER_PROFILE: 'User Profile',
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
    href: SIDEBAR_LINKS.USER_PROFILE,
    icon: User,
    label: SIDEBAR_LABELS.USER_PROFILE,
  },
];

export const CONNECTION_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  CONNECTED: 'connected',
};
