// Akoben Parent & Community Child Protection Education curriculum.
// Three progressive learning levels. NEVER mix with survivor psychoeducation modules.

export type CurriculumModule = {
  slug: string;
  title: string;
  description: string;
  durationMin: number;
  hasAudio: boolean;
  hasVideo: boolean;
  hasDownload: boolean;
  hasQuiz: boolean;
};

export type Level = {
  key: "basic" | "intermediate" | "advanced";
  number: 1 | 2 | 3;
  name: string;
  audience: string;
  audienceDetail: string;
  summary: string;
  modules: CurriculumModule[];
};

const m = (
  slug: string,
  title: string,
  description: string,
  durationMin = 20,
): CurriculumModule => ({
  slug,
  title,
  description,
  durationMin,
  hasAudio: true,
  hasVideo: true,
  hasDownload: true,
  hasQuiz: true,
});

export const LEVELS: Level[] = [
  {
    key: "basic",
    number: 1,
    name: "Level 1 — Basic",
    audience: "Parents, caregivers, and community members",
    audienceDetail: "For families and everyday community members building foundational safeguarding awareness at home.",
    summary: "Build foundational understanding of child sexual abuse, trauma, and prevention within the family and home.",
    modules: [
      m("basic-csa", "Understanding Child Sexual Abuse (CSA)", "What CSA is, how it shows up in homes, and why early awareness matters."),
      m("basic-trauma-brain", "Trauma and the Child's Brain", "How traumatic experiences shape children's developing brains and behaviour."),
      m("basic-retrauma", "How Parents Re-traumatize Children", "Common reactions that unintentionally re-wound children — and gentler alternatives."),
      m("basic-disclosure", "Safe Responses to Disclosure", "How to listen, believe, and respond if a child tells you something has happened."),
      m("basic-reporting", "Reporting and Protection Systems in Ghana", "DOVVSU, Social Welfare, schools, and faith leaders — who to call and what to expect."),
      m("basic-prevention", "Prevention at Home", "Daily habits, conversations, and boundaries that protect children at home."),
      m("basic-healing", "Healing and Long-Term Support", "Supporting a child's healing journey over months and years."),
      m("basic-ethics", "Ethics and Safeguarding", "Confidentiality, consent, and the ethics of supporting a child."),
    ],
  },
  {
    key: "intermediate",
    number: 2,
    name: "Level 2 — Intermediate",
    audience: "Teachers, church leaders, youth leaders, PTA members, coaches, community volunteers",
    audienceDetail: "For people who hold responsibility in institutions — schools, churches, youth groups, sports, and PTAs.",
    summary: "Apply safeguarding principles to institutional settings: schools, faith communities, and youth programmes.",
    modules: [
      m("inter-csa-institutions", "Understanding CSA in Institutional Settings", "How institutions can both protect and (unintentionally) enable harm."),
      m("inter-trauma-brain", "Trauma and the Child's Brain in Institutional Contexts", "What trauma looks like in classrooms, services, and youth programmes."),
      m("inter-retrauma", "How Institutions Re-traumatize Children", "Policies, language, and practices that re-wound — and how to redesign them."),
      m("inter-disclosure", "Safe Responses to Disclosure in Institutions", "What to do when a learner or congregant discloses — step by step."),
      m("inter-reporting", "Reporting and Protection Systems in Ghana", "Statutory referral pathways, internal escalation, and partnering with DOVVSU."),
      m("inter-prevention", "Prevention in Institutions", "Safer recruitment, supervision, and physical environment design."),
      m("inter-healing", "Healing and Long-Term Support", "Holding pastoral and educational care over time — without re-traumatising."),
      m("inter-ethics", "Ethics and Safeguarding", "Confidentiality, professional limits, and ethical safeguarding practice."),
    ],
  },
  {
    key: "advanced",
    number: 3,
    name: "Level 3 — Advanced",
    audience: "Child protection officers, social workers, NGO staff, safeguarding focal persons, school heads, law enforcement partners",
    audienceDetail: "For professionals leading safeguarding systems, case work, and multi-agency response.",
    summary: "Lead safeguarding systems, manage case work, and coordinate multi-agency child protection response.",
    modules: [
      m("adv-law", "Child Protection Law and Legal Frameworks in Ghana", "Children's Act, Domestic Violence Act, and the legal architecture of child protection."),
      m("adv-case-mgmt", "Case Management and Documentation Systems", "Intake, assessment, planning, review, and confidential record-keeping."),
      m("adv-mandatory-reporting", "Mandatory Reporting and Referral Systems", "Statutory duties, thresholds, and inter-agency referral workflows."),
      m("adv-evidence", "Evidence Handling and Protection Protocols", "Preserving evidence sensitively while protecting the child as the priority."),
      m("adv-institutional", "Institutional Safeguarding Systems and Compliance", "Designing, auditing, and continuously improving safeguarding frameworks."),
      m("adv-ethics", "Legal Ethics and Professional Conduct", "Boundaries, conflicts of interest, and ethical decision-making under pressure."),
      m("adv-multi-agency", "Multi-Agency Coordination and Response Systems", "Police, social welfare, health, education — coordinated response that centres the child."),
      m("adv-governance", "Monitoring, Accountability and Safeguarding Governance", "Board oversight, data, learning reviews, and survivor-informed governance."),
    ],
  },
];

export function findLevel(key: string): Level | undefined {
  return LEVELS.find((l) => l.key === key);
}
