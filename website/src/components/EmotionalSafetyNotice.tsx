import { Heart, Pause, ShieldCheck } from "lucide-react";

export function EmotionalSafetyNotice({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      role="note"
      aria-label="Emotional safety notice"
      className="rounded-3xl border border-healing/40 bg-healing/10 p-5 sm:p-6"
    >
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-healing text-healing-foreground">
          <ShieldCheck className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <h3 className="font-serif text-lg leading-snug">Your emotional safety comes first</h3>
          {!compact && (
            <ul className="mt-3 space-y-2 text-sm text-foreground/85">
              <li className="flex gap-2"><Heart className="mt-0.5 h-4 w-4 shrink-0 text-warmth-foreground" aria-hidden /> Participation is voluntary. You are never pressured to disclose anything.</li>
              <li className="flex gap-2"><Pause className="mt-0.5 h-4 w-4 shrink-0 text-warmth-foreground" aria-hidden /> You may pause, leave, or continue at your own pace — there is no wrong way.</li>
              <li className="flex gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-warmth-foreground" aria-hidden /> High-risk concerns may be escalated safely through trained human support.</li>
            </ul>
          )}
          {compact && (
            <p className="mt-1.5 text-sm text-foreground/85">
              Voluntary · You may pause or leave at any time · Trained humans review urgent concerns.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
