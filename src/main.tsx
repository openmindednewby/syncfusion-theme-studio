import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { initializeSyncfusion } from '@config/syncfusion';

import { App } from './app/App';

import './styles/index.css';

// Initialize Syncfusion license
initializeSyncfusion();

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
