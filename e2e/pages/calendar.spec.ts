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
      if (e.includes('ERR_ABORTED') && e.includes('hub')) return false;
      return true;
    });
  }
}

/** Mock calendar event data for route interception. */
const MOCK_CALENDAR_EVENTS = [
  {
    id: 1,
    title: 'Team Standup',
    description: 'Daily standup meeting',
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 3600000).toISOString(),
    location: 'Conference Room A',
    isAllDay: false,
    recurrenceRule: null,
    category: 'Meeting',
    color: '#1976d2',
    createdBy: 'Demo User',
  },
  {
    id: 2,
    title: 'Sprint Review',
    description: 'Review sprint deliverables',
    startTime: new Date(Date.now() + 86400000).toISOString(),
    endTime: new Date(Date.now() + 86400000 + 3600000).toISOString(),
    location: 'Main Hall',
    isAllDay: false,
    recurrenceRule: null,
    category: 'Review',
    color: '#388e3c',
    createdBy: 'Demo User',
  },
];

test.describe('Calendar / Scheduler Page', () => {
  test.describe.configure({ timeout: 120000 });
  let collector: ConsoleErrorCollector;

  test.beforeEach(async ({ page }) => {
    collector = new ConsoleErrorCollector();
    collector.attach(page);

    // Intercept calendar API to provide mock data
    await page.route('**/api/calendar/events**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCK_CALENDAR_EVENTS),
      }),
    );
    // Block SignalR to prevent net::ERR_ABORTED during navigation
    await page.route('**/hub/**', (route) => route.abort());
    await page.route('**/negotiate**', (route) => route.abort());
    await injectAuth(page);
    collector.errors.length = 0;
    await page.goto('/calendar', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.CALENDAR_PAGE)).toBeVisible({ timeout: 30000 });
  });

  test('should render the Syncfusion Schedule component', async ({ page }) => {
    const schedule = page.locator('.e-schedule');
    await expect(schedule).toBeVisible({ timeout: 15000 });
  });

  test('should display calendar page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should render the month view table', async ({ page }) => {
    const schedule = page.locator('.e-schedule');
    await expect(schedule).toBeVisible({ timeout: 15000 });

    // showHeaderBar is false — verify the schedule renders in Month view (default currentView)
    const monthView = schedule.locator('.e-month-view');
    await expect(monthView).toBeVisible({ timeout: 15000 });
  });

  test('should render month view grid cells', async ({ page }) => {
    const schedule = page.locator('.e-schedule');
    await expect(schedule).toBeVisible({ timeout: 15000 });

    // Verify the month view renders date cells (the grid structure itself)
    const dateCells = schedule.locator('.e-work-cells');
    await expect(dateCells.first()).toBeVisible({ timeout: 15000 });
    const cellCount = await dateCells.count();
    expect(cellCount).toBeGreaterThan(0);
  });

  test('should have navigation date header visible', async ({ page }) => {
    const schedule = page.locator('.e-schedule');
    await expect(schedule).toBeVisible({ timeout: 15000 });

    const header = schedule.locator('.e-date-header-wrap').first();
    await expect(header).toBeVisible();
  });

  test('should have no console errors', async () => {
    const errors = collector.relevantErrors();
    expect(errors, `Console errors on /calendar:\n${errors.join('\n')}`).toHaveLength(0);
  });
});
