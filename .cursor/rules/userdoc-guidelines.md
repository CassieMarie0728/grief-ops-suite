#  Project Guidelines

These are the project-specific guidelines for this codebase. They provide standards conventions, and best practices that should be followed when working on this project.

## Project Structure
This guideline defines the standard directory and file structure for the Grief Ops Suite codebase. Adhering to this structure ensures that developers can easily navigate, understand, and extend the project, reduces bugs, and supports best practices for offline-first design, mobile-native execution, and modular Ops Modes.

**Overview and Purpose**

⁍ Establish a predictable, logical directory and file organization pattern tailored for mobile-first React Native development in TypeScript
⁍ Enforce clear separation of concerns between UI, application logic, data storage, and integrations
⁍ Optimize modularization for Ops Modes (Night Watch, Foreman, Drill Sergeant, Pit Boss, Road Captain) while preventing cross-mode coupling
⁍ Facilitate testing, maintenance, offline operation, brand consistency, and future extensibility (e.g., optional backend services or subscriptions)

**Root Directory Layout**
⁍ Organize code with clear top-level folders for src, assets, configuration, and tooling

| Directory/File | Contents | Notes |
|---|---|---|
| /src/ | All source code, organized by layer and feature | Core application logic lives here |
| /assets/ | Images, fonts, icons, splash assets | All non-code files bundled with the app |
| /config/ | Static configuration files (TypeScript, ESLint, Prettier) | Never store secrets here |
| /scripts/ | Utility scripts for build, tooling, or deployment | Node scripts, CLI utilities |
| App.tsx | Application entry point (Expo / React Native) | Initializes providers and navigation |
| package.json, tsconfig.json, etc. | Project metadata and configuration | Build, type checking, dependencies |

**/src Directory Structure**
⁍ Follow a feature-first, layer-aware separation model to maximize clarity and scalability

| Directory | Purpose & Typical Files | Best Practices |
|---|---|---|
| /src/components/ | Reusable UI primitives (Button, Modal, Text, Card) | Stateless where possible; low cognitive load |
| /src/features/ | One sub-folder per Ops Mode (NightWatch, Foreman, DrillSergeant, PitBoss, RoadCaptain) | Encapsulate Mode logic; no cross-mode imports |
| /src/navigation/ | Navigation containers, stacks, route guards | Centralize panic/safety routing here |
| /src/store/ | App-level global state (session, preferences) | Local-only state; no network dependency |
| /src/data/ | SQLite access layer, schemas, migrations, caching | Parameterized queries only |
| /src/services/ | External integrations (WordPress API, analytics adapters) | Non-blocking; fail gracefully |
| /src/utils/ | Pure helper functions and shared logic | No side effects |
| /src/theme/ | Color palette, typography, spacing tokens | Single source of truth for styling |
| /src/hooks/ | Shared React hooks (connectivity, reduced motion) | Reusable across features |
| /src/\_\_tests\_\_/ | Unit and integration tests | Mirrors /src structure |

**Component / Feature Structure Example**
⁍ Each Ops Mode under /src/features/<ModeName>/ typically contains:

⟶ <ModeName>Screen.tsx ⟶ Primary entry view

⟶ /components/ ⟶ Mode-specific UI

⟶ /hooks/ ⟶ Local hooks

⟶ /logic/ ⟶ Mode orchestration and rules

⟶ Mode.types.ts ⟶ Local types and enums

⟶ Test files colocated with logic or in /\_\_tests\_\_/

**File Naming and Placement**
⁍ Use PascalCase for React components (e.g., NightWatchScreen.tsx)
⁍ Use camelCase for internal functions and helpers
⁍ Use UPPER\_SNAKE\_CASE for constants
⁍ One React component per file
⁍ Types and enums live near their usage unless shared globally
⁍ Avoid index files except for explicit barrel exports

**Positive Examples**

⁍ **App structure**

⟶ /src/features/PitBoss/PitBossScreen.tsx

⟶ /src/features/PitBoss/components/ScriptList.tsx

⟶ /src/components/Button.tsx

⁍ **Configuration**

⟶ /config/eslint.config.js

⟶ /config/prettier.config.js

**Negative Examples**

⁍ Mixing UI logic and data access in a single file
⁍ Placing screens directly under /src/screens/ instead of feature folders
⁍ Dumping unrelated helpers into /src/utils/
⁍ Duplicating components for small variations instead of using props
⁍ Using spaces or special characters in filenames

**Common Mistakes to Avoid**
⁍ Loading business logic directly in App.tsx
⁍ Circular dependencies between feature folders
⁍ Storing secrets or API keys in the repository
⁍ Deeply nesting navigation logic across multiple folders
⁍ Designing critical flows that depend on network availability

**Tools & Processes**
⁍ Enforce linting and formatting via /config/
⁍ Use TypeScript path aliases to reduce deep relative imports
⁍ Automate scaffolding for new Ops Modes to maintain consistency
⁍ Apply static analysis rules to prevent accidental network dependency in critical flows

**Security Best Practices**
⁍ Never store secrets, API keys, or personal data in public folders
⁍ Review all /src/services/ and /src/data/ code for safe content ingestion and cache invalidation
⁍ Treat all free-text user input as sensitive by default

**Additional Resources**
⁍ React Native Architecture Overview
⁍ Feature-Sliced Design for Large React Apps
⁍ Expo Documentation
⁍ TypeScript Best Practices

## Frontend Guidelines
This document outlines comprehensive frontend best practices for Grief Ops Suite, a mobile-first React Native (Expo) application built with TypeScript and custom low-cognitive-load UI components. These guidelines exist to ensure consistency, usability, accessibility, and resilience across all Ops Modes and screens — especially during crisis and low-bandwidth scenarios.

**Overview and Purpose**

The purpose of these guidelines is to:

⁍ Enforce a consistent and accessible user experience across all Ops Modes and screens
⁍ Promote maintainable, readable, and well-structured code for all TypeScript and React Native components
⁍ Support offline-first, independent operation (no hard dependency on backend or network)
⁍ Safeguard user privacy and emotional safety
⁍ Facilitate rapid response to crisis scenarios with minimal friction

**Naming Conventions**

Follow strict naming conventions for all code artifacts to maximize clarity and reduce cognitive burden for future development and debugging.

⁍ **Components**
⟶ Use PascalCase
⟶ *Example*: NightWatchScreen, PitBossScriptList

⁍ **Functions and Hooks**
⟶ Use camelCase
⟶ *Example*: useShiftTimer, handleModeSelect

⁍ **Files**
⟶ Match exported default component names
⟶ *Example*: NightWatchScreen.tsx

⁍ **Variables**
⟶ Use descriptive, intention-revealing names
⟶ Avoid abbreviations or single-letter names except for conventional loops

⁍ **Constants**
⟶ Use UPPER\_SNAKE\_CASE
⟶ *Example*: MAX\_SESSION\_LENGTH

⁍ **State**
⟶ Prefer isXxx, hasXxx, shouldXxx for booleans
⟶ *Example*: isShiftActive, hasOfflineAccess

**Positive Example:** const isNightMode = useNightMode();

**Negative Example:** const nm = useNightMode();

**Code Structure**

Organize code for scalability, modularity, and performance with clear folder boundaries.

⁍ **Components**
⟶ Use PascalCase
⟶ *Example*: NightWatchScreen, PitBossScriptList

⁍ **Functions and Hooks**
⟶ Use camelCase
⟶ *Example*: useShiftTimer, handleModeSelect

⁍ **Files**
⟶ Match exported default component names
⟶ *Example*: NightWatchScreen.tsx

⁍ **Variables**
⟶ Use descriptive, intention-revealing names
⟶ Avoid abbreviations or single-letter names except for conventional loops

⁍ **Constants**
⟶ Use UPPER\_SNAKE\_CASE
⟶ *Example*: MAX\_SESSION\_LENGTH

⁍ **State**
⟶ Prefer isXxx, hasXxx, shouldXxx for booleans
⟶ *Example*: isShiftActive, hasOfflineAccess

**Additional rules:**

⁍ Organize code for scalability, modularity, and performance with clear folder boundaries

⁍ Group code by feature / Ops Mode
⟶ *Example*: /src/features/nightwatch/, /src/features/foreman/

⁍ Store shared UI primitives in /src/components/

⁍ Store shared hooks in /src/hooks/

⁍ Keep styles adjacent to components using StyleSheet or theme tokens

**Documentation**

⁍ Document all components, functions, and complex logic with clear and concise comments.

⁍ Use JSDoc/TSDoc for exported functions and props
⟶ Describe purpose
⟶ Describe inputs
⟶ Describe outputs
⟶ Describe side effects

⁍ Write reasoning for architectural decisions in:
⟶ README
⟶ Feature directory notes

⁍ Explicitly document:
⟶ reduced-stimulation logic
⟶ accessibility decisions
⟶ safety guardrails

⁍ Inline comments should explain **why**, not restate **what**

⁍ **Positive Example:**

// Activates panic mode for severe episode; reason passed string describing trigger

source

function activatePanicMode(reason: string): void {

...

}

⁍ **Negative Example:**

// Panic mode

**Testing Practices**

