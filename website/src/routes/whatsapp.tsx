import { createFileRoute } from "@tanstack/react-router";
import { Bell, Headphones, MessageCircle, Users } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { EmotionalSafetyNotice } from "@/components/EmotionalSafetyNotice";

export const Route = createFileRoute("/whatsapp")({
  head: () => ({
    meta: [
      { title: "WhatsApp Support & Learning Groups | Akoben Hub" },
      { name: "description", content: "Join low-data WhatsApp learning groups, get audio lessons and reminders, and request safe support." },
    ],
  }),
  component: WhatsAppPage,
});

function WhatsAppPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Learn and connect on WhatsApp</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        A familiar, low-data way to receive lessons, audio reminders, and gentle check-ins — no new app to download.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Group
          title="Parents & community circle"
          body="Weekly safeguarding tips, audio lessons, and Q&A with facilitators."
          msg="Hello, I would like to join the parents & community WhatsApp circle."
          icon={<Users className="h-5 w-5" />}
        />
        <Group
          title="Teachers safeguarding group"
          body="Lesson ideas, classroom resources, and disclosure response support."
          msg="Hello, I am a teacher and would like to join the safeguarding WhatsApp group."
          icon={<Users className="h-5 w-5" />}
        />
        <Group
          title="Survivors gentle check-in"
          body="A quiet, opt-in space. No pressure to share. Leave at any time."
          msg="Hello, I would like to be added to the survivors gentle check-in."
          icon={<MessageCircle className="h-5 w-5" />}
        />
        <Group
          title="Audio lesson library"
          body="Receive short audio lessons in English, Twi, or Ga, on your schedule."
          msg="Hello, please send me audio lessons. My preferred language is:"
          icon={<Headphones className="h-5 w-5" />}
        />
      </div>

      <section className="mt-12 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <div className="flex items-start gap-3">
          <Bell className="h-5 w-5 shrink-0 text-primary" aria-hidden />
          <div>
            <h2 className="font-serif text-2xl">Reminders, gently</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We send no more than two messages a week, at a time you choose. Reply STOP at any moment and you will be removed without question.
            </p>
            <div className="mt-5"><WhatsAppButton label="Set up reminders" message="Hello, I would like to receive Akoben Hub reminders." /></div>
          </div>
        </div>
      </section>

      <div className="mt-10">
        <EmotionalSafetyNotice />
      </div>
    </div>
  );
}

function Group({ title, body, msg, icon }: { title: string; body: string; msg: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-healing/20 text-healing">{icon}</span>
      <h3 className="mt-4 font-serif text-xl">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      <div className="mt-5"><WhatsAppButton label="Join on WhatsApp" message={msg} /></div>
    </div>
  );
}
