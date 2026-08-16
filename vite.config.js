import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cesium from 'vite-plugin-cesium';
import { chatLiveProxyPlugin } from './server/chatLiveProxy.js';
import { avmLiveProxyPlugin } from './server/avmLiveProxy.js';
import { mediaLiveProxyPlugin } from './server/mediaLiveProxy.js';

// Tuned for the Vercel Sandbox proxy:
//  - bind 0.0.0.0, fixed port, allow proxied host
//  - HMR off (websockets unreliable through the proxy; full reload still works)
//  - vite-plugin-cesium wires Cesium static assets (Workers/Assets/Widgets)
//  - chatLiveProxyPlugin wires /api/chat/* to the live OnDemand Chat & Agent
//    Tools API in dev/sandbox, mirroring api/chat/[action].js in production
//  - avmLiveProxyPlugin wires /api/avm/* (health/session/turn/speak + TTS/STT)
//    so OPEN THE NET works on the copied sandbox host, not only on Vercel
export default defineConfig({
  base: '/',
  plugins: [react(), cesium(), chatLiveProxyPlugin(), avmLiveProxyPlugin(), mediaLiveProxyPlugin()],
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
    assetsDir: 'assets',
  },
  publicDir: 'public',
});
