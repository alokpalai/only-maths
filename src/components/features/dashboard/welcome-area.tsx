import { Display } from "@/components/shared/typography";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function WelcomeArea({ name }: { name: string }) {
  return (
    <div className="space-y-1">
      <Display className="text-2xl sm:text-3xl">
        {greeting()}, {name}
      </Display>
      <p className="text-muted-foreground text-sm">Ready to continue your maths practice?</p>
    </div>
  );
}
