import type { NotificationItem } from "@/types/ui";

export const mockNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    type: "revision",
    title: "Revision due",
    body: "Integration by Parts is ready for review.",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "notif-2",
    type: "content",
    title: "New PYQ added",
    body: "Mathematics-I 2026 paper is now available.",
    timestamp: "5 hours ago",
    read: false,
  },
  {
    id: "notif-3",
    type: "achievement",
    title: "Achievement unlocked",
    body: "7-day streak.",
    timestamp: "Yesterday",
    read: true,
  },
];
