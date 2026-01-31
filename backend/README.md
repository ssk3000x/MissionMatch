# volunteerconnect-backend

Minimal Express TypeScript backend for VolunteerConnect (hackathon scaffold).

Quick start

1. Copy `.env.example` to `.env` and set `GOOGLE_PLACES_API_KEY`.

2. Install and run in dev mode:

```bash
cd backend
npm install
npm run dev
```

The server will start on `http://localhost:4000` by default and exposes:

- `GET /api/organizations/search?lat=<lat>&lng=<lng>&radius=<meters>&mission=<text>`

Notes
- This is a simple scaffold intended for hackathon speed. Move to Next.js route handlers or a monorepo service if you prefer.
