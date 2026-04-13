import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = '(max-width: 768px)';

/**
 * Returns `true` when the viewport is at or below the mobile breakpoint (768px).
 * Uses `matchMedia` for efficient, event-driven detection (no resize polling).
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(MOBILE_BREAKPOINT).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_BREAKPOINT);
    const handler = (e: MediaQueryListEvent): void => setIsMobile(e.matches);

    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isMobile;
}
