import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, GraduationCap, User } from "lucide-react";

type Role = "parent" | "teacher" | "faith" | "pta" | "facilitator" | "admin";

export const Route = createFileRoute("/onboarding/community")({
  head: () => ({
    meta: [
      { title: "Parent & Community Onboarding | Akoben Hub" },
      { name: "description", content: "Create a gentle profile to access the Parent & Community Child Protection Education pathway." },
    ],
  }),
  component: CommunityOnboarding,
});

function CommunityOnboarding() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<Role | null>(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const steps = ["Your role", "Your profile", "Ready"];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <ol className="mb-8 flex items-center gap-2 text-xs">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-2">
            <span className={`grid h-7 w-7 place-items-center rounded-full ${i <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
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
            <GraduationCap className="h-7 w-7 text-primary" />
            <h1 className="mt-3 font-serif text-3xl">Who are you here as?</h1>
            <p className="mt-2 text-muted-foreground">This routes you to the right level and resources. You can change it later.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {([
                ["parent", "Parent / caregiver"],
                ["teacher", "Teacher"],
                ["faith", "Faith leader"],
                ["pta", "PTA / youth leader"],
                ["facilitator", "Facilitator"],
                ["admin", "Safeguarding officer"],
              ] as [Role, string][]).map(([k, label]) => (
                <button
                  key={k}
                  onClick={() => setRole(k)}
                  className={`rounded-2xl border p-4 text-left transition-colors ${role === k ? "border-primary bg-primary/5" : "border-input hover:border-primary/40"}`}
                >
                  <p className="font-medium">{label}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <User className="h-7 w-7 text-primary" />
            <h1 className="mt-3 font-serif text-3xl">Create your profile</h1>
            <p className="mt-2 text-muted-foreground">
              A standard profile lets you track progress, receive reminders, and earn certificates as you complete modules.
            </p>
            <div className="mt-6 space-y-4">
              <Field label="Your name">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                  placeholder="First name or how you'd like to be addressed"
                />
              </Field>
              <Field label="Phone or email (for reminders)">
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                  placeholder="e.g. +233… or you@example.com"
                />
              </Field>
              <p className="text-xs text-muted-foreground">
                We use your contact only for session confirmations, lesson reminders, and certificate delivery. You can opt out anytime.
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-6 w-6" />
            </span>
            <h1 className="mt-4 font-serif text-3xl">You're ready</h1>
            <p className="mt-2 text-muted-foreground">Choose your learning level to begin.</p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link to="/learning-center" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Open Learning Center</Link>
              <Link to="/sessions" className="rounded-full border border-input px-6 py-3 text-sm font-medium hover:bg-accent">See upcoming sessions</Link>
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
              disabled={(step === 0 && !role) || (step === 1 && !name)}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium">{label}</span>
      {children}
    </label>
  );
}
