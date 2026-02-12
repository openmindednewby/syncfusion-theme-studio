import { memo } from 'react';

import { createPortal } from 'react-dom';

import ToastItem from './ToastItem';

import type { Toast } from './types';

interface Props {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

const ToastContainer = memo(({ toasts, onDismiss }: Props): JSX.Element | null => {
  if (toasts.length === 0) return null;

  return createPortal(
    <div className="native-toast-container" data-testid="native-toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>,
    document.body,
  );
});

ToastContainer.displayName = 'ToastContainer';

export default ToastContainer;
