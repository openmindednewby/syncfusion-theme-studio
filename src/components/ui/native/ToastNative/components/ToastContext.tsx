import { createContext, type ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { isValueDefined } from '@/utils/is';

import ToastContainer from './ToastContainer';
import { AUTO_DISMISS_MS, EXIT_ANIMATION_MS, MAX_VISIBLE_TOASTS } from '../types';

import type { AddToastOptions, Toast, ToastContextValue } from '../types';

const markAsDismissing = (id: string) => (prev: Toast[]): Toast[] =>
  prev.map((t) => (t.id === id ? { ...t, dismissing: true } : t));

const removeById = (id: string) => (prev: Toast[]): Toast[] =>
  prev.filter((t) => t.id !== id);

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const autoDismissTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const exitTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismissToast = useCallback((id: string): void => {
    const existing = autoDismissTimers.current.get(id);
    if (existing) clearTimeout(existing);
    autoDismissTimers.current.delete(id);

    setToasts(markAsDismissing(id));

    const exitTimer = setTimeout(() => {
      setToasts(removeById(id));
      exitTimers.current.delete(id);
    }, EXIT_ANIMATION_MS);
    exitTimers.current.set(id, exitTimer);
  }, []);

  const addToast = useCallback(
    (options: AddToastOptions): void => {
      const newId = crypto.randomUUID();
      const newToast: Toast = { id: newId, ...options };
      setToasts((prev) => {
        const updated = [...prev, newToast];
        const oldest = updated[0];
        if (updated.length > MAX_VISIBLE_TOASTS && oldest) dismissToast(oldest.id);
        return updated;
      });

      const timer = setTimeout(() => dismissToast(newId), AUTO_DISMISS_MS);
      autoDismissTimers.current.set(newId, timer);
    },
    [dismissToast],
  );

  useEffect(() => {
    const currentAutoTimers = autoDismissTimers.current;
    const currentExitTimers = exitTimers.current;
    return () => {
      currentAutoTimers.forEach((timer) => clearTimeout(timer));
      currentAutoTimers.clear();
      currentExitTimers.forEach((timer) => clearTimeout(timer));
      currentExitTimers.clear();
    };
  }, []);

  const contextValue: ToastContextValue = { addToast };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!isValueDefined(context)) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
