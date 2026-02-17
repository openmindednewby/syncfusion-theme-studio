/**
 * Custom hook that manages popup repositioning effects for the DataGrid.
 *
 * Extracts the useEffect hooks from the main component that handle:
 * 1. Responsive pager page-count via ResizeObserver
 * 2. Column menu / filter popup repositioning (delegated to useColumnMenuEffect)
 * 3. Pager dropdown repositioning via pointer events
 */
import { useEffect, useRef, useState } from 'react';

import { isValueDefined } from '@/utils/is';

import {
  MIN_RESPONSIVE_PAGE_COUNT,
  PAGER_BUTTON_APPROX_WIDTH,
  PAGER_SIDE_CONTENT_APPROX_WIDTH,
  POPUP_REPOSITION_DELAY_MS,
} from './constants';
import { repositionPagerDropdownPopup } from './popupPositioning';
import { useColumnMenuEffect } from './useColumnMenuEffect';

import type { ResolvedGridFeatures } from './types';

/** Normalize responsive page count: at least MIN, always odd. */
function normalizeResponsivePageCount(count: number): number {
  const bounded = Math.max(MIN_RESPONSIVE_PAGE_COUNT, count);
  return bounded % 2 === 0 ? bounded - 1 : bounded;
}

/** Refs needed by the DataGrid component for popup tracking. */
export interface GridPopupRefs {
  wrapperRef: React.RefObject<HTMLDivElement>;
  responsivePageCount: number | undefined;
}

/**
 * Hook that manages all popup repositioning effects for the DataGrid.
 *
 * Returns refs used by the component for popup tracking and the
 * responsive page count derived from the wrapper's observed width.
 */
export function useGridPopupEffects(
  features: ResolvedGridFeatures,
): GridPopupRefs {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [responsivePageCount, setResponsivePageCount] = useState<
    number | undefined
  >(undefined);

  // Effect 1: Responsive pager page-count via ResizeObserver
  useResizePageCount(features.paging, wrapperRef, setResponsivePageCount);

  // Effect 2: Column menu + filter popup repositioning
  useColumnMenuEffect(features, wrapperRef);

  // Effect 3: Pager dropdown repositioning
  usePagerDropdownRepositioning(features.paging, wrapperRef);

  return { wrapperRef, responsivePageCount };
}

// ---------------------------------------------------------------------------
// Effect 1: Responsive pager page count
// ---------------------------------------------------------------------------

function useResizePageCount(
  pagingEnabled: boolean,
  wrapperRef: React.RefObject<HTMLDivElement>,
  setCount: (count: number) => void,
): void {
  useEffect(() => {
    const hasResizeObserver = isValueDefined(globalThis.ResizeObserver);
    const canObserve = pagingEnabled && isValueDefined(wrapperRef.current);
    if (!canObserve || !hasResizeObserver) return;

    const element = wrapperRef.current;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      const rawCount = Math.floor(
        (width - PAGER_SIDE_CONTENT_APPROX_WIDTH) /
          PAGER_BUTTON_APPROX_WIDTH,
      );
      setCount(normalizeResponsivePageCount(rawCount));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [pagingEnabled, wrapperRef, setCount]);
}

// ---------------------------------------------------------------------------
// Effect 3: Pager dropdown repositioning
// ---------------------------------------------------------------------------

function usePagerDropdownRepositioning(
  pagingEnabled: boolean,
  wrapperRef: React.RefObject<HTMLDivElement>,
): void {
  useEffect(() => {
    if (!pagingEnabled || !isValueDefined(wrapperRef.current)) return;
    const root = wrapperRef.current;

    const onPointerDown = (event: Event): void => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!isValueDefined(target.closest('.e-pager .e-pagerdropdown'))) return;
      setTimeout(() => repositionPagerDropdownPopup(root), POPUP_REPOSITION_DELAY_MS);
      requestAnimationFrame(() => repositionPagerDropdownPopup(root));
    };

    const onWindowMove = (): void => repositionPagerDropdownPopup(root);

    root.addEventListener('pointerdown', onPointerDown, true);
    window.addEventListener('resize', onWindowMove);
    window.addEventListener('scroll', onWindowMove, true);
    return () => {
      root.removeEventListener('pointerdown', onPointerDown, true);
      window.removeEventListener('resize', onWindowMove);
      window.removeEventListener('scroll', onWindowMove, true);
    };
  }, [pagingEnabled, wrapperRef]);
}
