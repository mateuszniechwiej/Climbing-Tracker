# Climbing Tracker
Personal React app to log indoor sessions (grades, dates), track progress. Built to master hooks while serving my gym routine.

## Status
✅ Deployed (March 2026)

## Deployment
- **Vercel**: https://climbing-tracker-red.vercel.app/
- **GitHub Repository**: https://github.com/mateuszniechwiej/Climbing-Tracker

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
| 2 | AddSession form | ✅ Done |
| 3 | IndexedDB persist (cache-proof) | ✅ Done |
| 4 | Grade colors (gym board) | ✅ Done |
| 5 | Stats (total climbs) | ✅ Done |
| 6 | Vercel deploy | ✅ Done |
| 7 | Delete session button | ✅ Done |
| 8 | CSV export and import| ✅ Done |
| 9 | Edit sessions | ✅ Done |

## Local Setup
```bash
npm i # npm install
npm run dev -- --host
```

## Deployment
github - 
```bash 
npm run deploy

```
vercel - 
```bash
vercel --prod
