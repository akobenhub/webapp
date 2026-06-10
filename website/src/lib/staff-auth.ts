// Mock staff auth + role registry for the Akoben Staff Portal (frontend-only demo).
export type Workspace = "pce" | "aec";

export type StaffRole =
  | "facilitator"
  | "moderator"
  | "program_coordinator"
  | "administrator"
  | "counselor"
  | "psychologist"
  | "mental_health_officer"
  | "peer_support_lead";

export type StaffMember = {
  staffId: string;
  name: string;
  email: string;
  workspaces: Workspace[];
  roles: Partial<Record<Workspace, StaffRole[]>>;
};

const STAFF_KEY = "akoben.staff.session";

// Approved staff (demo). Password is shared for the preview: "akoben2026".
export const APPROVED_STAFF: StaffMember[] = [
  {
    staffId: "AKB-0001",
    name: "Mami Akosua Frempong",
    email: "akosua@akoben.org",
    workspaces: ["pce", "aec"],
    roles: { pce: ["facilitator", "program_coordinator"], aec: ["facilitator"] },
  },
  {
    staffId: "AKB-0002",
    name: "Grace Donko",
    email: "grace@akoben.org",
    workspaces: ["pce", "aec"],
    roles: { pce: ["moderator"], aec: ["moderator"] },
  },
  {
    staffId: "AKB-0003",
    name: "Dr. Nana Yaa",
    email: "nanayaa@akoben.org",
    workspaces: ["aec"],
    roles: { aec: ["counselor", "peer_support_lead"] },
  },
  {
    staffId: "AKB-0004",
    name: "Dr. Kwesi Mensah",
    email: "kwesi@akoben.org",
    workspaces: ["aec"],
    roles: { aec: ["psychologist", "mental_health_officer"] },
  },
  {
    staffId: "AKB-0005",
    name: "Ama Owusu",
    email: "admin@akoben.org",
    workspaces: ["pce", "aec"],
    roles: { pce: ["administrator"], aec: ["administrator"] },
  },
];

export const DEMO_PASSWORD = "akoben2026";

export const ROLE_LABEL: Record<StaffRole, string> = {
  facilitator: "Facilitator",
  moderator: "Moderator",
  program_coordinator: "Program Coordinator",
  administrator: "Administrator",
  counselor: "Counselor",
  psychologist: "Psychologist",
  mental_health_officer: "Mental Health Officer",
  peer_support_lead: "Peer Support Lead",
};

export const WORKSPACE_LABEL: Record<Workspace, string> = {
  pce: "Parent & Community Education",
  aec: "Akoben Empowerment Circle",
};

export type StaffSession = {
  staffId: string;
  email: string;
  name: string;
};

export function signIn(email: string, password: string): StaffMember | null {
  if (password !== DEMO_PASSWORD) return null;
  const match = APPROVED_STAFF.find((s) => s.email.toLowerCase() === email.trim().toLowerCase());
  if (!match) return null;
  try {
    localStorage.setItem(
      STAFF_KEY,
      JSON.stringify({ staffId: match.staffId, email: match.email, name: match.name } satisfies StaffSession),
    );
  } catch {
    /* ignore */
  }
  return match;
}

export function loadStaffSession(): StaffMember | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STAFF_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as StaffSession;
    return APPROVED_STAFF.find((m) => m.staffId === s.staffId) ?? null;
  } catch {
    return null;
  }
}

export function signOut() {
  try {
    localStorage.removeItem(STAFF_KEY);
  } catch {
    /* ignore */
  }
}
