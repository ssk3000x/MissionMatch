# VolunteerConnect: Tactical Command Center

## Project Overview
**VolunteerConnect** is a high-end, mission-driven platform designed to automate and streamline the process of finding and contacting volunteer opportunities. The application leverages a "Tactical" aesthetic to empower users, framing volunteerism as a series of critical "missions" supported by autonomous AI agents.

## Core Philosophical Concept: "The Tactical Agent"
Unlike traditional job boards, VolunteerConnect treats the user as a commander. The user defines the **Location** and the **Mission**, and the system provides the **Intelligence** and **Deployment** capabilities.
- **Intelligence**: Scanning local databases and community websites to find matches.
- **Deployment**: Dispatching AI agents to handle the initial phone contact with organizations, reducing the friction of manual outreach.

---

## Application Architecture

### Frontend Stack
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Runtime**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with a custom Dark Mode design system.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid step transitions and state-based UI changes.
- **UI Components**: Built on [Radix UI](https://www.radix-ui.com/) primitives for accessibility and reliability.
- **Icons**: [Lucide React](https://lucide.dev/).

---

## User Journey & Functional Steps

### 1. Operation Parameters (Intake)
- **Location Step**: Captures the geographic focus of the search.
- **Mission Step**: Captures the user's specific goals (e.g., "Helping at-risk youth with mathematics").

### 2. Discovery Engine (Simulated Search)
The `DiscoveryScreen` component provides a high-fidelity visual experience of the AI "scanning" for opportunities. It simulates:
- Searching local databases.
- Scanning community websites.
- Finding matching organizations.

### 3. Tactical Overview (Results)
The `ResultsView` displays matching organizations using a card-based layout. Each card represents an entity that can be "actioned."
- **Organization Cards**: Display description, address, and categories (tags).
- **Deployment Interface**: Allows the user to "Deploy AI Agent" immediately or schedule a call for later.

### 4. Agent Execution (Calling State)
When an agent is deployed, the UI enters a "Calling" state via the `OrganizationCard`:
- **Progress Tracking**: A visual progress bar indicates the AI agent is actively on the call.
- **Post-Call Intelligence**: Once complete, the agent generates "Notes" including a summary of the conversation, contact names, and next steps.

### 5. Intelligence Dashboard (Notes)
Located at `/notes`, this view provides a centralized log of all agent activities:
- **Status Filtering**: Filter by Interested, Callback Scheduled, Pending, or Not Available.
- **Transcript Summaries**: Quick-read insights from the AI agent's conversations.

---

## Data Structures

### Organization (`components/organization-card.tsx`)
```typescript
interface Organization {
  id: string;
  name: string;
  description: string;
  address: string;
  categories: string[];
  status: "ready" | "calling" | "completed" | "scheduled";
  scheduledTime?: string;
  callNotes?: {
    summary: string;
    contactName?: string;
    nextSteps?: string[];
    availability?: string;
  };
}
```

### Note Entity (`app/notes/page.tsx`)
```typescript
interface OrgNote {
  id: string;
  orgName: string;
  status: "interested" | "not_available" | "callback" | "pending";
  contactName?: string;
  availability?: string;
  notes?: string;
  callbackDate?: string;
  calledAt: string;
}
```

---

## Design System & Aesthetics
The project uses a **Sleek Dark Design System** defined in `globals.css`:
- **Primary Color**: Soft Blue (`#3B82F6`)
- **Secondary Color**: Success Green (`#22C55E`)
- **Background**: Deep Zinc/Black (`#09090B`)
- **Key UI Feature**: `GlowingEffect` — a custom component that adds proximity-based neon glow to cards and active elements, reinforcing the "Tactical" theme.

---

## Future Roadmap & Agentic Features
- **Real-time Voice Integration**: Replace the simulated calling state with actual VAPI or Retell AI integration.
- **Multi-Agent Orchestration**: Deploying multiple agents to different categories of organizations simultaneously.
- **Auto-Application**: Autonomous filing of volunteer application forms using browser-based agents.
