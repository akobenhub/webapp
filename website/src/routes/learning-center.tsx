import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, FileText, GraduationCap, Headphones, Lock, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { LEVELS, type CurriculumModule, type Level } from "@/lib/curriculum";
import { isLevelUnlocked, isUnlocked, levelProgress, readProgress } from "@/lib/progress";
import { Progress } from "@/components/ui/progress";

import { useCourseLang } from "@/lib/course-lang";
import { localizeLevel, localizeModule, uiTr } from "@/lib/curriculum-i18n";

export const Route = createFileRoute("/learning-center")({
  head: () => ({
    meta: [
      { title: "Learning Center — Parent & Community Education | Akoben Hub" },
      { name: "description", content: "Three progressive levels of child protection education — 8 modules per level. Available in English, Twi, and Ga." },
    ],
  }),
  component: LearningCenterPage,
});

function LearningCenterPage() {
  const [completed, setCompleted] = useState<string[]>([]);
  const { lang } = useCourseLang();
  useEffect(() => { setCompleted(readProgress().completed); }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">Pathway 1 · Parent & Community Education</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Learning Center</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Three progressive levels of trauma-informed child protection education — 8 modules per level.
        <strong> Every learner begins at Level 1.</strong> Modules unlock as you complete each step, so the
        learning builds gently and safely.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-soft">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Content Languages</p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
            English <span aria-hidden>✅</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-muted-foreground">
            Twi <span aria-hidden>🚧</span> Coming Soon
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-muted-foreground">
            Ga <span aria-hidden>🚧</span> Coming Soon
          </span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          English content is available now. Twi and Ga translations are being prepared.
        </p>
      </div>

      <div className="mt-12 space-y-16">
        {LEVELS.map((lv) => (
          <LevelSection key={lv.key} lv={lv} completed={completed} lang={lang} />
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-aqua p-6 shadow-soft sm:p-8">
        <p className="text-xs uppercase tracking-wider text-aqua-foreground">A note on scope</p>
        <h2 className="mt-2 font-serif text-2xl">Survivor psychoeducation lives in its own pathway</h2>
        <p className="mt-2 max-w-2xl text-sm text-foreground/80">
          To protect emotional safety, survivor support is kept separate from parent and community safeguarding education.
          If you are a survivor seeking gentle, confidential learning, visit the{" "}
          <Link to="/survivors" className="font-medium underline">Akoben Empowerment Circle</Link>.
        </p>
      </div>
    </div>
  );
}

function LevelSection({ lv, completed, lang }: { lv: Level; completed: string[]; lang: "en" | "tw" | "ga" }) {
  const levelUnlocked = isLevelUnlocked(lv.key, completed);
  const set = new Set(completed);
  const { done, total } = levelProgress(lv.key, completed);
  const pct = Math.round((done / total) * 100);
  const lvLoc = localizeLevel(lv, lang);

  return (
    <section aria-labelledby={`level-${lv.key}`}>
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <GraduationCap className="h-3.5 w-3.5" /> Level {lv.number}
            </span>
            <h2 id={`level-${lv.key}`} className="mt-3 font-serif text-3xl sm:text-4xl">
              {lvLoc.name.replace(/^(Level|Sɔhwɛ|Kasemɔ Klɛŋklɛŋ) \d+ — /, "")}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{lvLoc.summary}</p>
            <p className="mt-3 max-w-2xl text-sm"><span className="font-medium">For:</span> <span className="text-muted-foreground">{lvLoc.audience}</span></p>
          </div>
          {!levelUnlocked && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
              <Lock className="h-3.5 w-3.5" /> {uiTr("completePrev", lang)}
            </span>
          )}
        </div>

        <div className="mt-5 max-w-md">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{uiTr("levelProgress", lang)}</span><span>{done} of {total} ({pct}%)</span>
          </div>
          <Progress value={pct} className="mt-2 h-2" />
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {lv.modules.map((mod, i) => {
          const unlocked = levelUnlocked && isUnlocked(lv.key, i, completed);
          const isDone = set.has(mod.slug);
          return (
            <ModuleCard
              key={mod.slug}
              levelKey={lv.key}
              mod={localizeModule(mod, lang)}
              slug={mod.slug}
              index={i}
              unlocked={unlocked}
              isDone={isDone}
              lang={lang}
            />
          );
        })}
      </div>
    </section>
  );
}

function ModuleCard({
  levelKey, mod, slug, index, unlocked, isDone, lang,
}: {
  levelKey: Level["key"];
  mod: CurriculumModule;
  slug: string;
  index: number;
  unlocked: boolean;
  isDone: boolean;
  lang: "en" | "tw" | "ga";
}) {
  return (
    <article className={`flex h-full flex-col rounded-3xl border bg-card p-5 shadow-soft ${unlocked ? "border-border" : "border-border/50 opacity-80"}`}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{uiTr("module", lang)} {index + 1}</p>
        {isDone ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-healing/15 px-2 py-0.5 text-[0.65rem] font-medium text-healing">
            <Check className="h-3 w-3" /> {uiTr("complete", lang)}
          </span>
        ) : !unlocked ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground">
            <Lock className="h-3 w-3" /> {uiTr("locked", lang)}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[0.65rem] font-medium text-primary">
            {uiTr("inProgress", lang)}
          </span>
        )}
      </div>

      <h3 className="mt-3 font-serif text-lg leading-snug">{mod.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{mod.description}</p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {mod.hasVideo && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1">
            <Video className="h-3.5 w-3.5" /> {uiTr("video", lang)}
          </span>
        )}
        {mod.hasAudio && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1">
            <Headphones className="h-3.5 w-3.5" /> {uiTr("audio", lang)}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1">
          <FileText className="h-3.5 w-3.5" /> {uiTr("text", lang)}
        </span>
      </div>

      <div className="mt-auto pt-5">
        <p className="mb-3 text-xs text-muted-foreground">{mod.durationMin} min</p>
        {unlocked ? (
          <Link
            to="/learning-center/$level/$module"
            params={{ level: levelKey, module: slug }}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-95"
          >
            {isDone ? uiTr("review", lang) : uiTr("continueBtn", lang)} <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-flex min-h-11 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-input bg-background px-5 text-sm font-medium text-muted-foreground"
          >
            <Lock className="h-4 w-4" /> {uiTr("locked", lang)}
          </button>
        )}
      </div>
    </article>
  );
}
