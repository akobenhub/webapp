import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Heart, Users, HandHeart, ArrowRight } from "lucide-react";
import { EmotionalSafetyNotice } from "@/components/EmotionalSafetyNotice";

export const Route = createFileRoute("/circle")({
  head: () => ({
    meta: [
      { title: "Your Circle — Akoben Empowerment Circle" },
      {
        name: "description",
        content:
          "A gentle dashboard for learning, reflection, healing stories, empowerment circles, and support — at your own pace.",
      },
    ],
  }),
  component: CircleDashboard,
});

type CardProps = {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  cta: string;
};

const CARDS: CardProps[] = [
  {
    to: "/learning-center",
    icon: BookOpen,
    title: "Learning & Reflection",
    body: "Grounding audios, educational modules, and personal reflection materials.",
    cta: "Begin your journey",
  },
  {
    to: "/healing-library",
    icon: Heart,
    title: "Healing Library",
    body: "Stories for reflection, healing, hope, and emotional growth.",
    cta: "Open the library",
  },
  {
    to: "/empowerment-circles",
    icon: Users,
    title: "Join an Empowerment Circle",
    body: "View upcoming support circles and reserve a place.",
    cta: "See upcoming circles",
  },
  {
    to: "/support-request",
    icon: HandHeart,
    title: "Request Support",
    body: "Request facilitator follow-up, referral information, or additional guidance.",
    cta: "Reach out gently",
  },
];

function CircleDashboard() {
  return (
    <div className="min-h-[80vh] bg-background">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Your Circle
        </p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl">
          Welcome — move at your own pace
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          This is your gentle home inside the Akoben Empowerment Circle. There is
          no order to follow and nothing you must complete. Choose what feels
          right for you today.
        </p>

        <div className="mt-8">
          <EmotionalSafetyNotice compact />
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {CARDS.map((c) => (
            <DashboardCard key={c.title} {...c} />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          You are welcome to step away at any moment. Your place here is held.
        </p>
      </div>
    </div>
  );
}

function DashboardCard({ to, icon: Icon, title, body, cta }: CardProps) {
  return (
    <Link
      to={to}
      className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft transition-colors hover:border-healing/40 sm:p-7"
    >
      <span className="grid h-12 w-12 place-items-center rounded-full bg-healing/10 text-healing">
        <Icon className="h-5 w-5" />
      </span>
      <h2 className="mt-5 font-serif text-2xl leading-snug">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-foreground/80">{body}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-healing">
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
