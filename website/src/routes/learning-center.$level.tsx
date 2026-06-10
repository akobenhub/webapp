import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Download, FileText, Headphones, Lock, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { findLevel, type CurriculumModule, type Level } from "@/lib/curriculum";
import { isUnlocked, readProgress } from "@/lib/progress";
import { Progress } from "@/components/ui/progress";
import { CourseLangSwitcher } from "@/components/CourseLangSwitcher";
import { useCourseLang } from "@/lib/course-lang";
import { localizeLevel, localizeModule, uiTr } from "@/lib/curriculum-i18n";

export const Route = createFileRoute("/learning-center/$level")({
  head: ({ params }) => {
    const lv = findLevel(params.level);
    return {
      meta: [
        { title: `${lv?.name ?? "Level"} — Learning Center | Akoben Hub` },
        { name: "description", content: lv?.summary ?? "Akoben learning level." },
      ],
    };
  },
  loader: ({ params }) => {
    const lv = findLevel(params.level);
    if (!lv) throw notFound();
    return lv;
  },
  component: LevelPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="font-serif text-3xl">Level not found</h1>
      <Link to="/learning-center" className="mt-4 inline-block text-sm text-primary underline">Back to Learning Center</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="font-serif text-3xl">Something went wrong</h1>
      <Link to="/learning-center" className="mt-4 inline-block text-sm text-primary underline">Back to Learning Center</Link>
    </div>
  ),
});

function LevelPage() {
  const lv = Route.useLoaderData() as Level;
  const [completed, setCompleted] = useState<string[]>([]);
  const { lang } = useCourseLang();
  useEffect(() => { setCompleted(readProgress().completed); }, []);

  const set = new Set(completed);
  const done = lv.modules.filter((m) => set.has(m.slug)).length;
  const pct = Math.round((done / lv.modules.length) * 100);
  const lvLoc = localizeLevel(lv, lang);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link to="/learning-center" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All levels
      </Link>
      <p className="mt-4 text-xs uppercase tracking-widest text-primary">Level {lv.number}</p>
      <h1 className="mt-1 font-serif text-4xl sm:text-5xl">{lvLoc.name.replace(/^(Level|Sɔhwɛ|Kasemɔ Klɛŋklɛŋ) \d+ — /, "")}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{lvLoc.summary}</p>
      <p className="mt-4 max-w-2xl text-sm text-muted-foreground"><strong className="text-foreground">For:</strong> {lvLoc.audienceDetail}</p>

      <div className="mt-6"><CourseLangSwitcher /></div>

      <div className="mt-6 max-w-md">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{uiTr("levelProgress", lang)}</span><span>{done} of {lv.modules.length} ({pct}%)</span>
        </div>
        <Progress value={pct} className="mt-2 h-2" />
      </div>

      <div className="mt-10 grid gap-5">
        {lv.modules.map((modRaw: CurriculumModule, i: number) => {
          const mod = localizeModule(modRaw, lang);
          const unlocked = isUnlocked(lv.key, i, completed);
          const isDone = set.has(modRaw.slug);
          return (
            <article key={mod.slug} className={`rounded-3xl border bg-card p-6 shadow-soft ${unlocked ? "border-border" : "border-border/50 opacity-80"}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{uiTr("module", lang)} {i + 1}</p>
                    {isDone && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-healing/15 px-2 py-0.5 text-[0.65rem] font-medium text-healing">
                        <Check className="h-3 w-3" /> {uiTr("complete", lang)}
                      </span>
                    )}
                    {!unlocked && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground">
                        <Lock className="h-3 w-3" /> {uiTr("locked", lang)}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-1 font-serif text-2xl leading-snug">{mod.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{mod.description}</p>
                </div>
                <span className="hidden shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary sm:inline">{mod.durationMin} min</span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-xs">
                <Tag><FileText className="h-3.5 w-3.5" /> {uiTr("text", lang)}</Tag>
                {mod.hasAudio && <Tag><Headphones className="h-3.5 w-3.5" /> {uiTr("audio", lang)}</Tag>}
                {mod.hasVideo && <Tag><Video className="h-3.5 w-3.5" /> {uiTr("video", lang)}</Tag>}
                {mod.hasDownload && <Tag><Download className="h-3.5 w-3.5" /> PDF</Tag>}
              </div>

              <div className="mt-5">
                {unlocked ? (
                  <Link
                    to="/learning-center/$level/$module"
                    params={{ level: lv.key, module: modRaw.slug }}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-95"
                  >
                    {isDone ? uiTr("review", lang) : uiTr("continueBtn", lang)} <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-input bg-background px-5 text-sm font-medium text-muted-foreground">
                    <Lock className="h-4 w-4" /> {uiTr("completePrev", lang)}
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-12 rounded-3xl bg-aqua p-6 shadow-soft sm:p-8">
        <p className="text-sm text-foreground/85">
          Progress is saved privately on your device. Create a gentle profile to sync across devices and receive optional WhatsApp reminders.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/onboarding/community" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Create a gentle profile</Link>
          <Link to="/progress" className="rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent">See your progress</Link>
        </div>
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">{children}</span>;
}
