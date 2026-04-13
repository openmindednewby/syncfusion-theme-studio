import { useCallback, useEffect, useId, useMemo, useRef } from 'react';

interface UseDialogOptions {
  isOpen: boolean;
  onClose: () => void;
}

interface UseDialogResult {
  /** Props to spread on the backdrop overlay element */
  backdropProps: {
    onClick: (e: React.MouseEvent) => void;
  };
  /** Props to spread on the dialog container element */
  dialogProps: {
    role: 'dialog';
    'aria-modal': true;
    'aria-labelledby': string;
    ref: React.RefObject<HTMLDivElement>;
  };
  /** Generated id for the dialog title element */
  titleId: string;
}

function getFocusableElements(container: HTMLDivElement): NodeListOf<HTMLElement> {
  return container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );
}

/** Registers Escape key handler; returns cleanup function. */
function useEscapeKey(isOpen: boolean, onClose: () => void): void {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
}

/** Traps Tab focus within the dialog container. */
function useFocusTrap(isOpen: boolean, dialogRef: React.RefObject<HTMLDivElement>): void {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleTabKey = (e: KeyboardEvent): void => {
      if (e.key !== 'Tab') return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = getFocusableElements(dialog);
      if (focusable.length === 0) return;

      const first = focusable.item(0);
      const last = focusable.item(focusable.length - 1);

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen, dialogRef]);
}

/** Saves focus on open, restores on close, auto-focuses first element. */
function useAutoFocus(isOpen: boolean, dialogRef: React.RefObject<HTMLDivElement>): void {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    previousFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    const timer = setTimeout(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = getFocusableElements(dialog);
      if (focusable.length > 0) focusable.item(0).focus();
    });

    return () => {
      clearTimeout(timer);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, dialogRef]);
}

/**
 * Hook providing accessible dialog behavior: Escape key handling,
 * backdrop click-to-close, and focus trapping within the dialog.
 */
export function useDialog({ isOpen, onClose }: UseDialogOptions): UseDialogResult {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent): void => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  useEscapeKey(isOpen, onClose);
  useFocusTrap(isOpen, dialogRef);
  useAutoFocus(isOpen, dialogRef);

  const dialogProps = useMemo(() => ({
    role: 'dialog' as const,
    'aria-modal': true as const,
    'aria-labelledby': titleId,
    ref: dialogRef,
  }), [titleId]);

  return {
    backdropProps: { onClick: handleBackdropClick },
    dialogProps,
    titleId,
  };
}
