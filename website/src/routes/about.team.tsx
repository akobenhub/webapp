import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about/team")({
  head: () => ({
    meta: [
      { title: "Our Team | Akoben Hub" },
      { name: "description", content: "Meet the survivor-led, trauma-informed team behind Akoben Advocacy Group." },
    ],
  }),
  component: TeamPage,
});

const TEAM = [
  {
    name: "Deloris Prentice",
    role: "Founder & Lead Advocate",
    bio: "Survivor advocate, safeguarding educator, and the founding voice behind Akoben Advocacy Group.",
  },
  {
    name: "Safeguarding Lead",
    role: "Safeguarding & Referral Coordinator",
    bio: "Holds the referral pathways, partner liaison, and safeguarding standards across all programs.",
  },
  {
    name: "Lead Facilitator",
    role: "Survivor Empowerment Circle Facilitator",
    bio: "Trauma-informed group facilitator holding the emotional safety of every circle.",
  },
  {
    name: "Community Educator",
    role: "Parent & Community Education Lead",
    bio: "Designs and delivers child protection learning for parents, teachers, faith and PTA settings.",
  },
];

function TeamPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <p className="text-xs uppercase tracking-widest text-primary">About Us</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Our team</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        A survivor-led, trauma-informed team committed to safeguarding education, dignity, and community care.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {TEAM.map((p) => (
          <article key={p.name} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-start gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary/10 font-serif text-xl text-primary">
                {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </span>
              <div className="min-w-0">
                <h2 className="font-serif text-xl">{p.name}</h2>
                <p className="text-sm font-medium text-primary">{p.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{p.bio}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        Additional facilitators, counsellors, moderators, and safeguarding partners support Akoben's work across communities.
      </p>
    </div>
  );
}
