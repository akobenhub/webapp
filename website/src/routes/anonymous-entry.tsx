import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Copy, Loader2, ShieldCheck, Check } from "lucide-react";
import { generateCircleId, saveSession } from "@/lib/circle-id";

export const Route = createFileRoute("/anonymous-entry")({
  head: () => ({
    meta: [
      { title: "Enter Anonymously — Akoben Empowerment Circle" },
      {
        name: "description",
        content:
          "Generate a private Circle ID and enter the Akoben Empowerment Circle anonymously. No name, email, or phone required.",
      },
    ],
  }),
  component: AnonymousEntry,
});

function AnonymousEntry() {
  const navigate = useNavigate();
  const [circleId, setCircleId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      const id = generateCircleId();
      saveSession({
        circleId: id,
        userType: "anonymous",
        createdAt: new Date().toISOString(),
      });
      setCircleId(id);
    }, 1400);
    return () => clearTimeout(t);
  }, []);

  async function copyId() {
    if (!circleId) return;
    try {
      await navigator.clipboard.writeText(circleId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="min-h-[80vh] bg-background">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:py-20">
        {!circleId ? (
          <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-healing" />
            <p className="mt-5 font-serif text-2xl">Generating your Circle ID…</p>
            <p className="mt-2 text-sm text-muted-foreground">
              A private access key just for you. This will take a moment.
            </p>
          </div>
        ) : (
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Your Circle ID
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h1 className="font-serif text-4xl sm:text-5xl tracking-wide text-healing">
                {circleId}
              </h1>
              <button
                onClick={copyId}
                className="inline-flex items-center gap-2 rounded-full border border-input bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent"
                aria-label="Copy your Circle ID"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copy
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 space-y-3 text-sm leading-relaxed text-foreground/85">
              <p>
                You are now entering the Akoben Empowerment Circle anonymously.
              </p>
              <p>This ID is your private access key.</p>
              <p className="font-medium text-foreground">
                Please save it safely. You will need it if you return.
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-aqua/60 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-healing" />
                <div>
                  <p className="font-medium">Anonymous Participation Reminder</p>
                  <p className="mt-2 text-sm text-foreground/80">
                    Because you chose not to provide contact details:
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
                    <li>• You will not receive reminders</li>
                    <li>• You must save session dates manually</li>
                    <li>• You can return anytime using your Circle ID</li>
                    <li>• Your activity is not linked to your name</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-background p-5 sm:p-6">
              <p className="font-medium">A gentle safety note</p>
              <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
                <li>• Keep your Circle ID private — please do not share it with anyone.</li>
                <li>• Anyone who has your Circle ID can enter the Circle as you.</li>
                <li>• If you ever feel it is no longer private, simply generate a new one.</li>
              </ul>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-background p-5 sm:p-6">
              <p className="font-medium">How long anonymous sessions are kept</p>
              <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
                <li>• Your Circle ID is stored only on this device, in your browser.</li>
                <li>• It stays available for up to 90 days of inactivity, then is gently cleared.</li>
                <li>• Clearing your browser data will remove it sooner.</li>
                <li>• No name, email, or phone number is ever attached to your activity.</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to="/survivors"
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Back
              </Link>
              <button
                onClick={() => navigate({ to: "/circle" })}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-healing px-6 text-sm font-semibold text-healing-foreground hover:opacity-95"
              >
                Continue to Learning & Support <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
