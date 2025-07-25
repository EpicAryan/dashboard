// sidebar-sections.js

import {
  LayoutDashboard,
  CreditCard,
  Users,
  MessageSquare,
  Banknote,
  FileText,
  PieChart,
  TrendingUp,
  BarChart3,
  Settings,
  Shield,
  HelpCircle,
} from 'lucide-react';

export const sidebarSections = [
  {
    id: 'general',
    title: 'General',
    items: [
      { name: 'Overview', icon: LayoutDashboard, path: '/' },
      { name: 'Transactions', icon: Banknote, path: '/transactions' },
      { name: 'Accounts', icon: CreditCard, path: '/accounts' },
      { name: 'Clients', icon: Users, path: '/clients' },
      { name: 'Messages', icon: MessageSquare, path: '/messages', badge: '5' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    items: [
      { name: 'Reports', icon: FileText, path: '/reports' },
      { name: 'Budgeting', icon: PieChart, path: '/budgeting' },
      { name: 'Investments', icon: TrendingUp, path: '/investments' },
      { name: 'Analytics', icon: BarChart3, path: '/analytics', badge: 'PRO' },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    items: [
      { name: 'Settings', icon: Settings, path: '/settings' },
      { name: 'Security', icon: Shield, path: '/security' },
      { name: 'Help Center', icon: HelpCircle, path: '/help' },
    ],
  },
];
