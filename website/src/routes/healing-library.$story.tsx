import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Heart, Sparkles, NotebookPen, Leaf } from "lucide-react";
import { getStory, HEALING_STORIES } from "@/lib/healing-stories";

export const Route = createFileRoute("/healing-library/$story")({
  loader: ({ params }) => {
    const story = getStory(params.story);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.story.title ?? "Story"} | Healing Library` },
      {
        name: "description",
        content: loaderData?.story.preview ?? "A story for reflection and healing.",
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="font-serif text-2xl">This story is resting.</h1>
      <p className="mt-3 text-muted-foreground">
        It may not be ready yet. You are welcome to choose another from the library.
      </p>
      <Link
        to="/healing-library"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Healing Library
      </Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="font-serif text-2xl">Something gentle interrupted this story.</h1>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        Try again
      </button>
    </div>
  ),
  component: StoryPage,
});

function StoryPage() {
  const { story } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
      <Link
        to="/healing-library"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Healing Library
      </Link>

      <header className="mt-6">
        <p className="text-xs uppercase tracking-widest text-primary">A story for reflection</p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl leading-tight">{story.title}</h1>
        <p className="mt-3 text-muted-foreground">{story.preview}</p>
      </header>

      {story.content ? (
        <article className="prose prose-neutral mt-8 max-w-none space-y-5 text-[16px] leading-relaxed text-foreground/90">
          {story.content.map((para: string, i: number) => (
            <p key={i}>{para}</p>
          ))}
        </article>
      ) : (
        <div className="mt-10 rounded-3xl border border-dashed border-border bg-card/60 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            This story is being gently written. Please return another day, or choose another from
            the library.
          </p>
        </div>
      )}

      {story.reminder && (
        <section
          aria-label="A gentle reminder"
          className="mt-10 rounded-3xl border border-healing/40 bg-healing/10 p-6"
        >
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-healing-foreground" aria-hidden />
            <h2 className="font-serif text-lg">A Gentle Reminder</h2>
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">{story.reminder}</p>
        </section>
      )}

      {story.affirmations && story.affirmations.length > 0 && (
        <section aria-label="Gentle affirmations" className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden />
            <h2 className="font-serif text-lg">Gentle Affirmations</h2>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Read these out loud or quietly to yourself.
          </p>
          <ul className="mt-4 space-y-2 text-[15px] text-foreground/85">
            {story.affirmations.map((a: string, i: number) => (
              <li key={i} className="flex gap-2">
                <Heart className="mt-1 h-3.5 w-3.5 shrink-0 text-warmth-foreground" aria-hidden />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {story.reflection && story.reflection.length > 0 && (
        <section aria-label="Gentle reflection" className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-2">
            <NotebookPen className="h-4 w-4 text-primary" aria-hidden />
            <h2 className="font-serif text-lg">Gentle Reflection</h2>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Use these for journaling — no rush.</p>
          <ul className="mt-4 space-y-3 text-[15px] text-foreground/85">
            {story.reflection.map((r: string, i: number) => (
              <li key={i} className="rounded-xl bg-muted/40 p-3">{r}</li>
            ))}
          </ul>
        </section>
      )}

      {story.journalPrompt && (
        <section className="mt-6 rounded-3xl border border-dashed border-primary/40 bg-card p-6">
          <h2 className="font-serif text-lg">Optional Journal Prompt</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">{story.journalPrompt}</p>
          <p className="mt-2 text-xs italic text-muted-foreground">
            Only if it feels right. There is no need to write anything at all.
          </p>
        </section>
      )}

      <nav className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
        <Link
          to="/healing-library"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to the library
        </Link>
        <span className="text-xs text-muted-foreground">
          {HEALING_STORIES.length} stories in the library
        </span>
      </nav>
    </div>
  );
}
