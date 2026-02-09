import { lazy, Suspense } from 'react';

import { RouterProvider } from 'react-router-dom';

import { QueryClientProvider } from '@tanstack/react-query';

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

export const App = (): JSX.Element => (
  <I18nProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {isValueDefined(ReactQueryDevtools) ? (
        <Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      ) : null}
    </QueryClientProvider>
  </I18nProvider>
);
