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
# VolunteerConnect: Tactical Command Center (current)

## Overview
VolunteerConnect treats volunteer search as a mission: the user provides a Location and a Mission prompt, an LLM refines that prompt, and a backend agent discovers and persists matching organizations. The frontend presents intake, discovery visuals, and results; the backend performs the heavy lifting (search, normalization, optional persistence).

## Architecture (now)

Frontend
- Next.js (App Router) + React 19. UI components live in `components/` and pages in `app/`.
- UX flow: `LocationStep` → `MissionStep` → `DiscoveryScreen` → `ResultsView` → `OrganizationCard`.
- Current behavior: mission text is captured in `MissionStep` and passed to the parent (`app/page.tsx`). Discovery and call flows are currently simulated client-side using `mockOrganizations` and timeouts.

Backend (new)
- A minimal Express + TypeScript service was added under `/backend`.
- Key endpoints implemented:
  - `GET /api/organizations/search?lat=&lng=&radius=&mission=` — queries Google Places (Nearby Search + Place Details), deduplicates, and returns normalized Organization objects.
  - `POST /api/agents/refine` — debug endpoint that accepts `{ mission, location }`, logs and echoes it. Intended to be replaced/extended to call the Claude/LLM orchestration (LangChain) server-side.
- Google Places integration in `backend/src/places.ts`. API key read from `backend/.env`.

Storage & persistence
- Currently the backend is stateless and returns results directly. The plan is to persist discovered organizations to Supabase (Service Role key in backend env) and to read them from the DB for the `ResultsView`/notes dashboard.

Security
- API keys are kept server-side in `backend/.env` and `.gitignore` updated to ignore `.env` files.

## Data shapes (frontend expectations)

Organization (normalized)
```ts
{
  id: string; // place_id or external id
  name: string;
  description?: string;
  address?: string;
  categories: string[];
  status: "ready" | "calling" | "completed" | "scheduled";
  scheduledTime?: string | null;
  callNotes?: { summary: string; contactName?: string; nextSteps?: string[]; availability?: string } | null;
  phone?: string | null;
  rating?: number | null;
  raw?: any;
}
```

OrgNote (notes dashboard)
```ts
{
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

## Current agent/workflow direction

1. Frontend captures `location` and `mission`.
2. Frontend calls backend `POST /api/agents/refine` (or parent does it) with `{ mission, location }`. The refine endpoint will eventually call Claude/LangChain server-side to:
   - produce a refined search query,
   - optionally call internal tools (geocode, search, ranking),
   - and request persistence to Supabase.
3. Backend executes heavy searches (Places/Yelp/OSM), normalizes results, and persists to Supabase (future step). It returns `Organization[]` to the frontend.
4. Frontend receives organizations and shows them in `ResultsView` using `OrganizationCard`.
5. Calling/voice agent is deferred to a later phase — currently `OrganizationCard` simulates calls and call notes client-side.

## Backend dev notes
- Location: `backend/src`
- Important files:
  - `index.ts` — Express entry, routes added (`/api/organizations/search`, `/api/agents/refine`).
  - `tools/tavily.ts` — Tavily search and result normalization.
  - `tools/tavilyTool.ts` — LangChain `DynamicTool` wrapper around `TavilySearch` for agent use.
  - `.env` — store `TAVILY_API_KEY`, `CLAUDE_API_KEY` (if used for server-side), `SUPABASE_SERVICE_ROLE_KEY` (for persistence).
- Run dev server:
  - `cd backend && npm install && npm run dev` (nodemon + ts-node). Frontend runs separately with `npm run dev` from repo root.

## Short-term priorities (hackathon)
- Implement server-side refine: ensure `POST /api/agents/refine` uses Claude/LangChain to produce refined queries and directly call Tavily (backend should orchestrate both refinement and search).
- Wire `MissionStep`/parent to POST mission+location to `POST /api/agents/refine` and display returned `searchResults` (replace current client-side simulation).
- Persist discovery results to Supabase and return persisted rows to the frontend so `ResultsView` and `/notes` read real data.
- Add light caching/TTL in backend to reduce Tavily API quota hits.
- Resolve redundancy: decide whether to call `TavilySearch` directly in handlers or to invoke the LangChain agent (`tavilyTool`). Prefer a single server-side orchestration path.

## Mid / long term (post-hackathon)
- Replace discovery simulation with background workers for large crawls and phone-call orchestration with an isolated service for telephony.
- Implement multi-agent orchestration and a job queue (Redis + Bull/Queue).
- Add real-time status updates for calls (websockets or polling) and integrate voice services when ready.

## Where to look in the repo
- Frontend entry & flow: `app/page.tsx` and `app/notes/page.tsx`.
- UI components: `components/*.tsx` (notably `mission-step.tsx`, `discovery-screen.tsx`, `organization-card.tsx`, `results-view.tsx`).
- Backend: `backend/src/index.ts`, `backend/src/places.ts`.
- Styles & theme: `app/globals.css`, `styles/globals.css`.

---

If you want I can now:
- Patch `MissionStep` to POST refine requests and show loading state, or
- Implement server-side Claude (LangChain) scaffold in the backend and wire it to `/api/agents/refine`.
Which should I do next?
