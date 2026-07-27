import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ErrorStateProps = {
  title?: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
  className?: string;
};

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this page. Check your connection and try again.",
  retryLabel = "Try again",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "border-border flex flex-col items-center gap-3 rounded-xl border px-6 py-12 text-center",
        className,
      )}
    >
      <div className="bg-destructive/10 flex size-10 items-center justify-center rounded-full">
        <AlertTriangle className="text-destructive size-5" aria-hidden="true" />
      </div>
      <div className="max-w-sm space-y-1">
        <p className="text-foreground text-sm font-medium">{title}</p>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-1">
          {retryLabel}
        </Button>
      ) : null}
    </div>
  );
}
