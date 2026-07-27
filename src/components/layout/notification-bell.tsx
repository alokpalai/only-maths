"use client";

import { useState } from "react";
import Link from "next/link";
import { Award, Bell, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EmptyState } from "@/components/shared/empty-state";
import { mockNotifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ICONS = {
  revision: BookOpen,
  content: BookOpen,
  achievement: Award,
};

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications" />
        }
      >
        <Bell className="size-4" />
        {unreadCount > 0 && (
          <span className="bg-destructive absolute top-1.5 right-1.5 size-1.5 rounded-full" />
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <PopoverHeader className="border-border border-b p-3">
          <PopoverTitle>Notifications</PopoverTitle>
        </PopoverHeader>
        {mockNotifications.length === 0 ? (
          <div className="p-3">
            <EmptyState title="No notifications yet" />
          </div>
        ) : (
          <ul className="divide-border max-h-80 divide-y overflow-y-auto">
            {mockNotifications.map((notification) => {
              const Icon = ICONS[notification.type];
              return (
                <li
                  key={notification.id}
                  className={cn("flex items-start gap-3 p-3", !notification.read && "bg-info/5")}
                >
                  <div className="bg-muted mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full">
                    <Icon className="text-muted-foreground size-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <p className="text-foreground text-sm font-medium">{notification.title}</p>
                    <p className="text-muted-foreground text-xs">{notification.body}</p>
                    <p className="text-muted-foreground text-xs">{notification.timestamp}</p>
                  </div>
                  {!notification.read && (
                    <span
                      className="bg-info mt-1.5 size-2 shrink-0 rounded-full"
                      aria-label="Unread"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}
        <div className="border-border border-t p-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            render={<Link href="/notifications" onClick={() => setOpen(false)} />}
          >
            View all
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
