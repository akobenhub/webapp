import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { EmotionalSafetyNotice } from "@/components/EmotionalSafetyNotice";

export const Route = createFileRoute("/referral")({
  head: () => ({
    meta: [
      { title: "Confidential Referral Request | Akoben Hub" },
      { name: "description", content: "Confidential referral requests: emotional distress, mental health, safeguarding concerns, and follow-up coordination." },
    ],
  }),
  component: ReferralPage,
});

type Role = "survivor" | "parent" | "teacher" | "faith" | "facilitator" | "other";
type Concern = "emotional" | "mental_health" | "safeguarding" | "followup";

function ReferralPage() {
  const [sent, setSent] = useState(false);
  const [anon, setAnon] = useState(true);
  const [role, setRole] = useState<Role>("survivor");
  const [concern, setConcern] = useState<Concern>("emotional");
  const [urgency, setUrgency] = useState<"low" | "medium" | "high">("low");

  if (sent) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <span className="grid h-14 w-14 mx-auto place-items-center rounded-full bg-healing text-healing-foreground">
          <Check className="h-6 w-6" />
        </span>
        <h1 className="mt-5 font-serif text-3xl">Thank you for reaching out</h1>
        <p className="mt-3 text-muted-foreground">
          Your referral has been received. A trained human facilitator will respond gently within 24–48 hours.
          {urgency === "high" && " For immediate danger, please call 191 now."}
        </p>
        <div className="mt-8"><WhatsAppButton label="Continue on WhatsApp" /></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5" /> Confidential · Reviewed by human support personnel
      </div>
      <h1 className="mt-4 font-serif text-4xl">Request a referral</h1>
      <p className="mt-2 text-muted-foreground">
        Share only what you feel comfortable sharing. You may submit anonymously. Every request is read by a real, trained person.
      </p>

      <div className="mt-6">
        <EmotionalSafetyNotice compact />
      </div>

      <form
        className="mt-8 space-y-6 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
        onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      >
        <Field label="I am a…">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {([
              ["survivor", "Survivor"],
              ["parent", "Parent / caregiver"],
              ["teacher", "Teacher"],
              ["faith", "Faith leader"],
              ["facilitator", "Facilitator"],
              ["other", "Other"],
            ] as [Role, string][]).map(([k, label]) => (
              <button
                type="button"
                key={k}
                onClick={() => setRole(k)}
                className={`min-h-11 rounded-xl border px-3 text-sm transition-colors ${role === k ? "border-primary bg-primary/5 text-foreground" : "border-input bg-background text-muted-foreground hover:text-foreground"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </Field>

        <Field label="What kind of support are you seeking?">
          <div className="grid gap-2 sm:grid-cols-2">
            {([
              ["emotional", "Emotional distress support"],
              ["mental_health", "Mental health referral"],
              ["safeguarding", "Safeguarding concern (a child)"],
              ["followup", "Follow-up coordination"],
            ] as [Concern, string][]).map(([k, label]) => (
              <button
                type="button"
                key={k}
                onClick={() => setConcern(k)}
                className={`min-h-12 rounded-xl border px-3 text-left text-sm transition-colors ${concern === k ? "border-primary bg-primary/5" : "border-input bg-background text-muted-foreground hover:text-foreground"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </Field>

        <Field label="How urgent does this feel?">
          <div className="grid grid-cols-3 gap-2">
            {(["low", "medium", "high"] as const).map((u) => (
              <button
                type="button"
                key={u}
                onClick={() => setUrgency(u)}
                className={`min-h-11 rounded-xl border px-3 text-sm capitalize transition-colors ${urgency === u ? "border-primary bg-primary/5" : "border-input bg-background text-muted-foreground hover:text-foreground"}`}
              >
                {u}
              </button>
            ))}
          </div>
          {urgency === "high" && (
            <p className="mt-2 text-xs text-destructive">
              If you or a child are in immediate danger, please call 191 now. See our <a href="/safety" className="underline">emergency guidance</a>.
            </p>
          )}
        </Field>

        <label className="flex items-start gap-3 rounded-xl bg-secondary/60 p-4 text-sm">
          <input
            type="checkbox"
            checked={anon}
            onChange={(e) => setAnon(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[var(--color-primary)]"
          />
          <span>
            <span className="font-medium">Submit anonymously.</span>
            <span className="block text-muted-foreground">No name, email, or phone required. You can use a pseudonym if you wish to be addressed by name.</span>
          </span>
        </label>

        {!anon && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Name or pseudonym (what we should call you)" />
            <Input label="Phone or WhatsApp number" type="tel" />
          </div>
        )}

        <Field label="What support are you looking for? (optional)">
          <textarea
            rows={5}
            placeholder="Share as little or as much as feels right."
            className="w-full rounded-xl border border-input bg-background p-3 text-sm outline-none focus:border-primary"
          />
        </Field>

        <Field label="Preferred language">
          <select className="w-full min-h-12 rounded-xl border border-input bg-background p-3 text-sm outline-none focus:border-primary">
            <option>English</option>
            <option>Twi</option>
            <option>Ga</option>
            <option>Ewe</option>
          </select>
        </Field>

        <button
          type="submit"
          className="min-h-12 w-full rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Send referral request
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Referrals are reviewed by trained human support personnel. This is not an emergency line.
        </p>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}

function Input({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium">{label}</span>
      <input type={type} className="w-full min-h-12 rounded-xl border border-input bg-background p-3 text-sm outline-none focus:border-primary" />
    </label>
  );
}
