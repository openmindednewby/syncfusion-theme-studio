import { RouterProvider } from 'react-router-dom';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { useThemeInitializer } from '@/stores/useThemeStore';

import { I18nProvider } from './providers/I18nProvider';
import { queryClient } from './providers/QueryProvider';
import { router } from './routes';

const IS_DEVELOPMENT = Boolean(import.meta.env.DEV);

export const App = (): JSX.Element => {
  // Initialize theme on app load
  useThemeInitializer();

  return (
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {IS_DEVELOPMENT ? <ReactQueryDevtools initialIsOpen={false} /> : null}
      </QueryClientProvider>
    </I18nProvider>
  );
};
