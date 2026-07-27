"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sigma } from "lucide-react";

import { NAV_GROUPS, UTILITY_NAV } from "@/components/layout/nav-config";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/** Tablet-only drawer navigation (md–lg): the desktop Sidebar is hidden in
 * that range, so this hamburger trigger provides the same nav in a Sheet. */
export function MobileDrawer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" />}>
        <Menu className="size-4" />
        <span className="sr-only">Open navigation</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Sigma className="text-primary size-5" aria-hidden="true" />
            Only Maths
          </SheetTitle>
        </SheetHeader>
        <nav className="flex-1 space-y-5 overflow-y-auto px-4 pb-4">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="space-y-1">
              <p className="text-muted-foreground px-2 text-xs font-medium tracking-wide uppercase">
                {group.label}
              </p>
              {group.items.map((item) => {
                const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm",
                      active
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                    )}
                  >
                    <Icon
                      className={cn("size-4 shrink-0", active && "text-primary")}
                      aria-hidden="true"
                    />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
          <div className="border-border space-y-1 border-t pt-3">
            {UTILITY_NAV.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:bg-accent/60 hover:text-foreground flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm"
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
