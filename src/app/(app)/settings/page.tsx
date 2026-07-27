import Link from "next/link";

import { PageHeader } from "@/components/shared/page-header";
import { SectionHeading } from "@/components/shared/typography";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { mockUser } from "@/lib/mock-data";

function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-border bg-card space-y-4 rounded-xl border p-5">
      <div className="space-y-1">
        <SectionHeading>{title}</SectionHeading>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <Separator />
      {children}
    </section>
  );
}

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader title="Settings" description="Manage your profile, preferences, and account." />

      <SettingsSection title="Profile" description="Your public profile information.">
        <div className="flex items-center gap-4">
          <Avatar size="lg">
            <AvatarFallback>{mockUser.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm">
            Change photo
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={mockUser.name} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="alok@example.com" disabled />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Appearance" description="Choose how Only Maths looks on this device.">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-foreground text-sm font-medium">Theme</p>
            <p className="text-muted-foreground text-xs">Light, dark, or match your system.</p>
          </div>
          <ThemeToggle />
        </div>
      </SettingsSection>

      <SettingsSection
        title="Learning Preferences"
        description="Tune how practice sessions behave."
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground text-sm font-medium">Show hints by default</p>
              <p className="text-muted-foreground text-xs">
                Reveal the first hint automatically when solving.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground text-sm font-medium">Include PYQs in practice</p>
              <p className="text-muted-foreground text-xs">
                Mix previous year questions into sessions.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-foreground text-sm font-medium">Default difficulty</p>
            <Select defaultValue="medium">
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Notifications" description="Decide what you hear about, and how.">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-foreground text-sm font-medium">Revision reminders</p>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-foreground text-sm font-medium">New content alerts</p>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-foreground text-sm font-medium">Email digest</p>
            <Switch />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Account" description="University, course, and account actions.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>University</Label>
            <Input defaultValue={mockUser.university} disabled />
          </div>
          <div className="space-y-1.5">
            <Label>Course</Label>
            <Input defaultValue={mockUser.course} disabled />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            Change password
          </Button>
          <Button variant="destructive" size="sm" render={<Link href="/" />}>
            Sign out
          </Button>
        </div>
      </SettingsSection>
    </div>
  );
}
