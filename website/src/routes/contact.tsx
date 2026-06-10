import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone, ShieldAlert } from "lucide-react";
import { SafetyDisclaimer } from "@/components/SafetyDisclaimer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Emergency | Akoben Hub" },
      { name: "description", content: "Reach Akoben Advocacy Group and find Ghana emergency contacts — Police, DOVVSU, and Social Welfare." },
      { property: "og:title", content: "Contact & Emergency — Akoben Hub" },
      { property: "og:description", content: "How to reach us, and emergency contacts you can call right now." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <p className="text-xs uppercase tracking-widest text-destructive">In an emergency, call now</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Contact & emergency</h1>

      <section className="mt-8 rounded-3xl border border-destructive/30 bg-destructive/5 p-6 shadow-soft sm:p-8">
        <div className="flex items-center gap-2 text-destructive">
          <ShieldAlert className="h-5 w-5" />
          <h2 className="font-serif text-2xl">Ghana emergency contacts</h2>
        </div>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          <Emergency name="Ghana Police" number="191" />
          <Emergency name="DOVVSU (Domestic Violence)" number="055-100-0900" />
          <Emergency name="Orange Support Unit" number="0800-111-222" />
          <Emergency name="Ambulance" number="193" />
          <Emergency name="Social Welfare" number="0302-666-961" />
        </ul>
      </section>

      <section className="mt-10">
        <SafetyDisclaimer />
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl">Reach Akoben</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <Card icon={<Mail className="h-5 w-5" />} title="Email" body="hello@akoben.example" href="mailto:hello@akoben.example" />
          <Card icon={<MessageCircle className="h-5 w-5" />} title="WhatsApp" body="+233 000 000 000" href="https://wa.me/233000000000" />
          <Card icon={<Phone className="h-5 w-5" />} title="Office" body="Accra, Ghana" />
        </div>
      </section>

      <section className="mt-10 rounded-3xl bg-aqua p-6 shadow-soft sm:p-8">
        <h2 className="font-serif text-2xl">Need confidential support?</h2>
        <p className="mt-2 text-sm text-foreground/80">Submit a private referral request — a trained safeguarding lead will respond gently.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/referral" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Request a referral</Link>
          <Link to="/support-request" className="rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent">Survivor support request</Link>
        </div>
      </section>
    </div>
  );
}

function Emergency({ name, number }: { name: string; number: string }) {
  return (
    <li className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-soft">
      <span className="text-sm font-medium">{name}</span>
      <a href={`tel:${number.replace(/[^0-9+]/g, "")}`} className="rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground hover:opacity-95">
        {number}
      </a>
    </li>
  );
}

function Card({ icon, title, body, href }: { icon: React.ReactNode; title: string; body: string; href?: string }) {
  const cls = "block rounded-2xl border border-border bg-card p-5 shadow-soft hover:-translate-y-0.5";
  const inner = (
    <>
      <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">{icon}</span>
      <p className="mt-3 font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </>
  );
  return href ? <a href={href} className={cls}>{inner}</a> : <div className={cls}>{inner}</div>;
}
