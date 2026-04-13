import { useCallback, useEffect, useState, type RefObject } from 'react';

const POPUP_OFFSET_Y = 6;
const VIEWPORT_PADDING = 8;

interface PopupPosition {
  top: number;
  left: number;
}

/**
 * Computes fixed-position coordinates for a portal popup anchored below a trigger button.
 * Repositions on scroll (capture) and resize.
 */
export function useColumnMenuPosition(
  triggerRef: RefObject<HTMLButtonElement | null>,
  isOpen: boolean,
): PopupPosition {
  const compute = useCallback((): PopupPosition => {
    if (!triggerRef.current) return { top: 0, left: 0 };
    const rect = triggerRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + POPUP_OFFSET_Y,
      left: Math.max(VIEWPORT_PADDING, rect.right),
    };
  }, [triggerRef]);

  const [position, setPosition] = useState<PopupPosition>(compute);

  useEffect(() => {
    if (!isOpen) return undefined;
    setPosition(compute());

    const reposition = (): void => setPosition(compute());
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    return (): void => {
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
    };
  }, [isOpen, compute]);

  return position;
}
