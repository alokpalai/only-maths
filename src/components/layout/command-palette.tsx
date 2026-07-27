"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { mockSearchIndex } from "@/lib/mock-data";

export function CommandPaletteTrigger() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="border-input bg-muted/50 text-muted-foreground hover:bg-muted inline-flex h-8 w-8 min-w-0 items-center gap-2 rounded-lg border px-2 text-sm transition-colors sm:w-full sm:max-w-xs sm:px-2.5"
      >
        <Search className="size-4 shrink-0" aria-hidden="true" />
        <span className="hidden flex-1 truncate text-left sm:inline">Search...</span>
        <kbd className="bg-background text-muted-foreground hidden shrink-0 rounded border px-1.5 py-0.5 font-mono text-[10px] sm:inline-block">
          ⌘K
        </kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search Only Maths"
        description="Search topics, questions, formulas, notes, PYQs and tests"
      >
        <CommandInput placeholder="Search topics, questions, formulas..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {mockSearchIndex.map((group) => (
            <CommandGroup key={group.heading} heading={group.heading}>
              {group.results.map((result) => (
                <CommandItem key={result.id} onSelect={() => go(result.href)}>
                  {result.label}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
