/**
 * Provider component that mounts the useApiEvents hook.
 *
 * Place this inside ToastProvider so that useToast() is available.
 * Currently renders nothing besides children — a modal overlay
 * can be added later when the modal system is implemented.
 *
 * @example
 * <ToastProvider>
 *   <ApiEventsProvider>
 *     <QueryClientProvider client={queryClient}>
 *       <App />
 *     </QueryClientProvider>
 *   </ApiEventsProvider>
 * </ToastProvider>
 */

import type React from 'react';

import { useApiEvents } from './useApiEvents';

interface Props {
  children: React.ReactNode;
}

function ApiEventsProvider({ children }: Props): React.ReactNode {
  // Subscribe to events — the hook handles toast/redirect/session-expired
  // activeModal and dismissModal are available for future modal overlay
  useApiEvents();

  return children;
}

export default ApiEventsProvider;
