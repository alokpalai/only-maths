import { Button } from "@/components/ui/button";
import { Math } from "@/components/math";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <div className="space-y-2">
        <h1 className="text-foreground text-4xl font-semibold tracking-tight">Only Maths</h1>
        <p className="text-muted-foreground">
          Phase 1 — Foundation. Next.js, Tailwind, shadcn/ui, and KaTeX are wired up.
        </p>
      </div>

      <div className="border-border bg-card w-full max-w-md space-y-4 rounded-xl border p-6 text-left shadow-sm">
        <p className="text-muted-foreground text-sm">
          Inline: <Math tex="\int_0^\infty e^{-x^2}\,dx = \frac{\sqrt{\pi}}{2}" />
        </p>
        <Math tex="\frac{d}{dx}\left[ x^n \right] = n x^{n-1}" display />
      </div>

      <Button>Primary button</Button>
    </div>
  );
}
