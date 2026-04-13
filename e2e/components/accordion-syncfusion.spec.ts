import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// Run with: npx playwright test e2e/components/accordion-syncfusion
test.describe('Syncfusion Accordion Components', () => {
  test.setTimeout(180000);

  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/components/accordion/syncfusion');
    await expect(page.getByTestId(TestIds.SYNCFUSION_ACCORDION_SHOWCASE)).toBeVisible({ timeout: 30000 });
  });

  test('should render the accordion showcase page', async ({ page }) => {
    await expect(page.getByTestId(TestIds.SYNCFUSION_ACCORDION_SHOWCASE)).toBeVisible();
  });

  test('should render Syncfusion accordion elements', async ({ page }) => {
    // Syncfusion AccordionComponent uses .e-accordion class
    const accordions = page.locator('.e-accordion');
    expect(await accordions.count()).toBeGreaterThan(0);
  });

  test('should expand accordion panel on click', async ({ page }) => {
    // Click on an accordion header to expand it
    const accordionHeader = page.locator('.e-acrdn-header').first();
    await accordionHeader.scrollIntoViewIfNeeded();
    await accordionHeader.click();

    // Content panel should become visible
    const accordionContent = page.locator('.e-acrdn-content').first();
    await expect(accordionContent).toBeVisible({ timeout: 5000 });
  });

  test('should collapse accordion panel on second click', async ({ page }) => {
    const accordionHeader = page.locator('.e-acrdn-header').first();
    await accordionHeader.scrollIntoViewIfNeeded();

    // Expand
    await accordionHeader.click();
    const accordionContent = page.locator('.e-acrdn-content').first();
    await expect(accordionContent).toBeVisible({ timeout: 5000 });

    // Collapse
    await accordionHeader.click();
    await expect(accordionContent).not.toBeVisible({ timeout: 5000 });
  });

  test('should navigate to correct URL', async ({ page }) => {
    expect(page.url()).toContain('/components/accordion/syncfusion');
  });

  test('should display Expand All button that is visible and clickable', async ({ page }) => {
    const expandAllBtn = page.getByTestId(TestIds.SYNCFUSION_ACCORDION_EXPAND_ALL);
    await expect(expandAllBtn).toBeVisible();
    await expect(expandAllBtn).toBeEnabled();
    await expandAllBtn.click();
  });

  test('should display Collapse All button that is visible and clickable', async ({ page }) => {
    const collapseAllBtn = page.getByTestId(TestIds.SYNCFUSION_ACCORDION_COLLAPSE_ALL);
    await expect(collapseAllBtn).toBeVisible();
    await expect(collapseAllBtn).toBeEnabled();
    await collapseAllBtn.click();
  });
});
