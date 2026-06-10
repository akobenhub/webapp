import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Lock,
  ShieldCheck,
  Users,
  ClipboardList,
  CalendarCheck,
  BarChart3,
  MessageCircle,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Headphones,
  Presentation,
  BookOpen,
  Send,
  EyeOff,
  Stethoscope,
  HeartHandshake,
  UserCog,
} from "lucide-react";
import {
  APPROVED_STAFF,
  DEMO_PASSWORD,
  ROLE_LABEL,
  WORKSPACE_LABEL,
  loadStaffSession,
  signIn,
  signOut,
  type StaffMember,
  type StaffRole,
  type Workspace,
} from "@/lib/staff-auth";

export const Route = createFileRoute("/staff")({
  head: () => ({
    meta: [
      { title: "Staff Portal | Akoben Hub" },
      {
        name: "description",
        content:
          "Secure portal for Akoben facilitators, moderators, coordinators, counselors, psychologists, mental health officers, peer support leads, and administrators.",
      },
    ],
  }),
  component: StaffPortalPage,
});

function StaffPortalPage() {
  const [staff, setStaff] = useState<StaffMember | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [role, setRole] = useState<StaffRole | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setStaff(loadStaffSession());
    setHydrated(true);
  }, []);

  if (!hydrated) return <div className="mx-auto max-w-5xl px-4 py-14" />;

  if (!staff) return <SignInView onSignedIn={setStaff} />;

  if (!workspace) {
    return (
      <WorkspaceChooser
        staff={staff}
        onPick={(w) => {
          setWorkspace(w);
          const roles = staff.roles[w] ?? [];
          if (roles.length === 1) setRole(roles[0]);
        }}
        onSignOut={() => {
          signOut();
          setStaff(null);
          setWorkspace(null);
          setRole(null);
        }}
      />
    );
  }

  const availableRoles = staff.roles[workspace] ?? [];
  if (!role) {
    return (
      <RoleChooser
        staff={staff}
        workspace={workspace}
        roles={availableRoles}
        onPick={setRole}
        onBack={() => setWorkspace(null)}
      />
    );
  }

  return (
    <DashboardShell
      staff={staff}
      workspace={workspace}
      role={role}
      onBack={() => setRole(null)}
      onSwitchWorkspace={() => {
        setWorkspace(null);
        setRole(null);
      }}
      onSignOut={() => {
        signOut();
        setStaff(null);
        setWorkspace(null);
        setRole(null);
      }}
    />
  );
}

/* ---------------------------- Sign In ---------------------------- */

