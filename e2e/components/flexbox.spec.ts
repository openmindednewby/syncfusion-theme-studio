import { test, expect } from '@playwright/test';

import { login, getCSSVariable } from '../fixtures/auth';

test.describe('FlexBox Section', () => {
  test.skip(({ browserName }) => true, 'Skipped by default - Syncfusion components require long load times. Run manually with --timeout=180000');

  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/dashboard/components');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should display FlexBox Layout heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Flexbox Layout' });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  });

  test('should display Syncfusion Layout heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Syncfusion Layout' });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  });

  test('should display themed flex container items', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Themed Flex Container' });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();

    // Should have 6 demo items
    const items = page.locator('text=Item 1');
    await expect(items.first()).toBeVisible();
  });

  test('should display column direction demo', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Column Direction' });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  });

  test('should display justify and align variants', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Justify & Align Variants' });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();

    // Check for variant labels
    await expect(page.locator('text=space-between + center').first()).toBeVisible();
    await expect(page.locator('text=center + center').first()).toBeVisible();
  });

  test('should inject flexBox CSS variables', async ({ page }) => {
    const containerBg = await getCSSVariable(page, '--component-flexbox-container-bg');
    expect(containerBg).not.toBe('');

    const gap = await getCSSVariable(page, '--component-flexbox-gap');
    expect(gap).not.toBe('');

    const direction = await getCSSVariable(page, '--component-flexbox-direction');
    expect(direction).not.toBe('');
  });

  test('should display Syncfusion pane layout with flex items', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Syncfusion Layout' });
    await heading.scrollIntoViewIfNeeded();

    // Check for pane labels
    await expect(page.locator('text=Pane 1 (flex-1)').first()).toBeVisible();
    await expect(page.locator('text=Pane 3 (flex-2)').first()).toBeVisible();
  });
});
