import { createFileRoute } from "@tanstack/react-router";
import { Heart, Pause, ShieldCheck, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Emotional Safety | Akoben Hub" },
      { name: "description", content: "Our mission, trauma-informed principles, and emotional safety guidelines for everyone using the hub." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <p className="text-xs uppercase tracking-widest text-warmth-foreground">About</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">A hub built around dignity</h1>
      <p className="mt-4 text-muted-foreground">
        Akoben — the war horn — is the Adinkra symbol of vigilance and readiness. The Akoben Digital Healing & Advocacy Hub is a trauma-informed platform supporting parents, teachers, faith leaders, survivors, facilitators, and community administrators across Ghana and other low-resource settings.
      </p>

      <h2 className="mt-12 font-serif text-2xl">Emotional safety guidelines</h2>
      <ul className="mt-5 space-y-4">
        <Guide icon={<ShieldCheck className="h-5 w-5" />} title="Consent is continuous">
          You decide what to share, what to read, and when to stop. There is no penalty for pausing.
        </Guide>
        <Guide icon={<Pause className="h-5 w-5" />} title="You can leave at any time">
          Close the page, log out, or step away. Your progress is saved gently and privately.
        </Guide>
        <Guide icon={<Heart className="h-5 w-5" />} title="No judgement, no fixing">
          We meet you where you are. Healing is not linear, and you are not behind.
        </Guide>
        <Guide icon={<Users className="h-5 w-5" />} title="Confidentiality matters">
          Facilitators are trained in safeguarding. We never share your story without your explicit consent.
        </Guide>
      </ul>

      <h2 className="mt-12 font-serif text-2xl">For the community</h2>
      <p className="mt-3 text-muted-foreground">
        We work with schools, congregations, and community circles to deliver in-person safeguarding training alongside this digital hub. To bring Akoben to your community, reach out via WhatsApp or submit a referral request.
      </p>

      <h2 className="mt-12 font-serif text-2xl">Accessibility</h2>
      <p className="mt-3 text-muted-foreground">
        The hub is designed for low-data, mobile-first use. Audio lessons support learners with lower literacy, and content is available in English, Twi, Ga and Ewe. We continue to add languages as our community grows.
      </p>
    </div>
  );
}

function Guide({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">{icon}</span>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{children}</p>
      </div>
    </li>
  );
}