Testing is essential to prevent regressions and guarantee crisis-flow reliability.

⁍ Write unit tests for:
⟶ utilities
⟶ hooks
⟶ reducers

⁍ Write **UI tests** using @testing-library/react-native for:
⟶ rendering
⟶ interactions

⁍ Test critical flows:
⟶ Ops Mode switching
⟶ Panic routing
⟶ Shift timers
⟶ Session recovery

⁍ Test **offline behavior**:
⟶ simulate loss of network
⟶ ensure local-only flows function correctly

⁍ Accessibility testing must include:
⟶ text scaling
⟶ reduced animation
⟶ low-light visibility

⁍ Coverage expectations:
⟶ Critical paths: **95%+**
⟶ Overall: **80%+**

**Error Handling**

Graceful error handling is mandatory in a crisis-support mobile app.

⁍ Use try/catch for all AsyncStorage and SQLite operations

⁍ Never throw errors directly to the UI

⁍ Always fall back to a safe default state

⁍ Provide actionable, non-technical error messages
⟶ *Example*: “Something went wrong. You’re not stuck.”

⁍ Log errors to local logs for troubleshooting (not backend)

**Rules:**

⁍ Never block the UI on integration failures

⁍ Never crash due to external service outages

⁍ Never fail critical flows due to WordPress or analytics errors

⁍ **Positive Example:**

try {

await AsyncStorage.setItem('mode', mode);

} catch (e) {

setUiState('fallback');

logLocalError(e);

}

⁍ **Negative Example:**

AsyncStorage.setItem('mode', mode);

**Accessibility & Usability**

Accessibility is critical for users in distress.

⁍ Support:
⟶ reduced motion
⟶ low-stimulation mode
⟶ dynamic text sizing

⁍ Text must be:
⟶ high contrast
⟶ brand-approved typography

⁍ Color palette must support color-blind safe combinations

⁍ Label all interactive elements for screen readers

⁍ Avoid rapid flashes, heavy animation, or aggressive transitions

⁍ Test compliance with **WCAG AA** standards

**Security Best Practices**

Protect user privacy at all times.

⁍ Never store sensitive information in AsyncStorage

⁍ Use SQLite with device-level encryption where possible

⁍ Never log user-entered free-text locally or remotely

⁍ Validate all content ingested from REST APIs

⁍ Handle tokens securely; never hardcode secrets

**Common Mistakes to Avoid**

⁍ Mixing presentation and business logic in components

⁍ Failing to handle offline states gracefully

⁍ Hardcoding strings or colors instead of using constants/themes

⁍ Skipping accessibility labeling

⁍ Assuming network availability for core functionality

**Tools and Processes**

⁍ ESLint with custom rules for low-cognitive-load UI

⁍ Prettier for formatting consistency

⁍ Pre-commit hooks for lint and test

⁍ Regular accessibility audits

⁍ Performance profiling for mobile
⟶ lazy load heavy assets

**References & Resources**

⁍ React Native Docs
⁍ Expo Documentation
⁍ TypeScript Handbook
⁍ @testing-library/react-native
⁍ WCAG Guidelines
⁍ Accessible Color Systems

| Do | Don't | Why |
|---|---|---|
| Componentize by Ops Mode | Put all logic/UI in one file | Improves clarity and maintainability |
| Handle errors with safe fallbacks | Let crashes reach users | Preserves user trust and safety |
| Label buttons and controls | Skip accessibility attributes | Ensures inclusivity |
| Use constants and themes | Hardcode styles | Supports brand control |
| Test offline flows | Assume network availability | Critical for crisis reliability |

**Do / Don’t Summary**

**Do**
⟶ Componentize by Ops Mode
⟶ Handle errors with safe fallbacks
⟶ Label buttons and controls
⟶ Use constants and themes
⟶ Test offline flows

**Don’t**
⟶ Put all logic/UI in one file
⟶ Let crashes reach users
⟶ Skip accessibility attributes
⟶ Hardcode styles
⟶ Assume network availability

**Why**
⟶ Improves clarity and maintainability
⟶ Preserves user trust and safety
⟶ Ensures inclusivity
⟶ Supports brand control
⟶ Critical for crisis reliability

## Backend Guidelines
This guideline covers backend best practices for Grief Ops Suite, architected to deliver operational grief support across distinct Ops Modes. While the platform may integrate with external services (e.g., content ingestion, subscriptions, analytics), all critical flows must remain functional without network access.

The standards below ensure backend-related code — including local data management, integration services, and future server-side components — is robust, secure, maintainable, and aligned with the

**Overview and Purpose**

The purpose of these guidelines is to:

⁍ Provide developers with backend coding and architectural standards tailored to an offline-first mobile application

⁍ Ensure local service logic and external integrations are reliable, consistent, and failure-tolerant

⁍ Establish best practices for handling future backend extensions (auth, subscriptions, payments) without compromising user safety or core reliability

⁍ Protect user privacy and sensitive grief-related data by default

**Key Rules and Standards**

**Local Data Access (SQLite & AsyncStorage)**

⁍ Use SQLite as the authoritative store for all session and operational data

⁍ Design schemas for clarity, atomic writes, and future migrations

⁍ Reserve AsyncStorage strictly for:
⟶ UI preferences
⟶ feature flags
⟶ onboarding state

⁍ Never store sensitive data in plaintext

⁍ Prefer hashed, encrypted, or obfuscated storage for any sensitive information where applicable

**Service Integration**

⁍ Implement all external API interactions as isolated service modules

⁍ Handle errors gracefully; never block critical flows due to network failures

⁍ Validate and sanitize all incoming data

⁍ Cache responses in SQLite for offline use

⁍ Retry failed syncs with limits

⁍ Always prioritize offline resilience over real-time freshness

**Security & Privacy**

⁍ Never store or transmit user-identifiable content or session payloads without explicit user consent

⁍ Sanitize and validate all incoming and outgoing data to prevent injection attacks

⟶ Minimize access scopes

⟶ Protect keys and tokens

⟶ Never store secrets in source control or plaintext on device

**Error Handling**

⁍ Use centralized error handling for database operations and network communication

⁍ No stack traces exposed to the UI

⁍ No technical jargon presented to the user

⁍ Capture non-fatal errors for **local logging only**

⁍ Telemetry (if introduced later) must be anonymized and strictly opt-in

**Testing & Documentation**

⁍ Thoroughly unit test all local service modules:
⟶ database access
⟶ sync logic
⟶ content parsing and validation

⁍ Document all data models, interfaces, and integration flows

⁍ Use TypeScript typings rigorously to enforce data contracts and prevent silent failures

**Code Examples**

***Example*****: Safe Local Write to SQLite**

⁍ What to Do:

*import \* as SQLite from 'expo-sqlite';*

*const db = SQLite.openDatabase('griefops.db');*

*export function saveSession(session) {*

*if (!session.id || !session.timestamp) {*

*throw new Error('Invalid session object');*

*}*

*return new Promise((resolve, reject) => {*

*db.transaction(tx => {*

*tx.executeSql(*

*'INSERT INTO sessions (id, timestamp, mode, data) VALUES (?, ?, ?, ?)',*

*\[*

*session.id,*

*session.timestamp,*

*session.mode,*

*JSON.stringify(session.data),*

*\],*

*(\_, result) => resolve(result),*

*(\_, error) => reject(error)*

*);*

*});*

*});*

*}*

⁍*What to Avoid:*

*// No input validation and silent error swallowing*

*db.transaction(tx => {*

*tx.executeSql(*

*'INSERT INTO sessions VALUES (?, ?, ?, ?)',*

*\[id, timestamp, mode, data\]*

*);*

*});*

***Example*****: Integrating with External API (Content Ingestion)**

⁍ Best Practice*:*

*export async function fetchAndCacheContent() {*

*const resp = await fetch('https://cassandracrossno.com/wp-json/wp/v2/posts');*

*if (!resp.ok) throw new Error('Failed to fetch content');*

*const data = await resp.json();*

*const safeContent = data.map(item => ({*

*id: item.id,*

*title: sanitizeHTML(item.title.rendered),*

*body: sanitizeHTML(item.content.rendered),*

*}));*

*safeContent.forEach(saveContentToSQLite);*

*}*

⁍ To Avoid*:*

⟶ Rendering or storing untrusted HTML without sanitization
⟶ Blocking UI while waiting on network responses

| Common Mistake | Why It's Harmful | Corrective Action |
|---|---|---|
| No input validation for local DB writes | Corrupts data and introduces security risks | Validate and sanitize all inputs |
| Blocking UI on slow APIs | Breaks crisis reliability guarantee | Make all network calls async and non-blocking |
| Hardcoding secrets or endpoints | High risk of leakage and exploits | Use secure storage and config abstractions |
| Storing sensitive data in AsyncStorage | Easily compromised via backups | Use encrypted SQLite or secure storage |

**Common Mistakes**

⁍ No input validation for local DB writes
⟶ Corrupts data and introduces security risks
⟶ Corrective action: validate and sanitize all inputs

⁍ Blocking UI on slow APIs
⟶ Breaks crisis reliability guarantee
⟶ Corrective action: make all network calls async and non-blocking

