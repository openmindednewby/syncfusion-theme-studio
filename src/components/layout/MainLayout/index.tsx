// Side-effect: registers Syncfusion license synchronously at module load time.
// Must precede any Syncfusion component imports to prevent trial-version banners on refresh.
import '@/config/syncfusionInit';

import { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { AiPanel } from '@/features/ai-assistant';
import { useIsMobile } from '@/hooks/useIsMobile';
import { FM } from '@/localization/utils/helpers';
import { useThemeInitializer, useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';

import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { ThemeSettingsDrawer } from '../ThemeSettingsDrawer';

const selectContentFullWidth = (s: { theme: { layout: { contentFullWidth: boolean } } }): boolean =>
  s.theme.layout.contentFullWidth;
const MAIN_CONTENT_ID = 'main-content';

/**
 * MainLayout - Three-column grid layout with:
 * - Left: Collapsible Sidebar (overlay on mobile)
 * - Center: Main content area (Header + Outlet)
 * - Right: Theme Settings Panel (overlay on mobile)
 *
 * On mobile (<= 768px), sidebar and theme panel render as overlays
 * so the main content gets the full viewport width.
 */
export const MainLayout = (): JSX.Element => {
  useThemeInitializer();
  const contentFullWidth = useThemeStore(selectContentFullWidth);
  const isMobile = useIsMobile();

  // Load Syncfusion CSS dynamically - keeps login page bundle small
  useEffect(() => {
    import('@/styles/app.css').catch(() => undefined);
  }, []);

  const gridClasses = isMobile
    ? 'grid h-screen w-full grid-cols-[1fr] grid-rows-[minmax(0,1fr)] overflow-hidden bg-background'
    : 'grid h-screen w-full grid-cols-[auto_1fr_auto] grid-rows-[minmax(0,1fr)] overflow-hidden bg-background';

  return (
    <div className={gridClasses}>
      {/* Skip link for keyboard navigation */}
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary-700 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        href={`#${MAIN_CONTENT_ID}`}
      >
        {FM('accessibility.skipToMainContent')}
      </a>

      {/* Left Sidebar - overlay on mobile */}
      <Sidebar isMobile={isMobile} />

      {/* Main Content Area */}
      <div className="flex flex-col overflow-hidden">
        <Header />
        <main
          className={cn(
            'flex-1 overflow-auto [scrollbar-gutter:stable]',
            contentFullWidth ? 'p-2' : 'p-6',
          )}
          id={MAIN_CONTENT_ID}
          tabIndex={-1}
        >
          <div className={cn('max-w-content', !contentFullWidth && 'mx-auto')}>
            <Outlet />
          </div>
        </main>
      </div>

      {/* Right Theme Settings Panel - overlay on mobile */}
      <ThemeSettingsDrawer isMobile={isMobile} />

      {/* AI Assistant - global overlay panel */}
      <AiPanel />
    </div>
  );
};
