# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## 1. 4-layer architecture

```
src/
  apis/        <- API layer: raw axios calls only, no state, no error handling
    axiosInstance.js
    user.api.js
  hooks/       <- Hook layer: calls the API layer, handles loading/errors,
                   writes results into the state layer
    useAuth.js
    useChat.js
  context/     <- State layer: shared data that many components read
    AuthContext.jsx     (user, isAuth, isUploaded)
    ChatContext.jsx      (chatMessages, headerStatus)
    LoadingContext.jsx   (app-wide isLoading, used for the initial session check)
    AppProviders.jsx     (combines all three — wrap your app with this once)
  components/  <- UI layer
    AuthModal.jsx   (renamed from Auth.jsx)
  pages/       <- UI layer
    Home.jsx
    Login.jsx
    Dashboard.jsx
```

Rule of thumb: pages/components never call `apis/*` directly and never hold
shared data in local `useState` — they call a hook (`useAuth`, `useChat`) and
read shared data from context (`useAuthContext`, `useChatContext`,
`useLoading`). Anything that's genuinely local to one screen (e.g. the text
box value, which file input is open) still lives in the component itself.

## 2. Wiring it up

Wrap your app once, near the root (e.g. `main.jsx`):

```jsx
import AppProviders from './context/AppProviders';

<AppProviders>
  <App />
</AppProviders>
```

Update the import in `Dashboard.jsx` if your router file expects the old
path — it now imports the modal from `../components/AuthModal` instead of
`../components/Auth`.

## 3. Bugs fixed along the way (functionality unchanged otherwise)

- `user.api.js` was calling `axios.create(...)` without importing `axios` —
  this would have crashed at runtime. Now goes through `apis/axiosInstance.js`.
- `Home.jsx` had no `export default`, so nothing could import it.
- Chat input used the deprecated `onKeyPress`; switched to `onKeyDown`.
- Chat panel now auto-scrolls to the latest message.

## 4. Styling

Everything now uses Tailwind utility classes (no inline `style={{...}}`
objects), with a small warm "paper + ink + highlighter amber" palette:
`#F6F4EE` (paper), `#16233A` (ink), `#F2A93B` (highlighter accent). This
assumes Tailwind is already configured in your project (`tailwind.config.js`
+ the `@tailwind` directives in your global CSS) — if it isn't yet, run
`npx tailwindcss init -p` and add the standard content globs pointing at
`./src/**/*.{js,jsx}`.

The chat window is wider (`max-w-3xl`, was `max-w-800px`≈`max-w-3xl` already
but the bubbles/padding were cramped) and taller (`h-[640px]`), with clearer
bubble styling, a typing indicator, and an auto-scrolling message list.

None of the backend endpoints, request payloads, or response shapes were
changed — only how the frontend calls and organizes them.
