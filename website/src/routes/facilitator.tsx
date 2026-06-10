import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, BookOpen, CalendarCheck, CheckCircle2, ClipboardList, Eye, MessageCircle, NotebookPen, Users } from "lucide-react";

export const Route = createFileRoute("/facilitator")({
  head: () => ({
    meta: [
      { title: "Facilitator Dashboard | Akoben Hub" },
      { name: "description", content: "Attendance, onboarding, engagement logs, safeguarding observations, referral flagging, and session management." },
    ],
  }),
  component: FacilitatorDashboard,
});

function FacilitatorDashboard() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Facilitator</p>
          <h1 className="mt-1 font-serif text-3xl sm:text-4xl">Welcome back, Ama</h1>
          <p className="mt-1 text-sm text-muted-foreground">3 new referrals today · 2 circles meeting this week</p>
        </div>
        <Link to="/referral" className="self-start rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
          New intake
        </Link>
      </div>

      <div className="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Stat label="Open referrals" value="14" tone="primary" />
        <Stat label="High urgency" value="2" tone="destructive" />
        <Stat label="Active learners" value="312" tone="healing" />
        <Stat label="Community circles" value="9" tone="warmth" />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl">Recent referrals</h2>
            <button className="text-sm text-primary hover:underline">View all</button>
          </div>
          <ul className="mt-5 divide-y divide-border">
            {[
              { id: "AK-2418", role: "Survivor", urgency: "High", time: "12 min ago", lang: "Twi" },
              { id: "AK-2417", role: "Parent", urgency: "Medium", time: "1 hr ago", lang: "English" },
              { id: "AK-2416", role: "Teacher", urgency: "Low", time: "3 hr ago", lang: "Ga" },
              { id: "AK-2415", role: "Faith leader", urgency: "Medium", time: "Yesterday", lang: "Ewe" },
              { id: "AK-2414", role: "Survivor", urgency: "Low", time: "Yesterday", lang: "English" },
            ].map((r) => (
              <li key={r.id} className="flex flex-wrap items-center gap-3 py-3">
                <span className="font-mono text-xs text-muted-foreground">{r.id}</span>
                <span className="text-sm font-medium">{r.role}</span>
                <UrgencyTag u={r.urgency as "Low" | "Medium" | "High"} />
                <span className="text-xs text-muted-foreground">{r.lang}</span>
                <span className="ml-auto text-xs text-muted-foreground">{r.time}</span>
                <button className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-accent">Open</button>
                <button className="rounded-full border border-destructive/40 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10">Flag</button>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-serif text-xl">Upcoming circles</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <Circle icon={<Users className="h-4 w-4" />} title="Parents circle — Kumasi" when="Thu · 6pm" />
              <Circle icon={<BookOpen className="h-4 w-4" />} title="Teacher safeguarding training" when="Sat · 10am" />
              <Circle icon={<MessageCircle className="h-4 w-4" />} title="Survivors WhatsApp check-in" when="Sun · 4pm" />
            </ul>
          </div>

          <div className="rounded-3xl bg-warmth/30 p-6">
            <h2 className="font-serif text-xl">Safeguarding reminder</h2>
            <p className="mt-2 text-sm text-warmth-foreground/90">
              Confirm consent at the start of every session. Hold the space gently — silence is welcome.
            </p>
          </div>
        </section>
      </div>

      {/* Operational tools */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Panel icon={<CalendarCheck className="h-5 w-5" />} title="Attendance">
          <ul className="mt-3 divide-y divide-border text-sm">
            {[
              ["Parents circle · Kumasi", "18 / 22"],
              ["Teachers · Accra", "11 / 14"],
              ["Faith leaders · Ho", "9 / 12"],
            ].map(([name, count]) => (
              <li key={name} className="flex items-center justify-between py-2.5">
                <span>{name}</span>
                <span className="font-mono text-xs text-muted-foreground">{count}</span>
              </li>
            ))}
          </ul>
          <button className="mt-4 w-full rounded-full bg-secondary py-2.5 text-sm font-medium hover:bg-accent">Take attendance</button>
        </Panel>

        <Panel icon={<Users className="h-5 w-5" />} title="Onboarding monitoring">
          <div className="mt-3 grid grid-cols-3 gap-3 text-center text-sm">
            <Mini n="22" l="Started this week" />
            <Mini n="18" l="Completed onboarding" />
            <Mini n="4" l="Paused mid-way" />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Reach out to paused users with care — never pressure.</p>
        </Panel>

        <Panel icon={<ClipboardList className="h-5 w-5" />} title="Engagement logs">
          <ul className="mt-3 space-y-2 text-sm">
            <Log who="Learner #2418" what="Completed 'Recognising signs'" when="2h ago" />
            <Log who="Learner #2402" what="Joined parents WhatsApp circle" when="5h ago" />
            <Log who="Learner #2389" what="Paused 'Naming what happened'" when="Yesterday" />
          </ul>
        </Panel>

        <Panel icon={<NotebookPen className="h-5 w-5" />} title="Safeguarding observation notes">
          <textarea
            rows={4}
            placeholder="Document only what is needed. Be factual, gentle, and respectful of privacy."
            className="mt-3 w-full rounded-xl border border-input bg-background p-3 text-sm outline-none focus:border-primary"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Eye className="h-3.5 w-3.5" /> Confidential · Audit-logged</span>
            <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Save note</button>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "primary" | "destructive" | "healing" | "warmth" }) {
  const colors = {
    primary: "bg-primary/10 text-primary",
    destructive: "bg-destructive/10 text-destructive",
    healing: "bg-healing/15 text-healing",
    warmth: "bg-warmth/25 text-warmth-foreground",
  }[tone];
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
      <span className={`inline-flex h-8 items-center rounded-full px-3 text-xs font-medium ${colors}`}>{label}</span>
      <p className="mt-4 font-serif text-3xl sm:text-4xl">{value}</p>
    </div>
  );
}

function UrgencyTag({ u }: { u: "Low" | "Medium" | "High" }) {
  const cls = u === "High" ? "bg-destructive/10 text-destructive" : u === "Medium" ? "bg-warmth/30 text-warmth-foreground" : "bg-healing/15 text-healing";
  const Icon = u === "High" ? AlertTriangle : CheckCircle2;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}>
      <Icon className="h-3 w-3" /> {u}
    </span>
  );
}

function Circle({ icon, title, when }: { icon: React.ReactNode; title: string; when: string }) {
  return (
    <li className="flex items-center gap-3 rounded-xl bg-secondary/60 p-3">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-card text-primary">{icon}</span>
      <span className="flex-1">{title}</span>
      <span className="text-xs text-muted-foreground">{when}</span>
    </li>
  );
}

function Panel({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">{icon}</span>
        <h2 className="font-serif text-xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Mini({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-2xl bg-secondary/60 p-3">
      <p className="font-serif text-2xl">{n}</p>
      <p className="mt-1 text-xs text-muted-foreground">{l}</p>
    </div>
  );
}

function Log({ who, what, when }: { who: string; what: string; when: string }) {
  return (
    <li className="flex flex-wrap items-center gap-2 rounded-xl bg-secondary/50 p-3 text-sm">
      <span className="font-medium">{who}</span>
      <span className="text-muted-foreground">{what}</span>
      <span className="ml-auto text-xs text-muted-foreground">{when}</span>
    </li>
  );
}