⁍ Hardcoding secrets or endpoints
⟶ High risk of leakage and exploits
⟶ Corrective action: use secure storage and config abstractions

⁍ Storing sensitive data in AsyncStorage
⟶ Easily compromised via backups
⟶ Corrective action: use encrypted SQLite or secure storage

**Supporting Tools & Processes**

⁍ ESLint rules to flag unsafe patterns (e.g., unsanitized HTML usage)

⁍ Strong TypeScript interfaces for all service layers:
⟶ migrations
⟶ sync logic
⟶ data validation

⁍ Periodic security reviews for integration code

**Recommended References**

⁍ Expo SQLite Docs
⟶ https://docs.expo.dev/versions/latest/sdk/sqlite/

⁍ React Native AsyncStorage
⟶ https://react-native-async-storage.github.io/async-storage/

⁍ OWASP Mobile Security Project
⟶ https://owasp.org/www-project-mobile-security/

## Offline-First & Sync Guidelines
This guideline establishes the standards for implementing and maintaining robust offline-first operation and safe data synchronization in Grief Ops Suite.



The system must support uninterrupted access to core features and stored data regardless of network state. Synchronization with external content sources is opportunistic, non-blocking, and must never interrupt or destabilize the local app experience.

**Overview and Purpose**

⁍ Grief Ops Suite is frequently used during periods of distress, instability, or crisis, where network availability may be unreliable or nonexistent.

⁍ All mission-critical functionality — including Ops Mode selection, session creation, script access, journaling, timers, and after-action reporting — **must be available offline at all times**.

⁍ Network connectivity is leveraged only to enhance non-critical metadata or content and must never gate access to core workflows.

⁍ Offline operation is the **baseline mode of operation**, not an error state.

**Core Rules & Standards**

**1. Critical Flows Must Not Break Offline**

⁍ All user flows involving:

⟶ session creation

⟶ Ops Mode management

⟶ script access

⟶ journaling

⟶ after-action reporting

⟶ must remain fully functional with **zero network connectivity**.

⁍ No screen, button, or mode may block or degrade due to missing network access.

**2. Local-First Data Models**

⁍ SQLite is the **single source of truth** for:

⟶ operational state

⟶ session records

⟶ reference content

⟶ critical logs

⁍ AsyncStorage may be used **only** for small, non-critical preferences:

⟶ theme selection

⟶ accessibility flags

⟶ low-stimulation settings

⁍ Core operational data must **never** be stored exclusively in AsyncStorage.

**3. Opportunistic Sync**

⁍ Sync processes (content ingestion, metadata refresh) must:

⟶ run in the background

⟶ be non-blocking

⟶ gracefully skip when offline

⁍ Remote content must always be:

⟶ cached locally

⟶ validated before use

⁍ No “hard dependency” on sync for startup or operation is permitted.

**4. Graceful Degradation & UI Feedback**

⁍ When content or features are unavailable due to sync issues:

⟶ show calm, non-alarming UI indicators

(e.g., “Content unavailable right now — core tools are still ready.”)

⟶ never prevent access to Ops Modes or critical tools

⁍ Avoid modal alerts or disruptive banners during crisis flows.

**5. Sync Safety & Conflict Resolution**

⁍ Sync logic must be:

⟶ idempotent

⟶ resilient to interruption

⟶ safe to retry

⁍ Local data always takes priority over remote data unless a **clear, intentional reconciliation strategy** is defined.

⁍ Never auto-delete or overwrite user-generated local data during sync.

**6. Security & Privacy**

⁍ All locally cached data must be stored securely.

⁍ Sensitive content must be encrypted at rest if applicable.

⁍ Only sync data with trusted, secure sources (HTTPS).

⁍ Never transmit operationally critical or emotionally sensitive user data off-device unless explicitly required and consented.

**7. Explicit Error Handling**

⁍ Detect and log sync errors cleanly.

⁍ Present **non-technical**, reassuring feedback to users.

⁍ Never surface raw error messages, stack traces, or network errors to the UI.

⁍ Sync failures must never block user actions or modes.

**Code Examples**

⁍ **Positive Example: Local Data-First Content Retrieval**

// Pseudocode (TypeScript / React Native)

async function getScripts(sessionId) {

const localScripts = await db.getScripts(sessionId);

if (localScripts) return localScripts;

if (networkAvailable()) {

const remoteScripts = await fetchScriptsFromApi(sessionId);

await db.cacheScripts(sessionId, remoteScripts);

return remoteScripts;

}

return \[\];

}

⁍ **Key Principle:**
Render from local first. Sync only when safe.

⁍ **Negative Example: Network-Blocked Flow**

// Anti-pattern — do not use

function startSession() {

fetch('/create-session')

.then(() => createLocalSession())

.catch(() => alert('Unable to start. Check connection.'));

}

⁍ **Why this is unacceptable:**
Network failure blocks a critical flow and introduces panic during crisis moments.

⁍ **Robust Sync Logic with Error Handling**

async function syncContent() {

try {

if (!networkAvailable()) return;

const updates = await fetchRemoteContent();

await db.saveContent(updates);

} catch (err) {

logSyncFailure(err); // local logging only

}

}

**Common Mistakes to Avoid**

⁍ Relying on online-only fetches for critical UI or workflows.

⁍ Failing to cache remote content locally before use.

⁍ Writing user state directly to remote APIs.

⁍ Allowing sync failures to cascade into blocked or degraded UX.

⁍ Poor handling of online/offline transitions.

**Tools & Processes Supporting Offline-First**

⁍ **SQLite:** expo-sqlite or react-native-sqlite-storage for all structured data.

⁍ **AsyncStorage:** Used only for lightweight, non-critical flags.

⁍ **Network Detection:** @react-native-community/netinfo for connectivity awareness.

⁍ **Background Sync:** Schedule background tasks when supported by the platform.

⁍ **Error Logging:** Local-only logs with strict privacy controls.

⁍ **Testing:** Simulate offline and intermittent connectivity during unit and integration testing.

**Checklist for Offline-First & Sync Implementation**

| Guideline | What to do | What to avoid |
|---|---|---|
| Critical Function Availability | Local cache for all mission-critical data | Network-gated sessions, scripts, reporting |
| Sync Design | Background, interruption-tolerant, retries | Blocking UI or foreground-only sync |
| User Feedback | Calm offline indicators | “You are offline” error modals |
| Security & Privacy | Encrypted local data, HTTPS sync | Plaintext storage or insecure transport |
| Error Handling | Log locally, degrade gracefully | Uncaught exceptions or UI stack traces |

**Additional Resources**

⁍ Offline-First Application Design (General Reference)

⁍ MDN: Offline Applications

⁍ React Native AsyncStorage Docs

⁍ Expo SQLite Documentation

**Summary**

⁍ Build and test as if the device will **never** have stable connectivity.

⁍ Assume outages and recover from them automatically.

⁍ Synchronization is a **bonus**, not a prerequisite for success.

⁍ Always prioritize **local reliability, emotional safety, and user trust** over data freshness.

## Navigation & Routing Guidelines
This guideline details the standards for implementing navigation and routing in Grief Ops Suite's React Native application, with an emphasis on user psychological safety, stability, and consistent crisis-mode containment. It addresses technical best practices and design principles for a trauma-aware navigation experience.

**Overview and Purpose**

Proper navigation is a critical tool in supporting users in crisis. In Grief Ops Suite, navigation should be predictable, low-cognitive-load, and defensively designed to prevent disorientation, accidental exits, or jarring transitions. These guidelines ensure that navigation advances the core responsibility of psychological safety.

**Consistency**

⁍ Navigation patterns must be uniform across Ops Modes (Night Watch, Foreman, Drill Sergeant, etc.).

⁍ Always use the same control (e.g., Back button location and label) for the same function within all screens.

⁍ Avoid introducing context-specific navigation metaphors without strong crisis-informed rationale.

**Simplicity and Predictability**

⁍ Limit navigation options per screen to essential choices only.

⟶ *Good:* One clear action (e.g., “Switch Mode”) or single path forward.

⟶ *Bad:* Drawer menus, floating actions, or complex tab navigators on crisis screens.

⁍ Visual hierarchy and feedback must indicate “current position” in the Ops Suite at all times.

**Modal & Stack Navigation Model**

⁍ Use stack-based navigation (e.g., React Navigation’s Stack Navigator) as the primary navigation model.

⁍ For time-boxed or focused sessions (e.g., Foreman shifts), use modal screens that must be dismissed explicitly.

**Back Action Handling**

⁍ All Back/Exit actions must be explicitly controlled—never allow OS or swipe gestures to trigger navigation without deliberate confirmation if user safety might be at risk.

⁍ Present confirmation dialogs on Back actions within crisis/containment contexts (e.g., Night Watch, panic flows).

⁍ Disable back navigation entirely on screens where workflow completion is critical to user safety.

**Deep Linking and Cold Starts**

⁍ On cold start or resume, always restore the previous Ops Mode and screen state using local SQLite state.

⁍ Show a loading/containment screen if restoring navigation state takes more than 500ms to prevent blank or flashing screens.

⁍ Avoid deep-linking users directly into non-primary/containment screens from external links; always guide through a context-aware checkpoint (e.g., mode intro).

