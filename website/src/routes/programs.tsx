import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap, HeartHandshake, MessageCircle, ShieldCheck, Users } from "lucide-react";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Our Programs | Akoben Hub" },
      { name: "description", content: "Parent & Community Child Protection Education, Akoben Empowerment Circle for survivors, facilitator training, and referral support." },
      { property: "og:title", content: "Our Programs — Akoben Hub" },
      { property: "og:description", content: "Two trauma-informed pathways: child protection education for communities, and a survivor empowerment circle." },
    ],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="text-xs uppercase tracking-widest text-primary">Our Programs</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Two pathways, one mission</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Akoben holds two independent learning and support pathways — designed so that safeguarding education and survivor care never overlap in ways that could feel unsafe.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <ProgramCard
          to="/parents"
          tone="parents"
          eyebrow="Pathway 1"
          title="Parent & Community Child Protection Education"
          body="Three progressive levels of trauma-informed safeguarding learning for parents, teachers, faith leaders, PTAs, and safeguarding professionals."
          icon={<Users className="h-6 w-6" />}
        />
        <ProgramCard
          to="/survivors"
          tone="survivors"
          eyebrow="Pathway 2"
          title="Akoben Empowerment Circle"
          body="A confidential, trauma-informed space for survivors — psychoeducation, grounding, support circles, and gentle referral pathways."
          icon={<HeartHandshake className="h-6 w-6" />}
        />
      </div>

      <h2 className="mt-16 font-serif text-2xl">Supporting programs</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Mini icon={<GraduationCap className="h-5 w-5" />} title="Facilitator training" body="Trauma-informed facilitation for community circle leaders." to="/staff" />
        <Mini icon={<MessageCircle className="h-5 w-5" />} title="WhatsApp learning circles" body="Low-data audio lessons and check-ins via WhatsApp." to="/whatsapp" />
        <Mini icon={<ShieldCheck className="h-5 w-5" />} title="Referral coordination" body="Confidential referral pathways into partner services." to="/referral" />
      </div>
    </div>
  );
}

function ProgramCard({ to, tone, eyebrow, title, body, icon }: {
  to: "/parents" | "/survivors"; tone: "parents" | "survivors";
  eyebrow: string; title: string; body: string; icon: React.ReactNode;
}) {
  const bg = tone === "parents" ? "bg-pathway-parents text-primary-foreground" : "bg-pathway-survivors text-healing-foreground";
  return (
    <Link to={to} className={`group block rounded-3xl p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-warm sm:p-8 ${bg}`}>
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">{eyebrow}</span>
        <span className="grid h-11 w-11 place-items-center rounded-full bg-white/15 backdrop-blur">{icon}</span>
      </div>
      <h3 className="mt-8 font-serif text-3xl leading-tight">{title}</h3>
      <p className="mt-3 text-sm opacity-90">{body}</p>
      <p className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
        Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </p>
    </Link>
  );
}

function Mini({ icon, title, body, to }: { icon: React.ReactNode; title: string; body: string; to: string }) {
  return (
    <Link to={to} className="rounded-3xl border border-border bg-card p-5 shadow-soft hover:-translate-y-0.5">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">{icon}</span>
      <p className="mt-3 font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </Link>
  );
}
