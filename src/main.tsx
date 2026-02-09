import { StrictMode, Suspense, lazy } from 'react';

import { createRoot } from 'react-dom/client';

// Login-only CSS (no Syncfusion) - enables faster FCP on login page
// Syncfusion CSS is loaded lazily in MainLayout for protected routes
import './styles/login.css';

// Lazy load App to defer React Router loading
// This allows the CSS spinner to show while JS downloads
const App = lazy(async () => import('./app/App').then((m) => ({ default: m.App })));

// Minimal fallback while App loads - matches the inline CSS spinner style
const AppLoading = (): JSX.Element => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        width: 40,
        height: 40,
        border: '3px solid #e5e7eb',
        borderTopColor: '#3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    />
  </div>
);

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <Suspense fallback={<AppLoading />}>
      <App />
    </Suspense>
  </StrictMode>
);
