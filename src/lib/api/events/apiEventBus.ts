/**
 * Typed singleton event bus for bridging the Axios interceptor
 * layer to React UI components.
 *
 * Since Axios interceptors cannot use React hooks, this event bus
 * provides a clean publish/subscribe mechanism. Interceptors emit
 * events, and a React hook (useApiEvents) subscribes to them.
 */

import type { ApiEvent } from './apiEventTypes';

type ApiEventListener = (event: ApiEvent) => void;

/**
 * A lightweight, typed event emitter for API events.
 * Listener errors are silently caught to prevent one broken
 * listener from affecting others.
 */
class ApiEventBus {
  private listeners = new Set<ApiEventListener>();

  /**
   * Subscribe to API events.
   * @returns An unsubscribe function.
   */
  subscribe(listener: ApiEventListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Emit an API event to all subscribers.
   * Listener errors are silently caught.
   */
  emit(event: ApiEvent): void {
    for (const listener of this.listeners)
      try {
        listener(event);
      } catch {
        // Silently swallow listener errors to prevent cascading failures
      }
  }

  /** Remove all listeners. Useful for cleanup in tests. */
  clear(): void {
    this.listeners.clear();
  }
}

/** Singleton event bus instance shared across the application */
const apiEventBus = new ApiEventBus();

export { apiEventBus, ApiEventBus };
export type { ApiEventListener };
