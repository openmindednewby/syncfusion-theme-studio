import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

// Login-only CSS (no Syncfusion) - enables faster FCP on login page
// Syncfusion CSS is loaded lazily in MainLayout for protected routes
import './styles/login.css';

// Direct import — eliminates a lazy-load waterfall hop.
// The inline CSS spinner in index.html (#root:empty::after) provides
// visual feedback while this JS bundle downloads and executes.
import { App } from './app/App';

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
