import { lazy, Suspense, useEffect, useState } from 'react';

import { RouterProvider } from 'react-router-dom';

import { QueryClientProvider } from '@tanstack/react-query';

import { ToastProvider } from '@/components/ui/native';
import { apiClient, registerInterceptors, ApiEventsProvider } from '@/lib/api';
import { isValueDefined } from '@/utils/is';

import { I18nProvider } from './providers/I18nProvider';
import { queryClient } from './providers/QueryProvider';
import { router } from './router';

// Register interceptors once at bootstrap
registerInterceptors(apiClient);

const IS_DEVELOPMENT = Boolean(import.meta.env.DEV);

// Lazy load devtools to keep them off the critical path (~86KB)
const ReactQueryDevtools = IS_DEVELOPMENT
  ? lazy(async () => ({
      default: (await import('@tanstack/react-query-devtools')).ReactQueryDevtools,
    }))
  : null;

// Lazy load PWA components — deferred until after initial paint (see useDeferredMount below)
const PWAUpdatePrompt = lazy(async () =>
  import('@/components/common/components/PWAUpdatePrompt').then((m) => ({ default: m.PWAUpdatePrompt })),
);
const PWAInstallPrompt = lazy(async () =>
  import('@/components/common/components/PWAInstallPrompt').then((m) => ({ default: m.PWAInstallPrompt })),
);
const OfflineIndicator = lazy(async () =>
  import('@/components/common/components/OfflineIndicator').then((m) => ({ default: m.OfflineIndicator })),
);

/** Defers mounting until the browser is idle, keeping children off the critical rendering path. */
function useDeferredMount(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestIdleCallback(() => setReady(true));
    return () => cancelIdleCallback(id);
  }, []);

  return ready;
}

export const App = (): JSX.Element => {
  const isPastInitialPaint = useDeferredMount();

  return (
    <I18nProvider>
      <ToastProvider>
        <ApiEventsProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            {isPastInitialPaint ? (
              <>
                <Suspense fallback={null}>
                  <PWAUpdatePrompt />
                </Suspense>
                <Suspense fallback={null}>
                  <PWAInstallPrompt />
                </Suspense>
                <Suspense fallback={null}>
                  <OfflineIndicator />
                </Suspense>
              </>
            ) : null}
            {isValueDefined(ReactQueryDevtools) ? (
              <Suspense fallback={null}>
                <ReactQueryDevtools initialIsOpen={false} />
              </Suspense>
            ) : null}
          </QueryClientProvider>
        </ApiEventsProvider>
      </ToastProvider>
    </I18nProvider>
  );
};
