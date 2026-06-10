import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Download, FileText, Play, ShieldCheck, Video } from "lucide-react";
import { MODULES, ModuleCard } from "@/components/ModuleCard";

export const Route = createFileRoute("/teachers")({
  head: () => ({
    meta: [
      { title: "Teacher Safeguarding Resources | Akoben Hub" },
      { name: "description", content: "Animations, lesson plans, classroom safeguarding tools and age-appropriate child protection education for teachers in Ghana." },
      { property: "og:title", content: "Teacher Safeguarding Resources" },
      { property: "og:description", content: "Classroom-ready safeguarding lessons, animations, and disclosure response training." },
    ],
  }),
  component: TeachersPage,
});

function TeachersPage() {
  const items = MODULES.filter((m) => m.tone === "teachers");
  return (
    <div>
      <section className="bg-pathway-parents text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <p className="text-sm font-medium opacity-80">Teachers</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.05] sm:text-5xl">
            A safer classroom starts with you
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/85">
            Animations, lesson plans, and disclosure response tools — designed for Ghanaian classrooms and built around trauma-informed practice.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/onboarding" className="rounded-full bg-warmth px-5 py-3 text-sm font-semibold text-warmth-foreground">Start learning</Link>
            <Link to="/referral" className="rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-medium hover:bg-white/20">Refer a learner</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-serif text-3xl">Classroom resource library</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Resource icon={<Video />} title="Child protection animations" body="Short, learner-friendly animations for KG, primary, and JHS." />
          <Resource icon={<BookOpen />} title="Lesson support materials" body="Editable lesson plans, prompts, and group activities." />
          <Resource icon={<FileText />} title="Observation logs" body="Printable templates to document concerns confidentially." />
          <Resource icon={<Download />} title="Posters & handouts" body="Low-ink classroom posters in English, Twi, and Ga." />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <h2 className="font-serif text-3xl">Featured animation</h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">A 3-minute classroom animation introducing safe/unsafe touch in age-appropriate language.</p>
        <div className="mt-6 grid place-items-center rounded-3xl border border-border bg-card p-8 shadow-soft">
          <div className="aspect-video w-full max-w-3xl rounded-2xl bg-pathway-parents text-primary-foreground">
            <div className="flex h-full items-center justify-center">
              <button aria-label="Play animation" className="grid h-16 w-16 place-items-center rounded-full bg-white/20 backdrop-blur transition-transform hover:scale-105">
                <Play className="h-7 w-7 translate-x-0.5" />
              </button>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Available in English · Twi · Ga · Low-data version on request</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-3xl">Teacher modules</h2>
          <Link to="/modules" className="text-sm text-primary hover:underline">All modules →</Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => <ModuleCard key={m.slug} m={m} />)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-3xl bg-warmth/20 p-8 shadow-soft sm:p-10">
          <div className="flex items-start gap-4">
            <ShieldCheck className="h-6 w-6 shrink-0 text-primary" aria-hidden />
            <div>
              <h2 className="font-serif text-2xl">Hold the space gently</h2>
              <p className="mt-2 max-w-2xl text-sm text-foreground/85">
                When a learner shares something difficult: listen without interrupting, thank them for trusting you, document carefully, and escalate through your school's safeguarding lead. Never promise secrecy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Resource({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">{icon}</span>
      <h3 className="mt-4 font-serif text-lg">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
