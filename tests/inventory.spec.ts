import { test, expect } from '../fixtures/testFixture';
import { appPaths } from '../utils/navigation';

test('TC-003 - Prevent unauthenticated access to the Inventory page', async ({ page }) => {
  await page.goto(appPaths.inventory);
  await expect(page).toHaveURL(/saucedemo\.com\//);
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});