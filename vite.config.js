import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cesium from 'vite-plugin-cesium';
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// ---------------------------------------------------------------------------
// Build metadata (v2.1.0 — build-script refactor workstream)
//
// package.json is the single source of truth for the app version. We surface
// it to the bundle through `define` (__APP_VERSION__ & friends) so runtime
// modules can stamp telemetry/logs, and we emit a machine-readable
// dist/build-info.json on every production build so deploy checks, smoke
// tests and dashboards can assert exactly what shipped.
// ---------------------------------------------------------------------------
const here = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(here, 'package.json'), 'utf8'));
const APP_VERSION = pkg.version;
const BUILD_TIME = new Date().toISOString();

// Best-effort commit stamp. Building from a ZIP/archive without .git must
// never fail the build — degrade to 'unknown' instead.
const GIT_COMMIT = (() => {
  try {
    return execSync('git rev-parse --short=12 HEAD', {
      cwd: here,
      stdio: ['ignore', 'pipe', 'ignore'],
    }).toString().trim();
  } catch {
    return 'unknown';
  }
})();

/** Write dist/build-info.json once the production bundle has been emitted. */
function buildInfoPlugin() {
  return {
    name: 'warda-build-info',
    apply: 'build',
    closeBundle() {
      const info = {
        name: pkg.name,
        version: APP_VERSION,
        buildTimeUtc: BUILD_TIME,
        gitCommit: GIT_COMMIT,
        bundler: `vite@${pkg.devDependencies?.vite ?? 'unknown'}`,
      };
      try {
        writeFileSync(join(here, 'dist', 'build-info.json'), `${JSON.stringify(info, null, 2)}\n`);
      } catch (err) {
        // Non-fatal by design: metadata must never break a release build.
        console.warn('[build-info] could not write dist/build-info.json:', err?.message || err);
      }
    },
  };
}

// Tuned for the Vercel Sandbox proxy:
//  - bind 0.0.0.0, fixed port, allow proxied host
//  - HMR off (websockets unreliable through the proxy; full reload still works)
//  - vite-plugin-cesium wires Cesium static assets (Workers/Assets/Widgets)
export default defineConfig({
  plugins: [react(), cesium(), buildInfoPlugin()],
  define: {
    __APP_VERSION__: JSON.stringify(APP_VERSION),
    __BUILD_TIME__: JSON.stringify(BUILD_TIME),
    __GIT_COMMIT__: JSON.stringify(GIT_COMMIT),
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: true,
    hmr: false,
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: true,
  },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 6000,
    sourcemap: false,
  },
});
