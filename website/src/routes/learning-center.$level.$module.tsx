import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Download, FileText, Headphones, Lock, Video, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LEVELS, findLevel } from "@/lib/curriculum";
import { EmbeddedAudioPlayer } from "@/components/EmbeddedAudioPlayer";
import { isCompleted, isUnlocked, markComplete, markVisited, readProgress } from "@/lib/progress";
import { CourseLangSwitcher } from "@/components/CourseLangSwitcher";
import { useCourseLang } from "@/lib/course-lang";
import { localizeLevel, localizeModule, uiTr } from "@/lib/curriculum-i18n";
import module1AudioAsset from "@/assets/level1-module1-audio.mp3.asset.json";

type Format = "video" | "audio" | "text" | null;
type Lang = "en" | "tw" | "ga";

const LANG_LABEL: Record<Lang, string> = { en: "English", tw: "Twi", ga: "Ga" };
const AVAILABLE_LANGS: Lang[] = ["en"];

export const Route = createFileRoute("/learning-center/$level/$module")({
  head: ({ params }) => {
    const lv = findLevel(params.level);
    const mod = lv?.modules.find((m) => m.slug === params.module);
    return {
      meta: [
        { title: `${mod?.title ?? "Module"} | Akoben Learning Center` },
        { name: "description", content: mod?.description ?? "Akoben learning module." },
      ],
    };
  },
  loader: ({ params }) => {
    const lv = findLevel(params.level);
    const idx = lv?.modules.findIndex((m) => m.slug === params.module) ?? -1;
    if (!lv || idx < 0) throw notFound();
    return { level: lv, moduleIndex: idx };
  },
  component: ModulePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="font-serif text-3xl">Lesson not found</h1>
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

function ModulePage() {
  const { level, moduleIndex } = Route.useLoaderData();
  const modRaw = level.modules[moduleIndex];
  const { lang: courseLang } = useCourseLang();
  const lv = localizeLevel(level, courseLang);
  const mod = localizeModule(modRaw, courseLang);
  const [unlocked, setUnlocked] = useState(true);
  const [done, setDone] = useState(false);

  const [format, setFormat] = useState<Format>(null);
  const [pickerFor, setPickerFor] = useState<"video" | "audio" | "text" | null>(null);
  const [unavailableMsg, setUnavailableMsg] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => { if (AVAILABLE_LANGS.includes(courseLang as Lang)) setLang(courseLang); }, [courseLang]);

  useEffect(() => {
    const p = readProgress();
    setUnlocked(isUnlocked(level.key, moduleIndex, p.completed));
    setDone(isCompleted(mod.slug));
    markVisited(mod.slug);
  }, [level.key, moduleIndex, mod.slug]);

  const handleComplete = () => {
    markComplete(mod.slug);
    setDone(true);
  };

  const nextMod = level.modules[moduleIndex + 1];
  const nextLevel = LEVELS[LEVELS.findIndex((l) => l.key === level.key) + 1];

  if (!unlocked) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-secondary text-muted-foreground">
          <Lock className="h-6 w-6" />
        </span>
        <h1 className="mt-4 font-serif text-3xl">This module is locked</h1>
        <p className="mt-3 text-muted-foreground">
          To keep learning safe and progressive, please complete the previous modules first.
        </p>
        <Link to="/learning-center/$level" params={{ level: level.key }} className="mt-6 inline-block rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
          Back to {lv.name}
        </Link>
      </div>
    );
  }

  const pickFormat = (f: "video" | "audio" | "text") => {
    setPickerFor(f);
  };

  const confirmLang = (l: Lang) => {
    if (!AVAILABLE_LANGS.includes(l)) {
      setUnavailableMsg("Translation content is currently being prepared and will be available in a future release.");
      return;
    }
    setLang(l);
    setFormat(pickerFor);
    setPickerFor(null);
    setUnavailableMsg(null);
  };

  const isModule1Basic = level.key === "basic" && modRaw.slug === "basic-csa";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <Link to="/learning-center/$level" params={{ level: level.key }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to {lv.name}
      </Link>

      <p className="mt-4 text-xs uppercase tracking-widest text-primary">{uiTr("module", courseLang)} {moduleIndex + 1} of {level.modules.length}</p>
      <h1 className="mt-1 font-serif text-3xl sm:text-4xl">{mod.title}</h1>
      <p className="mt-3 text-muted-foreground">{mod.description}</p>

      <div className="mt-5"><CourseLangSwitcher /></div>


      {/* Format selector */}
      <div className="mt-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Choose how you'd like to learn</p>
        <div className="mt-3 grid grid-cols-3 gap-3 sm:gap-4">
          <FormatButton
            active={format === "video"}
            icon={<Video className="h-7 w-7" />}
            label="Video"
            sublabel="EN · Twi · Ga"
            onClick={() => pickFormat("video")}
          />
          <FormatButton
            active={format === "audio"}
            icon={<Headphones className="h-7 w-7" />}
            label="Audio"
            sublabel="EN · Twi · Ga"
            onClick={() => pickFormat("audio")}
          />
          <FormatButton
            active={format === "text"}
            icon={<FileText className="h-7 w-7" />}
            label="Text"
            sublabel="EN · Twi · Ga"
            onClick={() => pickFormat("text")}
          />
        </div>
      </div>

      {/* Content area */}
      <div className="mt-8">
        {format === null && (
          <div className="rounded-3xl border border-dashed border-border bg-secondary/40 p-8 text-center text-sm text-muted-foreground">
            Tap a format above to begin this lesson.
          </div>
        )}

        {format === "video" && (
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <div className="grid aspect-video place-items-center bg-foreground/90 text-background">
              <div className="text-center">
                <Video className="mx-auto h-10 w-10 opacity-70" />
                <p className="mt-3 text-sm">Video lesson — {LANG_LABEL[lang]}</p>
                <p className="text-xs opacity-70">Video will play here</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 text-xs text-muted-foreground">
              <span>Language: {LANG_LABEL[lang]}</span>
              <button onClick={() => setPickerFor("video")} className="text-primary underline">Change language</button>
            </div>
          </div>
        )}

        {format === "audio" && (
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            {isModule1Basic ? (
              <>
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-widest text-primary">Sample Audio Lesson</p>
                  <h3 className="mt-1 font-serif text-xl">{mod.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Duration: 17 minutes 20 seconds</p>
                </div>
                <EmbeddedAudioPlayer
                  src={module1AudioAsset.url}
                  title={mod.title}
                  fallbackDuration="17:20"
                />
                <p className="mt-3 text-xs text-muted-foreground">
                  This sample demonstrates the tone and teaching style of the Level 1 Basic curriculum.
                  Professional recordings will be added in future versions.
                </p>
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-secondary/30 p-6 text-center text-sm text-muted-foreground">
                Audio for this module will be added in a future release.
              </div>
            )}
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>Language: {LANG_LABEL[lang]}</span>
              <button onClick={() => setPickerFor("audio")} className="text-primary underline">Change language</button>
            </div>
          </div>
        )}

        {format === "text" && (
          <article className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <h2 className="font-serif text-2xl">Lesson overview</h2>
            <p className="mt-3 text-sm text-foreground/85">
              This lesson is delivered in short, gentle segments. Take your time — pause whenever you need to.
              Audio and video versions in Twi and Ga are available above.
            </p>
            <h3 className="mt-6 font-serif text-lg">Key ideas</h3>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-foreground/85">
              <li>What this looks like in everyday Ghanaian family, school, and faith life.</li>
              <li>Why a trauma-informed lens changes how we respond.</li>
              <li>Practical, gentle steps you can use straight away.</li>
            </ul>

            {mod.hasDownload && (
              <div className="mt-6 rounded-2xl bg-secondary/60 p-4 text-sm">
                <p className="font-medium">Downloadable resources</p>
                <p className="mt-1 text-xs text-muted-foreground">A printable summary for sharing in your home, school, or faith group.</p>
                <button className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
                  <Download className="h-3.5 w-3.5" /> Download PDF
                </button>
              </div>
            )}
          </article>
        )}
      </div>

      {/* Complete + next */}
      <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-soft">
        {done ? (
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-healing text-healing-foreground">
              <Check className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium">Module complete</p>
              <p className="text-sm text-muted-foreground">Your progress is saved on this device.</p>
            </div>
          </div>
        ) : (
          <button onClick={handleComplete} className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            Mark as completed
          </button>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          {nextMod && (
            <Link
              to="/learning-center/$level/$module"
              params={{ level: level.key, module: nextMod.slug }}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold ${done ? "bg-primary text-primary-foreground" : "border border-input bg-background text-muted-foreground pointer-events-none"}`}
            >
              {done ? "Next lesson" : "Next lesson (unlocks when complete)"} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
          {!nextMod && nextLevel && done && (
            <Link
              to="/learning-center/$level"
              params={{ level: nextLevel.key }}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
            >
              Begin {nextLevel.name} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
          {!nextMod && !nextLevel && done && (
            <p className="text-sm text-healing">You have completed every level. Thank you for walking this path.</p>
          )}
        </div>
      </div>

      {/* Language picker modal */}
      {pickerFor && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4"
          onClick={() => { setPickerFor(null); setUnavailableMsg(null); }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-sm rounded-3xl bg-card p-6 shadow-warm"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setPickerFor(null); setUnavailableMsg(null); }}
              aria-label="Close"
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-secondary"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-xs uppercase tracking-widest text-primary">
              {pickerFor === "video" ? "Video" : pickerFor === "audio" ? "Audio" : "Text"} lesson
            </p>
            <h2 className="mt-1 font-serif text-2xl">Select Language</h2>
            <div className="mt-5 grid gap-2">
              {(["en", "tw", "ga"] as Lang[]).map((l) => {
                const available = AVAILABLE_LANGS.includes(l);
                return (
                  <button
                    key={l}
                    onClick={() => confirmLang(l)}
                    aria-disabled={!available}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                      available
                        ? "border-input bg-background hover:border-primary hover:bg-secondary"
                        : "cursor-not-allowed border-border/60 bg-secondary/40 text-muted-foreground opacity-70"
                    }`}
                  >
                    <span>{LANG_LABEL[l]}</span>
                    <span className="text-xs">
                      {available ? <span aria-hidden>✅ Available</span> : <span aria-hidden>🚧 Coming Soon</span>}
                    </span>
                  </button>
                );
              })}
            </div>
            {unavailableMsg && (
              <p className="mt-4 rounded-2xl bg-warmth/20 p-3 text-xs text-foreground/85">
                {unavailableMsg}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function FormatButton({
  active, icon, label, sublabel, onClick,
}: {
  active: boolean; icon: React.ReactNode; label: string; sublabel: string; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 rounded-3xl border p-4 text-center transition-all sm:p-5 ${
        active
          ? "border-primary bg-primary/5 shadow-soft"
          : "border-border bg-card hover:border-primary/40 hover:bg-secondary/50"
      }`}
    >
      <span className={`grid h-12 w-12 place-items-center rounded-full ${active ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"}`}>
        {icon}
      </span>
      <span className="mt-1 text-sm font-semibold">{label}</span>
      <span className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">{sublabel}</span>
    </button>
  );
}
