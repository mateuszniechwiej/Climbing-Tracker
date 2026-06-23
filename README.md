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

## Testing & Linting
Run unit tests with Vitest:
```bash
npm test
```
Open the Vitest UI for an interactive test runner:
```bash
npm run test:ui
```
Run test coverage:
```bash
npm run test:coverage
```
Run ESLint across the source files:
```bash
npm run lint
```

## Playwright E2E
End-to-end tests are defined under `tests/e2e` and use `playwright.config.js`.

Install browser dependencies once:
```bash
npx playwright install --with-deps
```
Run the full Playwright suite:
```bash
npx playwright test
```

## CI workflows
There are two GitHub Actions workflows:
- `.github/workflows/ci.yml`: runs lint and unit tests using `npm test -- --run`
- `.github/workflows/playwright.yml`: runs Playwright E2E tests with browser installation and uploads the `playwright-report/` artifact

## Deployment
github - 
```bash 
npm run deploy

```
vercel - 
```bash
vercel --prod
```
![CI](https://github.com/mateuszniechwiej/Climbing-Tracker/actions/workflows/ci.yml/badge.svg)

## Attribution
Climbing icon by [Freepik](https://www.flaticon.com/free-icons/climbing) from [Flaticon](https://www.flaticon.com/).