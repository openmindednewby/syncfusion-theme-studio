/**
 * Event type definitions for the API event bus.
 *
 * These events are emitted by the Axios interceptor layer and
 * consumed by React components via the useApiEvents hook.
 */

import type { ErrorSeverity } from '../errors/errorTypes';

/** Toast notification event */
interface ToastEvent {
  type: 'toast';
  severity: ErrorSeverity;
  message: string;
  duration?: number;
}

/** Modal dialog event */
interface ModalEvent {
  type: 'modal';
  modalComponent: string;
  message: string;
  severity: ErrorSeverity;
  data?: Record<string, unknown>;
}

/** Navigation redirect event */
interface RedirectEvent {
  type: 'redirect';
  target: string;
  message?: string;
}

/** Session expired event (triggers logout flow) */
interface SessionExpiredEvent {
  type: 'session-expired';
}

/** Maintenance mode event (shows maintenance UI) */
interface MaintenanceModeEvent {
  type: 'maintenance-mode';
  estimatedEnd?: string;
}

/** Union of all API events that can be emitted */
type ApiEvent =
  | ToastEvent
  | ModalEvent
  | RedirectEvent
  | SessionExpiredEvent
  | MaintenanceModeEvent;

/** All possible API event type discriminators */
type ApiEventType = ApiEvent['type'];

export type {
  ToastEvent,
  ModalEvent,
  RedirectEvent,
  SessionExpiredEvent,
  MaintenanceModeEvent,
  ApiEvent,
  ApiEventType,
};
