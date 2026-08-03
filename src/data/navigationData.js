import {
  Home,
  Info,
  Scale,
  Landmark,
  FileText,
  ShieldCheck,
  BarChart3,
  Newspaper,
  Award,
  Building2,
  BookOpen,
  Mail,
  Users,
  UserPlus
} from 'lucide-react';

export const primaryNavigation = [
  {
    name: 'Home',
    label: 'Home',
    path: '/',
    icon: Home,
  },
  {
    name: 'About Us',
    label: 'About Us',
    path: '/about',
    icon: Info,
    hasDropdown: true,
    hasChildren: true,
    children: [
      { name: 'Pledge', label: 'Pledge', path: '/about/pledge', icon: Scale },
      { name: 'Launching Session', label: 'Launching Session', path: '/about/launching-session', icon: Landmark },
      { name: 'Key Note Address', label: 'Key Note Address', path: '/about/key-note-address', icon: FileText },
    ],
  },
  {
    name: 'Rules & Regulation',
    label: 'Rules & Regulation',
    path: '/rules-regulation',
    icon: ShieldCheck,
  },
  {
    name: 'Activity Report',
    label: 'Activity Report',
    path: '/activity-report',
    icon: BarChart3,
  },
  {
    name: 'Media',
    label: 'Media',
    path: '/media',
    icon: Newspaper,
  },
  {
    name: 'Patrons',
    label: 'Patrons',
    path: '/patrons',
    icon: Award,
  },
  {
    name: 'AILC Convention',
    label: 'AILC Convention',
    path: '/ailc-convention',
    icon: Building2,
  },
  {
    name: 'AILC Booklet',
    label: 'AILC Official Booklet',
    path: '/ailc',
    icon: BookOpen,
  },
  {
    name: 'Contact Us',
    label: 'Contact Us',
    path: '/contact',
    icon: Mail,
  },
];

export const mobileNavSchema = [
  {
    title: "Main Directory & Information",
    items: primaryNavigation,
  },
  {
    title: "Council Directory & Membership",
    items: [
      { name: 'Leadership Directory', label: 'Leadership Directory', icon: Users, path: '/leadership' },
      { name: 'Membership Application', label: 'Membership Application', icon: UserPlus, path: '/membership' },
    ],
  },
];
