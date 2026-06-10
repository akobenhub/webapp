import { Link } from "@tanstack/react-router";
import { ArrowRight, Download, FileText, Headphones, Video } from "lucide-react";

export type Module = {
  slug: string;
  title: string;
  audience: string;
  duration: string;
  lessons: number;
  tone: "parents" | "survivors" | "teachers";
  summary: string;
  hasAudio?: boolean;
  hasVideo?: boolean;
  hasDownload?: boolean;
  hasQuiz?: boolean;
};

export function ModuleCard({ m }: { m: Module }) {
  const accent =
    m.tone === "parents"
      ? "bg-primary/10 text-primary"
      : m.tone === "teachers"
      ? "bg-healing/20 text-healing"
      : "bg-warmth/30 text-warmth-foreground";
  return (
    <Link
      to="/modules"
      className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-warm"
    >
      <div className="flex items-center justify-between gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${accent}`}>{m.audience}</span>
        <div className="flex items-center gap-2 text-muted-foreground">
          {m.hasVideo && <Video className="h-3.5 w-3.5" aria-label="Video" />}
          {m.hasAudio && <Headphones className="h-3.5 w-3.5" aria-label="Audio" />}
          {m.hasDownload && <Download className="h-3.5 w-3.5" aria-label="Download" />}
          {m.hasQuiz && <FileText className="h-3.5 w-3.5" aria-label="Quiz" />}
        </div>
      </div>
      <h3 className="mt-4 font-serif text-xl leading-snug">{m.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{m.summary}</p>
      <div className="mt-auto flex items-center justify-between pt-6 text-xs text-muted-foreground">
        <span>{m.lessons} lessons · {m.duration}</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export const MODULES: Module[] = [
  // Parents & community
  {
    slug: "recognising-signs",
    title: "Recognising signs of harm in children",
    audience: "Parents",
    tone: "parents",
    duration: "18 min",
    lessons: 4,
    summary: "Subtle behavioural, emotional, and physical signs — and how to respond with care.",
    hasAudio: true, hasVideo: true, hasQuiz: true,
  },
  {
    slug: "safe-conversations",
    title: "Safe conversations about the body",
    audience: "Parents & Caregivers",
    tone: "parents",
    duration: "22 min",
    lessons: 5,
    summary: "Age-appropriate language and culturally grounded ways to discuss boundaries.",
    hasAudio: true, hasDownload: true,
  },
  {
    slug: "grooming-behaviours",
    title: "Recognising grooming behaviours",
    audience: "Parents & PTAs",
    tone: "parents",
    duration: "24 min",
    lessons: 5,
    summary: "Understand patterns used by perpetrators — gifts, secrecy, isolation — and how to intervene.",
    hasVideo: true, hasQuiz: true,
  },
  {
    slug: "safe-disclosure",
    title: "Responding to a child's disclosure",
    audience: "Parents & Teachers",
    tone: "parents",
    duration: "20 min",
    lessons: 4,
    summary: "What to do — and what not to do — when a child tells you something has happened.",
    hasAudio: true, hasVideo: true,
  },
  {
    slug: "reporting-pathways",
    title: "Reporting pathways in Ghana",
    audience: "Community",
    tone: "parents",
    duration: "16 min",
    lessons: 3,
    summary: "DOVVSU, Social Welfare, schools, faith leaders — who to call and what to expect.",
    hasDownload: true,
  },
  {
    slug: "faith-safeguarding",
    title: "Safeguarding in faith communities",
    audience: "Faith Leaders",
    tone: "parents",
    duration: "26 min",
    lessons: 6,
    summary: "Practical safeguarding policies, disclosures, and pastoral response.",
    hasDownload: true, hasQuiz: true,
  },
  // Teachers
  {
    slug: "classroom-safeguarding",
    title: "Classroom safeguarding basics",
    audience: "Teachers",
    tone: "teachers",
    duration: "22 min",
    lessons: 5,
    summary: "Daily classroom protocols, observation logs, and trauma-aware teaching.",
    hasVideo: true, hasDownload: true,
  },
  {
    slug: "age-appropriate-lessons",
    title: "Age-appropriate safeguarding lessons",
    audience: "Teachers",
    tone: "teachers",
    duration: "30 min",
    lessons: 6,
    summary: "Lesson plans for KG, primary, and JHS students — with animations and activities.",
    hasVideo: true, hasDownload: true, hasQuiz: true,
  },
  {
    slug: "teacher-disclosure",
    title: "When a learner discloses",
    audience: "Teachers",
    tone: "teachers",
    duration: "18 min",
    lessons: 4,
    summary: "How to receive a disclosure, document it, and escalate within school policy.",
    hasAudio: true, hasVideo: true,
  },
  // Survivors
  {
    slug: "grounding",
    title: "Grounding when memories return",
    audience: "Survivors",
    tone: "survivors",
    duration: "12 min",
    lessons: 3,
    summary: "Gentle breathing and grounding practices you can use anywhere, anytime.",
    hasAudio: true,
  },
  {
    slug: "naming-experience",
    title: "Naming what happened, at your pace",
    audience: "Survivors",
    tone: "survivors",
    duration: "20 min",
    lessons: 4,
    summary: "A guided psychoeducation module on understanding trauma responses.",
    hasAudio: true,
  },
  {
    slug: "shame-release",
    title: "Loosening the grip of shame",
    audience: "Survivors",
    tone: "survivors",
    duration: "18 min",
    lessons: 4,
    summary: "Trauma literacy on shame — why it lingers and gentle ways to soften it.",
    hasAudio: true,
  },
  {
    slug: "emotional-regulation",
    title: "Riding the waves: emotional regulation",
    audience: "Survivors",
    tone: "survivors",
    duration: "22 min",
    lessons: 5,
    summary: "Practical coping strategies — window of tolerance, body cues, and gentle reset.",
    hasAudio: true, hasDownload: true,
  },
  {
    slug: "boundaries",
    title: "Boundaries that feel safe",
    audience: "Survivors",
    tone: "survivors",
    duration: "20 min",
    lessons: 4,
    summary: "Naming what you need, in your relationships and in your community.",
    hasAudio: true,
  },
  {
    slug: "rebuilding-trust",
    title: "Rebuilding trust and connection",
    audience: "Survivors",
    tone: "survivors",
    duration: "24 min",
    lessons: 5,
    summary: "Relational healing, boundaries, and reaching toward chosen support.",
  },
];
