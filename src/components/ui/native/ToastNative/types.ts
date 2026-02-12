import { ToastSeverity } from './toastSeverity';

export { ToastSeverity };

export interface Toast {
  id: string;
  severity: ToastSeverity;
  title: string;
  message: string;
  dismissing?: boolean;
}

export interface AddToastOptions {
  severity: ToastSeverity;
  title: string;
  message: string;
}

export interface ToastContextValue {
  addToast: (options: AddToastOptions) => void;
}

export const AUTO_DISMISS_MS = 5000;
export const EXIT_ANIMATION_MS = 300;
export const MAX_VISIBLE_TOASTS = 5;

export const SEVERITY_ICONS: Record<ToastSeverity, string> = {
  [ToastSeverity.Success]: '\u2713',
  [ToastSeverity.Warning]: '\u26A0',
  [ToastSeverity.Error]: '\u2717',
  [ToastSeverity.Info]: '\u2139',
};

export const CLOSE_ICON = '\u2715';
