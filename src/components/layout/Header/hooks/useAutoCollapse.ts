import { useEffect, useLayoutEffect, useRef, useState, type MutableRefObject } from 'react';

import { isValueDefined } from '@/utils';

/** Minimum container width (px) below which the breadcrumb is hidden entirely. */
export const MIN_CONTAINER_WIDTH_PX = 120;

interface AutoCollapseRefs {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  prevWidthRef: MutableRefObject<number>;
  maxItemsRef: MutableRefObject<number>;
}

interface AutoCollapseResult {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  maxItems: number;
  isHidden: boolean;
}

/** Creates all refs needed by useAutoCollapse. */
function useCollapseRefs(maxItems: number): AutoCollapseRefs {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prevWidthRef = useRef(0);
  const maxItemsRef = useRef(0);
  maxItemsRef.current = maxItems;
  return { containerRef, prevWidthRef, maxItemsRef };
}

/**
 * Automatically adjusts `maxItems` for BreadcrumbNative based on
 * available horizontal space. Collapses when items overflow the
 * container and expands when the container gets wider.
 * Hides the breadcrumb entirely when the container is narrower than
 * `MIN_CONTAINER_WIDTH_PX` (120 px).
 *
 * Attach `containerRef` to a wrapper `<div>` with
 * `className="min-w-0 flex-1 overflow-hidden"`.
 */
export function useAutoCollapse(itemCount: number): AutoCollapseResult {
  const [maxItems, setMaxItems] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [resizeCount, setResizeCount] = useState(0);
  const refs = useCollapseRefs(maxItems);
  const prevItemCountRef = useRef(itemCount);

  useEffect(() => {
    const container = refs.containerRef.current;
    if (!container) return;
    return setupResizeObserver({
      container, prevWidthRef: refs.prevWidthRef, maxItemsRef: refs.maxItemsRef,
      setMaxItems, setResizeCount, setIsHidden,
    });
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps -- refs are stable

  useLayoutEffect(() => {
    const container = refs.containerRef.current;
    if (!container) return;
    setIsHidden(container.clientWidth < MIN_CONTAINER_WIDTH_PX);
    if (prevItemCountRef.current !== itemCount) {
      prevItemCountRef.current = itemCount;
      if (maxItems !== 0) { setMaxItems(0); return; }
    }
    const nextMax = resolveCollapse(container, maxItems, itemCount);
    if (isValueDefined(nextMax)) setMaxItems(nextMax);
  }, [maxItems, itemCount, resizeCount]);  // eslint-disable-line react-hooks/exhaustive-deps -- refs are stable

  return { containerRef: refs.containerRef, maxItems, isHidden };
}

const MIN_VISIBLE_ITEMS = 2;

interface ResizeConfig {
  readonly container: HTMLElement;
  readonly prevWidthRef: MutableRefObject<number>;
  readonly maxItemsRef: MutableRefObject<number>;
  readonly setMaxItems: (v: number) => void;
  readonly setResizeCount: (fn: (c: number) => number) => void;
  readonly setIsHidden: (v: boolean) => void;
}

function setupResizeObserver(cfg: ResizeConfig): () => void {
  const { container, prevWidthRef, maxItemsRef, setMaxItems, setResizeCount, setIsHidden } = cfg;
  prevWidthRef.current = container.clientWidth;
  const observer = new ResizeObserver(() => {
    const newWidth = container.clientWidth;
    setIsHidden(newWidth < MIN_CONTAINER_WIDTH_PX);
    if (newWidth === prevWidthRef.current) return;
    const grew = newWidth > prevWidthRef.current;
    prevWidthRef.current = newWidth;
    if (grew && maxItemsRef.current > 0) setMaxItems(0);
    setResizeCount((c) => c + 1);
  });
  observer.observe(container);
  return () => observer.disconnect();
}

function resolveCollapse(
  container: HTMLDivElement,
  maxItems: number,
  itemCount: number,
): number | null {
  if (itemCount <= MIN_VISIBLE_ITEMS) return null;
  const ol = container.querySelector('ol');
  if (!ol) return null;
  const isOverflowing = ol.scrollWidth > ol.clientWidth;
  const effectiveMax = maxItems === 0 ? itemCount : maxItems;
  if (isOverflowing && effectiveMax > MIN_VISIBLE_ITEMS)
    return effectiveMax - 1;
  return null;
}
