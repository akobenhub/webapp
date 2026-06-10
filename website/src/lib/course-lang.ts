import { useEffect, useState } from "react";
import type { CourseLang } from "./curriculum-i18n";

const STORAGE_KEY = "akoben.course.lang";

function readInitial(): CourseLang {
  if (typeof window === "undefined") return "en";
  const v = window.localStorage.getItem(STORAGE_KEY) as CourseLang | null;
  return v === "tw" || v === "ga" ? v : "en";
}

// Lightweight cross-component sync via storage events + custom event.
const EVENT_NAME = "akoben:course-lang-change";

export function useCourseLang() {
  const [lang, setLangState] = useState<CourseLang>("en");

  useEffect(() => {
    setLangState(readInitial());
    const onChange = () => setLangState(readInitial());
    window.addEventListener(EVENT_NAME, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT_NAME, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const setLang = (l: CourseLang) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
      window.dispatchEvent(new Event(EVENT_NAME));
    }
    setLangState(l);
  };

  return { lang, setLang };
}
