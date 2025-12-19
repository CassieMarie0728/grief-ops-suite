# Grief Ops Suite 🖤🔥

**A mobile-first, offline-first grief survival command center.**

This is not a pastel “self-care” app. This is **operational support** for grief brain:
- **Panic-safe** flows (Night Watch)
- **Shift-based function** (Foreman)
- **One-tap mode deployment** (Ops Selector)
- **Privacy-first** data handling (local SQLite as source of truth)
- **Cache-first content** from `cassandracrossno.com` (WordPress REST)

## MVP scope
- Ops Selector (home)
- Night Watch (spiral containment)
- Foreman (clock in/out, survivable work orders)
- Road Captain (visible but locked in v1)

## Tech stack
- React Native (Expo) + TypeScript
- SQLite + AsyncStorage
- WordPress REST API (cache-first)

## Quick start
```bash
npm install
npm run start
```

## Repo rules (non-negotiables)
- Core flows must work offline.
- Panic access is always available.
- No shame UX.
- Modes are isolated: features don’t spaghetti-import each other.

Built to keep people upright through the worst hours.
