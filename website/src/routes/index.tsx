import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HeartHandshake, Users } from "lucide-react";
import { SafetyDisclaimer } from "@/components/SafetyDisclaimer";
import { HeroSlideshow } from "@/components/HeroSlideshow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Akoben Hub — Safeguarding Education & Survivor Support" },
      { name: "description", content: "Safe trauma-informed education and support pathways for survivors, families, schools, faith communities, and caregivers." },
      { property: "og:title", content: "Akoben Digital Healing & Advocacy Hub" },
      { property: "og:description", content: "Helping communities protect children, support survivors safely, and build informed responses to trauma and safeguarding concerns." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      <HeroSlideshow />

      {/* SPLIT PATHWAYS — the two main entry points */}
      <section className="mx-auto mt-14 max-w-6xl px-4">
        <div className="grid gap-5 md:grid-cols-2">
          <PathwayCard
            to="/parents"
            kind="parents"
            eyebrow="Pathway 1"
            title="Parent & Community Child Protection Education"
            sub="Safeguarding education for parents, teachers, faith leaders, PTAs, and community professionals — across three progressive levels."
            cta="Begin learning"
            icon={<Users className="h-6 w-6" />}
          />
          <PathwayCard
            to="/survivors"
            kind="survivors"
            eyebrow="Pathway 2"
            title="Akoben Empowerment Circle"
            sub="A confidential, trauma-informed space — psychoeducation, grounding tools, support circles, and gentle referral pathways."
            cta="Enter gently"
            icon={<HeartHandshake className="h-6 w-6" />}
          />
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="mx-auto mt-16 max-w-6xl px-4">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl sm:text-4xl">What to expect</h2>
          <p className="mt-3 text-muted-foreground">
            Akoben is built around emotional safety. Every interaction follows trauma-informed principles — choice, transparency, and care first.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Pillar title="Gentle onboarding" body="No pressure to disclose. Learn at your own pace. You may participate anonymously where indicated." />
          <Pillar title="Culturally grounded" body="Materials reflect Ghanaian family, school, and faith life. Audio lessons in English, Twi, and Ga." />
          <Pillar title="Mobile-first & accessible" body="Designed for everyday phones, simple navigation, and first-time smartphone users." />
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="mx-auto mt-12 max-w-3xl px-4">
        <SafetyDisclaimer />
      </section>

      {/* CTA FOOTER */}
      <section className="mx-auto mt-16 max-w-6xl px-4">
        <div className="rounded-3xl bg-pathway-parents p-8 text-primary-foreground shadow-soft sm:p-12">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl">Need to speak with someone?</h2>
              <p className="mt-3 max-w-xl text-sm text-primary-foreground/85">
                Submit a confidential referral request, or reach our contact and emergency page. Real, trained humans review every concern.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/referral" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-healing px-5 text-sm font-semibold text-healing-foreground hover:opacity-90">
                Request a referral <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 text-sm font-medium hover:bg-white/20">
                Contact & emergency
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PathwayCard({
  to, kind, eyebrow, title, sub, cta, icon,
}: {
  to: "/parents" | "/survivors";
  kind: "parents" | "survivors";
  eyebrow: string; title: string; sub: string; cta: string;
  icon: React.ReactNode;
}) {
  const bg = kind === "parents" ? "bg-pathway-parents text-primary-foreground" : "bg-pathway-survivors text-healing-foreground";
  return (
    <Link
      to={to}
      className={`group relative overflow-hidden rounded-3xl p-7 sm:p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-warm ${bg}`}
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
          {eyebrow}
        </span>
        <span className="grid h-11 w-11 place-items-center rounded-full bg-white/15 backdrop-blur">
          {icon}
        </span>
      </div>
      <h2 className="mt-8 font-serif text-3xl leading-tight sm:text-4xl">{title}</h2>
      <p className="mt-3 max-w-md text-sm opacity-90">{sub}</p>
      <div className="mt-10 inline-flex items-center gap-2 text-sm font-semibold">
        {cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function Pillar({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <h3 className="font-serif text-xl">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
