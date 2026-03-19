# Climbing Tracker
Personal React app to log indoor sessions (grades, dates), track progress. Built to master hooks while serving my gym routine.

## Status
🚧 In Progress (March 2026) – MVP target: 1 week.

## File Structure
src/
├── components/
│ ├── AddSession.jsx # Form inputs
│ ├── SessionList.jsx # Badge display
│ └── Stats.jsx # Later
├── App.jsx # State hub
├── index.css # Tailwind
└── main.jsx

## Features Plan
| Step | Feature | Status |
|------|---------|--------|
| 1 | useState sessions array | ✅ Done |
| 2 | AddSession form |  | ✅ Done | |
| 3 | localStorage persist | ⏳ |
| 4 | Grade colors (gym board) | | ✅ Done | |
| 5 | Stats (total climbs) | ⏳ |
| 6 | Vercel deploy | ⏳ |

## Local Setup
```bash
npm i # npm install
npm run dev -- --host
