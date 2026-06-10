import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Lock, Eye, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/consent")({
  head: () => ({
    meta: [
      { title: "Consent & Confidentiality | Akoben Hub" },
      { name: "description", content: "Plain-language consent and confidentiality notice — what we collect, why, who can see it, and what anonymity means." },
    ],
  }),
  component: ConsentPage,
});

function ConsentPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <p className="text-xs uppercase tracking-widest text-primary">Consent & Confidentiality</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">How we hold your information safely</h1>
      <p className="mt-4 text-muted-foreground">
        Akoben is built on consent. This page explains, in plain language, what we collect, why, who can see it, and the limits of confidentiality.
      </p>

      <section className="mt-10 space-y-4">
        <Block icon={<Eye className="h-5 w-5" />} title="What we collect">
          Only what is needed to support you — your role, your language preference, your learning progress, and any referral details you choose to share. You can use Akoben anonymously where indicated.
        </Block>
        <Block icon={<ShieldCheck className="h-5 w-5" />} title="Why we collect it">
          To route you to the right pathway, save your learning, send optional reminders, and respond safely to referral requests.
        </Block>
        <Block icon={<Lock className="h-5 w-5" />} title="Who can see it">
          Only trained Akoben staff with a safeguarding role — facilitators, moderators, referral coordinators, and safeguarding leads. All access is audit-logged.
        </Block>
        <Block icon={<AlertTriangle className="h-5 w-5" />} title="Limits of confidentiality">
          If a child or adult is in immediate danger, we are required to act — including contacting emergency services or statutory agencies in Ghana. We will let you know wherever possible.
        </Block>
        <Block icon={<Eye className="h-5 w-5" />} title="What anonymity means">
          You may use a chosen name and keep your camera off in circles. Anonymity protects your identity from other participants, but safeguarding limits still apply to staff response.
        </Block>
      </section>

      <p className="mt-10 text-sm text-muted-foreground">
        You may withdraw consent or request deletion of your information at any time by contacting Akoben staff.
      </p>
    </div>
  );
}

function Block({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6">
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">{icon}</span>
        <div>
          <h2 className="font-serif text-lg">{title}</h2>
          <p className="mt-1 text-sm text-foreground/85">{children}</p>
        </div>
      </div>
    </div>
  );
}
