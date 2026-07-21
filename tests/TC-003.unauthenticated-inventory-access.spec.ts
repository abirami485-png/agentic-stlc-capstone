import { test, expect } from '../fixtures/baseFixture';

test('TC-003 Unauthenticated user cannot access the Inventory page', async ({ page }) => {
  await page.goto('/inventory.html');
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await expect(page.locator('.inventory_item')).toHaveCount(0);
});
