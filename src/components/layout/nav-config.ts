import {
  BarChart3,
  Bell,
  BookOpen,
  ClipboardList,
  FileText,
  History,
  LayoutDashboard,
  Settings,
  Target,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

// AI Tutor and Planner are Phase 12+/13 per PROJECT_SPEC.md — intentionally
// left out of navigation until their phase, per CLAUDE.md scope discipline.
export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Learn", href: "/learn", icon: BookOpen },
      { label: "Practice", href: "/practice", icon: Target },
      { label: "PYQs", href: "/pyqs", icon: FileText },
      { label: "Tests", href: "/tests", icon: ClipboardList },
    ],
  },
  {
    label: "Study",
    items: [
      { label: "Revision", href: "/revision", icon: History },
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
];

/** Rendered in the sidebar footer, and folded into the mobile "More" sheet. */
export const UTILITY_NAV: NavItem[] = [
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Settings", href: "/settings", icon: Settings },
];

/** Primary mobile bottom-nav destinations — the rest live behind "More". */
export const MOBILE_PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Learn", href: "/learn", icon: BookOpen },
  { label: "Practice", href: "/practice", icon: Target },
  { label: "Tests", href: "/tests", icon: ClipboardList },
];

export const MOBILE_MORE_NAV: NavItem[] = [
  { label: "PYQs", href: "/pyqs", icon: FileText },
  { label: "Revision", href: "/revision", icon: History },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Settings", href: "/settings", icon: Settings },
];
