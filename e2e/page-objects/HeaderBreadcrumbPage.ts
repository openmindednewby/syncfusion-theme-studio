import { type Page, type Locator, expect } from '@playwright/test';

import { BasePage } from './BasePage';
import { TestIds } from '../shared/testIds';

const PAGE_LOAD_TIMEOUT = 10000;

/**
 * Page object for the Header Breadcrumb navigation.
 *
 * The header breadcrumb shows a trail of navigation segments based on
 * the current route. For example, `/dashboard/components/button/native`
 * renders: [Home icon] > Components > Button > Native.
 *
 * - The home button always navigates to `/dashboard`.
 * - Intermediate segments are clickable buttons that navigate to their route.
 * - The last segment is the current page: not clickable, has `aria-current="page"`.
 * - On the dashboard page itself, only the home icon is shown (no extra segments).
 */
export class HeaderBreadcrumbPage extends BasePage {
  readonly breadcrumbNav: Locator;
  readonly homeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.breadcrumbNav = page.getByTestId(TestIds.HEADER_BREADCRUMB_NAV);
    this.homeButton = page.getByTestId(TestIds.HEADER_BREADCRUMB_HOME);
  }

  // ==================== LOCATORS ====================

  /**
   * Get all breadcrumb segment labels (clickable buttons and current page span).
   * These are the segments AFTER the home icon (e.g., "Components > Button > Native").
   */
  get segments(): Locator {
    return this.breadcrumbNav.locator(
      `button:not([data-testid="${TestIds.HEADER_BREADCRUMB_HOME}"]), span[aria-current="page"]`
    );
  }

  /**
   * Get the current page element (last breadcrumb segment with aria-current="page").
   */
  get currentPageSegment(): Locator {
    return this.breadcrumbNav.locator('span[aria-current="page"]');
  }

  /**
   * Get all clickable breadcrumb segments (buttons, not the current page span).
   * Excludes the home button.
   */
  get clickableSegments(): Locator {
    return this.breadcrumbNav.locator(
      `button:not([data-testid="${TestIds.HEADER_BREADCRUMB_HOME}"])`
    );
  }

  // ==================== ACTIONS ====================

  /**
   * Click the home button in the breadcrumb.
   */
  async clickHome(): Promise<void> {
    await this.homeButton.click();
  }

  /**
   * Click a clickable breadcrumb segment by its visible text.
   */
  async clickSegment(text: string): Promise<void> {
    await this.breadcrumbNav.locator('button', { hasText: text }).first().click();
  }

  // ==================== ASSERTIONS ====================

  /**
   * Expect the breadcrumb nav to be visible.
   */
  async expectVisible(): Promise<void> {
    await expect(this.breadcrumbNav).toBeVisible();
  }

  /**
   * Expect the home button to be visible.
   */
  async expectHomeButtonVisible(): Promise<void> {
    await expect(this.homeButton).toBeVisible();
  }

  /**
   * Expect the breadcrumb to show only the home icon (no additional segments).
   * This is the expected state on the dashboard root page.
   */
  async expectOnlyHomeIcon(): Promise<void> {
    await expect(this.homeButton).toBeVisible();
    await expect(this.segments).toHaveCount(0);
  }

  /**
   * Expect the breadcrumb to display the given segment labels in order.
   * @param labels - Expected labels in order (e.g., ['Components', 'Button', 'Native']).
   */
  async expectSegmentLabels(labels: string[]): Promise<void> {
    await expect(this.segments).toHaveCount(labels.length);

    for (let i = 0; i < labels.length; i++) {
      await expect(this.segments.nth(i)).toHaveText(labels[i]);
    }
  }

  /**
   * Expect the last segment to be the current page (not clickable, has aria-current="page").
   * @param label - Expected text of the current page segment.
   */
  async expectCurrentPage(label: string): Promise<void> {
    await expect(this.currentPageSegment).toBeVisible();
    await expect(this.currentPageSegment).toHaveText(label);
    await expect(this.currentPageSegment).toHaveAttribute('aria-current', 'page');
  }

  /**
   * Expect the given number of clickable segments (excludes home and current page).
   */
  async expectClickableSegmentCount(count: number): Promise<void> {
    await expect(this.clickableSegments).toHaveCount(count);
  }

  /**
   * Expect navigation to the dashboard root.
   */
  async expectNavigatedToDashboard(): Promise<void> {
    await expect(this.page).toHaveURL(/\/dashboard\/?$/, { timeout: PAGE_LOAD_TIMEOUT });
  }

  /**
   * Expect navigation to a specific URL pattern.
   */
  async expectNavigatedTo(urlPattern: RegExp): Promise<void> {
    await expect(this.page).toHaveURL(urlPattern, { timeout: PAGE_LOAD_TIMEOUT });
  }
}
