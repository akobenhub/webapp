import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, CalendarDays, Clock, Info, MessageCircle, Video } from "lucide-react";

export const Route = createFileRoute("/sessions")({
  head: () => ({
    meta: [
      { title: "Sessions & Scheduling | Akoben Hub" },
      { name: "description", content: "Upcoming sessions on Zoom, Google Meet, and Calendly. Book learning circles, support sessions, and facilitator follow-ups." },
    ],
  }),
  component: SessionsPage,
});

type Session = {
  title: string;
  date: string;
  time: string;
  facilitator: string;
  platform: "Zoom" | "Google Meet" | "WhatsApp";
  audience: "Parents & Community" | "Teachers" | "Survivors" | "Open";
};

const UPCOMING: Session[] = [
  { title: "Safe Responses to Disclosure — Level 1 circle", date: "Sat 7 Jun", time: "10:00–11:00 GMT", facilitator: "Adwoa A.", platform: "Zoom", audience: "Parents & Community" },
  { title: "Classroom safeguarding for KG & primary teachers", date: "Wed 11 Jun", time: "16:00–17:00 GMT", facilitator: "Kwame O.", platform: "Google Meet", audience: "Teachers" },
  { title: "Survivor gentle check-in (camera-off)", date: "Fri 13 Jun", time: "19:00–19:45 GMT", facilitator: "Akoben circle", platform: "Zoom", audience: "Survivors" },
  { title: "Multi-agency response — Level 3", date: "Tue 17 Jun", time: "14:00–15:30 GMT", facilitator: "Dolores F.", platform: "Google Meet", audience: "Open" },
];

function SessionsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">Sessions & scheduling</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Live sessions, on familiar tools</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Join learning circles, facilitator follow-ups, and gentle survivor check-ins. We use the tools you already know — Zoom, Google Meet, WhatsApp — with optional Calendly-style booking.
      </p>

      {/* Anonymous notice */}
      <div className="mt-6 rounded-3xl bg-aqua p-5 shadow-soft">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 shrink-0 text-healing" aria-hidden />
          <div>
            <p className="font-medium">A note for anonymous survivor participants</p>
            <p className="mt-1 text-sm text-foreground/80">
              If you participate anonymously, email reminders and direct notifications will not be available. Please save session dates manually on your phone or calendar.
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming */}
      <section className="mt-10">
        <h2 className="font-serif text-2xl">Upcoming sessions</h2>
        <div className="mt-5 grid gap-4">
          {UPCOMING.map((s) => (
            <article key={s.title} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.audience}</p>
                  <h3 className="mt-1 font-serif text-xl leading-snug">{s.title}</h3>
                  <p className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> {s.date}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {s.time}</span>
                    <span className="inline-flex items-center gap-1.5"><Video className="h-4 w-4" /> {s.platform}</span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Facilitator: {s.facilitator}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Register</button>
                  <button className="rounded-full border border-input px-4 py-2 text-sm font-medium hover:bg-accent">Add to calendar</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Integrations */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl">Scheduling & communication integrations</h2>
        <p className="mt-2 text-sm text-muted-foreground">Future-ready placeholders for the tools you already use.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Integration name="Zoom" body="Video sessions for learning circles and survivor groups (camera-off welcome)." />
          <Integration name="Google Meet" body="Lightweight video meetings for community sessions and 1:1 follow-ups." />
          <Integration name="Calendly" body="Self-serve booking for counselor and facilitator sessions." />
          <Integration name="WhatsApp scheduling" body="Reminders, check-ins, and audio lesson delivery in a familiar app." />
        </div>
      </section>

      {/* Reminders */}
      <section className="mt-12 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 shrink-0 text-primary" aria-hidden />
          <div>
            <h2 className="font-serif text-2xl">Session reminders & confirmations</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              When you register with a profile, we send: a welcome confirmation, a 24-hour reminder, and a 30-minute reminder before each session.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/onboarding/community" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Create a profile for reminders</Link>
              <a href="https://wa.me/233200000000" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent">
                <MessageCircle className="h-4 w-4" /> Ask about a session
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Integration({ name, body }: { name: string; body: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
      <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Placeholder</span>
      <h3 className="mt-4 font-serif text-lg">{name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
