import { Outlet } from 'react-router-dom';

import { FM } from '@/localization/helpers';

import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { ThemeSettingsDrawer } from '../ThemeSettingsDrawer';

const MAIN_CONTENT_ID = 'main-content';

export const MainLayout = (): JSX.Element => {
  return (
    <div className="flex h-screen bg-background">
      {/* Skip link for keyboard navigation */}
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary-500 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        href={`#${MAIN_CONTENT_ID}`}
      >
        {FM('accessibility.skipToMainContent')}
      </a>
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6" id={MAIN_CONTENT_ID} tabIndex={-1}>
          <Outlet />
        </main>
      </div>
      <ThemeSettingsDrawer />
    </div>
  );
};
