# Akoben Hub — Development Plan & System Architecture

**Document version:** 1.1  
**Date:** 27 June 2026  
**Prepared for:** Akoben client review and build alignment  
**Repository:** `webapp/website` (React · TanStack Start · Vite)  
**Production API (configured):** `https://api.akoben.org/api` (proposed URL if funding approved)  
**Deployment:** GitHub Actions → FTPS shared hosting (automated on `main`)

---

## Immediate milestone — Partner meeting, Monday 29 June 2026

**Context (client update via WhatsApp):** A partner meeting with the organization supplying **Akoben Empowerment Circle resource materials** has been moved to **Monday, 29 June 2026**. The client wants to preview the platform from a **survivor's perspective** and discuss **how partner materials will be organized and made available** on the platform.

**Reference site:** [Saprea Support Groups — Group Materials](https://supportgroups.saprea.org/group-materials/) — client-approved inspiration for structuring educational resources and the survivor learning journey. Akoben does not need to copy Saprea exactly, but should adopt similar clarity and navigation patterns.

### What can be demonstrated today (live site / staging)

| Step | Route | What to show |
|------|-------|--------------|
| 1 | `/survivors` | Survivor pathway welcome — trauma-informed tone, anonymous option explained |
| 2 | `/onboarding/survivor` or `/anonymous-entry` | Gentle entry — identity choice or `AEC-XXXX` Circle ID |
| 3 | `/circle` | Survivor home dashboard — learning, library, circles, support |
| 4 | `/healing-library` | Reflection stories (19) — read at own pace |
| 5 | `/empowerment-circles` | Circle session booking UI |
| 6 | `/support-request` | Gentle support request flow |
| 7 | `/referral` | Confidential referral pathway |

### What to describe as "in build" (not yet demo-ready)

| Item | Status | Talking point for partner |
|------|--------|---------------------------|
| Full 6-step Orientation Hub | In plan | Replaces WhatsApp; gates access with safety rules + consent |
| **Group Materials hub** (Saprea-style) | **Not built yet — priority for partner content** | Numbered circle curriculum, leader scripts, meeting-aligned resources |
| Safeguarding & Risk Check | In plan | Routes distressed users to MHO / 1:1 / crisis pathways |
| In-app chat (`#group-materials`, circle rooms) | In plan | Controlled, logged group communication |
| Google Meet — My Circles | In plan | Join meeting from survivor dashboard |
| Backend persistence | In plan | Progress, assignments, material unlocks sync to server |

### Discussion agenda with resource partner (suggested)

1. **Confirm curriculum shape** — How many circle meetings/sessions? Numbered sequence (like Saprea's 27) or modular topics?
2. **Per-meeting assets** — Participant guide, facilitator script, grounding exercise, reflection prompts, downloads?
3. **Leader vs participant views** — What is facilitator-only (scripts, safeguarding notes) vs survivor-visible?
4. **Join mid-cycle rules** — Can new survivors enter at any meeting? (Saprea allows this with leader guidance.)
5. **Solo vs group use** — Akoben encourages group circles; clarify what can be browsed alone (Healing Library) vs group-only (meeting scripts).
6. **File formats** — PDF, audio, video, text-in-app; language versions (English first, Twi/Ga later).
7. **Naming & numbering** — Agree titles and `#01`–`#NN` convention before build.

---

## 1. Purpose of This Document

This document aligns the **Akoben Digital Healing & Advocacy Hub** with the client's approved system architecture for both pathways. It covers:

- What is **already built** in the current application
- What **must be built** to match the client's specification
- **Priority order** and rationale for the development route
- **Content deliverables** required from the client (including Level 1 Module 1 text content)
- **Partner meeting prep** (29 June 2026) and **Saprea-inspired** Group Materials structure

Use this as the shared reference so the client knows what is in progress, what is next, and why.

---

## 2. Platform Overview

Akoben Hub is a **single web application** with **two independent pathways**. They are intentionally separated for emotional and safeguarding reasons — community education and survivor support must not overlap in ways that could feel unsafe.

| | **Pathway 1 — PCE** | **Pathway 2 — AEC** |
|---|---|---|
| **Full name** | Parent & Community Child Protection Education | Akoben Empowerment Circle |
| **Audience** | Parents, teachers, pastors, community members, safeguarding professionals | Adult survivors of childhood sexual abuse |
| **Anonymity** | No — registered users only | Yes — anonymous OR registered |
| **Mental health triage** | No | Yes — safeguarding & risk check |
| **Peer-to-peer chat** | No | No (group-based only) |
| **Primary focus** | Structured learning + CSA reporting | Healing, circles, peer support, escalation |
| **Live sessions** | Google Meet (Akoben Groups 1–4) | Google Meet (Circle A/B/C) |

---

## 3. High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     AKOBEN HUB — HOME / ENTRY                    │
│              Pathway Selection (PCE  |  AEC)                     │
└───────────────┬─────────────────────────────┬───────────────────┘
                │                             │
                ▼                             ▼
┌───────────────────────────┐   ┌─────────────────────────────────┐
│   PATHWAY 1 — PCE         │   │   PATHWAY 2 — AEC               │
│                           │   │                                 │
│  Registration (required)  │   │  Register OR Anonymous Entry    │
│         ↓                 │   │         ↓                       │
│  Orientation Hub          │   │  Orientation Hub (6 steps)      │
│         ↓                 │   │         ↓                       │
│  Learning Mode Selection  │   │  Safeguarding & Risk Check      │
│  (Self-paced / Facilitated│   │         ↓                       │
│   / Hybrid)               │   │  AI Circle Assignment           │
│         ↓                 │   │         ↓                       │
│  Learning Center          │   │  Internal Chat Rooms            │
│  (24 modules, 3 levels)   │   │  + Group Materials (circle      │
│         ↓                 │   │    curriculum — Saprea-style)   │
│  CSA Reporting Module     │   │  + Healing Library (stories)    │
│         ↓                 │   │  + Google Meet (My Circles)     │
│  Akoben Groups + Meet     │   │  + Notifications                │
│         ↓                 │   │         ↓                       │
│  Admin Dashboard (PCE)    │   │  Staff: MHO / Facilitator       │
│                           │   │  escalation pathways            │
│                           │   │         ↓                       │
│                           │   │  Admin Dashboard (AEC)          │
└───────────────────────────┘   └─────────────────────────────────┘
                │                             │
                └─────────────┬───────────────┘
                              ▼
              ┌───────────────────────────────┐
              │  SHARED BACKEND (api.akoben)  │
              │  Users · Progress · Messages  │
              │  Referrals · Notifications    │
              │  Audit logs · Circle/Group mgmt │
              └───────────────────────────────┘
```

---

# PATHWAY 2 — AKOBEN EMPOWERMENT CIRCLE (AEC)

## 4. Client-Approved User Flow

### 4.1 Entry

| Route | Registered user | Anonymous user |
|-------|-----------------|----------------|
| **Register & create profile** | Name, email, phone, country, region | — |
| **Enter anonymously** | — | System generates `AEC-XXXX` Circle ID; `userType = anonymous` |

**Current build status:** Partially done  
- `/survivors` — welcome page exists  
- `/onboarding/survivor` — 3-step flow (welcome, identity mode, ready) — **does not match** full Orientation Hub spec  
- `/anonymous-entry` — Circle ID generation exists (client-side localStorage only)  
- `/empowerment-circles` — session booking UI (hardcoded dates, no backend)

---

### 4.2 Orientation Hub (Inside the App)

**Client requirement:** Replace WhatsApp orientation with a **guided in-app Orientation Hub** before users enter circles.

| Step | Screen | Client copy / action | Build status |
|------|--------|----------------------|--------------|
| **1** | Welcome Message | Survivor-centered space; real identity or anonymous; safety and choice matter | Partial — shorter copy on `/onboarding/survivor` |
| **2** | Safety, Confidentiality & Platform Rules | 8 rule sections + "What Empowerment Circles Are" + "What Happens in Meetings" | **Not built** as specified |
| **3** | Program Explanation | Circles purpose, meeting format, frequency, Circle Leader role, Peer Support role | **Not built** |
| **4** | Consent | Not emergency counseling; not therapy; voluntary; may leave anytime | Partial — `/consent` is a static info page, not step-gated onboarding |
| **5** | Safeguarding & Risk Check | 5 routing options (see below) | **Not built** |
| **6** | Orientation Complete | `orientation_status = completed` → AI/facilitator systems take over | **Not built** (no backend field) |

#### Step 5 — Safeguarding & Risk Check (routing logic)

| User selection | Route | Priority / handler |
|----------------|-------|-------------------|
| I feel overwhelmed | Circle Leader — immediate stabilisation | Assigned to available Circle Facilitator |
| I am in emotional distress | Mental Health Officer (MHO) | Medium priority case |
| I need urgent support | Crisis escalation pathway | **High risk** — MHO only (not facilitators). Urgent Support Mode: in-app chat OR emergency Google Meet OR external services |
| I would prefer one-to-one support first | Facilitator 1:1 intake | Private facilitator ↔ user channel; optional Meet; group later if safe |
| None of the above | AI Circle Assignment | Standard group assignment |

---

### 4.3 Resource Materials & Learning Journey (Saprea reference)

**Client direction:** Organize partner-supplied Empowerment Circle materials using [Saprea's Group Materials page](https://supportgroups.saprea.org/group-materials/) as a structural reference — clear numbering, meeting-aligned topics, facilitator assets, and a guided learning journey.

#### What Saprea does well (patterns to adopt)

| Saprea pattern | How it works | Akoben equivalent (proposed) |
|----------------|--------------|------------------------------|
| **Dedicated Group Materials hub** | Single page listing all circle meeting resources | New route: `/group-materials` (survivor-facing) |
| **Numbered curriculum** | 27 meetings, `#01`–`#27`, each with title + short description | Partner-defined meeting count; same numbering convention |
| **Meeting-aligned content** | Each card = one group session topic (e.g. "Trauma's Impact on the Brain and Body") | Each card = one Empowerment Circle meeting theme |
| **Facilitator scripts** | Downloadable script for every group meeting; separate leader resources section | Staff portal + facilitator-only downloads |
| **Cyclical journey** | After 27 meetings, revisit to deepen; new members can join mid-cycle with leader | Document in UI; circle leader sets "current meeting" for the group |
| **Group-first messaging** | FAQ: materials work best in a group, not alone | Akoben aligns — solo browsing in Healing Library; curriculum in circles |
| **Entry guidance** | "Where do I start?" → interest meeting / find a group | Akoben: Orientation Hub → circle assignment → My Circles |
| **Feedback loop** | Survey link for impact measurement | `/feedback` widget + post-session prompts (future) |

#### Saprea curriculum example (structure only)

Saprea's 27 topics follow a progressive healing arc — brain/body trauma → acknowledgement → shame → mindfulness → coping → boundaries → self-compassion → aspiration. Akoben's partner materials may differ in count and topics, but the **navigation pattern** should match:

```
Group Materials
├── Intro panel (purpose + who this is for)
├── For Circle Leaders (scripts, leader guides) — staff/facilitator only
└── Meeting materials (#01 … #NN)
      ├── Title
      ├── Short description (1–2 sentences)
      ├── Optional: read in app / download PDF / audio
      └── Tied to live circle session via Google Meet
```

#### Akoben: two distinct survivor resource areas

| Area | Purpose | Current status | Partner content? |
|------|---------|----------------|------------------|
| **Healing Library** (`/healing-library`) | Narrative stories for private reflection — affirmations, journal prompts | **Built** — 19 stories | No — Akoben-authored |
| **Group Materials** (`/group-materials` — **to build**) | Numbered circle curriculum for group meetings — psychoeducation, exercises, discussion guides | **Not built** | **Yes — from partner org** |
| **Chat `#group-materials`** | Announcements + links to new/updated meeting resources | Not built | Complements the hub page |

**Important distinction for the 29 June meeting:** The Healing Library demonstrates *tone and UX* for survivor content. The partner preview should focus on the **planned Group Materials hub** (Saprea-style) where their curriculum will live.

#### Proposed Group Materials page (wireframe)

```
┌─────────────────────────────────────────────────────────────┐
│  Group Materials                                             │
│  Resources for your Empowerment Circle meetings.             │
│                                                              │
│  [For Circle Leaders only → Staff Portal]                    │
├─────────────────────────────────────────────────────────────┤
│  Your circle is on Meeting #07 — Understanding Dissociation  │
│  Next session: Saturday 6 PM  [Join Meeting]               │
├─────────────────────────────────────────────────────────────┤
│  #01  Trauma's Impact on the Brain and Body        [Open]   │
│  #02  Introducing Acknowledgement                   [Open]   │
│  ...                                                         │
│  #NN  [Partner topic title]                         [Locked] │
├─────────────────────────────────────────────────────────────┤
│  ❓ Where do I start? → Contact your circle leader           │
│  ❓ Can I use these alone? → Best in group; library for solo │
│  ❓ Feedback → Share how circles are helping you             │
└─────────────────────────────────────────────────────────────┘
```

#### Content model (for partner + backend)

Each meeting material record:

| Field | Example |
|-------|---------|
| `meeting_number` | `7` |
| `slug` | `understanding-dissociation` |
| `title` | Understanding Dissociation |
| `summary` | One of the most common ways a survivor's brain and body tries to protect them… |
| `participant_content` | In-app text and/or PDF URL |
| `facilitator_script` | PDF URL (staff-only) |
| `supplementary_assets` | Audio grounding, worksheets |
| `language` | `en` (future: `tw`, `ga`) |
| `unlock_rule` | `after_meeting_N_minus_1` or `leader_unlock` |

#### Build status

| Component | Status |
|-----------|--------|
| `/group-materials` route & UI | **Not built** — **elevated priority** (partner meeting 29 Jun) |
| Numbered meeting cards | Not built |
| Facilitator script downloads (staff portal) | Partial — staff UI exists, no file hosting |
| Link meeting # to My Circles / Google Meet | Not built |
| Partner CMS or admin upload for materials | Not built — needs backend |
| Healing Library (stories) | **Done** |

---

### 4.4 AI-Assisted Circle Assignment (post-orientation)

After orientation completes, the system asks:

- **Preferred meeting times:** weekday evenings · weekday afternoons · weekend afternoons · Saturday evenings · Sunday evenings
- **Preferred language:** English (available now); Twi/Ga future

**AI assignment engine** matches users to Circle A / B / C based on:

- Availability  
- Language  
- Circle size / capacity  
- Facilitator workload  

**Current build status:** **Not built** — no AI engine, no circle assignment, no backend.

---

### 4.5 Internal Chat (replace WhatsApp)

**Client requirement:** Survivor-focused community chat inside the platform (Discord/Slack-style, but safeguarding-controlled).

#### Identity display

| User type | Display in chat |
|-----------|-----------------|
| Anonymous | `AEC-2746` (Circle ID only) |
| Registered | Real name **OR** display name (e.g. "Warrior", "Akosua Journey") |

#### Chat rooms

| Room | Purpose | Visibility |
|------|---------|------------|
| `#orientation` | Orientation Room | New members |
| `#general-support` | General Community | All members |
| `#circle-a` / `#circle-b` / `#circle-c` | Healing Circle Rooms | Assigned circle members |
| `#healing-library` | Links to Healing Library (solo reflection stories) | All members |
| `#group-materials` | Announcements + new meeting resources; links to `/group-materials` hub | All members |
| Facilitator Room | Staff coordination | Staff only (private) |

#### Communication rules (client-mandated)

**Allowed:**
- User ↔ Circle Lead (controlled, logged)
- User ↔ Mental Health Officer (secure, logged)
- Group chat (circle-based only)
- System notifications

**NOT allowed:**
- User-to-user private messaging
- Direct calling between users
- External contact sharing inside platform
- Unmoderated chat threads

**All messages must be:** logged · timestamped · auditable · accessible to admin roles only

**Current build status:** **Not built** — staff portal has a demo internal messaging UI only; no real chat infrastructure.

---

### 4.6 Notifications (Day One requirement)

Users should receive:

| Type | Example |
|------|---------|
| Meeting reminder | "Your Healing Circle begins tomorrow at 6 PM." |
| Session reminder | "Your session starts in 30 minutes." |
| New resource alert | "A new grounding exercise has been added." |
| Support message | "Your facilitator has responded." |

**Channels:** Email · in-app · push notifications (push preferred)

**Current build status:** **Not built**

---

### 4.7 Google Meet Integration

**Phase 1 (launch):** Keep Google Meet; make it feel native inside Akoben.

**User experience — "My Circles":**
```
Circle A
Next Meeting: Saturday 6 PM
[ Join Meeting ]  → opens Google Meet
```

**Phase 2 (future funding):** Jitsi · Daily.co · Zoom SDK · LiveKit (in-platform video)

**Current build status:** `/sessions` page is a **placeholder** only.

---

### 4.8 Other AEC Features

| Feature | Client Phase 1 | Current build status |
|---------|----------------|----------------------|
| Registration | Required | UI exists; no API persistence |
| Anonymous entry | Required | UI + local Circle ID |
| Orientation Hub | Required | Partial (3 steps, wrong content) |
| **Group Materials hub** (Saprea-style) | Required for partner content | **Not built — priority** |
| AI Circle Assignment | Required | Not built |
| Internal Chat Rooms | Required | Not built |
| Healing Library (stories) | Required | **Done** — 19 stories |
| Notifications | Required | Not built |
| Google Meet Integration | Required | Placeholder only |
| Support request / referral forms | Implied | UI exists; **no backend submission** |
| Circle dashboard (`/circle`) | Implied | **Done** — navigation hub |
| Staff portal (MHO, facilitators) | Required | UI prototype with demo login |

---

### 4.9 AEC — Build Checklist by Priority

#### Priority 0 — Partner preview (by 29 June 2026)

- [ ] **Survivor demo path polished** — `/survivors` → entry → `/circle` → `/healing-library` (ready today)
- [ ] **`/group-materials` page shell** — Saprea-style layout with placeholder cards + partner discussion wireframe
- [x] **Talking deck / this document section** — explain two resource areas (Healing Library vs Group Materials)
- [ ] **Confirm meeting count & topic list** with partner — drives numbering and card structure

#### Priority 1 — Launch blockers (AEC)

- [ ] **Backend API** — user registration, anonymous sessions, orientation status, risk flags, referrals
- [ ] **Full Orientation Hub** — 6 steps with client-approved copy (Steps 1–6)
- [ ] **Safeguarding & Risk Check** — routing to facilitator / MHO / crisis / 1:1 / AI assignment
- [ ] **Replace demo staff auth** — real roles: Circle Leader, Moderator, MHO, Administrator
- [ ] **Urgent Support Mode** — MHO-only high-risk pathway with alert + chat/Meet options
- [ ] **Production smoke test** on live domain

#### Priority 2 — Core AEC experience

- [ ] **Group Materials hub — full build** — numbered meetings, partner uploads, facilitator scripts
- [ ] **AI Circle Assignment** — availability + language intake → Circle A/B/C
- [ ] **Internal chat rooms** — with communication rules enforced (no user-to-user DM)
- [ ] **Message audit logging** — timestamped, admin-accessible
- [ ] **Google Meet — My Circles** — schedule display + Join Meeting button
- [ ] **Notification engine** — meeting/session reminders, support responses
- [ ] **Display names** for registered users (real name vs pseudonym)
- [ ] **Real circle schedule** — replace hardcoded June 2026 dates

#### Priority 3 — AEC enhancements

- [ ] Push notifications (mobile)
- [ ] Twi/Ga language routing for circles
- [ ] In-platform video (Phase 2: Jitsi/Daily.co/etc.)
- [ ] AI-assisted triage refinements

---

# PATHWAY 1 — PARENT & COMMUNITY EDUCATION (PCE)

## 5. Client-Approved User Flow

### 5.1 Entry & Registration

**No anonymity** — all users must register.

**Registration fields:**

| Field | Required |
|-------|----------|
| Full name | Yes |
| Email | Yes |
| Phone number | Yes |
| Country | Yes |
| Region | Yes |
| District | Optional |
| Role | Yes — Parent · Teacher · Pastor/Religious Leader · Sunday School Teacher · Community Member · Other |
| Preferred language | Yes — English · American Sign Language · Twi · Ga |

**On profile creation, system enables:**

- User name · role tag · location · language routing · progress tracking · notification profile

**Current build status:** Partial  
- `/onboarding/community` — 3-step flow (role, profile, ready) — missing district, ASL, full role list, language selection  
- No backend user creation

---

### 5.2 Orientation Hub (PCE)

**Client requirement:** Controlled entry with audio option for Twi/Ga speakers.

| Step | Content | Audio button |
|------|---------|--------------|
| 1 | Welcome Message | 🔊 "Listen in your language" (Twi/Ga when selected) |
| 2 | Platform Purpose | Same |
| 3 | Child Protection Mission | Same |
| 4 | User Expectations | Same |
| 5 | Platform Guidelines | Respectful engagement, no misinformation, no promotion, child protection focus |
| 6 | Program Overview | What you learn, why it matters, how training works, formats, certification (future) |
| 7 | Consent Screen | "I Understand and Agree" |

**Current build status:** **Not built** — onboarding goes directly to role/profile; no orientation hub screens.

---

### 5.3 Learning Mode Selection

After orientation, user chooses:

| Mode | Description |
|------|-------------|
| **Self-paced learning** | Modules at own pace (text, audio, video, quizzes) |
| **Facilitated training** | Assigned to Akoben Group 1/2/3 via AI |
| **Hybrid** | Both |

**Facilitated training intake asks:**

- Preferred days: weekdays · Saturday · Sunday  
- Preferred time: morning · afternoon · evening  

**AI assigns to:** Akoben Group 1 · 2 · 3 (4 optional for scaling)

**Current build status:** **Not built**

---

### 5.4 Self-Paced Learning Engine

| Component | Spec | Current build status |
|-----------|------|----------------------|
| Text lessons | Section-based, progressive | Generic placeholder text only |
| Audio lessons | Per module, per language | **1 sample** (Level 1 Module 1); MP3 file still needed |
| Video lessons | Per module | Placeholder player |
| Case studies | In module content | In Module 1 docx; not in app |
| Quizzes / knowledge checks | Gate progress between sections | **Not built** (flags exist in data only) |
| Progress tracking | Per section + module | localStorage only; no server sync |
| Downloadable resources | PDF / Family Gift Box | Button exists; no files |
| Sequential unlocking | Level 1 → 2 → 3 | **Done** (client-side) |

**Curriculum structure (already in code):**

| Level | Audience | Modules |
|-------|----------|---------|
| Level 1 — Basic | Parents, caregivers, community | 8 modules |
| Level 2 — Intermediate | Teachers, faith leaders, PTAs, coaches | 8 modules |
| Level 3 — Advanced | Child protection officers, social workers, NGO staff | 8 modules |

**Total: 24 modules** across 3 levels.

---

### 5.5 Level 1 Module 1 — Content Specification

**Source document:** `AAG_PCE_LEVEL 1 Module 1 TEXT (1).docx` (client-provided)

This is the **template** for how all PCE modules should be built in the app.

#### Module metadata

| Field | Value |
|-------|-------|
| Level | 1 — Basic |
| Module | 1 — Understanding Child Sexual Abuse |
| Study time | 35–45 minutes |
| Format | Read · Reflect · Respond |
| Languages | English (available); Twi & Ga (coming soon) |

#### Module structure (6 sections + 6 knowledge checks)

| Section | Topic |
|---------|-------|
| **Section 1** | What Is Child Sexual Abuse? (definition, key concepts, contact/non-contact/peer abuse cards) |
| **KC 1** | Scenario: non-contact exploitation — correct answer D |
| **Section 2** | Understanding Grooming |
| **KC 2** | Grooming scenario knowledge check |
| **Section 3** | Myths and Harmful Cultural Beliefs in Ghana |
| **KC 3** | Cultural myths knowledge check |
| **Section 4** | Signs a Child May Be Experiencing Abuse |
| **KC 4** | Warning signs knowledge check |
| **Section 5** | Why Children Stay Silent |
| **KC 5** | Silence barriers knowledge check |
| **Section 6** | Safe Initial Responses to Disclosure |
| **KC 6** | Disclosure response knowledge check |

#### Completion deliverables

- **Family Gift Box** — downloadable summary (what we learned, family activity NO-GO-TELL, reflection question, community challenge)
- **Progress bar** updates per section (target: 100% on completion)
- **Module completion screen** — congratulations + unlock next module
- **Downloadable completion image/PDF** (client requests downloadable asset)

**Current build status:** Content exists in docx; **not implemented** in the learning player. App shows generic text template and one audio sample.

---

### 5.6 Facilitated Training — Akoben Groups

| Group | Purpose |
|-------|---------|
| Akoben 1 | Facilitated cohort |
| Akoben 2 | Facilitated cohort |
| Akoben 3 | Facilitated cohort |
| Akoben 4 | Optional scaling |

Each group includes: facilitator assigned · participant list · attendance · live session schedule · training modules assigned

**Current build status:** Staff portal UI prototype only; no real group management.

---

### 5.7 Live Training — Google Meet (PCE)

```
Facilitator schedules session
    → System generates Google Meet link
    → Link attached to Akoben Group
    → Notifications: 24h · 1h · start
    → User clicks "Join Training Session" → Google Meet opens
```

**Current build status:** Placeholder on `/sessions`

---

### 5.8 CSA Reporting Module (Critical — legal + impact layer)

**Flow:**

1. Awareness prompt: *"Do you know of a child at risk?"* → YES / NO  
2. If YES → **Education flow** (Children's Act 1998, mandatory reporting, what counts as abuse, when to report)  
3. **Action screen** — Police/DOVVSU · Social Welfare · Orange Support Line · emergency guidance  
4. If user continues → **Report submission** (type, location, optional description)  
5. **System routing** — admin dashboard · safeguarding team notification · compliance log  

**Current build status:** `/referral` and `/safety` pages exist with hotline info; **no structured CSA reporting module** as specified.

---

### 5.9 PCE Communication Rules

| Rule | Status |
|------|--------|
| No user-to-user private messaging | To be enforced in backend |
| Group-based communication only | Not built |
| Facilitator messaging allowed | Staff UI prototype only |
| Admin messaging allowed | Staff UI prototype only |
| All messages logged | Not built |

---

### 5.10 PCE Admin Dashboard

| Metric | Purpose |
|--------|---------|
| Total users | Reach |
| Active learners | Engagement |
| Completion rates | Learning impact |
| Attendance rates | Facilitated groups |
| Group performance (Akoben 1–3) | Operations |
| Role distribution | Audience mix |
| Geographic distribution | Regional reach |
| Reporting activity (CSA module) | Safeguarding compliance |

**Current build status:** Staff portal has demo dashboards; no live data.

---

### 5.11 PCE Design Principles (client-mandated)

- **NO** anonymity  
- **NO** mental health triage system  
- **NO** peer-to-peer chat  
- **STRUCTURED** learning only  
- **CONTROLLED** group training only  
- **EDUCATION + REPORTING** focused  

---

### 5.12 PCE — Build Checklist by Priority

#### Priority 1 — Launch blockers (PCE)

- [ ] **Backend API** — registration, profiles, progress sync, orientation status
- [ ] **PCE Orientation Hub** — 7 screens with client copy + audio for Twi/Ga
- [ ] **Implement Level 1 Module 1** from docx (6 sections, 6 knowledge checks, Family Gift Box)
- [ ] **Upload Module 1 audio** (`level1-module1.mp3`)
- [ ] **Learning mode selection** — self-paced / facilitated / hybrid
- [ ] **Client legal review** of consent and CSA reporting copy

#### Priority 2 — Core PCE experience

- [ ] **Remaining Level 1 modules** (2–8) — content + audio/video + quizzes
- [ ] **Facilitated training** — Akoben Groups 1–3 + AI assignment + facilitator notifications
- [ ] **Google Meet integration** for training sessions
- [ ] **CSA Reporting Module** — full education + action + submission + admin routing
- [ ] **Notification engine** — training reminders, module alerts, progress updates
- [ ] **Downloadable PDFs** — Family Gift Box and module summaries
- [ ] **Certificate of completion** (future feature — scaffold when ready)

#### Priority 3 — PCE scale

- [ ] Levels 2 & 3 full content (16 modules)
- [ ] Twi & Ga lesson content (audio + text)
- [ ] American Sign Language support
- [ ] Admin analytics dashboard with live data

---

# SHARED INFRASTRUCTURE

## 6. What Is Already Built (Both Pathways)

These items are **complete or substantially complete** in the current frontend:

### Platform shell
- [x] Home page with dual pathway entry
- [x] 35+ routes (about, programs, contact, safety, resources, vision, impact, etc.)
- [x] Mobile-first, trauma-informed UI (Tailwind + shadcn)
- [x] Site header, footer, safety banners, emotional safety notices
- [x] GitHub Actions FTPS deployment pipeline
- [x] SPA/static hosting (`index.html`, `.htaccess`)
- [x] Sitemap, SEO meta tags per route
- [x] UI i18n foundation (EN, Twi, Ga, Ewe for navigation)
- [x] Country selector (Ghana enabled)

### Pathway 1 (PCE) — structure
- [x] 24-module curriculum data model (3 levels × 8 modules)
- [x] Learning Center navigation (levels → modules → lesson player)
- [x] Sequential module locking
- [x] Progress tracking (localStorage)
- [x] Video / Audio / Text format selector UI
- [x] Course language switcher (English live; Twi/Ga UI prepared)
- [x] Twi & Ga metadata translations for level/module titles
- [x] Community onboarding UI (partial fields)
- [x] Parents, teachers landing pages

### Pathway 2 (AEC) — structure
- [x] Survivor welcome page
- [x] Basic survivor onboarding (3 steps)
- [x] Anonymous Circle ID generation (`AEC-XXXX`)
- [x] Circle dashboard (`/circle`)
- [x] Healing Library — **19 reflection stories** (solo use; separate from Group Materials)
- [ ] Group Materials hub (`/group-materials`) — **not built** (partner curriculum goes here)
- [x] Empowerment circle booking UI
- [x] Support request & referral forms (UI)
- [x] Consent information page

### Staff & operations (UI prototype)
- [x] Staff portal with PCE/AEC workspaces and role switching
- [x] Demo staff accounts (shared password — **must be replaced**)
- [x] Facilitator session reporting forms
- [x] Internal staff messaging UI (demo)

---

## 7. What Requires Backend (Both Pathways)

The CI pipeline configures `VITE_API_URL=https://api.akoben.org/api`, but **the frontend does not yet call the API**. All of the following need backend endpoints:

| Domain | Endpoints needed |
|--------|------------------|
| **Auth** | Staff login, session tokens, role-based access |
| **Users** | PCE registration, AEC registration, anonymous sessions, display names |
| **Orientation** | Step completion, `orientation_status`, consent timestamps |
| **Safeguarding** | Risk check flags, MHO alerts, crisis escalation, 1:1 intake queue |
| **Circles / Groups** | Circle A/B/C and Akoben 1–3 membership, capacity, assignment |
| **Chat** | Rooms, messages, audit logs, moderation |
| **Learning** | Progress sync, quiz scores, section completion, certificates |
| **Referrals & reports** | Referral form, support request, CSA report submission |
| **Notifications** | Email, in-app, push registration and delivery |
| **Meetings** | Google Meet link storage, schedule, reminders |
| **Admin** | Dashboards, analytics, compliance logs |

---

## 8. Recommended Build Sequence

### Phase 1 — Foundation (weeks 1–3)

**Goal:** Make the platform a real service, not a prototype.

1. Backend API scaffolding + database schema (users, orientation, progress, messages, circles/groups)
2. Wire existing forms to API (referral, support request, registrations)
3. Replace demo staff authentication
4. PCE Orientation Hub (7 steps) + AEC Orientation Hub (6 steps) with client copy
5. AEC Safeguarding & Risk Check with routing flags
6. Production deployment verification

**Client can demo:** Full onboarding flows; forms reach staff; orientation gates access.

---

### Phase 2 — Pathway 2 core (weeks 4–7)

**Goal:** Empowerment Circles feel like a professional survivor platform.

1. **Group Materials hub** — Saprea-style numbered curriculum; partner content ingestion; facilitator script downloads
2. AI Circle Assignment (availability + language → Circle A/B/C)
3. Internal chat rooms with communication rules (`#group-materials` links to hub)
4. Google Meet — "My Circles" with Join Meeting
5. Notification engine (email + in-app minimum)
6. MHO urgent support mode
7. Real circle schedules

**Client can launch:** Soft AEC release with English circles + partner materials.

---

### Phase 3 — Pathway 1 core (weeks 6–10, overlaps Phase 2)

**Goal:** First complete learning pathway for community educators.

1. **Level 1 Module 1** — full implementation from docx (sections, knowledge checks, Family Gift Box)
2. Module 1 audio upload + player
3. Learning mode selection (self-paced / facilitated / hybrid)
4. Remaining Level 1 modules (2–8) as client delivers content
5. Facilitated training — Akoben Groups + assignment
6. Google Meet for training sessions
7. CSA Reporting Module

**Client can launch:** PCE Level 1 self-paced in English.

---

### Phase 4 — Scale & localize (weeks 11+)

1. Twi & Ga content (PCE modules + AEC orientation audio)
2. Levels 2 & 3 PCE content
3. Push notifications
4. Admin analytics dashboards
5. Certificates
6. In-platform video (Phase 2 funding)

---

## 9. Why This Build Order

| Order | Rationale |
|-------|-----------|
| **Group Materials hub early (Phase 2)** | Partner is supplying curriculum; Saprea-style structure agreed as reference; unlocks content organization before chat/backend scale |
| **Backend + orientation first** | Without API and orientation gates, users skip safeguarding steps and data is lost |
| **AEC chat + circles before PCE groups** | Client prioritises replacing WhatsApp with in-app community for survivors |
| **Module 1 before Modules 2–8** | Docx provides complete spec; validates learning player before scaling content |
| **Google Meet before native video** | Free, stable, familiar — client-approved for launch |
| **English before Twi/Ga lessons** | Content team can review tone and safeguarding before translation |
| **CSA reporting after Module 1** | Requires legal review; depends on admin dashboard being live |

---

## 10. Client Deliverables Needed

| Deliverable | Unblocks |
|-------------|----------|
| **Empowerment Circle curriculum** (meeting count, titles, summaries, scripts) | Group Materials hub — from resource partner |
| **Facilitator scripts** per meeting (PDF or docx) | Leader downloads in staff portal |
| API specification / endpoint documentation | All backend work |
| Approved final copy for AEC Orientation Hub (Steps 1–6) | AEC onboarding build |
| Approved final copy for PCE Orientation Hub (7 screens) | PCE onboarding build |
| `level1-module1.mp3` and remaining module audio | Audio lessons |
| Level 1 Modules 2–8 content (docx format like Module 1) | PCE content rollout |
| Family Gift Box downloadable image/PDF (Module 1) | Module completion assets |
| Real circle & training schedules | Booking and Meet integration |
| Staff roster + authentication method | Staff portal go-live |
| Legal review: consent, CSA reporting, emergency copy | Public launch |
| Twi/Ga translations (or translation vendor) | Localization |
| Google Workspace / Meet API credentials | Meet link generation |

---

## 11. Gap Summary — One Page for Client

| Area | Built today | Client spec | Gap |
|------|-------------|-------------|-----|
| **Site shell & pages** | ~90% | Entry + marketing | Minor content updates |
| **AEC Orientation Hub** | ~15% | 6-step gated flow | **Major build** |
| **AEC Risk check & routing** | 0% | 5-option triage + MHO | **Major build** |
| **AEC Chat** | 0% | Room-based, audited | **Major build** |
| **AEC Circle assignment** | 0% | AI-assisted | **Major build** |
| **Healing Library** | ~95% | Solo reflection stories | Complete; distinct from Group Materials |
| **Group Materials hub** | 0% | Saprea-style numbered circle curriculum | **Major build — partner content** |
| **PCE Orientation Hub** | 0% | 7-step + audio | **Major build** |
| **PCE Module 1 content** | ~10% | Full docx spec | **Major build** |
| **PCE Learning modes** | 0% | Self / facilitated / hybrid | **Major build** |
| **CSA Reporting Module** | ~20% | Full education + submit flow | **Major build** |
| **Google Meet** | ~5% | Both pathways | **Major build** |
| **Notifications** | 0% | Email + in-app + push | **Major build** |
| **Backend / API** | 0% | All persistence | **Critical blocker** |
| **Staff portal** | ~40% UI | Live workflows | Backend + auth |

---

## 12. Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 27 Jun 2026 | Partner meeting milestone (29 Jun); Saprea Group Materials reference; Group Materials hub spec; Healing Library vs curriculum distinction |
| 1.0 | 27 Jun 2026 | Initial plan from client Pathway 2 spec, Pathway 1 architecture, Module 1 docx, and codebase audit |

---

*This document should be updated as each phase completes and as the client delivers additional content (Pathway 1 orientation copy refinements, Modules 2–8, audio/video assets).*
