// Anonymous Circle ID system for the Akoben Empowerment Circle.
// Stored client-side via localStorage. Format: AEC-#### (1000–9999).

const STORAGE_KEY = "aec.circle";
const USED_KEY = "aec.circle.used";

export type CircleSession = {
  circleId: string;
  userType: "anonymous" | "registered";
  createdAt: string;
};

function readUsed(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(USED_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeUsed(used: Set<string>) {
  try {
    localStorage.setItem(USED_KEY, JSON.stringify(Array.from(used)));
  } catch {
    /* ignore */
  }
}

export function generateCircleId(): string {
  const used = readUsed();
  // Up to 9000 possible IDs; safe loop.
  for (let i = 0; i < 50; i++) {
    const n = Math.floor(1000 + Math.random() * 9000);
    const id = `AEC-${n}`;
    if (!used.has(id)) {
      used.add(id);
      writeUsed(used);
      return id;
    }
  }
  // Fallback: extend with a suffix if the local pool is exhausted.
  const fallback = `AEC-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-3)}`;
  used.add(fallback);
  writeUsed(used);
  return fallback;
}

export function saveSession(session: CircleSession) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    /* ignore */
  }
}

export function loadSession(): CircleSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CircleSession) : null;
  } catch {
    return null;
  }
}
