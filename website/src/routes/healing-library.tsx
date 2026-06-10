import { createFileRoute, Link } from "@tanstack/react-router";
import { BookHeart, ArrowRight } from "lucide-react";
import { HEALING_STORIES } from "@/lib/healing-stories";

export const Route = createFileRoute("/healing-library")({
  head: () => ({
    meta: [
      { title: "Healing Library | Akoben Hub" },
      {
        name: "description",
        content:
          "A quiet collection of stories for adult survivors of childhood sexual abuse — reflection, hope, and personal growth at your own pace.",
      },
      { property: "og:title", content: "Healing Library — Akoben Hub" },
      {
        property: "og:description",
        content:
          "Stories for reflection, healing, hope, and personal growth. Take what helps. Leave what does not.",
      },
    ],
  }),
  component: HealingLibraryPage,
});

function HealingLibraryPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <header className="text-center">
        <span className="inline-grid h-12 w-12 place-items-center rounded-full bg-healing/20 text-healing-foreground">
          <BookHeart className="h-5 w-5" aria-hidden />
        </span>
        <p className="mt-4 text-xs uppercase tracking-widest text-primary">Healing Library</p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl leading-tight">
          Stories for reflection, healing, hope, and personal growth
        </h1>
      </header>

      <section
        aria-label="Welcome message"
        className="mx-auto mt-10 max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-soft"
      >
        <h2 className="font-serif text-xl">Welcome to the Healing Library.</h2>
        <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-foreground/85">
          <p>
            This collection of stories was created for adult survivors of childhood sexual abuse.
            Each story explores a different part of the healing journey through reflection,
            metaphor, hope, and personal growth.
          </p>
          <p>
            There is no right place to begin. You are free to read one story, many stories, or
            simply return whenever you need a quiet place to reflect.
          </p>
          <p className="italic text-foreground/80">Take what helps. Leave what does not.</p>
          <p className="font-medium">Your healing journey belongs to you.</p>
        </div>
      </section>

      <section aria-label="Stories" className="mt-12">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HEALING_STORIES.map((story) => (
            <li key={story.slug}>
              <Link
                to="/healing-library/$story"
                params={{ story: story.slug }}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-primary/40 hover:bg-accent/30"
              >
                <h3 className="font-serif text-lg leading-snug">{story.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{story.preview}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Read gently
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mx-auto mt-12 max-w-xl text-center text-sm italic text-muted-foreground">
        You can pause, return, or close the page at any time. There is no progress to track here —
        only your own pace.
      </p>
    </div>
  );
}
