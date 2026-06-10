import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Phone, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Emergency Help & Ghana Support Services | Akoben Hub" },
      { name: "description", content: "Ghana Police, DOVVSU hotline, Department of Social Welfare, and Mental Health Support Services. Akoben Hub does not replace emergency care." },
    ],
  }),
  component: SafetyPage,
});

function SafetyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-3xl bg-destructive/10 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-destructive text-destructive-foreground">
            <ShieldAlert className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl">If you are in immediate danger</h1>
            <p className="mt-3 text-foreground/85">
              Akoben Hub is a safeguarding education and support platform. <strong>It does not replace emergency services.</strong> If you or a child is in immediate danger, please contact the numbers below.
            </p>
          </div>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-2xl">Ghana support services</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Emergency name="Ghana Police Service" number="191" />
          <Emergency name="DOVVSU (Domestic Violence & Victim Support Unit)" number="055-100-0900" />
          <Emergency name="Orange Support Unit" number="0800-111-222" />
          <Emergency name="Department of Social Welfare" number="0302-688-666" />
          <Emergency name="Mental Health Support Services" number="0800-678-678" />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Please verify hotline numbers locally — they may vary by region. If a number is unavailable, dial 191 or visit the nearest police or social welfare office.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl">Urgent safeguarding concerns</h2>
        <p className="mt-3 text-muted-foreground">
          For urgent concerns about a child's safety that are not life-threatening, you can escalate through trusted authorities and partners:
        </p>
        <ul className="mt-4 space-y-3 text-sm">
          <Bullet>Department of Social Welfare — district office (child protection)</Bullet>
          <Bullet>The school's safeguarding lead or head teacher</Bullet>
          <Bullet>Faith community safeguarding officer</Bullet>
          <Bullet>An Akoben facilitator via the referral form</Bullet>
        </ul>
      </section>

      <section className="mt-12 rounded-3xl border border-border bg-card p-6 shadow-soft">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Coming soon</p>
        <h2 className="mt-2 font-serif text-xl">Regional & municipal directories</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We are building future-ready integration for municipal-level welfare contacts, regional referral directories, and crisis escalation systems.
        </p>
      </section>

      <section className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0 text-healing" aria-hidden />
          <div>
            <h2 className="font-serif text-xl">A note on our limits</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Our facilitators respond within 24–48 hours. We are not a 24/7 crisis line. Please prioritise emergency services when you or a child is unsafe right now.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Emergency({ name, number }: { name: string; number: string }) {
  return (
    <a href={`tel:${number.replace(/[^0-9+]/g, "")}`} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft transition-transform hover:-translate-y-0.5">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-destructive/10 text-destructive">
        <Phone className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{name}</p>
        <p className="font-serif text-2xl">{number}</p>
      </div>
    </a>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{children}</li>
  );
}
