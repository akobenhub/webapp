// Client-only progress + sequential module locking. localStorage, no backend.
import { LEVELS, type Level } from "./curriculum";

const KEY = "akoben.progress.v1";

export type Progress = {
  completed: string[]; // module slugs
  lastVisited?: string;
  role?: string;
};

export function readProgress(): Progress {
  if (typeof window === "undefined") return { completed: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { completed: [] };
    return JSON.parse(raw) as Progress;
  } catch {
    return { completed: [] };
  }
}

export function writeProgress(p: Progress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function isCompleted(slug: string): boolean {
  return readProgress().completed.includes(slug);
}

export function markComplete(slug: string) {
  const p = readProgress();
  const set = new Set(p.completed);
  set.add(slug);
  writeProgress({ ...p, completed: [...set], lastVisited: slug });
}

export function markVisited(slug: string) {
  const p = readProgress();
  writeProgress({ ...p, lastVisited: slug });
}

export function setRole(role: string) {
  writeProgress({ ...readProgress(), role });
}

/**
 * A module is unlocked if it is the first of its level, or the previous module
 * in the same level is completed. Levels also unlock sequentially: Level 2 only
 * opens after every Level 1 module is completed.
 */
export function isUnlocked(levelKey: Level["key"], moduleIndex: number, completed: string[]): boolean {
  const set = new Set(completed);
  const idx = LEVELS.findIndex((l) => l.key === levelKey);
  // Previous levels must all be complete
  for (let i = 0; i < idx; i++) {
    if (!LEVELS[i].modules.every((m) => set.has(m.slug))) return false;
  }
  if (moduleIndex === 0) return true;
  const prev = LEVELS[idx].modules[moduleIndex - 1];
  return set.has(prev.slug);
}

export function isLevelUnlocked(levelKey: Level["key"], completed: string[]): boolean {
  const set = new Set(completed);
  const idx = LEVELS.findIndex((l) => l.key === levelKey);
  for (let i = 0; i < idx; i++) {
    if (!LEVELS[i].modules.every((m) => set.has(m.slug))) return false;
  }
  return true;
}

export function levelProgress(levelKey: Level["key"], completed: string[]): { done: number; total: number } {
  const set = new Set(completed);
  const lvl = LEVELS.find((l) => l.key === levelKey)!;
  return { done: lvl.modules.filter((m) => set.has(m.slug)).length, total: lvl.modules.length };
}
