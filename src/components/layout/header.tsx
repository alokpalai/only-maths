import { Sigma } from "lucide-react";

import { CommandPaletteTrigger } from "@/components/layout/command-palette";
import { MobileDrawer } from "@/components/layout/mobile-drawer";
import { NotificationBell } from "@/components/layout/notification-bell";
import { UserMenu } from "@/components/layout/user-menu";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function Header() {
  return (
    <header className="bg-background/95 border-border supports-[backdrop-filter]:bg-background/80 sticky top-0 z-30 flex h-14 items-center gap-3 border-b px-4 backdrop-blur-sm">
      <div className="hidden md:flex lg:hidden">
        <MobileDrawer />
      </div>

      <div className="flex items-center gap-2 lg:hidden">
        <Sigma className="text-primary size-5" aria-hidden="true" />
        <span className="text-sm font-semibold">Only Maths</span>
      </div>

      <div className="flex min-w-0 flex-1 items-center">
        <CommandPaletteTrigger />
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <NotificationBell />
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
