import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cesium from 'vite-plugin-cesium';

// Tuned for the Vercel Sandbox proxy:
//  - bind 0.0.0.0, fixed port, allow proxied host
//  - HMR off (websockets unreliable through the proxy; full reload still works)
//  - vite-plugin-cesium wires Cesium static assets (Workers/Assets/Widgets)
export default defineConfig({
  plugins: [react(), cesium()],
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
