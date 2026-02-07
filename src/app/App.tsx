import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './providers/QueryProvider';
import { router } from './routes';
import { useThemeInitializer } from '@/stores/useThemeStore';

export function App(): JSX.Element {
  // Initialize theme on app load
  useThemeInitializer();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
