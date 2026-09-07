// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages serves a project site from a sub-path
// (https://<user>.github.io/verne-s-adventure-trail/), so the production bundle needs
// base = "/verne-s-adventure-trail/". Local dev and any root-domain host stay at "/".
// CI sets VITE_BASE — see .github/workflows/deploy.yml.
const base = process.env.VITE_BASE ?? "/";

export default defineConfig({
  vite: {
    base,
  },
  // GitHub Pages is static-only: skip Nitro's server/deploy build entirely.
  // Without it, `vite build` emits only `dist/client` and TanStack Start's SPA
  // prerender runs (a Nitro `static` preset build currently crashes with
  // "rolldownOptions.input should not be an html file when building for SSR").
  nitro: false,
  tanstackStart: {
    // Keep routing our SSR error wrapper; the ssr build still runs to drive the
    // SPA-shell prerender even though no server bundle is shipped.
    server: { entry: "server" },
    // Ship a fully client-rendered SPA so the app can live on static-only GitHub
    // Pages (no Node/edge server at runtime). The prerender writes the HTML shell
    // to `dist/client/_shell.html`; the deploy step copies it to index.html and
    // 404.html. Route content renders in the browser.
    spa: { enabled: true },
  },
});
