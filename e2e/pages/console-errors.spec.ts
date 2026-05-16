import { test, expect, type Page, type ConsoleMessage } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

class ConsoleErrorCollector {
  readonly errors: string[] = [];

  attach(page: Page): void {
    page.on('console', (msg: ConsoleMessage) => {
      if (msg.type() === 'error')
        this.errors.push(msg.text());
    });

    page.on('pageerror', (err: Error) => {
      this.errors.push(`[PAGE ERROR] ${err.message}`);
    });
  }

  relevantErrors(): string[] {
    return this.errors.filter((e) => {
      if (e.includes('favicon')) return false;
      if (e.includes('[vite]') || e.includes('[hmr]')) return false;
      if (e.includes('Failed to load resource') && e.includes('/mockapi/')) return false;
      if (e.includes('ERR_CONNECTION_REFUSED')) return false;
      if (e.includes('net::ERR_FAILED')) return false;
      return true;
    });
  }
}

// ---------------------------------------------------------------------------
// Protected pages — require auth injection
// ---------------------------------------------------------------------------

interface PageEntry {
  path: string;
  name: string;
  /** Test-ID to wait for to confirm the page loaded. When omitted, falls back to heading. */
  testId?: string;
}

const PROTECTED_PAGES: PageEntry[] = [
  // Dashboard
  { path: '/dashboard', name: 'Dashboard', testId: TestIds.DASHBOARD_HEADING },
  { path: '/dashboard/home/metrics', name: 'Dashboard Metrics', testId: 'dashboard-metrics' },
  { path: '/dashboard/home/kpis', name: 'Dashboard KPIs', testId: 'dashboard-kpis' },

  // Products
  { path: '/products/native', name: 'Products Native', testId: TestIds.NATIVE_PRODUCTS_PAGE },
  { path: '/products/syncfusion', name: 'Products Syncfusion', testId: TestIds.PRODUCTS_GRID },

  // Components overview
  { path: '/components/native', name: 'Components Native', testId: TestIds.NATIVE_COMPONENTS_PAGE },
  { path: '/components/syncfusion', name: 'Components Syncfusion', testId: TestIds.SYNCFUSION_COMPONENTS_PAGE },

  // Grid showcase
  { path: '/components/grid/native', name: 'Grid Native', testId: TestIds.NATIVE_GRID_SHOWCASE },
  { path: '/components/grid/syncfusion', name: 'Grid Syncfusion', testId: TestIds.SYNCFUSION_GRID_SHOWCASE },
  { path: '/components/grid/playground', name: 'Grid Playground', testId: TestIds.SYNCFUSION_GRID_PLAYGROUND },

  // Forms
  { path: '/forms/syncfusion', name: 'Forms Syncfusion', testId: TestIds.FORMS_SHOWCASE_PAGE },
  { path: '/forms/native', name: 'Forms Native', testId: TestIds.NATIVE_FORMS_PAGE },

  // App pages
  { path: '/notifications', name: 'Notifications', testId: TestIds.NOTIFICATIONS_PAGE },
  { path: '/profile', name: 'User Profile', testId: TestIds.PROFILE_PAGE },
  { path: '/activity-log', name: 'Activity Log', testId: TestIds.ACTIVITY_LOG_PAGE },

  // Business pages
  { path: '/customers', name: 'Customers', testId: TestIds.CUSTOMERS_PAGE },
  { path: '/invoices', name: 'Invoices', testId: TestIds.INVOICES_PAGE },
  { path: '/orders', name: 'Orders', testId: TestIds.ORDERS_PAGE },
  { path: '/inventory', name: 'Inventory', testId: TestIds.INVENTORY_PAGE },
  { path: '/settings', name: 'Settings', testId: TestIds.SETTINGS_PAGE },

  // Calendar / Kanban / Gantt / Maps / Chat
  { path: '/calendar', name: 'Calendar', testId: TestIds.CALENDAR_PAGE },
  { path: '/kanban', name: 'Kanban', testId: TestIds.KANBAN_PAGE },
  { path: '/gantt', name: 'Gantt', testId: TestIds.GANTT_PAGE },
  { path: '/maps', name: 'Maps', testId: TestIds.MAPS_PAGE },
  { path: '/chat', name: 'Chat', testId: TestIds.CHAT_PAGE },

  // Diagram
  { path: '/diagram', name: 'Diagram', testId: TestIds.DIAGRAM_PAGE },

  // Admin hub
  { path: '/admin/user-management', name: 'Admin Users', testId: TestIds.ADMIN_USERS_PAGE },
  { path: '/admin/role-management', name: 'Admin Roles', testId: TestIds.ROLE_MANAGEMENT_PAGE },
  { path: '/admin/system-settings', name: 'Admin System Settings', testId: TestIds.ADMIN_SETTINGS_PAGE },
  { path: '/admin/integrations', name: 'Admin Integrations', testId: TestIds.ADMIN_INTEGRATIONS_PAGE },
  { path: '/admin/plugins', name: 'Admin Plugins', testId: TestIds.ADMIN_PLUGINS_PAGE },

  // SIEM
  { path: '/alerts-incidents/alerts-management', name: 'Alerts Management', testId: TestIds.ALERT_TOOLBAR },

  // Error pages
  { path: '/errors/401', name: '401 Unauthorized', testId: TestIds.ERROR_401_GO_HOME },
  { path: '/errors/403', name: '403 Forbidden', testId: TestIds.ERROR_403_GO_HOME },
  { path: '/errors/500', name: '500 Server Error', testId: TestIds.ERROR_500_GO_HOME },
];

// ---------------------------------------------------------------------------
// Public pages — no auth needed
// ---------------------------------------------------------------------------

const PUBLIC_PAGES: PageEntry[] = [
  { path: '/', name: 'Landing Page', testId: TestIds.LANDING_PAGE },
  { path: '/login', name: 'Login', testId: TestIds.LOGIN_SUBMIT },
  { path: '/pricing', name: 'Pricing', testId: 'pricing-page' },
];

test.describe('Protected Pages — Zero Console Errors', () => {
  let collector: ConsoleErrorCollector;

  test.beforeEach(async ({ page }) => {
    collector = new ConsoleErrorCollector();
    collector.attach(page);
    await injectAuth(page);
    collector.errors.length = 0;
  });

  for (const { path, name, testId } of PROTECTED_PAGES) {
    test(`${name} (${path}) has no console errors`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });

      if (testId)
        await expect(page.getByTestId(testId)).toBeVisible({ timeout: 15000 });
      else
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 15000 });

      await page.waitForLoadState('domcontentloaded');

      const errors = collector.relevantErrors();
      expect(errors, `Console errors on ${path}:\n${errors.join('\n')}`).toHaveLength(0);
    });
  }
});

test.describe('Public Pages — Zero Console Errors', () => {
  let collector: ConsoleErrorCollector;

  test.beforeEach(async ({ page }) => {
    collector = new ConsoleErrorCollector();
    collector.attach(page);
  });

  for (const { path, name, testId } of PUBLIC_PAGES) {
    test(`${name} (${path}) has no console errors`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });

      if (testId)
        await expect(page.getByTestId(testId)).toBeVisible({ timeout: 15000 });
      else
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 15000 });

      await page.waitForLoadState('domcontentloaded');

      const errors = collector.relevantErrors();
      expect(errors, `Console errors on ${path}:\n${errors.join('\n')}`).toHaveLength(0);
    });
  }
});
