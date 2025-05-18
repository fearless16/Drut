# 📄 **Drut – SRS (Software Requirements Specification)**

---

## 1. **Project Overview**

**Name:** Drut
**Tagline:** *Drut – for developers who don't wait*
**Purpose:**
A lightweight, browser-based API client for RESTful API testing, designed for developers who want speed, minimal UI, and no RAM-sucking bullshit.
**Primary Goal:**
MVP that allows sending HTTP requests with minimal latency, zero setup, and an interface that doesn’t get in the way.

---

## 2. **Functional Requirements**

### 🔧 Core Features

* Request builder with:

  * URL input
  * Method selector (GET, POST, PUT, DELETE, etc.)
  * Header editor (key-value format)
  * Body input (raw JSON / text / XML)
* Response viewer

  * Status code, response time
  * Pretty-printed response
  * Headers view

### 💾 Storage

* Request history (stored in LocalStorage)
* Environment support (key-value pairs for reuse)
* Optional request naming

### 🧑‍💻 UI

* Dark mode by default
* Bootstrap-based with React-Bootstrap components
* Minimalist, keyboard-friendly interface
* Theme support for **light and dark mode**
* Single-click toggle between themes
* Preferred theme stored using IndexedDB (localforage)


### 🔐 Security & Privacy

* All operations run in browser
* No data leaves user's device
* No backend

---

## 3. **Non-Functional Requirements**

* ✅ Fast load (< 1s)
* ✅ Minimal bundle size (< 500KB)
* ✅ Works offline (optional PWA phase)
* ✅ Cross-browser compatible
* ✅ Should work with keyboard-only navigation

---

## 4. **Constraints**

* No backend
* No third-party state library
* Data must persist locally (LocalStorage)

---

## 5. **Dependencies**

* React 19 (TypeScript)
* Vite + Bun
* React Router v7
* Bootstrap + React-Bootstrap
* React Query
* ESLint + Prettier
* Husky + lint-staged
* Vitest

---
