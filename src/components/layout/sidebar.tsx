"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen, Sigma } from "lucide-react";

import { NAV_GROUPS, UTILITY_NAV } from "@/components/layout/nav-config";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "only-maths:sidebar-collapsed";

function subscribe() {
  return () => {};
}

/** Reads the persisted collapse preference without a hydration mismatch —
 * server snapshot is always "expanded", client snapshot reads localStorage. */
function usePersistedCollapsed() {
  return useSyncExternalStore(
    subscribe,
    () => window.localStorage.getItem(STORAGE_KEY) === "true",
    () => false,
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const persistedCollapsed = usePersistedCollapsed();
  const [override, setOverride] = useState<boolean | null>(null);
  const collapsed = override ?? persistedCollapsed;

  function toggle() {
    const next = !collapsed;
    window.localStorage.setItem(STORAGE_KEY, String(next));
    setOverride(next);
  }

  return (
    <aside
      className={cn(
        "bg-sidebar text-sidebar-foreground border-sidebar-border sticky top-0 hidden h-dvh shrink-0 flex-col border-r transition-[width] duration-200 lg:flex",
        collapsed ? "w-16" : "w-60",
      )}
    >
      <div className="flex h-14 items-center gap-2 px-4">
        <Sigma className="text-primary size-5 shrink-0" aria-hidden="true" />
        {!collapsed && <span className="text-sm font-semibold">Only Maths</span>}
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-2 py-2">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="space-y-1">
            {!collapsed && (
              <p className="text-sidebar-foreground/50 px-2 text-xs font-medium tracking-wide uppercase">
                {group.label}
              </p>
            )}
            {group.items.map((item) => (
              <SidebarLink
                key={item.href}
                item={item}
                collapsed={collapsed}
                active={pathname === item.href || pathname?.startsWith(`${item.href}/`)}
              />
            ))}
          </div>
        ))}
      </nav>

      <div className="border-sidebar-border space-y-1 border-t px-2 py-2">
        {UTILITY_NAV.map((item) => (
          <SidebarLink
            key={item.href}
            item={item}
            collapsed={collapsed}
            active={pathname === item.href}
          />
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggle}
          className="text-sidebar-foreground/70 hover:text-sidebar-foreground w-full justify-start gap-2 px-2"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4 shrink-0" />
          ) : (
            <>
              <PanelLeftClose className="size-4 shrink-0" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}

function SidebarLink({
  item,
  collapsed,
  active,
}: {
  item: (typeof NAV_GROUPS)[number]["items"][number];
  collapsed: boolean;
  active?: boolean;
}) {
  const Icon = item.icon;
  const linkClassName = cn(
    "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors",
    collapsed && "justify-center",
    active
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
  );
  const content = (
    <>
      <Icon className={cn("size-4 shrink-0", active && "text-primary")} aria-hidden="true" />
      {!collapsed && <span>{item.label}</span>}
    </>
  );

  if (!collapsed) {
    return (
      <Link href={item.href} aria-current={active ? "page" : undefined} className={linkClassName}>
        {content}
      </Link>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={<Link href={item.href} aria-current={active ? "page" : undefined} />}
        className={linkClassName}
      >
        {content}
      </TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
}
