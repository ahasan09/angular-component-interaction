import { test, expect } from '@playwright/test';

test.describe('Movie search page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/movies');
  });

  test('shows default results on load', async ({ page }) => {
    await expect(page.locator('app-data-table table')).toBeVisible({ timeout: 10_000 });
    const rows = page.locator('app-data-table tbody tr');
    await expect(rows.first()).toBeVisible();
  });

  test('EventEmitter search returns results', async ({ page }) => {
    await page.fill('input[name="eventEmitterInput"]', 'Breaking Bad');
    await page.click('button:has-text("Search (EventEmitter)")');
    await expect(page.locator('app-data-table table')).toBeVisible({ timeout: 10_000 });
    const rows = page.locator('app-data-table tbody tr');
    await expect(rows.first()).toBeVisible();
  });

  test('BehaviorSubject search propagates to lazy-load route', async ({ page }) => {
    await page.fill('input[name="eventEmitterInput"]', 'Game of Thrones');
    await page.click('button:has-text("Search (BehaviorSubject)")');
    await expect(page.locator('app-data-table table')).toBeVisible({ timeout: 10_000 });

    await page.click('button:has-text("Lazy Load")');
    await expect(page.locator('table tbody tr').first()).toBeVisible({ timeout: 5_000 });
  });

  test('ViewChild reactive input searches after debounce', async ({ page }) => {
    await page.fill('input[name="viewChildInput"]', 'Westworld');
    await page.waitForTimeout(600);
    await expect(page.locator('app-data-table table')).toBeVisible({ timeout: 10_000 });
  });

  test('navigates to show detail page', async ({ page }) => {
    await expect(page.locator('app-data-table table')).toBeVisible({ timeout: 10_000 });
    await page.locator('app-data-table a.detail-link').first().click();
    await expect(page.locator('mat-card')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('mat-card-title')).not.toBeEmpty();
  });
});
