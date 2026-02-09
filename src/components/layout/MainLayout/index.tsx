import { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { initializeSyncfusionLazy } from '@/config/syncfusionLazy';
import { FM } from '@/localization/helpers';
import { useThemeInitializer } from '@/stores/useThemeStore';

import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { ThemeSettingsDrawer } from '../ThemeSettingsDrawer';

const MAIN_CONTENT_ID = 'main-content';

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

  // Initialize Syncfusion and load app CSS only when entering protected routes
  useEffect(() => {
    initializeSyncfusionLazy();
    // Load Syncfusion CSS dynamically - keeps login page bundle small
    import('@/styles/app.css').catch(() => undefined);
  }, []);

  return (
    <div className="grid h-screen grid-cols-[auto_1fr_auto] bg-background">
      {/* Skip link for keyboard navigation */}
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary-500 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        href={`#${MAIN_CONTENT_ID}`}
      >
        {FM('accessibility.skipToMainContent')}
      </a>

      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6" id={MAIN_CONTENT_ID} tabIndex={-1}>
          <Outlet />
        </main>
      </div>

      {/* Right Theme Settings Panel */}
      <ThemeSettingsDrawer />
    </div>
  );
};
