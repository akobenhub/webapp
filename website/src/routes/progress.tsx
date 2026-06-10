import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Award, Check, Sparkles } from "lucide-react";
import { MODULES } from "@/components/ModuleCard";
import { isCompleted, markComplete, readProgress, writeProgress } from "@/lib/progress";

function toggleComplete(slug: string) {
  const p = readProgress();
  if (isCompleted(slug)) writeProgress({ ...p, completed: p.completed.filter((s) => s !== slug) });
  else markComplete(slug);
}

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Your Learning Progress | Akoben Hub" },
      { name: "description", content: "Track completed modules, continue unfinished lessons, and earn safeguarding completion badges." },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const [completed, setCompleted] = useState<string[]>([]);
  useEffect(() => { setCompleted(readProgress().completed); }, []);

  const pct = Math.round((completed.length / MODULES.length) * 100);
  const earnedBadge = completed.length >= 5;

  const onToggle = (slug: string) => {
    toggleComplete(slug);
    setCompleted(readProgress().completed);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">Your learning</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Walk gently — every step counts</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        There is no pressure to finish. You can pause for a day, a week, or a season. Your progress is saved privately on this device.
      </p>

      <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Modules completed</p>
            <p className="mt-1 font-serif text-4xl">{completed.length} <span className="text-muted-foreground/60 text-2xl">/ {MODULES.length}</span></p>
          </div>
          <p className="inline-flex items-center gap-2 text-sm text-primary">
            <Sparkles className="h-4 w-4" /> You're doing well.
          </p>
        </div>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-pathway-parents transition-[width] duration-500" style={{ width: `${pct}%` }} />
        </div>

        {earnedBadge && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-warmth/20 p-4">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-warmth text-warmth-foreground">
              <Award className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium">Safeguarding Foundations badge earned</p>
              <p className="text-xs text-muted-foreground">For completing 5 or more modules. Thank you for showing up.</p>
            </div>
          </div>
        )}
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-2xl">Modules</h2>
        <ul className="mt-5 divide-y divide-border rounded-3xl border border-border bg-card shadow-soft">
          {MODULES.map((m) => {
            const done = completed.includes(m.slug);
            return (
              <li key={m.slug} className="flex flex-wrap items-center gap-3 p-4 sm:p-5">
                <button
                  onClick={() => onToggle(m.slug)}
                  aria-label={done ? "Mark as not complete" : "Mark as complete"}
                  className={`grid h-7 w-7 place-items-center rounded-full border ${done ? "border-healing bg-healing text-healing-foreground" : "border-input bg-background text-muted-foreground"}`}
                >
                  {done && <Check className="h-4 w-4" />}
                </button>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium ${done ? "line-through opacity-60" : ""}`}>{m.title}</p>
                  <p className="text-xs text-muted-foreground">{m.audience} · {m.duration}</p>
                </div>
                <Link to="/modules" className="rounded-full bg-secondary px-3 py-1.5 text-xs hover:bg-accent">Open</Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
