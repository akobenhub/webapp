import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageSquareHeart } from "lucide-react";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Share Feedback Safely | Akoben Hub" },
      { name: "description", content: "Anonymous feedback on emotional safety, clarity, usefulness, and trust." },
    ],
  }),
  component: FeedbackPage,
});

const RATINGS: { key: string; label: string }[] = [
  { key: "safety", label: "Emotional safety" },
  { key: "clarity", label: "Clarity" },
  { key: "useful", label: "Usefulness" },
  { key: "trust", label: "Trust" },
  { key: "nav", label: "Navigation ease" },
];

function FeedbackPage() {
  const [values, setValues] = useState<Record<string, number>>({});
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (typeof window !== "undefined") {
      const key = "akoben.feedback.v1";
      const prev = JSON.parse(localStorage.getItem(key) ?? "[]");
      prev.push({ values, note, at: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(prev));
    }
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <p className="text-xs uppercase tracking-widest text-healing">Feedback</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">How was this experience?</h1>
      <p className="mt-4 text-muted-foreground">
        Your reflections are anonymous and help us hold a safer, more useful space.
      </p>

      {sent ? (
        <div className="mt-8 rounded-3xl bg-aqua p-6 shadow-soft">
          <MessageSquareHeart className="h-6 w-6 text-healing" />
          <p className="mt-2 font-serif text-2xl">Thank you</p>
          <p className="mt-2 text-sm text-foreground/85">Your feedback has been received with care.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-6 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
          {RATINGS.map((r) => (
            <div key={r.key}>
              <p className="text-sm font-medium">{r.label}</p>
              <div className="mt-2 flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setValues((v) => ({ ...v, [r.key]: n }))}
                    aria-label={`${r.label}: ${n} of 5`}
                    className={`h-10 flex-1 rounded-xl border text-sm font-medium transition-colors ${values[r.key] === n ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background hover:border-primary/40"}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">Anything you'd like us to know (optional)</span>
            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-2xl border border-input bg-background p-3 outline-none focus:border-primary"
            />
          </label>

          <button onClick={submit} className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground">
            Share safely
          </button>
        </div>
      )}
    </div>
  );
}
