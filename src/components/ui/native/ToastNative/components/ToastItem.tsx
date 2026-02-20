import { memo } from 'react';

import { CLOSE_ICON, SEVERITY_ICONS } from '../types';

import type { Toast } from '../types';

interface Props {
  toast: Toast;
  onDismiss: (id: string) => void;
}

export const buildToastClassName = (toast: Toast): string => {
  const base = `native-toast native-toast-${toast.severity}`;
  if (toast.dismissing === true) return `${base} native-toast-dismissing`;
  return base;
};

const ToastItem = memo(({ toast, onDismiss }: Props): JSX.Element => (
  <div className={buildToastClassName(toast)} role="alert">
    <span className="native-toast-icon">{SEVERITY_ICONS[toast.severity]}</span>
    <div className="native-toast-content">
      <div className="native-toast-title">{toast.title}</div>
      <div className="native-toast-message">{toast.message}</div>
    </div>
    <button
      aria-label="Dismiss notification"
      className="native-toast-close"
      type="button"
      onClick={() => onDismiss(toast.id)}
    >
      {CLOSE_ICON}
    </button>
    {toast.dismissing !== true && <div className="native-toast-progress" />}
  </div>
));

ToastItem.displayName = 'ToastItem';

export default ToastItem;
