import { test, expect } from '../fixtures/testFixture';

test('TC-003 - Prevent unauthenticated access to the Inventory page', async ({ page }) => {
  await page.goto('/inventory.html');
  await expect(page).toHaveURL(/https:\/\/www\.saucedemo\.com\/$/);
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});