**Low Stimulation & Accessibility Support**

⁍ Minimize transition animations, or disable them entirely where “Reduced Animation” mode is active.

⁍ Use high-contrast and brand-specified navigational elements with large, clear touch targets.

⁍ Support screen reader labelling for all navigational controls (e.g., “Back to Ops Selector”, “Exit Night Watch Mode”).

**Error and Panic Routing**

⁍ On unrecoverable navigation error (e.g., lost session, corrupt state), default to a "Containment Mode" that offers safe choices and prevents app crash loops.

⁍ Implement a global “Panic Route” (e.g., hardware button or persistent UI element) to jump instantly to Night Watch Mode from any screen.

**Examples**

| Scenario | Positive Example | Negative Example (What to Avoid) |
|---|---|---|
| Back Navigation in Night Watch | User taps “Exit Night Watch” – confirmation modal appears: “Are you sure you want to exit? You can resume this mode at any time.” | User swipes back; session ends unexpectedly with no warning or data saved. |
| Mode Switching | Switching from Foreman to Pit Boss prompts user: “Leaving your current shift. Unsaved notes will be preserved for your return.” | Switching tabs wipes session state or navigates without data preservation. |
| Navigation Bar | Navigation always at the bottom, large touch areas, labels use brand colors, and provide clear “Current Mode” indicator. | Multiple hamburger menus, ambiguous icons, or navigation hidden in swipe gestures only. |

**Common Mistakes to Avoid**

⁍ Allowing navigation gestures to accidentally exit a session or interrupt an Ops Mode.

⁍ Not confirming before resetting, discarding, or abandoning a session.

⁍ Permitting navigation to undefined routes/states (always validate route existence before navigation).

⁍ Using ambiguous icons or locations for navigation controls—text labels required, icons must be obvious.

⁍ Failing to restore correct mode or context after app reload.

**Supporting Tools & Processes**

