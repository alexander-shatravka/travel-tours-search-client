# Tour Search SPA

React 19 + Vite + TypeScript strict + Zustand + TanStack Query + Tailwind v4 + React Router v7.

## Mock API

The `_api/` folder contains a browser-only mock API (`api.js`) that simulates a backend with in-memory data. It lives outside `src/` intentionally — it is not part of the client app.

See [`_api/README.md`](./_api/README.md) for the full API reference.

`src/service/api.ts` is an adapter over `_api/api.js` — it parses `Response` objects, adds TypeScript types, and is the only entry point the app uses to talk to the mock API.