import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, HeartHandshake, Sparkles } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { EmotionalSafetyNotice } from "@/components/EmotionalSafetyNotice";

type Kind = "facilitator" | "referral" | "guidance" | "peer";

export const Route = createFileRoute("/support-request")({
  head: () => ({
    meta: [
      { title: "Request Support — Akoben Empowerment Circle" },
      {
        name: "description",
        content:
          "A gentle space to ask for facilitator follow-up, referral information, or additional guidance — at your own pace, on your own terms.",
      },
    ],
  }),
  component: SupportRequest,
});

const KIND_OPTIONS: { value: Kind; label: string; body: string }[] = [
  {
    value: "facilitator",
    label: "Facilitator follow-up",
    body: "A gentle check-in from a circle facilitator.",
  },
  {
    value: "referral",
    label: "Referral information",
    body: "Trusted services for counselling, medical, or safety support.",
  },
  {
    value: "guidance",
    label: "Additional guidance",
    body: "Help thinking through a next step at your own pace.",
  },
  {
    value: "peer",
    label: "Peer support",
    body: "Connect with others walking a similar path.",
  },
];

const schema = z.object({
  kind: z.enum(["facilitator", "referral", "guidance", "peer"], {
    message: "Please choose what kind of support feels right.",
  }),
  anon: z.boolean(),
  name: z.string().trim().max(80, "Please keep this under 80 characters.").optional(),
  contact: z.string().trim().max(120, "Please keep this under 120 characters.").optional(),
  note: z.string().trim().max(1000, "Please keep this under 1000 characters.").optional(),
  preferredTime: z.string().trim().max(120, "Please keep this short.").optional(),
}).refine(
  (d) => d.anon || (d.contact && d.contact.length > 0),
  { message: "Please share a phone or email so we can reach you gently.", path: ["contact"] },
);

function SupportRequest() {
  const [kind, setKind] = useState<Kind | null>(null);
  const [anon, setAnon] = useState(true);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse({ kind, anon, name, contact, note, preferredTime });
    if (!result.success) {
      const map: Record<string, string> = {};
      for (const issue of result.error.issues) {
        map[issue.path.join(".") || "_"] = issue.message;
      }
      setErrors(map);
      toast.error("A few things need a gentle look before we can send this.");
      return;
    }
    setErrors({});
    // Local-only submission for now; no PII is sent off-device.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-healing text-healing-foreground">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h1 className="mt-5 font-serif text-3xl">Thank you for reaching out</h1>
        <p className="mt-3 text-muted-foreground">
          {anon
            ? "Because you chose to remain anonymous, we are unable to send reminders or follow up directly. A facilitator will hold space for your request at the next available circle. Please save any sessions you wish to attend manually."
            : "A facilitator will respond gently within 24–48 hours. There is nothing you need to do in the meantime — your request is safely held."}
        </p>
        <div className="mt-6 rounded-2xl bg-aqua/60 p-5 text-left text-sm text-foreground/85">
          <p className="font-medium">If you ever feel unsafe right now</p>
          <p className="mt-2">
            DOVVSU: <span className="font-medium">055-100-0900</span> · Orange Support Unit: <span className="font-medium">0800-111-222</span>
          </p>
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/circle"
            className="rounded-full bg-healing px-5 py-2.5 text-sm font-semibold text-healing-foreground"
          >
            Back to your Circle
          </Link>
          <Link
            to="/survivors"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Return to the welcome page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        A gentle pathway
      </p>
      <h1 className="mt-2 font-serif text-4xl">Request Support</h1>
      <p className="mt-3 text-muted-foreground">
        There is no urgency here. Share only what feels safe, and only as much as
        you wish. You can pause, return, or leave at any moment.
      </p>

      <div className="mt-6">
        <EmotionalSafetyNotice compact />
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-7 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
      >
        <fieldset>
          <legend className="font-medium">What kind of support feels right today?</legend>
          <p className="mt-1 text-xs text-muted-foreground">
            You can change your mind later. Choose what feels gentlest.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {KIND_OPTIONS.map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() => setKind(opt.value)}
                aria-pressed={kind === opt.value}
                className={`rounded-2xl border p-4 text-left text-sm transition-colors ${
                  kind === opt.value
                    ? "border-healing bg-healing/5"
                    : "border-input hover:border-healing/40"
                }`}
              >
                <HeartHandshake className="h-4 w-4 text-healing" />
                <p className="mt-2 font-medium">{opt.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{opt.body}</p>
              </button>
            ))}
          </div>
          {errors.kind && (
            <p className="mt-2 text-xs text-destructive">{errors.kind}</p>
          )}
        </fieldset>

        <fieldset>
          <legend className="font-medium">How would you like us to hold space for you?</legend>
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex items-start gap-3 rounded-2xl border border-input p-4">
              <input
                type="radio"
                name="anon"
                checked={anon}
                onChange={() => setAnon(true)}
                className="mt-1"
              />
              <div>
                <p className="font-medium">Stay anonymous</p>
                <p className="text-xs text-muted-foreground">
                  No contact details shared. We will not be able to send reminders, and you may save session dates manually.
                </p>
              </div>
            </label>
            <label className="flex items-start gap-3 rounded-2xl border border-input p-4">
              <input
                type="radio"
                name="anon"
                checked={!anon}
                onChange={() => setAnon(false)}
                className="mt-1"
              />
              <div>
                <p className="font-medium">Share a gentle way to reach you</p>
                <p className="text-xs text-muted-foreground">
                  Used only for this request. You can ask us to stop at any time.
                </p>
              </div>
            </label>
          </div>
        </fieldset>

        {!anon && (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium" htmlFor="name">
                Name or pseudonym (optional)
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                placeholder="What may we call you?"
                className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-healing"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-destructive">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="contact">
                Phone or email
              </label>
              <input
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                maxLength={120}
                placeholder="A gentle way to reach you"
                className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-healing"
              />
              {errors.contact && (
                <p className="mt-1 text-xs text-destructive">{errors.contact}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="time">
                Times that feel safest for us to reach you (optional)
              </label>
              <input
                id="time"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                maxLength={120}
                placeholder="e.g. weekday evenings"
                className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-healing"
              />
            </div>
          </div>
        )}

        <div>
          <label className="text-sm font-medium" htmlFor="note">
            Anything you'd like to share (optional)
          </label>
          <p className="mt-1 text-xs text-muted-foreground">
            Only what feels safe. You do not need to explain or justify anything.
          </p>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            maxLength={1000}
            placeholder="A few words, or none at all."
            className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-healing"
          />
          <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>{note.length} / 1000</span>
            {errors.note && <span className="text-destructive">{errors.note}</span>}
          </div>
        </div>

        <div className="rounded-2xl bg-aqua/60 p-4 text-xs text-foreground/80">
          <p className="flex items-start gap-2">
            <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-healing" />
            <span>
              Your request is held with care. If you ever feel unsafe right now, please reach
              DOVVSU on <span className="font-medium">055-100-0900</span> or the Orange Support Unit on <span className="font-medium">0800-111-222</span>.
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/circle"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Not right now
          </Link>
          <button
            type="submit"
            disabled={!kind}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-healing px-6 text-sm font-semibold text-healing-foreground disabled:opacity-50"
          >
            Send my request gently
          </button>
        </div>
      </form>
    </div>
  );
}
