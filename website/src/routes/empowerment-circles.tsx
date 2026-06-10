import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CalendarDays, Clock, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const Route = createFileRoute("/empowerment-circles")({
  head: () => ({
    meta: [
      { title: "Upcoming Empowerment Circles — Akoben" },
      {
        name: "description",
        content:
          "Reserve your place in an upcoming Akoben Empowerment Circle — a peer-support and educational space held with care.",
      },
    ],
  }),
  component: EmpowermentCirclesPage,
});

type Session = {
  id: string;
  dateLabel: string;
  timeLabel: string;
};

const SESSIONS: Session[] = [
  { id: "2026-06-08", dateLabel: "Monday, June 8, 2026", timeLabel: "6:00 PM GMT" },
  { id: "2026-06-10", dateLabel: "Wednesday, June 10, 2026", timeLabel: "6:00 PM GMT" },
  { id: "2026-06-12", dateLabel: "Friday, June 12, 2026", timeLabel: "6:00 PM GMT" },
  { id: "2026-06-15", dateLabel: "Monday, June 15, 2026", timeLabel: "6:00 PM GMT" },
  { id: "2026-06-17", dateLabel: "Wednesday, June 17, 2026", timeLabel: "6:00 PM GMT" },
  { id: "2026-06-19", dateLabel: "Friday, June 19, 2026", timeLabel: "6:00 PM GMT" },
];

const formSchema = z.object({
  name: z.string().trim().min(1, "Please share a name or pseudonym").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(5, "Please enter a phone number").max(30),
  country: z.string().trim().min(1, "Please share your country").max(80),
  region: z.string().trim().min(1, "Please share your region").max(80),
  contactMethod: z.enum(["email", "whatsapp", "either"], {
    message: "Please choose a preferred contact method",
  }),
  consent: z.literal(true, { message: "Please confirm you understand" }),
});

function EmpowermentCirclesPage() {
  const [selected, setSelected] = useState<Session | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [contactMethod, setContactMethod] = useState<string>("");
  const [consent, setConsent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = formSchema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      country: fd.get("country"),
      region: fd.get("region"),
      contactMethod,
      consent,
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errs[String(issue.path[0])] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  if (submitted && selected) {
    return (
      <div className="min-h-[80vh] bg-background">
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-healing/10 text-healing">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <h1 className="mt-6 font-serif text-3xl sm:text-4xl">
            Thank you for reserving your place in the Akoben Empowerment Circle.
          </h1>
          <p className="mt-5 text-muted-foreground">
            A facilitator will contact you using your preferred method before the session.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Your reserved circle: <span className="font-medium text-foreground">{selected.dateLabel}</span> at {selected.timeLabel}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-background">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Empowerment Circles
        </p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Upcoming circles</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Each circle is a small, gentle gathering for shared learning and peer
          support. Choose a date that feels right for you — there is no pressure
          to attend more than one.
        </p>

        {!selected ? (
          <div className="mt-10 grid gap-4">
            {SESSIONS.map((s) => (
              <article
                key={s.id}
                className="rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="flex items-center gap-2 font-serif text-xl">
                      <CalendarDays className="h-5 w-5 text-healing" />
                      {s.dateLabel}
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" /> {s.timeLabel}
                    </p>
                  </div>
                  <Button
                    onClick={() => setSelected(s)}
                    className="rounded-full"
                  >
                    Reserve My Place
                  </Button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Choose a different circle
            </button>

            <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Reserving your place
              </p>
              <h2 className="mt-1 font-serif text-2xl">{selected.dateLabel}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{selected.timeLabel}</p>

              <form onSubmit={handleSubmit} className="mt-6 grid gap-5" noValidate>
                <Field label="Name or Pseudonym" name="name" error={errors.name} />
                <Field label="Email Address" name="email" type="email" error={errors.email} />
                <Field label="Phone Number" name="phone" type="tel" error={errors.phone} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Country" name="country" error={errors.country} />
                  <Field label="Region" name="region" error={errors.region} />
                </div>

                <div>
                  <Label>Preferred Contact Method</Label>
                  <RadioGroup
                    value={contactMethod}
                    onValueChange={setContactMethod}
                    className="mt-2 grid gap-2"
                  >
                    <label className="flex items-center gap-2 text-sm">
                      <RadioGroupItem value="email" /> Email
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <RadioGroupItem value="whatsapp" /> WhatsApp
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <RadioGroupItem value="either" /> Either
                    </label>
                  </RadioGroup>
                  {errors.contactMethod && (
                    <p className="mt-1 text-xs text-destructive">{errors.contactMethod}</p>
                  )}
                </div>

                <label className="flex items-start gap-3 text-sm">
                  <Checkbox
                    checked={consent}
                    onCheckedChange={(v) => setConsent(v === true)}
                    className="mt-0.5"
                  />
                  <span className="text-foreground/80">
                    I understand this is a peer-support and educational space and is not therapy.
                  </span>
                </label>
                {errors.consent && (
                  <p className="-mt-3 text-xs text-destructive">{errors.consent}</p>
                )}

                <Button type="submit" size="lg" className="mt-2 rounded-full">
                  Reserve My Place
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
