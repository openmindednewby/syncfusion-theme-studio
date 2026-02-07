import { QueryClient } from '@tanstack/react-query';

const STALE_TIME_MS = 60000; // 1 minute
const GC_TIME_MS = 300000; // 5 minutes

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME_MS,
      gcTime: GC_TIME_MS,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