function SignInView({ onSignedIn }: { onSignedIn: (s: StaffMember) => void }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <p className="text-xs uppercase tracking-widest text-primary">Staff Portal</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Sign in to your workspace</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Access is restricted to approved Akoben staff. All actions are audit-logged for safeguarding accountability.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <section className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="flex items-center gap-2 text-primary">
            <Lock className="h-5 w-5" />
            <h2 className="font-serif text-xl">Sign in</h2>
          </div>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const member = signIn(email, pw);
              if (!member) {
                setError("Email or password not recognised. Please contact your administrator.");
                return;
              }
              setError(null);
              onSignedIn(member);
            }}
          >
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium">Staff email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                placeholder="you@akoben.org"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium">Password</span>
              <input
                type="password"
                required
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                placeholder="••••••••"
              />
            </label>

            {error && (
              <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
            )}

            <button className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground">
              Sign in
            </button>

            <details className="rounded-2xl bg-secondary/50 p-3 text-xs text-muted-foreground">
              <summary className="cursor-pointer font-medium text-foreground">Preview credentials</summary>
              <p className="mt-2">Password for all demo accounts: <code className="rounded bg-card px-1.5 py-0.5">{DEMO_PASSWORD}</code></p>
              <ul className="mt-2 space-y-1">
                {APPROVED_STAFF.map((s) => (
                  <li key={s.staffId}>
                    <button
                      type="button"
                      onClick={() => { setEmail(s.email); setPw(DEMO_PASSWORD); }}
                      className="text-left hover:underline"
                    >
                      {s.email} — {s.name}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          </form>
        </section>

        <section>
          <h2 className="font-serif text-xl">Inside the staff portal</h2>
          <ul className="mt-5 grid gap-3">
            <Item icon={<Users className="h-4 w-4" />} text="Two workspaces: Parent & Community Education and Akoben Empowerment Circle" />
            <Item icon={<ShieldCheck className="h-4 w-4" />} text="Role-based access with a least-privilege clinical model" />
            <Item icon={<EyeOff className="h-4 w-4" />} text="Anonymous participants shown by Circle ID only — never name, phone, or email" />
            <Item icon={<MessageCircle className="h-4 w-4" />} text="Internal staff messaging — no phone numbers shared between staff" />
            <Item icon={<ClipboardList className="h-4 w-4" />} text="Session materials, moderator checklists, support requests, and clinical referrals" />
            <Item icon={<BarChart3 className="h-4 w-4" />} text="Administrator overview across participants, sessions, and support load" />
          </ul>
          <div className="mt-6 rounded-3xl bg-warmth/20 p-5 text-sm text-foreground/85">
            <p className="font-medium">Safeguarding accountability</p>
            <p className="mt-1">
              Facilitators are trained support personnel, not personal therapists, emergency responders, or legal
              representatives. All staff agree to Akoben's safeguarding code of conduct.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function Item({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
        {icon}
      </span>
      <span className="text-sm">{text}</span>
    </li>
  );
}

/* --------------------- Workspace & Role choosers --------------------- */

function WorkspaceChooser({
  staff,
  onPick,
  onSignOut,
}: {
  staff: StaffMember;
  onPick: (w: Workspace) => void;
  onSignOut: () => void;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <TopBar staff={staff} onSignOut={onSignOut} />
      <h1 className="mt-6 font-serif text-3xl sm:text-4xl">Choose your workspace</h1>
      <p className="mt-2 text-muted-foreground">
        Welcome back, {staff.name}. Your Staff ID is{" "}
        <span className="font-mono text-foreground">{staff.staffId}</span>.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {(["pce", "aec"] as Workspace[]).map((w) => {
          const enabled = staff.workspaces.includes(w);
          return (
            <button
              key={w}
              disabled={!enabled}
              onClick={() => onPick(w)}
              className="group rounded-3xl border border-border bg-card p-6 text-left shadow-soft transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {w === "pce" ? <BookOpen className="h-3.5 w-3.5" /> : <HeartHandshake className="h-3.5 w-3.5" />}
                {w.toUpperCase()}
              </span>
              <h3 className="mt-4 font-serif text-xl">{WORKSPACE_LABEL[w]}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {w === "pce"
                  ? "Train parents, teachers, faith and community leaders. Manage programs, modules, and outreach."
                  : "Hold healing circles for adult survivors. Coordinate facilitators, moderators, counselors, and clinical referrals."}
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                {enabled ? "Roles: " + (staff.roles[w] ?? []).map((r) => ROLE_LABEL[r]).join(", ") : "Not provisioned for this workspace"}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RoleChooser({
  staff,
  workspace,
  roles,
  onPick,
  onBack,
}: {
  staff: StaffMember;
  workspace: Workspace;
  roles: StaffRole[];
  onPick: (r: StaffRole) => void;
  onBack: () => void;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to workspaces
      </button>
      <h1 className="mt-4 font-serif text-3xl sm:text-4xl">Open as…</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {WORKSPACE_LABEL[workspace]} · Staff ID {staff.staffId}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {roles.map((r) => (
          <button
            key={r}
            onClick={() => onPick(r)}
            className="rounded-2xl border border-border bg-card p-5 text-left shadow-soft transition hover:border-primary"
          >
            <RoleIcon role={r} />
            <p className="mt-3 font-serif text-lg">{ROLE_LABEL[r]}</p>
            <p className="mt-1 text-xs text-muted-foreground">{ROLE_DESCRIPTION[r]}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

const ROLE_DESCRIPTION: Record<StaffRole, string> = {
  facilitator: "Lead sessions, view assigned moderators, materials, and notes.",
  moderator: "Support sessions and run the moderator checklist and report.",
  program_coordinator: "Coordinate cohorts, scheduling, and outreach.",
  administrator: "System-wide oversight across participants and sessions.",
  counselor: "Review support requests and referral queue.",
  psychologist: "Review escalated clinical referrals only.",
  mental_health_officer: "Monitor safeguarding and clinical escalations.",
  peer_support_lead: "Coordinate peer supporters and check-ins.",
};

function RoleIcon({ role }: { role: StaffRole }) {
  const cls = "h-5 w-5 text-primary";
  const map: Record<StaffRole, React.ReactNode> = {
    facilitator: <Presentation className={cls} />,
    moderator: <ShieldCheck className={cls} />,
    program_coordinator: <CalendarCheck className={cls} />,
    administrator: <UserCog className={cls} />,
    counselor: <HeartHandshake className={cls} />,
    psychologist: <Stethoscope className={cls} />,
    mental_health_officer: <ShieldCheck className={cls} />,
    peer_support_lead: <Users className={cls} />,
  };
  return <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10">{map[role]}</span>;
}

/* ---------------------------- Shell ---------------------------- */

function TopBar({
  staff,
  onSignOut,
  trailing,
}: {
  staff: StaffMember;
  onSignOut: () => void;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
          <ShieldCheck className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-medium">{staff.name}</p>
          <p className="text-xs text-muted-foreground">Staff ID {staff.staffId} · {staff.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {trailing}
        <button
          onClick={onSignOut}
          className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-accent"
        >
          <LogOut className="h-3.5 w-3.5" /> Sign out
        </button>
      </div>
    </div>
  );
}

function DashboardShell({
  staff,
  workspace,
  role,
  onBack,
  onSwitchWorkspace,
  onSignOut,
}: {
  staff: StaffMember;
  workspace: Workspace;
  role: StaffRole;
  onBack: () => void;
  onSwitchWorkspace: () => void;
  onSignOut: () => void;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <TopBar
        staff={staff}
        onSignOut={onSignOut}
        trailing={
          <>
            <button
              onClick={onBack}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-accent"
            >
              Switch role
            </button>
            <button
              onClick={onSwitchWorkspace}
              className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-accent"
            >
              Switch workspace
            </button>
          </>
        }
      />
      <div className="mt-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {WORKSPACE_LABEL[workspace]}
          </p>
          <h1 className="mt-1 font-serif text-3xl sm:text-4xl">{ROLE_LABEL[role]} Dashboard</h1>
        </div>
      </div>

      <div className="mt-8">
        <RoleDashboard role={role} workspace={workspace} />
      </div>

      <div className="mt-10">
        <InternalMessaging me={staff} />
      </div>
    </div>
  );
}

/* ---------------------------- Role dashboards ---------------------------- */

function RoleDashboard({ role, workspace }: { role: StaffRole; workspace: Workspace }) {
  switch (role) {
    case "facilitator":
      return <FacilitatorView />;
    case "moderator":
      return <ModeratorView />;
    case "counselor":
    case "peer_support_lead":
      return <CounselorView />;
    case "psychologist":
    case "mental_health_officer":
      return <PsychologistView />;
    case "administrator":
      return <AdministratorView workspace={workspace} />;
    case "program_coordinator":
      return <CoordinatorView />;
    default:
      return null;
  }
}

function Panel({
  icon,
  title,
  children,
  right,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">{icon}</span>
          <h2 className="font-serif text-xl">{title}</h2>
        </div>
        {right}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function FacilitatorView() {
  const [notes, setNotes] = useState("");
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Panel icon={<CalendarCheck className="h-5 w-5" />} title="Upcoming sessions">
        <div className="rounded-2xl bg-secondary/50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-medium">June 10, 2026 · 6:00 PM GMT</p>
            <span className="rounded-full bg-healing/15 px-2.5 py-1 text-xs font-medium text-healing">Zoom</span>
          </div>
          <ul className="mt-3 grid gap-1.5 text-sm text-muted-foreground">
            <li>Facilitator: <span className="text-foreground">Mami Akosua Frempong</span></li>
            <li>Moderator: <span className="text-foreground">Grace Donko</span></li>
            <li>Participants registered: <span className="text-foreground">18</span></li>
            <li>Anonymous participants: <span className="text-foreground">12</span></li>
            <li className="font-medium text-foreground">Total: 30</li>
          </ul>
          <div className="mt-3 rounded-xl bg-warmth/20 p-3 text-xs text-foreground/80">
            <EyeOff className="mr-1 inline h-3.5 w-3.5" /> Anonymous participants are shown by Circle ID only. Names, phone, and email are hidden unless they have consented.
          </div>
        </div>
      </Panel>

      <Panel icon={<ShieldCheck className="h-5 w-5" />} title="Assigned moderator">
        <div className="flex items-center gap-3 rounded-2xl bg-secondary/50 p-4">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 font-medium text-primary">GD</span>
          <div className="flex-1">
            <p className="font-medium">Grace Donko</p>
            <p className="text-xs text-muted-foreground">
              <CheckCircle2 className="mr-1 inline h-3 w-3 text-healing" /> Confirmed
            </p>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
            <MessageCircle className="h-3.5 w-3.5" /> Message
          </button>
        </div>
      </Panel>

      <Panel icon={<FileText className="h-5 w-5" />} title="Session materials">
        <ul className="grid gap-2 text-sm">
          <Material icon={<BookOpen className="h-4 w-4" />} name="Facilitator Guide — June 10" />
          <Material icon={<Presentation className="h-4 w-4" />} name="Slides — Holding the circle" />
          <Material icon={<FileText className="h-4 w-4" />} name="Handouts — Grounding cards (PDF)" />
          <Material icon={<Headphones className="h-4 w-4" />} name="Grounding audio (8 min)" />
        </ul>
      </Panel>

      <Panel icon={<ClipboardList className="h-5 w-5" />} title="Session notes">
        <textarea
          rows={5}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Private notes after session. Visible only to you."
          className="w-full rounded-xl border border-input bg-background p-3 text-sm outline-none focus:border-primary"
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">Private · Encrypted · Audit-logged</span>
          <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Save</button>
        </div>
      </Panel>
    </div>
  );
}

function Material({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <li className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-card text-primary">{icon}</span>
      <span className="flex-1 text-sm">{name}</span>
      <button className="rounded-full border border-border px-3 py-1.5 text-xs hover:bg-accent">Open</button>
    </li>
  );
}

type ReportStatus = "empty" | "draft" | "submitted";
type ReportData = {
  status: ReportStatus;
  updatedAt?: string;
  submittedAt?: string;
  attendanceCount: string;
  attendanceNotes: string;
  startedOnTime: string;
  endedOnTime: string;
  technicalIncidents: string;
  emotionalSafety: string;
  safeguardingConcerns: string;
  safeguardingUrgency: "none" | "low" | "medium" | "high";
  participantsNeedingFollowUp: string;
  facilitatorNotes: string;
  whatWorked: string;
  whatToImprove: string;
  moderatorSignature: string;
};

const EMPTY_REPORT: ReportData = {
  status: "empty",
  attendanceCount: "",
  attendanceNotes: "",
  startedOnTime: "",
  endedOnTime: "",
  technicalIncidents: "",
  emotionalSafety: "",
  safeguardingConcerns: "",
  safeguardingUrgency: "none",
  participantsNeedingFollowUp: "",
  facilitatorNotes: "",
  whatWorked: "",
  whatToImprove: "",
  moderatorSignature: "",
};

const MOD_SESSIONS = [
  { id: "AEC-2026-06-10", label: "June 10, 2026 · 6:00 PM GMT", facilitator: "Mami Akosua Frempong" },
  { id: "AEC-2026-06-12", label: "June 12, 2026 · 6:00 PM GMT", facilitator: "Mami Akosua Frempong" },
  { id: "AEC-2026-06-15", label: "June 15, 2026 · 6:00 PM GMT", facilitator: "Kwame Boateng" },
  { id: "AEC-2026-06-17", label: "June 17, 2026 · 6:00 PM GMT", facilitator: "Kwame Boateng" },
];

const REPORT_STORE_KEY = "akoben.moderator.reports.v1";

function loadReports(): Record<string, ReportData> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(REPORT_STORE_KEY) || "{}");
  } catch {
    return {};
  }
}
function persistReports(all: Record<string, ReportData>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(REPORT_STORE_KEY, JSON.stringify(all));
}

function ModeratorView() {
  const sections: { title: string; tasks: string[] }[] = [
    { title: "Before session", tasks: ["Admit participants", "Manage chat", "Watch emotional safety", "Monitor disruptions"] },
    { title: "During session", tasks: ["Support facilitator", "Handle technical issues", "Watch safeguarding concerns"] },
    { title: "After session", tasks: ["Submit moderator report"] },
  ];
  const [allReports, setAllReports] = useState<Record<string, ReportData>>(() => loadReports());
  const [activeId, setActiveId] = useState<string>(MOD_SESSIONS[0].id);
  const [flash, setFlash] = useState<string | null>(null);

  const activeSession = MOD_SESSIONS.find((s) => s.id === activeId)!;
  const report: ReportData = allReports[activeId] ?? EMPTY_REPORT;
  const isSubmitted = report.status === "submitted";

  const update = (patch: Partial<ReportData>) => {
    setAllReports((prev) => ({ ...prev, [activeId]: { ...(prev[activeId] ?? EMPTY_REPORT), ...patch } }));
  };

  const saveDraft = () => {
    const next: ReportData = { ...(allReports[activeId] ?? EMPTY_REPORT), status: "draft", updatedAt: new Date().toISOString() };
    const all = { ...allReports, [activeId]: next };
    setAllReports(all);
    persistReports(all);
    setFlash("Draft saved");
    setTimeout(() => setFlash(null), 2500);
  };

  const submitFinal = () => {
    const r = allReports[activeId] ?? EMPTY_REPORT;
    if (!r.attendanceCount || !r.moderatorSignature) {
      setFlash("Please complete attendance and signature before submitting.");
      setTimeout(() => setFlash(null), 3500);
      return;
    }
    const now = new Date().toISOString();
    const next: ReportData = { ...r, status: "submitted", submittedAt: now, updatedAt: now };
    const all = { ...allReports, [activeId]: next };
    setAllReports(all);
    persistReports(all);
    setFlash("Report submitted to facilitator and coordinator.");
    setTimeout(() => setFlash(null), 3500);
  };

  const reopen = () => {
    const next: ReportData = { ...(allReports[activeId] ?? EMPTY_REPORT), status: "draft" };
    const all = { ...allReports, [activeId]: next };
    setAllReports(all);
    persistReports(all);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Panel icon={<CalendarCheck className="h-5 w-5" />} title="Assigned sessions">
        <ul className="grid gap-2">
          {MOD_SESSIONS.map((s) => {
            const st = allReports[s.id]?.status ?? "empty";
            const isActive = s.id === activeId;
            return (
              <li key={s.id}>
                <button
                  onClick={() => setActiveId(s.id)}
                  className={`flex w-full items-center justify-between rounded-2xl border p-3 text-left text-sm transition-colors ${isActive ? "border-primary bg-primary/5" : "border-border bg-secondary/50 hover:bg-accent"}`}
                >
                  <span>
                    <span className="block font-medium">{s.label}</span>
                    <span className="block text-xs text-muted-foreground">Facilitator: {s.facilitator}</span>
                  </span>
                  <ReportBadge status={st} />
                </button>
              </li>
            );
          })}
        </ul>
      </Panel>

      <Panel icon={<ClipboardList className="h-5 w-5" />} title="Moderator tasks">
        <div className="space-y-4">
          {sections.map((s) => (
            <div key={s.title}>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.title}</p>
              <ul className="mt-2 space-y-1.5">
                {s.tasks.map((t) => (
                  <Checkbox key={t} label={t} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Panel>

      <Panel
        icon={<FileText className="h-5 w-5" />}
        title="Moderator report"
        right={
          <div className="flex items-center gap-2">
            <ReportBadge status={report.status} />
            <span className="text-xs text-muted-foreground">{activeSession.label}</span>
          </div>
        }
      >
        <fieldset disabled={isSubmitted} className="grid gap-4 text-sm disabled:opacity-90">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Attendance</p>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <Field label="Number who joined" value={report.attendanceCount} onChange={(v) => update({ attendanceCount: v })} placeholder="e.g. 28 of 30" />
              <Field label="Attendance notes" value={report.attendanceNotes} onChange={(v) => update({ attendanceNotes: v })} placeholder="e.g. 2 left early" />
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Timing</p>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <Field label="Started on time?" value={report.startedOnTime} onChange={(v) => update({ startedOnTime: v })} placeholder="Yes / 5 min late" />
              <Field label="Ended on time?" value={report.endedOnTime} onChange={(v) => update({ endedOnTime: v })} placeholder="Yes / ran over" />
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Session quality</p>
            <div className="mt-2 grid gap-3">
              <Field label="Technical incidents" value={report.technicalIncidents} onChange={(v) => update({ technicalIncidents: v })} placeholder="Audio drops, reconnects, etc." textarea />
              <Field label="Emotional safety observations" value={report.emotionalSafety} onChange={(v) => update({ emotionalSafety: v })} placeholder="How participants seemed to be holding the space" textarea />
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Safeguarding</p>
            <div className="mt-2 grid gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium">Urgency level</label>
                <div className="flex flex-wrap gap-2">
                  {(["none", "low", "medium", "high"] as const).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => update({ safeguardingUrgency: u })}
                      className={`rounded-full border px-3 py-1.5 text-xs capitalize ${report.safeguardingUrgency === u ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-accent"}`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
              <Field label="Concerns (Circle IDs only)" value={report.safeguardingConcerns} onChange={(v) => update({ safeguardingConcerns: v })} placeholder="e.g. AEC-10483 became distressed during grounding" textarea />
              <Field label="Participants needing follow-up" value={report.participantsNeedingFollowUp} onChange={(v) => update({ participantsNeedingFollowUp: v })} placeholder="Circle IDs only" />
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Reflection</p>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <Field label="What worked well" value={report.whatWorked} onChange={(v) => update({ whatWorked: v })} placeholder="Brief, factual" textarea />
              <Field label="What to improve" value={report.whatToImprove} onChange={(v) => update({ whatToImprove: v })} placeholder="Brief, respectful" textarea />
            </div>
            <div className="mt-3">
              <Field label="Notes for facilitator" value={report.facilitatorNotes} onChange={(v) => update({ facilitatorNotes: v })} placeholder="Anything the facilitator should know" textarea />
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Sign-off</p>
            <div className="mt-2">
              <Field label="Moderator signature (full name)" value={report.moderatorSignature} onChange={(v) => update({ moderatorSignature: v })} placeholder="Type your full name to sign" />
            </div>
          </div>
        </fieldset>

        {flash && (
          <p className="mt-3 rounded-xl bg-secondary/70 px-3 py-2 text-xs text-foreground">{flash}</p>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
          <div className="text-xs text-muted-foreground">
            {isSubmitted ? (
              <>Submitted {report.submittedAt ? new Date(report.submittedAt).toLocaleString() : ""}</>
            ) : report.updatedAt ? (
              <>Draft saved {new Date(report.updatedAt).toLocaleString()}</>
            ) : (
              <>Not started</>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {isSubmitted ? (
              <button onClick={reopen} className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-accent">
                Reopen for edits
              </button>
            ) : (
              <>
                <button onClick={saveDraft} className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-accent">
                  Save draft
                </button>
                <button onClick={submitFinal} className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Submit final report
                </button>
              </>
            )}
          </div>
        </div>
      </Panel>
    </div>
  );
}

function ReportBadge({ status }: { status: ReportStatus }) {
  const map = {
    empty: { label: "Not started", cls: "bg-secondary text-muted-foreground" },
    draft: { label: "Draft", cls: "bg-warmth/40 text-warmth-foreground" },
    submitted: { label: "Submitted", cls: "bg-healing/20 text-healing" },
  } as const;
  const { label, cls } = map[status];
  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${cls}`}>{label}</span>;
}

function Checkbox({ label }: { label: string }) {
  const [on, setOn] = useState(false);
  return (
    <li>
      <button
        onClick={() => setOn((v) => !v)}
        className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-secondary/60"
      >
        <span
          className={`grid h-4 w-4 place-items-center rounded border ${on ? "border-primary bg-primary text-primary-foreground" : "border-input"}`}
        >
          {on && <CheckCircle2 className="h-3 w-3" />}
        </span>
        <span className={on ? "text-muted-foreground line-through" : ""}>{label}</span>
      </button>
    </li>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-input bg-background p-2.5 text-sm outline-none focus:border-primary"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-input bg-background p-2.5 text-sm outline-none focus:border-primary"
        />
      )}
    </label>
  );
}

function CounselorView() {
  const queue = [
    { id: "AEC-10483", type: "Counselor support", status: "Waiting", assigned: "Not yet assigned", urgency: "High" },
    { id: "AEC-10477", type: "Referral information", status: "In review", assigned: "Dr. Nana Yaa", urgency: "Medium" },
    { id: "AEC-10465", type: "Follow-up", status: "Scheduled", assigned: "Dr. Nana Yaa", urgency: "Low" },
  ];
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="New requests" value="12" tone="primary" />
        <Stat label="Urgent" value="1" tone="destructive" />
        <Stat label="Pending" value="5" tone="warmth" />
        <Stat label="Assigned to me" value="6" tone="healing" />
      </div>

      <Panel icon={<ClipboardList className="h-5 w-5" />} title="Referral queue">
        <div className="rounded-2xl bg-warmth/15 p-3 text-xs text-foreground/80">
          <EyeOff className="mr-1 inline h-3.5 w-3.5" /> Participants are shown by Circle ID only. Names and contact details are not visible at this level.
        </div>
        <ul className="mt-4 divide-y divide-border text-sm">
          {queue.map((q) => (
            <li key={q.id} className="flex flex-wrap items-center gap-3 py-3">
              <span className="font-mono text-xs text-muted-foreground">{q.id}</span>
              <span className="font-medium">{q.type}</span>
              <UrgencyTag u={q.urgency as "Low" | "Medium" | "High"} />
              <span className="text-xs text-muted-foreground">Assigned to: {q.assigned}</span>
              <span className="ml-auto rounded-full bg-secondary px-2.5 py-1 text-xs">{q.status}</span>
              <button className="rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">Open</button>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel icon={<FileText className="h-5 w-5" />} title="Session notes">
        <p className="text-sm text-muted-foreground">
          Clinical session notes are visible only to authorized clinical staff. All access is audit-logged.
        </p>
        <button className="mt-3 rounded-full bg-secondary px-3 py-2 text-sm hover:bg-accent">Open clinical notes</button>
      </Panel>
    </div>
  );
}

function PsychologistView() {
  const referrals = [
    { id: "AEC-10483", from: "Counselor Nana Yaa", reason: "Escalated — trauma response support", at: "Today" },
    { id: "AEC-10401", from: "Counselor Nana Yaa", reason: "Persistent intrusive memories", at: "Yesterday" },
  ];
  return (
    <div className="grid gap-6">
      <div className="rounded-2xl bg-aqua p-4 text-sm">
        <p className="font-medium">Least-access model</p>
        <p className="mt-1 text-foreground/80">
          You see only clinical referrals escalated by counselors. General participant information is not available at
          this role. This protects participant privacy and clinical boundaries.
        </p>
      </div>
      <Panel icon={<Stethoscope className="h-5 w-5" />} title="Clinical referrals">
        <ul className="divide-y divide-border text-sm">
          {referrals.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center gap-3 py-3">
              <span className="font-mono text-xs text-muted-foreground">{r.id}</span>
              <span className="font-medium">{r.reason}</span>
              <span className="text-xs text-muted-foreground">From {r.from}</span>
              <span className="ml-auto text-xs text-muted-foreground">{r.at}</span>
              <button className="rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">Review</button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

function AdministratorView({ workspace }: { workspace: Workspace }) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Stat label="Participants" value="245" tone="primary" />
        <Stat label="Anonymous" value="163" tone="healing" />
        <Stat label="Registered" value="82" tone="warmth" />
        <Stat label="Open support requests" value="23" tone="destructive" />
        <Stat label="Facilitators" value="8" tone="primary" />
        <Stat label="Moderators" value="12" tone="primary" />
        <Stat label="Counselors" value="4" tone="healing" />
        <Stat label="Upcoming sessions" value="15" tone="warmth" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel icon={<CalendarCheck className="h-5 w-5" />} title="Scheduling">
          <ul className="grid gap-2 text-sm">
            {[
              ["June 10 · 6 PM GMT", "Mami Akosua · Grace Donko"],
              ["June 12 · 6 PM GMT", "Mami Akosua · Grace Donko"],
              ["June 15 · 6 PM GMT", "TBA"],
            ].map(([when, who]) => (
              <li key={when} className="flex items-center justify-between rounded-xl bg-secondary/50 p-3">
                <span>{when}</span>
                <span className="text-xs text-muted-foreground">{who}</span>
              </li>
            ))}
          </ul>
          <button className="mt-3 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Schedule session</button>
        </Panel>

        <Panel icon={<ShieldCheck className="h-5 w-5" />} title={`Workspace: ${WORKSPACE_LABEL[workspace]}`}>
          <ul className="grid gap-2 text-sm">
            <li className="flex items-center justify-between rounded-xl bg-secondary/50 p-3"><span>Audit log</span><button className="text-xs text-primary hover:underline">View</button></li>
            <li className="flex items-center justify-between rounded-xl bg-secondary/50 p-3"><span>Role assignments</span><button className="text-xs text-primary hover:underline">Manage</button></li>
            <li className="flex items-center justify-between rounded-xl bg-secondary/50 p-3"><span>Safeguarding policies</span><button className="text-xs text-primary hover:underline">Review</button></li>
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function CoordinatorView() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Panel icon={<CalendarCheck className="h-5 w-5" />} title="Upcoming programs">
        <ul className="grid gap-2 text-sm">
          <li className="flex items-center justify-between rounded-xl bg-secondary/50 p-3"><span>Parents cohort · Kumasi</span><span className="text-xs text-muted-foreground">Starts June 14</span></li>
          <li className="flex items-center justify-between rounded-xl bg-secondary/50 p-3"><span>Teachers safeguarding · Accra</span><span className="text-xs text-muted-foreground">Starts June 20</span></li>
        </ul>
      </Panel>
      <Panel icon={<Users className="h-5 w-5" />} title="Outreach">
        <p className="text-sm text-muted-foreground">Coordinate facilitators, venues, and community partners.</p>
      </Panel>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "primary" | "destructive" | "healing" | "warmth" }) {
  const colors = {
    primary: "bg-primary/10 text-primary",
    destructive: "bg-destructive/10 text-destructive",
    healing: "bg-healing/15 text-healing",
    warmth: "bg-warmth/25 text-warmth-foreground",
  }[tone];
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <span className={`inline-flex h-7 items-center rounded-full px-2.5 text-xs font-medium ${colors}`}>{label}</span>
      <p className="mt-3 font-serif text-2xl sm:text-3xl">{value}</p>
    </div>
  );
}

function UrgencyTag({ u }: { u: "Low" | "Medium" | "High" }) {
  const cls =
    u === "High"
      ? "bg-destructive/10 text-destructive"
      : u === "Medium"
        ? "bg-warmth/30 text-warmth-foreground"
        : "bg-healing/15 text-healing";
  const Icon = u === "High" ? AlertTriangle : CheckCircle2;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}>
      <Icon className="h-3 w-3" /> {u}
    </span>
  );
}

/* ---------------------------- Internal messaging ---------------------------- */

type Msg = { id: string; from: string; to: string; text: string; at: string };

function InternalMessaging({ me }: { me: StaffMember }) {
  const peers = useMemo(() => APPROVED_STAFF.filter((s) => s.staffId !== me.staffId), [me.staffId]);
  const [activePeerId, setActivePeerId] = useState<string>(peers[0]?.staffId ?? "");
  const [threads, setThreads] = useState<Record<string, Msg[]>>(() => ({
    [peers[0]?.staffId ?? ""]: [
      {
        id: "seed",
        from: peers[0]?.name ?? "System",
        to: me.name,
        text: "Grace Donko has been assigned as Moderator for the June 10 session.",
        at: "Today · 9:14 AM",
      },
    ],
  }));
  const [draft, setDraft] = useState("");
  const peer = peers.find((p) => p.staffId === activePeerId);
  const thread = threads[activePeerId] ?? [];

  function send() {
    if (!draft.trim() || !peer) return;
    const msg: Msg = {
      id: Math.random().toString(36).slice(2),
      from: me.name,
      to: peer.name,
      text: draft.trim(),
      at: "Just now",
    };
    setThreads((t) => ({ ...t, [activePeerId]: [...(t[activePeerId] ?? []), msg] }));
    setDraft("");
  }

  return (
    <Panel
      icon={<MessageCircle className="h-5 w-5" />}
      title="Internal staff messaging"
      right={<span className="text-xs text-muted-foreground">No phone numbers shared between staff</span>}
    >
      <div className="grid gap-4 md:grid-cols-[220px_1fr]">
        <aside className="rounded-2xl bg-secondary/40 p-2">
          <ul className="grid gap-1">
            {peers.map((p) => (
              <li key={p.staffId}>
                <button
                  onClick={() => setActivePeerId(p.staffId)}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm ${activePeerId === p.staffId ? "bg-card shadow-soft" : "hover:bg-card/60"}`}
                >
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{(p.roles.aec ?? p.roles.pce ?? []).map((r) => ROLE_LABEL[r]).join(" · ")}</p>
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <div className="rounded-2xl border border-border bg-background p-3">
          <div className="flex min-h-[180px] flex-col gap-2">
            {thread.length === 0 && (
              <p className="m-auto text-sm text-muted-foreground">No messages yet. Start the conversation.</p>
            )}
            {thread.map((m) => {
              const mine = m.from === me.name;
              return (
                <div key={m.id} className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${mine ? "ml-auto bg-primary text-primary-foreground" : "bg-secondary"}`}>
                  <p>{m.text}</p>
                  <p className={`mt-1 text-[10px] ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.from} · {m.at}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={peer ? `Message ${peer.name}…` : "Select a colleague"}
              className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm outline-none focus:border-primary"
            />
            <button
              onClick={send}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              <Send className="h-3.5 w-3.5" /> Send
            </button>
          </div>
        </div>
      </div>
    </Panel>
  );
}
