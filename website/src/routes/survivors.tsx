import { createFileRoute, Link } from "@tanstack/react-router";
import { EyeOff, UserCircle2 } from "lucide-react";
import { EmotionalSafetyNotice } from "@/components/EmotionalSafetyNotice";

export const Route = createFileRoute("/survivors")({
  head: () => ({
    meta: [
      { title: "Akoben Empowerment Circle | Akoben Hub" },
      { name: "description", content: "A confidential, trauma-informed, non-clinical peer-support and educational space for adult survivors of childhood sexual abuse. You are welcome here, exactly as you are." },
      { property: "og:title", content: "Akoben Empowerment Circle" },
      { property: "og:description", content: "You are welcome here, exactly as you are. Healing looks different for different people — move at your own pace." },
    ],
  }),
  component: EmpowermentCircleWelcome,
});

function EmpowermentCircleWelcome() {
  return (
    <div className="bg-background">
      {/* HERO */}
      <section className="bg-pathway-survivors text-healing-foreground">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:py-20 md:py-24 text-center">
          <p className="text-xs uppercase tracking-[0.2em] opacity-80">A gentle space</p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
            Akoben Empowerment Circle
          </h1>
          <p className="mt-6 font-serif text-xl sm:text-2xl opacity-95">
            You are welcome here, exactly as you are.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg opacity-90 leading-relaxed">
            Healing looks different for different people, and you are free to move at your own pace.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base opacity-85 leading-relaxed">
            This is a confidential, trauma-informed, non-clinical peer-support and educational space for adult survivors of childhood sexual abuse.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:py-16">
        <h2 className="font-serif text-3xl sm:text-4xl">What is the Akoben Empowerment Circle?</h2>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground/85">
          <p>
            The Akoben Empowerment Circle is a gentle educational and peer-support space for adults healing from childhood sexual abuse.
          </p>
          <p>
            This is not therapy, and there is never any pressure to share personal experiences.
          </p>
          <p>
            You are free to listen, learn, reflect, participate, or simply sit quietly.
          </p>
          <p>
            Healing happens at different speeds, and every step forward matters.
          </p>
        </div>

      </section>



      {/* JOIN */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:py-16">
        <div className="text-center">
          <h2 className="font-serif text-3xl sm:text-4xl">Join the Akoben Empowerment Circle</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/85">
            Before continuing, choose the pathway that feels safest and most comfortable for you.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            You can participate using your name and contact details, or you can enter anonymously and explore the space without sharing personal information. Both options provide access to the Akoben Empowerment Circle.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <PathwayCard
            to="/onboarding/survivor"
            icon={<UserCircle2 className="h-6 w-6" aria-hidden />}
            title="Enter and Register"
            body="Create a profile, reserve places in support circles, receive reminders, and stay connected with upcoming activities."
            cta="Enter and register"
          />
          <PathwayCard
            to="/anonymous-entry"
            icon={<EyeOff className="h-6 w-6" aria-hidden />}
            title="Enter Anonymously"
            body="No sign-up required. Explore the Akoben Empowerment Circle privately using a generated Circle ID."
            cta="Enter anonymously"
          />
        </div>

        {/* CHOICE NOTICE */}
        <div className="mx-auto mt-10 max-w-2xl rounded-3xl bg-aqua/60 p-6 sm:p-8 text-center shadow-soft">
          <h3 className="font-serif text-xl sm:text-2xl">Your Choice, Your Pace</h3>
          <p className="mt-3 text-sm leading-relaxed text-foreground/85">
            There is no right or wrong way to participate.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">
            You may choose the option that feels safest for you today.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">
            You are welcome here either way.
          </p>
        </div>

        {/* SAFETY NOTICE */}
        <div className="mx-auto mt-8 max-w-3xl">
          <EmotionalSafetyNotice />
        </div>
      </section>
    </div>
  );
}




function PathwayCard({
  to,
  icon,
  title,
  body,
  cta,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-0.5">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-healing/15 text-healing">
        {icon}
      </span>
      <h3 className="mt-5 font-serif text-2xl">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-foreground/80">{body}</p>
      <div className="mt-auto pt-6">
        <Link
          to={to}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-healing px-6 text-sm font-semibold text-healing-foreground hover:opacity-95"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}
