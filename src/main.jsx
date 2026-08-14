import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/600.css';
import App from './App.jsx';
import './styles.css';

// Cesium static-asset base (vite-plugin-cesium sets this in dev/build; this is a
// defensive fallback for production static hosting).
if (typeof window !== 'undefined' && !window.CESIUM_BASE_URL) {
  window.CESIUM_BASE_URL = '/cesium/';
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
