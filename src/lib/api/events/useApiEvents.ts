/**
 * React hook that subscribes to the API event bus and dispatches
 * UI side-effects (toasts, modals, redirects, session-expired, maintenance).
 *
 * Must be used inside a component tree that has access to ToastProvider.
 * Auth mechanism (JWT vs httpOnly cookies) is TBD — session-expired
 * currently just redirects to the login page without clearing tokens.
 */

import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useToast, ToastSeverity } from '@/components/ui/native';
import type { ToastContextValue } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

import { apiEventBus } from './apiEventBus';
import { ErrorSeverity } from '../errors/errorTypes';

import type { ApiEvent, ModalEvent } from './apiEventTypes';

const LOGIN_PATH = '/';

/** Map ErrorSeverity to ToastSeverity for the native toast system */
const SEVERITY_MAP: Record<string, ToastSeverity> = {
  [ErrorSeverity.Info]: ToastSeverity.Info,
  [ErrorSeverity.Warning]: ToastSeverity.Warning,
  [ErrorSeverity.Error]: ToastSeverity.Error,
};

/** Map ErrorSeverity to i18n title keys */
const SEVERITY_TITLE_KEYS: Record<string, string> = {
  [ErrorSeverity.Info]: 'errors.infoTitle',
  [ErrorSeverity.Warning]: 'errors.warningTitle',
  [ErrorSeverity.Error]: 'errors.errorTitle',
};

function mapSeverity(severity: ErrorSeverity): ToastSeverity {
  return SEVERITY_MAP[severity] ?? ToastSeverity.Error;
}

function resolveTitleForSeverity(severity: ErrorSeverity): string {
  const key = SEVERITY_TITLE_KEYS[severity];
  return isValueDefined(key) ? FM(key) : FM('errors.errorTitle');
}

/**
 * Resolve the display message. If the message looks like an i18n key
 * (contains a dot and no spaces), run it through FM(). Otherwise use as-is.
 */
function resolveDisplayMessage(message: string): string {
  const looksLikeI18nKey = message.includes('.') && !message.includes(' ');
  return looksLikeI18nKey ? FM(message) : message;
}

interface UseApiEventsResult {
  /** The currently visible modal event, or null */
  activeModal: ModalEvent | null;
  /** Dismiss the currently active modal */
  dismissModal: () => void;
}

function handleToastEvent(event: ApiEvent, toast: ToastContextValue): void {
  if (event.type !== 'toast') return;

  toast.addToast({
    severity: mapSeverity(event.severity),
    title: resolveTitleForSeverity(event.severity),
    message: resolveDisplayMessage(event.message),
  });
}

function handleRedirectEvent(event: ApiEvent): void {
  if (event.type !== 'redirect') return;
  if (typeof window !== 'undefined')
    window.location.href = event.target;
}

function handleSessionExpired(toast: ToastContextValue): void {
  // TODO: Clear auth state when auth mechanism is decided (JWT vs httpOnly cookies)
  toast.addToast({
    severity: ToastSeverity.Error,
    title: FM('errors.errorTitle'),
    message: FM('errors.sessionExpired'),
  });
  if (typeof window !== 'undefined')
    window.location.href = LOGIN_PATH;
}

function buildMaintenanceModal(event: ApiEvent): ModalEvent | null {
  if (event.type !== 'maintenance-mode') return null;
  return {
    type: 'modal',
    modalComponent: 'MaintenanceModal',
    message: FM('errors.maintenanceMode'),
    severity: ErrorSeverity.Warning,
    data: { estimatedEnd: event.estimatedEnd },
  };
}

function createEventHandler(
  toastRef: React.RefObject<ToastContextValue>,
  setModal: React.Dispatch<React.SetStateAction<ModalEvent | null>>,
): (event: ApiEvent) => void {
  return function handleEvent(event: ApiEvent): void {
    const toast = toastRef.current;
    if (!isValueDefined(toast)) return;

    switch (event.type) {
      case 'toast':
        handleToastEvent(event, toast);
        break;
      case 'modal':
        setModal(event);
        break;
      case 'redirect':
        handleRedirectEvent(event);
        break;
      case 'session-expired':
        handleSessionExpired(toast);
        break;
      case 'maintenance-mode': {
        const modal = buildMaintenanceModal(event);
        if (isValueDefined(modal)) setModal(modal);
        break;
      }
      default:
        break;
    }
  };
}

/**
 * Subscribe to the API event bus and route events to the appropriate
 * UI handler. Returns the current active modal for rendering.
 */
function useApiEvents(): UseApiEventsResult {
  const toast = useToast();
  const [activeModal, setActiveModal] = useState<ModalEvent | null>(null);
  const toastRef = useRef(toast);
  toastRef.current = toast;

  const dismissModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  useEffect(() => {
    const handler = createEventHandler(toastRef, setActiveModal);
    return apiEventBus.subscribe(handler);
  }, []);

  return { activeModal, dismissModal };
}

export { useApiEvents };
export type { UseApiEventsResult };
