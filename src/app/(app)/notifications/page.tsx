"use client";

import { useState } from "react";
import { Award, BookOpen } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { mockNotifications } from "@/lib/mock-data";
import type { NotificationItem } from "@/types/ui";
import { cn } from "@/lib/utils";

const ICONS = { revision: BookOpen, content: BookOpen, achievement: Award };

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  function markAsRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Updates about your revision, content, and progress."
      />

      {notifications.length === 0 ? (
        <EmptyState title="No notifications" description="You're all caught up." />
      ) : (
        <ul className="divide-border border-border bg-card divide-y rounded-xl border">
          {notifications.map((notification) => {
            const Icon = ICONS[notification.type];
            return (
              <li
                key={notification.id}
                className={cn("flex items-start gap-3 p-4", !notification.read && "bg-info/5")}
              >
                <div className="bg-muted mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full">
                  <Icon className="text-muted-foreground size-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className="text-foreground text-sm font-medium">{notification.title}</p>
                  <p className="text-muted-foreground text-sm">{notification.body}</p>
                  <p className="text-muted-foreground text-xs">{notification.timestamp}</p>
                </div>
                {!notification.read && (
                  <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                    Mark as read
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
