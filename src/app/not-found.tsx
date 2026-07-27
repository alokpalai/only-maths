import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-primary text-sm font-semibold">404</p>
      <h1 className="text-foreground text-2xl font-semibold tracking-tight">
        This page wandered outside the syllabus.
      </h1>
      <p className="text-muted-foreground max-w-sm text-sm">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Button render={<Link href="/dashboard" />} className="mt-2">
        Go to Dashboard
      </Button>
    </div>
  );
}
