# 🚀 Git Branch Plan – DRUT

This is the branching strategy for building DRUT — the fast, browser-only API client.

---

## 🧱 Base Branches

- `main` – Production-ready, stable code only. Direct commits 🔒.
- `dev` – Staging branch for features to merge and cook together.

---

## 🌱 Feature Branches

Each feature gets its own branch from `dev`, named with `feature/` prefix:

### Core Features

- `feature/request-builder`  
  - URL input, method selector, header/body editors

- `feature/response-viewer`  
  - Status, time, headers, response formatting

- `feature/env-context`  
  - Environment management via IndexedDB

- `feature/history-context`  
  - Request history save + view (IndexedDB)

- `feature/theme-toggle`  
  - Light/Dark mode + single-click toggle + persistence

### UI & Layout

- `feature/ui-components`  
  - InputField, Dropdown, Tabs, Button etc.

- `feature/routing`  
  - React Router setup (`/request`, `/history`, `/env`)

---

## 🔬 Testing Branches

- `feature/test-hooks`  
  - Unit tests for `useDrutRequest`, `useStorage`, `useTheme`

- `feature/test-e2e`  
  - E2E tests using Playwright or Cypress

---

## 🛠️ Refactor & Infra

- `chore/indexeddb-migration`  
  - Migrate all localStorage usage to IndexedDB (`localforage`)

- `chore/theme-context-refactor`  
  - Old dark-mode-only → dual-mode support

- `chore/cleanup-bootstrap`  
  - UI polish, consistent styling, remove dead CSS

---

## 🧪 CI/CD

- `feature/ci-pipeline`  
  - Add Vitest, Playwright, lint, bundle size checks in GitHub Actions

---

## 🏁 Release Branches

- `release/v0.1.0`  
  - First MVP release — core request flow + theme + history

- `release/v1.0.0`  
  - Post-refactor with full IndexedDB support and full test suite

---

## 🐞 Bugfix Branches

- `bugfix/history-not-saving`
- `bugfix/theme-not-persisting`
- `bugfix/env-substitution-broken`

---

## 👻 Naming Rules

- Use dashes: `feature/add-this-shit`
- Branches only from `dev`
- Never push direct to `main` — pull request only

---

## 🧼 Merge Rules

- All feature branches → PR to `dev`
- All releases → PR from `dev` → `main`
- PR requires:
  - ✅ Code review
  - ✅ Passing tests
  - ✅ No `console.log`/TODOs
