import { lazy, Suspense } from 'react';

import { RouterProvider } from 'react-router-dom';

import { QueryClientProvider } from '@tanstack/react-query';

import { OfflineIndicator } from '@/components/common/OfflineIndicator';
import { isValueDefined } from '@/utils/is';

import { I18nProvider } from './providers/I18nProvider';
import { queryClient } from './providers/QueryProvider';
import { router } from './routes';

const IS_DEVELOPMENT = Boolean(import.meta.env.DEV);

// Lazy load devtools to keep them off the critical path (~86KB)
const ReactQueryDevtools = IS_DEVELOPMENT
  ? lazy(async () => ({
      default: (await import('@tanstack/react-query-devtools')).ReactQueryDevtools,
    }))
  : null;

// Lazy load PWA components to keep them off the critical path
const PWAUpdatePrompt = lazy(async () =>
  import('@/components/common/PWAUpdatePrompt').then((m) => ({ default: m.PWAUpdatePrompt })),
);
const PWAInstallPrompt = lazy(async () =>
  import('@/components/common/PWAInstallPrompt').then((m) => ({ default: m.PWAInstallPrompt })),
);

export const App = (): JSX.Element => (
  <I18nProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Suspense fallback={null}>
        <PWAUpdatePrompt />
      </Suspense>
      <Suspense fallback={null}>
        <PWAInstallPrompt />
      </Suspense>
      <OfflineIndicator />
      {isValueDefined(ReactQueryDevtools) ? (
        <Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      ) : null}
    </QueryClientProvider>
  </I18nProvider>
);
