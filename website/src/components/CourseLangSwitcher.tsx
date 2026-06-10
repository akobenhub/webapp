import { Languages } from "lucide-react";
import { COURSE_LANGS, type CourseLang, uiTr } from "@/lib/curriculum-i18n";
import { useCourseLang } from "@/lib/course-lang";

export function CourseLangSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useCourseLang();
  return (
    <div className={`flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-soft ${className}`}>
      <span className="inline-flex items-center gap-1.5 pl-2 pr-1 text-xs font-medium text-muted-foreground">
        <Languages className="h-3.5 w-3.5" aria-hidden /> {uiTr("contentLanguage", lang)}:
      </span>
      <div role="radiogroup" aria-label={uiTr("chooseLanguage", lang)} className="flex flex-wrap gap-1">
        {COURSE_LANGS.map((l) => {
          const active = l.code === lang;
          return (
            <button
              key={l.code}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setLang(l.code as CourseLang)}
              className={`min-h-9 rounded-full px-3 text-xs font-semibold transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              {l.native}
            </button>
          );
        })}
      </div>
    </div>
  );
}
