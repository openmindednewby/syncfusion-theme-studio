import { useEffect, useRef, type RefObject } from 'react';

/**
 * Closes the dropdown when clicking or tapping outside the container element.
 */
export function useClickOutside(
  ref: RefObject<HTMLDivElement | null>,
  callback: () => void,
  isActive: boolean,
): void {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!isActive) return undefined;

    const handleEvent = (e: Event): void => {
      if (!(e.target instanceof Node)) return;
      if (ref.current && !ref.current.contains(e.target)) callbackRef.current();
    };

    document.addEventListener('mousedown', handleEvent);
    document.addEventListener('touchstart', handleEvent);
    return (): void => {
      document.removeEventListener('mousedown', handleEvent);
      document.removeEventListener('touchstart', handleEvent);
    };
  }, [ref, isActive]);
}
