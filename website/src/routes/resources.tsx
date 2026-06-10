import { createFileRoute, Link } from "@tanstack/react-router";
import { BookHeart, BookOpen, Download, FileText, Headphones, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources | Akoben Hub" },
      { name: "description", content: "Downloadable safeguarding guides, grounding exercises, caregiver tips, classroom resources, and emergency guides." },
      { property: "og:title", content: "Resources — Akoben Hub" },
      { property: "og:description", content: "Practical, trauma-informed safeguarding and survivor-support resources for everyday use." },
    ],
  }),
  component: ResourcesPage,
});

const RESOURCES = [
  { icon: ShieldCheck, title: "Safeguarding starter guide", body: "Foundational child protection principles for any setting.", tag: "PDF · 12 pages" },
  { icon: FileText, title: "Reporting pathways in Ghana", body: "Who to call, what to expect — DOVVSU, Social Welfare, Police.", tag: "PDF · 6 pages" },
  { icon: Sparkles, title: "Grounding exercises", body: "Gentle breathing and grounding practices for survivors and supporters.", tag: "Audio + PDF" },
  { icon: BookOpen, title: "Caregiver conversation tips", body: "Age-appropriate language for body safety conversations.", tag: "PDF · 8 pages" },
  { icon: BookOpen, title: "Classroom safeguarding toolkit", body: "Daily protocols, observation logs, and disclosure handling.", tag: "PDF · 18 pages" },
  { icon: ShieldCheck, title: "Faith community safeguarding", body: "Pastoral care, policy templates, disclosure response.", tag: "PDF · 14 pages" },
  { icon: Headphones, title: "Audio lessons (EN · Twi · Ga)", body: "Low-data audio modules for first-time smartphone users.", tag: "Audio" },
  { icon: ShieldCheck, title: "Emergency contacts card", body: "Printable wallet card with key Ghana support numbers.", tag: "PDF · 1 page" },
];

function ResourcesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="text-xs uppercase tracking-widest text-primary">Resources</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">A library of safer practice</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Downloadable guides, audio lessons, and toolkits to support safer homes, classrooms, faith communities, and circles.
      </p>
      <Link
        to="/healing-library"
        className="group mt-10 flex flex-col gap-4 rounded-3xl border border-healing/40 bg-healing/10 p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-8"
      >
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-healing text-healing-foreground">
            <BookHeart className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h2 className="font-serif text-2xl leading-snug">Healing Library</h2>
            <p className="mt-1.5 text-sm text-foreground/80">
              Stories for reflection, healing, hope, and personal growth.
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground sm:self-center">
          Enter the library
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>


      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {RESOURCES.map((r) => (
          <article key={r.title} className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
              <r.icon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-serif text-lg leading-snug">{r.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
            <p className="mt-3 text-xs text-muted-foreground">{r.tag}</p>
            <button className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-sm font-medium text-primary">
              <Download className="h-4 w-4" /> Download
            </button>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-3xl bg-aqua p-6 shadow-soft sm:p-8">
        <h2 className="font-serif text-2xl">Looking for structured learning?</h2>
        <p className="mt-2 text-sm text-foreground/80">
          The Learning Center holds 24 trauma-informed modules across three progressive levels — with audio, video, and reflection prompts.
        </p>
        <Link to="/learning-center" className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Open Learning Center</Link>
      </div>
    </div>
  );
}
