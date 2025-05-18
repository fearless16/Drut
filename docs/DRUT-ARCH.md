
# 🧱 **Drut – Architecture Document**

## 1. **High-Level Architecture**

```
Browser
│
├── UI (React 19 + Bootstrap)
│   ├── RequestBuilder
│   ├── ResponseViewer
│   ├── HeaderEditor
│   ├── BodyEditor
│   └── ThemeSwitcher
│
├── State (React Context + LocalStorage)
│   ├── ThemeContext (with light/dark support)
│   ├── HistoryContext (using IndexedDB)
│   └── EnvironmentContext (using IndexedDB)
│
├── Networking
│   ├── requestHandler.ts (fetch wrapper)
│   └── React Query hooks
│
└── Routing
    ├── /request
    ├── /history
    └── /env
```

---

## 2. **Module Breakdown**

### 🔸 UI Layer (`/components`)

* Stateless, controlled components
* Reusable (InputField, Dropdown, etc.)

### 🔸 Pages Layer (`/pages`)

* Route-driven parent components (Home, History, Request)

### 🔸 Context Layer (`/context`)

* Global state providers for theme, saved requests, envs

### 🔸 Lib Layer (`/lib`)

* `requestHandler.ts`: handles actual API calls using fetch
* Error normalization and parsing logic

### 🔸 Hooks (`/hooks`)

* `useDrutRequest()`: powered by React Query
* `useDarkMode()`: toggle & save theme state
* `useIndexedDB()` or useStorage() (wrap localforage)

---

## 3. **Data Flow**

1. User builds request → Form state stored in local state
2. Hits “Send” → `requestHandler` sends API call via `fetch`
3. Response captured → Passed to ResponseViewer
4. Optionally saved to IndexedDB via localforage
5. All UI updates via React state/contexts

---

## 4. **Security Concerns**

* CORS is browser-controlled — no hacks
* No backend = no server-side vulnerability
* LocalStorage = exposed but isolated per origin

---

## 5. **Scalability Thoughts**

> If project grows:

* Switch to IndexedDB (via `localforage`) for complex storage
* Add export/import for saved data
* Support WebSocket/GraphQL (separate tabs/routes)
* Component registry (like shadcn/ui if Bootstrap limits)

---

