import { test, expect } from '../fixtures/app.fixture';
import { loginPage } from '../pages';

test('TC-004: Block unauthenticated access to the Inventory page', async ({ page }) => {
  await page.goto('/inventory.html');

  await expect(page).toHaveURL(/.*saucedemo\.com\/?$/);
  await expect(page.getByTestId('username')).toBeVisible();
  await expect(page.getByText('Products')).toHaveCount(0);
  await expect(page.getByText('Products')).toHaveCount(0);
});