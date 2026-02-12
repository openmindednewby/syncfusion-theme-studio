import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

import { isValueDefined } from '@/utils/is';
import { logger } from '@/utils/logger';

const STALE_TIME_MS = 60000; // 1 minute
const GC_TIME_MS = 300000; // 5 minutes
const MAX_RETRIES = 1;
const LOG_CONTEXT = 'queryClient';

/** Status codes that should NOT be retried (client errors) */
const CLIENT_ERROR_MIN = 400;
const CLIENT_ERROR_MAX = 499;

interface AxiosLikeError {
  response?: { status: number };
}

function isAxiosLikeError(value: unknown): value is AxiosLikeError {
  if (typeof value !== 'object') return false;
  if (!isValueDefined(value)) return false;
  return 'response' in value;
}

/**
 * Smart retry: skip retries for 4xx client errors (they won't succeed on retry).
 * Only retry network errors and 5xx server errors.
 */
function shouldRetry(failureCount: number, error: Error): boolean {
  if (failureCount >= MAX_RETRIES) return false;

  if (isAxiosLikeError(error) && isValueDefined(error.response)) {
    const status = error.response.status;
    const isClientError = status >= CLIENT_ERROR_MIN && status <= CLIENT_ERROR_MAX;
    if (isClientError) return false;
  }

  return true;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME_MS,
      gcTime: GC_TIME_MS,
      retry: shouldRetry,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      logger.warn(LOG_CONTEXT, `Query failed: ${String(query.queryKey)}`, error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      const key = String(mutation.options.mutationKey ?? 'unknown');
      logger.warn(LOG_CONTEXT, `Mutation failed: ${key}`, error);
    },
  }),
});