⁍ Use *React Navigation* (https://reactnavigation.org/) with Stack, Modal, and Tab navigators as appropriate.

⁍ Implement navigation guards to intercept risky transitions and enforce confirmation logic.

⁍ Persist navigation stack and mode context to SQLite at stable checkpoints and on app background/close.

⁍ Automated E2E testing with Detox or similar to simulate crisis interaction flows and navigation edge cases.

⁍ Conduct usability audits focusing on navigation under conditions of stress/distraction.

**References & Additional Resources**

⁍ React Navigation Official Documentation

⁍ React Native Accessibility Guide

⁍ Designing Apps for Mental Health Crisis (UX Design)

⁍ Trauma-Informed Design Best Practices

## Copy, Content & Tone Guidelines
This guideline defines standards for all user-facing text in Grief Ops Suite, establishing voice, tone, and content practices that actively support survival, containment, and operational clarity in moments of distress.

Language in this system is deliberate, tactical, and honest.
It does not soothe by lying.
It does not comfort by minimizing reality.

**Overview & Purpose**

The purpose of these guidelines is to ensure all copy — UI labels, instructions, scripts, field manual entries, system messages, and notifications — adheres to a **single, unapologetically honest operational voice**.

**Adherence prevents:**

⁍ emotional escalation

⁍ shame-based reactions

⁍ cognitive overload

⁍ false reassurance

**Core principles:**

⁍ Text exists to **hold the line**, not perform empathy.

⁍ The system never uses platitudes, toxic positivity, or speculative language about “progress,” “healing,” or “growth.”

⁍ Content supports **user agency and containment** — every phrase is an environmental control, not a personality.

**Voice & Tone Standards**

**Grief Ops Suite’s voice is:**

⁍ Blunt

⁍ Grounded

⁍ Direct

⁍ Action-oriented

⁍ Sometimes profane (by design)

**Tone rules:**

⁍ We name reality without softening it.

⁍ We do not lie to make people feel better.

⁍ We do not sugarcoat pain.

⁍ We do not perform optimism.

**Language guidelines:**

⁍ Profanity is **allowed and intentional** when it:

⟶ cuts through panic

⟶ interrupts dissociation

⟶ validates reality without coddling

⁍ Profanity is **never**:

⟶ directed at the user

⟶ used to shame, mock, or belittle

Directive language **is allowed** when safety or containment is at risk.

We may say:

⁍ “This is brutal.”

⁍ “Your brain is lying to you right now.”

⁍ “We’re slowing this shit down.”

We **never** say:

⁍ “Everything happens for a reason.”

⁍ “You’ll be okay.”

⁍ “This is part of your healing journey.”

**Structural Rules for Copy**

Headings are **commands or states**, not vibes

⁍ Examples:

⟶ “Night Watch Active”

⟶ “Hold the Line”

⟶ “Stabilization in Progress”

Labels and buttons use **verbs**, not encouragement:

⁍ “Start”

⁍ “Pause”

⁍ “Breathe”

⁍ “End Shift”

**System notifications:**

⁍ identify what’s happening

⁍ identify the next step

⁍ never speculate emotionally

**Never include:**

⁍ emojis

⁍ exclamation points

⁍ animated or flashing text

**Instructional copy:**

⁍ bullet points or numbered steps

⁍ one action per line

⁍ no paragraphs longer than **two sentences**

**Scripts and manuals:**

⁍ short chunks

⁍ intentional white space

⁍ scannable under stress

**Naming Conventions for Content**

Ops Modes and tools are **capitalized proper nouns**:

⁍ Night Watch

⁍ Drill Sergeant

⁍ Pit Boss

⁍ Road Captain

**Files and components related to content follow:**

⁍ /content/<ModeName>/<ModeName>Script.tsx

⁍ SystemNotice.tsx

⁍ FieldManualEntry.tsx

**Content IDs (SQLite / AsyncStorage):**

⁍ kebab-case

⁍ blunt and literal

⁍ explicit mode references

*Examples:*

⁍ night-watch-hold-line

⁍ panic-stabilization

⁍ shift-end-reality-check

No poetic naming. No metaphors. No cute shit.

**Documentation & Content Review Practices**

⁍ Maintain a **Copy Review Log** for all new or changed user-facing text.

⁍ Each entry must document:

⟶ context of use

⟶ intended impact (containment, interruption, instruction)

⟶ reviewer sign-off

⁍ All copy changes must pass a **panic test**:

⟶ read while emotionally flooded

⟶ read while dissociating

⟶ read while angry

⁍ If it irritates, shames, confuses, or minimizes in those states — it gets rewritten.

⁍ Field manuals, scripts, and system notices are documented in:

⟶ content/ops/<Mode>/

⟶ Markdown or typed objects for traceability and versioning

**Code Examples**

⁍ **Positive Example: Button Component**

// Clear. Direct. No bullshit.

<Button label="Begin Shift" />

⁍ **Negative Example: Button Component**

// Avoid cheerleading and emotional hype

<Button label="You've got this!" />

⁍ **Positive Example: System Notice**

Shift completed.

You can stand down now.

⁍ **Negative Example: System Notice**

Great job! You're doing amazing! Keep smiling :)

**Common Mistakes to Avoid**

⁍ Hallmark language

⁍ Wellness-industry phrasing

⁍ “Healing journey” rhetoric

⁍ Motivational quotes

⁍ Forced optimism

⁍ Corporate empathy voice

⁍ Encouragement without instruction (“Stay strong”)

If it sounds like it belongs on a candle, a poster, or a therapist’s Instagram — **delete it**.

**Testing & Review Processes**

⁍ Automated UI tests verify correct copy appears in each Ops scenario.

⁍ Manual review by someone who understands **acute grief**, not just UX.

⁍ Accessibility validation:

⟶ readability

⟶ clarity

⟶ non-overstimulating presentation

⁍ User feedback channels allow reporting copy that feels wrong, harmful, or useless.

**Security & Privacy in Content**

⁍ Never reference identifiable user data in system messages or scripts.

⁍ Session logs, field manual entries, and After Action Reports remain local unless explicitly exported.

⁍ All remotely ingested content is sanitized.

⁍ No external HTML or script content is ever exposed directly.

| Do | Don’t | Notes |
|---|---|---|
| “Shift ready. Begin when you’re able.” | “Ready to rock? Let’s fuckin' crush today!” | Blunt, grounded, non-performative |
| “Night Watch mode active.” | “Embrace the night—find your peace.” | State facts, not feelings |
| “View scripts for difficult conversations.” | “Don’t worry, you’ll know what to say!” | Containment, not promises |

**Supporting Tools & Processes**

⁍ Lint rules flag forbidden phrases, platitudes, and passive voice.

⁍ Single source of truth for all system copy.

⁍ Content changes are versioned and **blocked from deployment** if guidelines are violated.

**References & Resources**

⁍ Trauma-Informed Tech Principles: *https://traumainformedtech.org*

⁍ Plain Language Guidelines: *https://plainlanguage.gov/guidelines/*

⁍ Grief-Responsive Content Modeling: *https://cassandracrossno.com/*

**Summary**

Grief Ops Suite does not exist to make people feel better.

It exists to stand in the wreckage and say:

“This is fucked.

You’re still here.

Do this next.”

If the language doesn’t do that, it does not ship.

## Crisis Flow & State Transition Guidelines
This guideline defines the standards and strategies for managing transitions between operational modes and emotional/cognitive states in Grief Ops Suite. Its purpose is to ensure user safety and minimize cognitive load during crisis moments by enforcing predictable, secure, and context-appropriate transitions. These standards help prevent state mismanagement, unsafe feature exposure, user abandonment, or escalation of distress.

**Overview & Purpose**

⁍ Provide tactical, code-level rules for implementing state transitions in moments of user crisis.

⁍ Guarantee that escalation (e.g., into Night Watch) or de-escalation (e.g., release to Road Captain) cannot leave the user in an indeterminate or unsafe state.

⁍ Protect against information overload, action paralysis, and unintended app abandonment during critical operational flows.

⁍ Every state transition must prioritize user safety and operational containment, never exposing the user to unnecessary complexity or choices during crisis.

⁍ All flow interruptions, locks, or escalations must be reversible or explicitly fail-safe, avoiding dead-ends that worsen user distress.

⁍ Designers and developers must adhere to these guidelines to provide uniform, reliable crisis handling across all Ops Modes.

Grief Ops Suite does not optimize for freedom during crisis. It optimizes for survival.

When a user is cognitively compromised, overwhelmed, or spiraling, unrestricted choice is not a feature — it is a liability. These guidelines exist to ensure the system takes control when the user cannot, and releases it only when stability is restored.

**Specific Rules & Standards**

⁍ **Explicit State Machines:**

⟶ Model all crisis-capable UI flows as finite state machines (FSMs) with well-defined transitions and single-responsibility handlers.

⁍ *Example Structure:*

⟶ *States:* 'idle', 'normal', 'crisis\_detected', 'night\_watch', 'locked', 'recovery', 'stand\_down'

⟶ *Events:* 'ESCALATE\_CRISIS', 'DEESCALATE', 'LOCK', 'STAND\_DOWN', 'ABANDON\_ATTEMPT'

**Guardrails for Critical Flows:**

⁍ All transitions into and out of critical crisis states (e.g., 'night\_watch') require explicit user action or system-validated triggers. No automatic transitions based solely on timers, background events, or passive signals. Crisis escalation and release must be intentional, visible, and justified. The system must never silently decide a user is “fine.”

⁍ Block functionality that could worsen user state during an active crisis, e.g., suppress high-stimulation UI, navigation away, or notifications.

**De-escalation Protocols:**

⁍ Transitions out of crisis must follow a progressive de-escalation chain—never abrupt or one-step returns to full functionality.

⁍ Offer clear, grounding feedback to the user at each de-escalation step, stating what has changed and what comes next.

**Interruption & Lock Handling:**

⁍ When user is at risk of abandonment or unsafe spirals (e.g., rapid navigation, inactivity in crisis mode), system should lock or interrupt with a grounding UI state (e.g., “You’re Safe, One Thing At A Time”).

⁍ Locks must provide a single, visible path to either continue the current flow or (if safe) de-escalate. No hidden exits.

**Error and Failure Tolerance:**

⁍ On error (network failure, storage issue, corrupted state), app must fall back to the nearest safe, offline-first state without abandoning user context.

**Minimal and Just-in-Time UI:**

⁍ All choices and messages during crisis must minimize text and options. Present one action, next step, or escape at a time.

⁍ The system must never present motivational language, reassurance, or meaning-making during crisis states. Crisis UI exists to contain, not inspire.

**Local-First, Resilient Flows:**

⁍ Critical transitions must not require network connectivity. Fallback to local SQLite data and default scripts.

**Instrumentation & Logging (Privacy-Safe):**

⁍ Log all state transitions and interruptions locally for later analysis and improvement, excluding any PII or sensitive data.

**Code Examples (TypeScript/React Native FSM Structure)**

⁍ **Positive Example (State Machine Implementation):**

⟶ **Good:**
const GriefOpsStates = { IDLE: 'idle', NORMAL: 'normal', CRISIS\_DETECTED: 'crisis\_detected', NIGHT\_WATCH: 'night\_watch', LOCKED: 'locked', RECOVERY: 'recovery', STAND\_DOWN: 'stand\_down' } as const; type GriefOpsState = typeof GriefOpsStates\[keyof typeof GriefOpsStates\]; type TransitionEvent = | { type: 'ESCALATE\_CRISIS' } | { type: 'DEESCALATE' } | { type: 'LOCK' } | { type: 'STAND\_DOWN' } | { type: 'ABANDON\_ATTEMPT' }; function crisisStateReducer(state: GriefOpsState, event: TransitionEvent): GriefOpsState { switch (state) { case 'normal': if (event.type === 'ESCALATE\_CRISIS') return 'crisis\_detected'; break; case 'crisis\_detected': if (event.type === 'LOCK') return 'locked'; if (event.type === 'STAND\_DOWN') return 'night\_watch'; break; case 'night\_watch': if (event.type === 'DEESCALATE') return 'recovery'; break; // ...other transitions } return state; // Default: state unchanged on invalid event }

⁍ **Negative Example (Implicit State, No Guards):**

⟶ **Bad:**
// Anti-pattern: Using bool flags and direct setState if (isCrisis) { setMode('night\_watch'); } else { setMode('normal'); } // No explicit transitions or containment of crisis

**Common Mistakes to Avoid**

⁍ Implicit or hidden state changes (e.g., automatic mode switches on timer expiry).

⁍ Exposing navigation menus, push notifications, or multi-choice modals during active crisis states.

⁍ Allowing users to exit or abandon critical flows with a single accidental gesture (e.g., swipe back, hardware back button).

⁍ Forgetting to lock out high-stimulation effects (animation, sound) when in any crisis mode.

⁍ Writing transitions that depend on remote APIs or network connectivity.

⁍ Failing to restore the previous known-safe state after crashes or errors.

⁍ Treating crisis resolution as a UX success metric instead of a survival safeguard.

**Tools & Processes That Support This Guideline**

⁍ Use libraries such as *xstate* for state machine modeling, but ensure all states and transitions are documented and reviewed.

⁍ Conduct crisis scenario simulations and dry runs as part of code review: “Can the user get trapped? Can they escape? Is there a fallback?”

⁍ Include automated tests (unit and integration) for every state transition, with and without error conditions and in offline mode.

⁍ Depend on local SQLite and AsyncStorage for storing state and user safety markers, with checksum validation after crashes to prevent unsafe restoration.

⁍ Disable or intercept OS-level hardware navigation (e.g., Android back button) within crisis flows using React Native’s BackHandler API.

**Security & Privacy Considerations**

⁍ Never record or log PII or sensitive emotional state changes to external servers. All logs remain local and are anonymized for feedback and QA.

⁍ Sanitize all user-provided events that can trigger state transitions—never trust external triggers or automatic content ingestion to alter operational state.

⁍ Ensure that “locked” and “crisis” UIs are full-screen and cannot leak background data or sensitive session content.

**References & Further Reading**

⁍ *State Machines in React:* XState Documentation

⁍ *Avoiding “Abandonment” in Crisis UX:* Stop People Leaving Forms

⁍ *React Native Navigation Interception:* React Native BackHandler

| Best Practice | What To Do | What To Avoid |
|---|---|---|
| **Model transitions as explicit state machines** | Map all crisis flows and user journeys using FSM patterns with named states and transitions. | Scattering crisis/normal mode toggles as setState or boolean flags. |
| **Always allow for safe interruption and de-escalation** | Provide a single, prominent exit path or grounding reassurance UI. Make de-escalation progressive, never abrupt. | Allowing users to abandon flows or returning them suddenly to all features at once after a crisis escalation. |
| **Protect against external triggers** | Validate all external events/content before allowing them to escalate or de-escalate user operational state. | Letting remote content ingestion or push notifications cause state transitions automatically. |

## Security
This document defines comprehensive security best practices for Grief Ops Suite, a mobile application built with React Native (TypeScript), SQLite/AsyncStorage, and custom UI components. The platform is designed for users in acute emotional distress, where security, privacy, and reliability are non-negotiable. These guidelines are tailored to the project’s offline-first, sensitive-use context and must be strictly followed by all developers.

**Overview and Purpose**

Grief Ops Suite handles **highly sensitive, personally identifiable, and emotionally vulnerable user data**. Security protocols must protect users from unauthorized access, tampering, accidental loss, and misuse. Confidentiality, integrity, and availability are critical — failures in any of these areas can directly impact user safety during crisis moments.

**Core Security Principles**

⁍ **Least Privilege**
⟶ Components and services may only access the data and functionality strictly required for their role.

⁍ **Defense in Depth**
⟶ Use layered controls; never rely on a single mechanism for protection.

⁍ **Fail Secure**
⟶ Default to denying access or halting unsafe operations when validation fails.

⁍ **Privacy by Default**
⟶ Do not collect, retain, or transmit sensitive information unless it is essential for core functionality.

**Secure Code Practices**

**Input Validation and Sanitization**

⁍ Thoroughly validate all user inputs and all external content (including ingested REST API data).

⁍ Never interpolate user input directly into SQL queries or UI strings.

⁍ *Example (Proper Input Validation):*

*if (typeof userInput === 'string' && userInput.length <= 300) {*

*// safe to proceed*

*}*

⁍ *Anti-Example (Improper Validation):*

*db.executeSql(`INSERT INTO entries (val) VALUES ('${userInput}')`);*

*// vulnerable to injection*

**SQL Injection Protection**

⁍ Always use parameterized queries with SQLite.

⁍ Never concatenate user input directly into SQL statements.

**Secure Local Data Storage**

⁍ Store **only what is strictly necessary** in SQLite.

⁍ Store small, non-sensitive preferences only in AsyncStorage.

⁍ Encrypt any personal or sensitive user data at rest where feasible
(e.g., react-native-sqlcipher-storage).

⁍ Never store credentials, tokens, or session secrets in plain text.

**Client-Side Authentication (Future Use)**

⁍ For future backend integrations:

⟶ Store tokens using secure storage mechanisms (not AsyncStorage).

⟶ Enforce token expiration and refresh logic.

⟶ Never hardcode secrets or keys in the codebase.

**Secure API Usage**

⁍ Validate and sanitize all external API responses before caching or display.

⁍ Fail gracefully if external APIs are unavailable.

⁍ Never block critical user flows due to network errors.

⁍ Reject malformed, unexpected, or unrecognized fields from ingested sources.

**Privacy and Data Minimization**

⁍ Never request or store more sensitive data than required for Grief Ops Suite’s mission.

⁍ Never log or transmit user content, session records, or After Action Reports off-device without explicit user consent.

**Code Obfuscation and Protection**

⁍ Apply code obfuscation and asset protection during builds to reduce reverse-engineering risk
(e.g., metro-minify, react-native-obfuscating-transformer).

**Error Handling**
⁍ Do not expose stack traces or implementation details to users or logs
⁍ Display user-friendly, non-specific error messages
⁍ Example: “Operation could not be completed. Please try again.”
⁍ Log technical details only locally and only in development/debug modes

**Secure Third-Party Libraries**
⁍ Vet all open-source libraries for maintenance and security advisories
⁍ Use the minimum necessary set of dependencies
⁍ Keep dependencies up to date

**Reduce Surface Area**
⁍ Disable unused device capabilities and libraries (location, camera, push notifications, contacts, etc.) unless explicitly required by a Mode
⁍ Avoid unnecessary permissions entirely

**Common Mistakes to Avoid**
⁍ Storing or transmitting user data in plaintext (AsyncStorage, logs, network)
⁍ Directly concatenating user input into SQL or command strings
⁍ Leaking implementation details or sensitive statuses to the UI
⁍ Passing secrets or tokens via query strings or embedding them in source code
⁍ Failing to verify third-party dependencies before use
⁍ Assuming device security alone is sufficient without encryption

**Tools & Processes**
⁍ Use static analysis tools (e.g., eslint-plugin-security) in CI/CD
⁍ Implement automated dependency scanning (e.g., npm audit, Renovate)
⁍ Use secure key storage when integrating authentication or payments
⁍ Conduct regular code reviews with security as a required checklist item
⁍ Apply security patches promptly when vulnerabilities are identified

**References & Further Reading**
⁍ *React Native Security Best Practices*
⁍ *OWASP Mobile Security Cheat Sheet*
⁍ *OWASP Mobile Security Testing Guide*

| Best Practice | Positive Example | Negative Example |
|---|---|---|
| Use parameterized SQL queries | db.executeSql('SELECT \* FROM sessions WHERE id = ?', \[sessionId\]); | db.executeSql('SELECT \* FROM sessions WHERE id = ' + sessionId); |
| Store sensitive data encrypted | Encrypted SQLite via sqlcipher | Plain SQLite or AsyncStorage |
| Sanitize user input | Validate type and length before use | Use unchecked input directly |
| Hide stack traces | “An error occurred.” | “Null reference at handleOpsDeploy() line 87” |

**Best Practices Summary**
⁍ Use parameterized SQL queries
⁍ Store sensitive data encrypted
⁍ Sanitize and validate user input
⁍ Hide stack traces and internal errors from users

**Summary**
⁍ Security is a primary architectural pillar for Grief Ops Suite
⁍ These guidelines must be followed rigorously — every design decision and code commit must prioritize user safety, dignity, and privacy
⁍ When in doubt, err on the side of more restrictive, defensive coding

## Error Handling, Recovery & Failure Containment Guidelines
This guideline defines how Grief Ops Suite handles errors, failures, interruptions, crashes, corrupted states, and unexpected behavior without escalating distress, breaking trust, or abandoning the user mid-crisis. Error handling in Grief Ops is not a technical afterthought. It is a core safety system.

**Overview and Purpose**

⁍ Reduce escalation risk by containing failures quietly and predictably.

⁍ Preserve user stability and orientation during errors, especially in crisis states.

⁍ Ensure no critical operation ends in a dead state, data loss, or forced abandonment.

⁍ Provide recovery paths that are calm, visible, and actionable.

⁍ Enable diagnostics without exposing personal data, emotional context, or sensitive content.

If something breaks, the system does **not** panic — and it does **not** ask the user to fix it.

**General Rules & Standards**

⁍ Never surface technical error details, stack traces, or system jargon to users.

⁍ Every error state must provide a next step or safe fallback — never a dead end.

⁍ Errors must default to containment, not interruption.

⁍ Recovery must be state-aware — never reset context unless explicitly confirmed by the user.

⁍ Never auto-navigate away, force logout, or restart flows during active Ops Modes.

⁍ Developer-level diagnostics are local-only by default and opt-in for sharing.

**UI-Level Error States & Messaging**

⁍ Error messaging must be calm, minimal, and non-alarming.

⁍ Avoid red, flashing, animated, or high-urgency visual treatments for errors.

⁍ Language must state reality plainly and immediately follow with the next safe option.

⁍ Allowed patterns:

⟶ “Content is loading slowly. You can keep using your saved tools.”

⟶ “That didn’t load. Your local data is still safe.”

⟶ “Retry now or continue offline.”

⁍ Not allowed:

⟶ HTTP codes

⟶ System exception names

⟶ “Something went wrong” with no guidance

⟶ Panic-inducing alerts or modals

⁍ Silent failures are allowed **only** if:

⟶ No critical path is affected

⟶ Data integrity is preserved

⟶ The user does not need to take action

**Application Logic: Local Recovery & State Containment**

⁍ All critical flows (Night Watch, Panic, Shifts) must checkpoint local state continuously.

⁍ On crash or restart, the app must resume **exactly where the user left off**.

⁍ Writes to SQLite must be atomic. Partial writes must be detected and repaired automatically using the last known valid snapshot.

⁍ If repair is not possible, preserve readable local copies and inform the user clearly without technical detail.

⁍ Never auto-exit an Ops Mode due to error. Exit requires explicit user confirmation.

**Data Layer: Integrity, Sync, and Offline Handling**

⁍ SQLite is the source of truth. Remote data never overrides valid local state silently.

⁍ Sync is opportunistic, non-blocking, and never destructive.

⁍ Conflicts must prefer the most recent valid local data.

⁍ If conflict resolution fails, fall back to local-only mode and inform the user.

⁍ Background validation may repair indexes or corrupted rows silently when safe.

⁍ AsyncStorage is for non-critical preferences only. Failures here must never interrupt flows.

**Integration Layer: Sync Failures & Partial Connectivity**

⁍ External service failures must never block critical user actions.

⁍ Cached content must always be available when possible.

⁍ Loading states must time out gracefully and resolve to offline options.

⁍ No spinner may hang indefinitely. Ever.

⁍ Network failure is treated as a normal operating condition, not an exception.

**Panic Mode & Ops Mode Failure Recovery**

⁍ Panic Mode must always have a functional fallback UI, even during error states.

⁍ If auxiliary features fail, they stay hidden unless explicitly requested.

⁍ On crash during an Ops Mode, the app resumes in the same mode on restart.

⁍ The system must never dump the user to a generic home screen during crisis recovery.

**Logging, Diagnostics, and Privacy**

⁍ All logs are stored locally by default.

⁍ No scripts, journal entries, panic content, or emotional markers are logged.

⁍ Use abstract event markers only (e.g., ERROR\_OP\_MODE\_RESTORE\_FAIL).

⁍ Log levels must be enforced (DEBUG, WARN, ERROR).

⁍ Logs auto-expire unless the user explicitly opts into a diagnostic session.

⁍ If log export is available, the user must be able to preview what is shared.

**Code Examples: Good & Bad Patterns**

| Scenario | Best Practice (GOOD) | Anti-pattern (BAD) |
|---|---|---|
| UI error messaging | Show calm fallback: “Content is loading slowly—you can keep using your saved tools.” | Pop up error alert with “Error Code 55: NETWORK\_FAILURE” |
| Data write failure | Queue in-memory for retry and restore user input from backup on crash/restart. | Discard changes or silently revert UI without notice. |
| Panic mode crash | Saved active step in panic loop. On restart, app asks “Resume where you left off?” | App restarts to home/default state, abandoning panic loop entirely. |
| Logging errors | Store in device-safe error logs, no PII, redact context. Send only with explicit consent. | Auto-send crash reports with user texts, scripts, or timing information. |

**Common Mistakes to Avoid**⁍ Treating errors as rare edge cases

⁍ Letting spinners block critical actions

⁍ Assuming storage or network reliability

⁍ Using alarms, buzzers, or abrupt UI jumps

⁍ Logging user content or emotional context

⁍ Hard-coding recovery paths instead of state-driven restoration

**Supporting Tools & Automated Processes**

⁍ React Native Error Boundaries for UI containment

⁍ Strict TypeScript typing to prevent silent failures

⁍ Automated integrity checks on app launch

⁍ Unit and integration tests for offline, partial writes, crash recovery, and Ops Mode restoration

⁍ State persistence (Redux or equivalent) with guarded rehydration logic

**References and Further Reading**

⁍ React Error Boundaries https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary

⁍ Mobile UX Error Handling Best Practices: https://blog.prototypr.io/best-practices-for-designing-mobile-app-error-states-c065d66086b6

⁍ SQLite Corruption Detection & Recovery: https://www.sqlite.org/howtocorrupt.html#\_how\_to\_detect\_and\_recover\_from\_database\_corruption

⁍ Privacy-Safe Diagnostics Patterns: https://github.com/dxa4481/DXA-Privacy-Pattern-Library

**Summary**

Grief Ops Suite assumes failure will happen.

⁍ When it does:

⟶ The system contains it.

⟶ The user stays oriented.

⟶ Progress is preserved.

⟶ Recovery is calm and controlled.

⁍ Errors do not get to hijack the experience.

If a failure increases distress, confusion, or abandonment — it is a bug.

If the system breaks, it still holds the line.

## Database Guidelines
This guideline defines database best practices for Grief Ops Suite, a mobile-first, offline-first application operating in high-stakes, emotionally sensitive contexts. It establishes the standards for working with the project’s local data layer — SQLite as the single source of truth and AsyncStorage for lightweight preferences only.

The goal is to ensure data integrity, reliability, security, maintainability, and smooth offline operation in crisis-support environments where data loss, corruption, or delays

**Overview and Purpose**

⁍ Guide developers toward **consistent, clear, and robust database design** across all Ops Modes

⁍ Ensure local data handling supports **offline-first operation, instant responsiveness, and user safety**

⁍ Reduce the risk of:
⟶ data corruption
⟶ unintentional data loss
⟶ privacy leaks

⁍ Enable long-term maintainability and extensibility as Ops Modes, reports, and data structures evolve

**General Rules and Standards**

Use SQLite as the Source of Truth

⁍ Store all operational, session, report, cached content, and user-script data in SQLite

⁍ Treat SQLite as authoritative — AsyncStorage must never replace it for core data

⁍ Design schemas with:
⟶ clear naming
⟶ strong typing
⟶ normalization appropriate for mobile scale

⁍ Avoid unnecessary joins or over-normalization that could degrade on-device performance

**AsyncStorage for Lightweight Flags Only**

⁍ AsyncStorage may be used only for:
⟶ user preferences
⟶ feature toggles
⟶ ephemeral UI flags

⁍ Never store:
⟶ session data
⟶ reports
⟶ scripts
⟶ logs
⟶ personally identifiable information

⁍ AsyncStorage data must always be considered **non-critical and disposable**

**Schema Naming Conventions**

**Tables**

⁍ Table names use snake\_case, singular

⟶ Example: session, mode\_cache

**Columns**

⁍ Column names use snake\_case, descriptive

⟶ Example: created\_at, ops\_mode

**Indexes**

⁍ Indexes are prefixed with idx\_

⟶ Example: idx\_session\_created\_at

**Data Types and Default Values**

⁍ Explicitly define column types: INTEGER, TEXT, BLOB, REAL

⁍ Use NOT NULL and DEFAULT constraints wherever appropriate

⁍ Store timestamps as ISO 8601 strings (YYYY-MM-DDTHH:MM:SSZ) when using TEXT

**Proper Use of Primary Keys**

⁍ Every table must have a primary key

⟶ Prefer INTEGER PRIMARY KEY (autoincrement)

⁍ For externally synced or imported content:
⟶ Use a UUID stored as TEXT
⟶ Index it explicitly

**Data Access Patterns**

⁍ All database reads and writes must go through:
⟶ a single abstraction layer
⟶ or a service module per Ops Mode

⁍ Never embed raw SQL in UI components

⁍ Never concatenate unsanitized input into SQL statements

⁍ Always use parameter binding

**Error Handling**

⁍ All database operations must:
⟶ handle errors gracefully
⟶ never crash the app

⁍ If a critical operation fails:
⟶ provide clear, calm UI feedback
⟶ “We couldn’t save this yet. You’re not stuck.”

⁍ Errors should be logged locally for diagnostics — never surfaced raw to users

**Offline Sync and Caching**

⁍ Content ingested from backend services must:
⟶ be cached in local tables
⟶ include versioning or timestamps for conflict resolution

⁍ Sync logic must:
⟶ never block core Ops flows
⟶ never delay UI responsiveness

⁍ Offline correctness **always outranks freshness**

**Security and Privacy**

⁍ Never store authentication tokens or backend credentials locally

⁍ For highly sensitive fields:
⟶ design optional encryption-at-rest support
⟶ encryption may be deferred for MVP, but must be architected

⁍ Never expose:
⟶ raw SQL
⟶ stack traces
⟶ internal errors
⟶ logs or IDs visible to users

⁍ Provide mechanisms for secure data wiping:
⟶ account deletion
⟶ panic reset
⟶ full local reset

**Migration and Schema Evolution**

⁍ Version all database schemas explicitly

⁍ Apply migrations in a controlled, forward-only manner

⁍ Migration scripts must:
⟶ be idempotent
⟶ handle missing or legacy schemas gracefully

⁍ Never require manual intervention or user action for migrations

**Testing and Validation**

⁍ Write unit tests for:
⟶ CRUD operations
⟶ migration logic

⁍ Test edge cases including:
⟶ full local storage
⟶ interrupted writes
⟶ offline-first correctness

⁍ Validate indexes on large tables to avoid degraded performance

**Code Examples**

| Best Practice | Positive Example | Negative Example (What to Avoid) |
|---|---|---|
| Clear schema definition | CREATE TABLE session ( id INTEGER PRIMARY KEY AUTOINCREMENT, ops\_mode TEXT NOT NULL, started\_at TEXT DEFAULT (datetime('now')), is\_active INTEGER DEFAULT 1 ); | CREATE TABLE Sessions ( id, mode, dateStarted ); |
| Parameterized queries | db.executeSql('INSERT INTO session (ops\_mode, started\_at) VALUES (?, ?)', \[mode, startedAt\]); | db.executeSql('INSERT INTO session VALUES (' + mode + ', ' + startedAt + ')'); |
| Safe migrations | if (oldVersion < 2) { db.executeSql('ALTER TABLE session ADD COLUMN duration INTEGER DEFAULT 0'); } | Running raw ALTER statements without version checks |
| AsyncStorage used only for flags | AsyncStorage.setItem('low\_stimulation\_mode', 'true'); | Storing session or report JSON blobs in AsyncStorage |

**Common Mistakes to Avoid**

⁍ Mixing critical and ephemeral data in the same storage layer

⁍ Building SQL queries with string concatenation

⁍ Skipping error handling in offline flows

⁍ Failing to version schemas and migrations

⁍ Forgetting to index frequently filtered or sorted columns

⁍ *Example*:
CREATE INDEX idx\_session\_started\_at ON session(started\_at);\\

⁍ Ignoring future encryption needs for sensitive data.

**Supporting Tools and Processes**

⁍ Use expo-sqlite for SQLite access in React Native

⁍ For migrations:
⟶ use versioned scripts or a lightweight migration helper
⟶ never rely on manual updates

⁍ Lint and statically analyze SQL sources for unsafe patterns

⁍ Automate schema tests and CRUD validation in CI

⁍ Periodically audit stored data for sensitivity and encryption readiness

**References and Additional Resources**

⁍ Expo SQLite Documentation

⁍ AsyncStorage Docs

⁍ SQLite Datatypes

⁍ OWASP SQL Injection Prevention

⁍ React Native SQLite Migration Examples

## Navigation & Routing Guidelines
This guideline defines how navigation and routing behave across Grief Ops Suite. This system operates in emotionally volatile, cognitively impaired, and high-risk states. Navigation is not a convenience layer—it is a containment mechanism.

Routing decisions prioritize user safety, cognitive load reduction, and operational continuity over flexibility, exploration, or customization. If navigation freedom conflicts with survival or stabilization, freedom loses.

**Overview & Purpose**

This guideline exists to ensure:

⁍ Navigation never increases distress, confusion, or abandonment risk

⁍ Users are not exposed to unnecessary choices during crisis states

⁍ Ops Mode flows cannot be accidentally exited, skipped, or broken

⁍ Every route has a clear reason, permission boundary, and exit strategy

The system assumes the user **may not be thinking clearly**. Navigation must think *for them* until stability returns.

**Routing Rules & Standards**

**Centralized Navigation Control**

⁍ All navigation is declared and controlled from a single configuration source (e.g. AppNavigator.tsx).

⁍ Navigation guards, mode checks, and route permissions are enforced **before** transitions occur.

⁍ Route access logic lives in middleware or guard functions—not scattered across components.

Navigation logic must be **predictable, reviewable, and testable**.

**Mode-Aware Navigation Guardrails**

⁍ Every route explicitly declares:

⟶ Which Ops Modes may access it

⟶ Whether back navigation is allowed

⟶ Whether exit confirmation is required

⁍ *Example route metadata*:


{
name: 'NightWatchPanicScreen',
component: NightWatchPanicScreen,
allowedModes: \['NightWatch'\],
allowBack: false,
requiresConfirmationToExit: true
}

⁍ Attempting to navigate to a forbidden route must:

⟶ Block the transition

⟶ Display a **containment message**, not a generic error

⟶ Explain *why* movement is restricted

The system never silently decides a user is “fine” and unlocks routes.

**Custom Exit & Back Handling**

⁍ Default platform back gestures and hardware back buttons are **not trusted**.

⁍ All exit behavior is explicitly overridden using app-level handlers.

⁍ In crisis or modal flows:

⟶ Back gestures are disabled unless explicitly allowed

⟶ Exit requires confirmation or completion of a stabilizing step

No invisible exits. No accidental abandonment.

**Progress Preservation & State-Safe Routing**

⁍ Before any route transition:

⟶ Persist critical state to local SQLite

⟶ Confirm write success

⁍ If persistence fails:

⟶ Navigation is blocked

⟶ The user is informed

⟶ Recovery options are presented

Navigation must **never risk data loss** in exchange for speed.

**Minimal Route Surface**

⁍ During crisis states:

⟶ Hide non-essential navigation

⟶ Suppress menus, drawers, and optional paths

⟶ Present only the **next survivable action**

Navigation should feel **narrow, intentional, and steady**—not expansive.

**Intuitive Containment Messaging**

When navigation is restricted, the system must explain it plainly.

Examples:

⁍ “This flow isn’t safe to exit yet.”

⁍ “Finish stabilization before leaving Night Watch.”

⁍ “We’ll unlock navigation once this step is complete.”

No shame. No vagueness. No “Access Denied.”

**Accessibility & Low-stimulation Considerations**

⁍ Route transitions must be instant or use minimal fade.

⁍ Respect system “reduce motion” settings at all times.

⁍ Never present:

⟶ “Route not found” pages

⟶ Raw error screens

⟶ Dead-end states

All failures reroute to a **known, safe screen**.

**Security & Privacy**

⁍ Before exiting an Ops Mode:

⟶ Clear sensitive runtime state from navigation context

⟶ Prevent panic triggers or session data from leaking into other routes

⁍ Crisis routes must never be deep-linkable from external sources.

**Code Examples**

| Example: Mode-aware Route Guard | Positive Implementation | Negative Anti-pattern |
|---|---|---|
| Custom middleware to block navigation by operational state: | function canNavigate(targetRoute, userState) { if (!targetRoute.allowedModes.includes(userState.currentMode)) { return false; } return true; }  onNavigate = (targetRoute) => { if (!canNavigate(targetRoute, userState)) { showContainmentMessage("Navigation disabled in this mode."); return; } navigate(targetRoute.name); } | // Not checking mode, always allowing navigate(routeName); |
| Example: Confirmation Before Exit | Positive Implementation | Negative Anti-pattern |
| Prompting users before critical route change: | if (route.requiresConfirmationToExit) { showExitConfirmModal({ onConfirm: () => actuallyNavigateExit(), onCancel: () => null }); } | // Immediate exit with no check or prompt navigate('HomeScreen'); |
| Example: Persisting State on Navigation | Positive Implementation | Negative Anti-pattern |
| Making sure local data is saved before navigating away: | await saveSessionStateToSQLite(sessionData); navigate('NextStep'); | navigate('NextStep'); // Data loss risk! |

**Common Mistakes to Avoid**

⁍ Allowing default back gestures to override Ops Mode rules

⁍ Exposing navigation menus during crisis states

⁍ Allowing exit with a single accidental gesture

⁍ Blocking navigation without explaining why

⁍ Trusting network state for routing decisions

If navigation breaks containment, it’s a bug—not a UX choice.

**Supporting Tools & Processes**

⁍ Use React Navigation with custom guards and middleware.

⁍ Write unit and integration tests for every critical navigation path.

⁍ Test navigation under:

⟶ Offline conditions

⟶ App restarts

⟶ Forced interruptions

⁍ Conduct peer reviews focused on **cognitive load and abandonment risk**.

**References & Further Reading**

⁍ React Navigation Documentation

⁍ Intentional Navigation Patterns (Stripe)

⁍ Designing for Crisis UX

## Userdoc Guidelines
First, you have to check you can connect to a Userdoc MCP server if you cannot connect to the MCP stop immediately and respond with "I cannot access Userdoc".

This guide indicates how you MUST implement dev plans from markdown documents. These documents will start with "Userdoc Dev Plan"

You will be given dev plans which are markdown documents that contain all of the steps you need to implement an epic within the system. Ensure when you are implementing the plan you DO NOT effect any code that is not effected by the epic within the dev plan.

Within the dev plan there will be "#" which are requirements in Userdoc - you MUST retrieve those requirements via MCP to get their full details.

Features ALWAYS map to a Userdoc Requirement through the "#"

### Dev Plan vs Userdoc Requirements Resolution
1. **If a Userdoc requirement references a feature via the # such as (#Something) that is NOT mentioned in the current dev plan:**
    - you MUST search the codebase to see if that feature has been implemented already if so then use the referenced feature accordingly
      Example: You are implementing #Feature A which redirects to #Feature B on completion, and #Feature B is NOT being implemented in the epic. You MUST search the codebase and find #Feature B does exist. Therefore, when implementing #Feature A setup the redirect to #Feature B
    - IF the feature has not already been implemented in the codebase:
      - MUST add a comment in the code: `UD-REF: #Something - will be implemented in future epic`
      Example: // UD-REF: #Feature B
      - Implement a temporary placeholder/mock behavior for the current epic
      - Do NOT implement the missing feature

2. **If the Dev plan contradicts a Userdoc requirement:**
    - Follow the Dev plan for the current epic
    - Add a comment noting the discrepancy for future resolution

3. **Priority order:**
    - Dev plan scope defines what gets built in THIS epic
    - Userdoc requirements define the final behavior
    - Missing references get deferred with UD-REF comments

So for the Patient Login, the correct approach would be:
- Implement a temporary success message or placeholder redirect
- Add comment: // UD-REF: #Patient Dashboard - will be implemented in future epic
- Follow the dev plan's scope for this epic

### Implementing Future Features

#### 🔍 **TRIGGER PATTERN RECOGNITION**
**AUTOMATICALLY trigger the following process when you encounter ANY heading that matches this pattern:**

**Pattern:** `# [number]. #[RequirementName]`

**Examples that trigger this process:**
- `# 1. #Patient Dashboard`
- `# 2. #Service Provider Login`
- `# 3. #Appointment Management`
- `# 4.1 #Profile Management`

**Recognition Rules:**
- Starts with `#` (h1 heading)
- Contains a number (can include decimals like `1.1` or `2.3`)
- Contains a period after the number
- Contains another `#` symbol followed by the requirement name
- The requirement name after `#` is the Userdoc requirement identifier

#### 🚀 **MANDATORY IMPLEMENTATION PROCESS**
**When implementing ANY feature that matches the trigger pattern above:**

1. **Before starting implementation of any new feature:**
   - Search the entire codebase for `UD-REF: #RequirementName` comments
   - Create a list of all places that reference the new feature being implemented

2. **During implementation:**
   - For each UD-REF comment found that matches the current feature:
   - Replace the temporary placeholder/mock behavior with the actual implementation
   - Remove the `UD-REF: #RequirementName` comment
   - Link the existing code to the newly created feature
   - Do not add a comment

3. **Search strategy:**
   - Use grep/search tools to find: `UD-REF: #FeatureName`
   - Check all file types: `.tsx`, `.ts`, `.js`, `.jsx`
   - Look in comments, TODOs, and code documentation

4. **Example workflow:**
   ```bash
   # When implementing Patient Dashboard in a future epic:
   grep -r "UD-REF: #Patient Dashboard" . --include="*.tsx" --include="*.ts"

   # Results might show:
   # ./app/patient/login/page.tsx: // UD-REF: #Patient Dashboard - will be implemented in future epic
   # ./app/patient/profile/page.tsx: // UD-REF: #Patient Dashboard - will be implemented in future epic
   ```

5. **Update process:**
   - Replace temporary redirects with actual navigation to the new feature
   - Update placeholder text/alerts with real functionality
   - Ensure all connected flows work end-to-end
   - Test that the previously deferred functionality now works properly

#### ⚠️ **CRITICAL REMINDER**
**EVERY TIME you see a heading like `# 1. #Patient Dashboard`, you MUST:**
1. Recognize this as a Userdoc requirement implementation
2. Search for existing `UD-REF: #Patient Dashboard` comments
3. Follow the complete implementation process above
4. Connect all previously deferred functionality
