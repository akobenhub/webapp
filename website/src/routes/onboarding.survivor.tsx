import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, EyeOff, HeartHandshake, ShieldCheck, User, VideoOff } from "lucide-react";
import { EmotionalSafetyNotice } from "@/components/EmotionalSafetyNotice";

export const Route = createFileRoute("/onboarding/survivor")({
  head: () => ({
    meta: [
      { title: "Survivor Support — Gentle Onboarding | Akoben Hub" },
      { name: "description", content: "Anonymous participation, pseudonyms, and camera-off are welcome. A trauma-informed onboarding for the Survivor Empowerment Circle." },
    ],
  }),
  component: SurvivorOnboarding,
});

function SurvivorOnboarding() {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<"anonymous" | "pseudonym" | "profile" | null>(null);
  const [pseudonym, setPseudonym] = useState("");

  const steps = ["Welcome", "How you'd like to be known", "Ready"];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-6"><EmotionalSafetyNotice compact /></div>

      <ol className="mb-8 flex items-center gap-2 text-xs">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-2">
            <span className={`grid h-7 w-7 place-items-center rounded-full ${i <= step ? "bg-healing text-healing-foreground" : "bg-secondary text-muted-foreground"}`}>
              {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </span>
            <span className={`hidden sm:inline ${i === step ? "font-medium" : "text-muted-foreground"}`}>{s}</span>
            {i < steps.length - 1 && <span className="h-px flex-1 bg-border" />}
          </li>
        ))}
      </ol>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">
        {step === 0 && (
          <div>
            <HeartHandshake className="h-7 w-7 text-healing" />
            <h1 className="mt-3 font-serif text-3xl">You are welcome here</h1>
            <p className="mt-3 text-muted-foreground">
              This is a confidential, trauma-informed space. There is nothing you must share. You can pause, leave, or return at any time.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="inline-flex items-center gap-2"><EyeOff className="h-4 w-4 text-healing" /> Anonymous participation is allowed and respected here.</li>
              <li className="inline-flex items-center gap-2"><VideoOff className="h-4 w-4 text-healing" /> Camera-off is welcome. So is silence.</li>
              <li className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-healing" /> You choose your pace.</li>
            </ul>
          </div>
        )}

        {step === 1 && (
          <div>
            <User className="h-7 w-7 text-healing" />
            <h1 className="mt-3 font-serif text-3xl">How would you like to be known?</h1>
            <p className="mt-2 text-muted-foreground">All three options give you full access to learning and circles.</p>
            <div className="mt-6 space-y-3">
              <Option label="Continue fully anonymously" body="No name, no email, no phone. You decide what to share." active={mode === "anonymous"} onClick={() => setMode("anonymous")} />
              <Option label="Use a pseudonym" body="A chosen name just for this space." active={mode === "pseudonym"} onClick={() => setMode("pseudonym")} />
              <Option label="Create a gentle profile" body="Save progress, sync devices, and receive optional reminders." active={mode === "profile"} onClick={() => setMode("profile")} />
            </div>

            {mode === "pseudonym" && (
              <input
                value={pseudonym}
                onChange={(e) => setPseudonym(e.target.value)}
                placeholder="Choose a pseudonym (any word you like)"
                className="mt-4 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              />
            )}

            {(mode === "anonymous" || mode === "pseudonym") && (
              <div className="mt-5 rounded-2xl bg-aqua p-4 text-sm text-aqua-foreground">
                <p className="font-medium">A gentle reminder</p>
                <p className="mt-1 text-foreground/80">
                  Anonymous participation may limit direct email reminders and automated follow-up notifications. If you join a session, please save the date and time on your phone or calendar.
                </p>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-healing text-healing-foreground">
              <Check className="h-6 w-6" />
            </span>
            <h1 className="mt-4 font-serif text-3xl">You're ready</h1>
            <p className="mt-2 text-muted-foreground">Move at your own pace. Pause and return whenever you wish.</p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link to="/survivors" className="rounded-full bg-healing px-6 py-3 text-sm font-semibold text-healing-foreground">Enter the circle</Link>
              <Link to="/support-request" className="rounded-full border border-input px-6 py-3 text-sm font-medium hover:bg-accent">Request gentle support</Link>
            </div>
          </div>
        )}

        {step < 2 && (
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-sm text-muted-foreground disabled:opacity-30"
            >
              Back
            </button>
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={step === 1 && !mode}
              className="inline-flex items-center gap-2 rounded-full bg-healing px-5 py-2.5 text-sm font-semibold text-healing-foreground disabled:opacity-50"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Option({ label, body, active, onClick }: { label: string; body: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`block w-full rounded-2xl border p-5 text-left transition-colors ${active ? "border-healing bg-healing/5" : "border-input hover:border-healing/40"}`}
    >
      <p className="font-medium">{label}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </button>
  );
}
