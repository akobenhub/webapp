import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HeartHandshake, Users } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Choose your pathway | Akoben Hub" },
      { name: "description", content: "Choose between the Parent & Community Education pathway or the Survivor Support & Empowerment Circle." },
    ],
  }),
  component: OnboardingChoice,
});

function OnboardingChoice() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">Welcome</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Which pathway feels right for you today?</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        You can switch later. Each pathway has its own onboarding, learning space, and pace.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <Link
          to="/onboarding/community"
          className="group flex h-full flex-col rounded-3xl bg-pathway-parents p-7 text-primary-foreground shadow-soft transition-all hover:-translate-y-1"
        >
          <Users className="h-7 w-7" />
          <h2 className="mt-5 font-serif text-2xl">Parent & Community Education</h2>
          <p className="mt-2 text-sm opacity-90">
            Safeguarding learning for parents, teachers, faith leaders, PTAs, and community professionals. Standard profile, progress tracking.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
            Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          to="/onboarding/survivor"
          className="group flex h-full flex-col rounded-3xl bg-pathway-survivors p-7 text-healing-foreground shadow-soft transition-all hover:-translate-y-1"
        >
          <HeartHandshake className="h-7 w-7" />
          <h2 className="mt-5 font-serif text-2xl">Survivor Support & Empowerment Circle</h2>
          <p className="mt-2 text-sm opacity-90">
            Confidential, trauma-informed. Anonymous participation, pseudonyms, and camera-off are welcome here.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
            Enter gently <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </div>
  );
}
