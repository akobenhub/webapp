import { createFileRoute } from "@tanstack/react-router";
import { Building2, Church, GraduationCap, HeartHandshake, Home, Users } from "lucide-react";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Building Safer Communities Together | Akoben Hub" },
      { name: "description", content: "How safeguarding education, survivor support, and prevention strengthen safer homes, schools, faith spaces, and communities across Ghana." },
      { property: "og:title", content: "Building Safer Communities Together" },
      { property: "og:description", content: "Child protection, survivor support, safeguarding education, prevention, and responsible community action." },
    ],
  }),
  component: ImpactPage,
});

function ImpactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">Community impact</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Building Safer Communities Together</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Safeguarding is not the work of one person — it is a community practice grounded in prevention, survivor support, and responsible action. Akoben Hub strengthens the everyday places where children live, learn, worship, and play.
      </p>

      <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Place icon={<Home />} title="Child protection at home" body="Caregivers who know the signs of harm, listen without judgement, and respond with care." />
        <Place icon={<GraduationCap />} title="Safer schools" body="Teachers trained in disclosure response and age-appropriate safeguarding lessons." />
        <Place icon={<Church />} title="Safer faith spaces" body="Pastoral leaders with safeguarding policies and trauma-informed pastoral care." />
        <Place icon={<Users />} title="Active PTAs & communities" body="Parent associations leading community child protection conversations." />
        <Place icon={<HeartHandshake />} title="Survivor support" body="Confidential psychoeducation that respects pace, language, and culture." />
        <Place icon={<Building2 />} title="Responsible referrals" body="Pathways linking families to social welfare, police, and survivor services." />
      </section>

      <section className="mt-16 rounded-3xl bg-pathway-parents p-8 text-primary-foreground shadow-soft sm:p-12">
        <h2 className="font-serif text-3xl sm:text-4xl">Our north star</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <Stat n="12,400+" l="learners reached across Ghana" />
          <Stat n="86" l="community circles convened" />
          <Stat n="3" l="audio languages live (EN · Twi · Ga)" />
        </div>
        <p className="mt-8 max-w-2xl text-sm opacity-90">
          We share aggregate, anonymised numbers only. No individual learner, survivor, or referral is ever identifiable in our reporting.
        </p>
      </section>
    </div>
  );
}

function Place({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">{icon}</span>
      <h3 className="mt-4 font-serif text-xl">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <p className="font-serif text-4xl">{n}</p>
      <p className="mt-1 text-sm opacity-85">{l}</p>
    </div>
  );
}
