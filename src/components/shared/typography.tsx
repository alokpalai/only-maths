import type { ElementType, ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type PolymorphicProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

function makeText<TDefault extends ElementType>(defaultTag: TDefault, classes: string) {
  return function TextComponent<T extends ElementType = TDefault>({
    as,
    className,
    ...props
  }: PolymorphicProps<T>) {
    const Tag = (as ?? defaultTag) as ElementType;
    return <Tag className={cn(classes, className)} {...props} />;
  };
}

/** Hero-scale display text — landing/marketing use only, not app chrome. */
export const Display = makeText(
  "h1",
  "text-4xl sm:text-5xl font-semibold tracking-tight text-foreground",
);

/** The single title per authenticated page (PageHeader uses this). */
export const PageTitle = makeText(
  "h1",
  "text-2xl sm:text-3xl font-semibold tracking-tight text-foreground",
);

export const SectionHeading = makeText(
  "h2",
  "text-xl font-semibold tracking-tight text-foreground",
);

export const SubsectionHeading = makeText("h3", "text-base font-semibold text-foreground");

export const CardHeading = makeText("h3", "text-sm font-semibold text-foreground");

export const Body = makeText("p", "text-sm leading-relaxed text-foreground");

export const SmallBody = makeText("p", "text-xs leading-relaxed text-muted-foreground");

/** Small uppercase eyebrow/label text — section labels, form labels, tags. */
export const Eyebrow = makeText(
  "span",
  "text-xs font-medium uppercase tracking-wide text-muted-foreground",
);

export const Caption = makeText("span", "text-xs text-muted-foreground");

/** Metadata fragments — "DTU 2025", "5 marks", timestamps. */
export const Metadata = makeText("span", "text-xs font-medium text-muted-foreground");

/** Large numeric values for stat tiles (questions solved, accuracy, streak). */
export const StatValue = makeText(
  "span",
  "text-2xl font-semibold tabular-nums tracking-tight text-foreground",
);
