// Side-effect: registers Syncfusion license synchronously at module load time.
// Must precede any Syncfusion component imports to prevent trial-version banners on refresh.
import '@/config/syncfusionInit';

import { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { FM } from '@/localization/utils/helpers';
import { useThemeInitializer, useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';

import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { ThemeSettingsDrawer } from '../ThemeSettingsDrawer';

const MAIN_CONTENT_ID = 'main-content';
const selectContentFullWidth = (s: { theme: { layout: { contentFullWidth: boolean } } }): boolean =>
  s.theme.layout.contentFullWidth;

/**
 * MainLayout - Three-column grid layout with:
 * - Left: Collapsible Sidebar
 * - Center: Main content area (Header + Outlet)
 * - Right: Theme Settings Panel (collapsible)
 */
export const MainLayout = (): JSX.Element => {
  // Initialize full theme system when entering protected routes
  // This loads the heavy theme injectors (~80KB) only for dashboard pages
  useThemeInitializer();
  const contentFullWidth = useThemeStore(selectContentFullWidth);

  // Load Syncfusion CSS dynamically - keeps login page bundle small
  // License is already registered synchronously via the syncfusionInit side-effect import above.
  useEffect(() => {
    import('@/styles/app.css').catch(() => undefined);
  }, []);

  return (
    <div className="grid h-screen w-full grid-cols-[auto_1fr_auto] bg-background">
      {/* Skip link for keyboard navigation */}
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary-700 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        href={`#${MAIN_CONTENT_ID}`}
      >
        {FM('accessibility.skipToMainContent')}
      </a>

      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col overflow-hidden">
        <Header />
        <main className={cn('flex-1 overflow-auto [scrollbar-gutter:stable]', contentFullWidth ? 'p-2' : 'p-6')} id={MAIN_CONTENT_ID} tabIndex={-1}>
          <div className={cn('max-w-content', !contentFullWidth && 'mx-auto')}>
            <Outlet />
          </div>
        </main>
      </div>

      {/* Right Theme Settings Panel */}
      <ThemeSettingsDrawer />
    </div>
  );
};
