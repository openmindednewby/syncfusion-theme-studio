import { test, expect } from '@playwright/test';

import { injectAuth, getCSSVariable } from '../fixtures/auth';

test.describe('FlexBox Showcase', () => {
  test.setTimeout(180000);

  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/components/flexbox/native');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByTestId('flexbox-showcase')).toBeVisible({ timeout: 30000 });
  });

  test('should display FlexBox heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'FlexBox' });
    await expect(heading).toBeVisible();
  });

  test('should display Basic Usage section', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Basic Usage' });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  });

  test('should display Vertical Layout section', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Vertical Layout' });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  });

  test('should display Justify Content section', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Justify Content' });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  });

  test('should display Gap Sizes section', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Gap Sizes' });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  });

  test('should inject flexBox CSS variables', async ({ page }) => {
    const containerBg = await getCSSVariable(page, '--component-flexbox-container-bg');
    expect(containerBg).not.toBe('');

    const gap = await getCSSVariable(page, '--component-flexbox-gap');
    expect(gap).not.toBe('');

    const direction = await getCSSVariable(page, '--component-flexbox-direction');
    expect(direction).not.toBe('');
  });

  test('should display flex items', async ({ page }) => {
    // Check for flex demo items
    const items = page.locator('text=Item 1');
    await expect(items.first()).toBeVisible();
  });
});
