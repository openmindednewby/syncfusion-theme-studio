// Font preloader — loads self-hosted @font-face declarations during idle time.
// Follows the same phased pattern as preloadOrchestrator.ts.

const preloadFonts = async (): Promise<unknown[]> =>
  Promise.all([
    import('@fontsource/fira-sans/400.css').catch(() => undefined),
    import('@fontsource/fira-sans-condensed/500.css').catch(() => undefined),
  ]);

const IDLE_TIMEOUT_MS = 1000;
const FALLBACK_DELAY_MS = 50;

export const startFontPreload = (): void => {
  const kick = (): void => {
    preloadFonts().catch(() => undefined);
  };

  if ('requestIdleCallback' in window)
    window.requestIdleCallback(kick, { timeout: IDLE_TIMEOUT_MS });
  else setTimeout(kick, FALLBACK_DELAY_MS);
};
