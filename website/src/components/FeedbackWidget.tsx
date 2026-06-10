import { MessageSquareHeart, X } from "lucide-react";
import { useState } from "react";

/**
 * Floating feedback button. Stores feedback locally for now — low-data, no backend yet.
 */
export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [note, setNote] = useState("");

  const submit = () => {
    if (typeof window !== "undefined") {
      const key = "akoben.feedback.v1";
      const prev = JSON.parse(localStorage.getItem(key) ?? "[]");
      prev.push({ rating, note, at: new Date().toISOString(), path: window.location.pathname });
      localStorage.setItem(key, JSON.stringify(prev));
    }
    setSent(true);
    setTimeout(() => { setOpen(false); setSent(false); setRating(null); setNote(""); }, 1800);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Share feedback safely"
        className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full bg-healing px-4 py-3 text-sm font-medium text-healing-foreground shadow-warm hover:opacity-95"
      >
        <MessageSquareHeart className="h-4 w-4" /> <span className="hidden sm:inline">Share feedback</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/30 p-4 sm:items-center" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-3xl bg-card p-6 shadow-warm">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-serif text-xl">How was this experience?</h2>
                <p className="mt-1 text-sm text-muted-foreground">Your feedback is anonymous and helps us hold a safer space.</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1 hover:bg-secondary">
                <X className="h-4 w-4" />
              </button>
            </div>

            {sent ? (
              <p className="mt-6 rounded-2xl bg-healing/15 p-4 text-sm text-foreground">Thank you. Your reflection is received with care.</p>
            ) : (
              <>
                <div className="mt-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">How safe did this feel?</p>
                  <div className="mt-3 flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        aria-label={`${n} of 5`}
                        className={`h-10 flex-1 rounded-xl border text-sm font-medium transition-colors ${rating === n ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background hover:border-primary/40"}`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="Anything you'd like us to know (optional)"
                  className="mt-4 w-full rounded-2xl border border-input bg-background p-3 text-sm outline-none focus:border-primary"
                />
                <button
                  onClick={submit}
                  disabled={!rating}
                  className="mt-4 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
                >
                  Share safely
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
