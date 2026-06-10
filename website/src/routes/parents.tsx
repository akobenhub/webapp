import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, GraduationCap, ShieldCheck, Users } from "lucide-react";
import { LEVELS } from "@/lib/curriculum";

export const Route = createFileRoute("/parents")({
  head: () => ({
    meta: [
      { title: "Parent & Community Child Protection Education | Akoben Hub" },
      { name: "description", content: "Trauma-informed safeguarding education across three progressive learning levels — for parents, teachers, faith leaders, PTAs, and safeguarding professionals." },
      { property: "og:title", content: "Parent & Community Child Protection Education" },
      { property: "og:description", content: "Practical, culturally grounded safeguarding learning for families, institutions, and professionals across Ghana." },
    ],
  }),
  component: ParentsPage,
});

function ParentsPage() {
  return (
    <div>
      <section className="bg-pathway-parents text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <p className="text-sm font-medium opacity-80">Pathway 1</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.05] sm:text-5xl">
            Protecting children together
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/85">
            A structured learning programme for parents, teachers, faith leaders, PTAs, and safeguarding professionals — across three progressive levels.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/onboarding/community" className="rounded-full bg-healing px-5 py-3 text-sm font-semibold text-healing-foreground">Start onboarding</Link>
            <Link to="/learning-center" className="rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-medium hover:bg-white/20">Open Learning Center</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-5 md:grid-cols-4">
          <Audience icon={<Users className="h-5 w-5" />} title="Parents" body="Everyday safeguarding habits at home." />
          <Audience icon={<BookOpen className="h-5 w-5" />} title="Teachers" body="Classroom protocols and disclosure response." />
          <Audience icon={<ShieldCheck className="h-5 w-5" />} title="Faith leaders" body="Pastoral safeguarding and community ethics." />
          <Audience icon={<GraduationCap className="h-5 w-5" />} title="PTAs & professionals" body="Institutional and multi-agency safeguarding." />
        </div>
      </section>

      {/* THREE LEVELS */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-3xl">Three progressive learning levels</h2>
          <Link to="/learning-center" className="text-sm text-primary hover:underline">Open Learning Center →</Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {LEVELS.map((lv) => (
            <Link
              key={lv.key}
              to="/learning-center/$level"
              params={{ level: lv.key }}
              className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-warm"
            >
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Level {lv.number}
              </span>
              <h3 className="mt-3 font-serif text-xl">{lv.name.replace(/^Level \d+ — /, "")}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{lv.summary}</p>
              <p className="mt-4 text-xs text-muted-foreground">{lv.audience}</p>
              <p className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary">
                {lv.modules.length} modules <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-serif text-2xl">Book a live community circle</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Facilitated sessions on Zoom and Google Meet — for PTA groups, congregations, and teacher cohorts.
              </p>
            </div>
            <Link to="/sessions" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
              See upcoming sessions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Audience({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">{icon}</span>
      <h3 className="mt-4 font-serif text-xl">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
