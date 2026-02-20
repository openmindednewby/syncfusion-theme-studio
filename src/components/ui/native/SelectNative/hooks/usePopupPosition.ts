import { useState, useEffect, type RefObject } from 'react';

import { MIN_SPACE_BELOW_PX } from '../constants';
import { PopupPosition } from '../utils/PopupPosition';

/**
 * Determines whether the popup should appear above or below the trigger.
 * Checks available viewport space when the dropdown opens.
 */
export function usePopupPosition(
  triggerRef: RefObject<HTMLButtonElement | null>,
  isOpen: boolean,
): PopupPosition {
  const [position, setPosition] = useState<PopupPosition>(PopupPosition.Below);

  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;

    setPosition(spaceBelow < MIN_SPACE_BELOW_PX ? PopupPosition.Above : PopupPosition.Below);
  }, [isOpen, triggerRef]);

  return position;
}
