import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { App } from './app/App';

// Login-only CSS (no Syncfusion) - enables faster FCP on login page
// Syncfusion CSS is loaded lazily in MainLayout for protected routes
import './styles/login.css';

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
