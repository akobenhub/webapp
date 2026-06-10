import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story — Founded by Deloris Prentice | Akoben Hub" },
      { name: "description", content: "Akoben Advocacy Group was founded by Deloris Prentice, a child sexual abuse survivor and advocate, to build safer, trauma-informed, culturally grounded support across Ghana." },
      { property: "og:title", content: "Our Story — Akoben Hub" },
      { property: "og:description", content: "Founded from lived experience and community observation — building safer pathways for child protection and survivor support." },
    ],
  }),
  component: OurStoryPage,
});

function OurStoryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <p className="text-xs uppercase tracking-widest text-primary">Our Story</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Why Akoben was created</h1>

      <div className="mt-8 space-y-5 text-foreground/90">
        <p>
          Akoben Advocacy Group was created in response to the growing need for safer child protection education,
          trauma-informed support, and emotionally safe survivor pathways within Ghanaian communities.
        </p>
        <p>
          Founded by <strong>Deloris Prentice</strong>, a child sexual abuse survivor and advocate, Akoben was built
          from both lived experience and community observation. Through personal experience and years of observing
          the silence, stigma, fear, and lack of safeguarding knowledge surrounding child sexual abuse, the need for
          safer, culturally grounded support systems became clear.
        </p>
        <p>
          Many families, schools, faith communities, and institutions still struggle with recognizing abuse, responding
          safely to disclosure, understanding trauma, and supporting survivors without shame or retraumatization. Akoben
          exists to help close these gaps through safeguarding education, trauma-informed learning, survivor support
          pathways, emotional safety practices, and community empowerment.
        </p>
        <p>
          The vision is to help build communities where children are better protected, survivors are treated with dignity,
          and people have access to practical, understandable, and culturally relevant safeguarding support.
        </p>
        <p>
          The platform combines child protection education, emotional safety principles, structured learning, survivor
          support systems, and referral coordination pathways.
        </p>
      </div>

      <div className="mt-10 rounded-3xl bg-aqua p-6 shadow-soft sm:p-8">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-aqua-foreground">
          <Heart className="h-3.5 w-3.5 text-healing" /> At its core
        </p>
        <p className="mt-3 font-serif text-2xl leading-snug">
          Akoben believes silence, stigma, and isolation should not be the only realities available to survivors and vulnerable children.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/programs" className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Explore our programs</Link>
        <Link to="/about/team" className="rounded-full border border-input bg-background px-5 py-3 text-sm font-medium hover:bg-accent">Meet our team</Link>
      </div>
    </div>
  );
}
