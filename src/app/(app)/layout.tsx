import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";

// No real auth/RBAC gating yet — that's Phase 4. Every visitor sees the app
// shell for now, per Phase 2 scope (mock frontend state only).
export default function AppLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
