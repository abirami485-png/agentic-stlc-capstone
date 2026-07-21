import { test, expect } from '../fixtures/test-fixtures';
import { sauceDemoUsers } from '../test-data/sauce-demo-data';

test('TC-001 Valid user logs in and views available products', async ({ loginPage, inventoryPage }) => {
  await loginPage.goto();
  await loginPage.login(sauceDemoUsers.standardUser.username, sauceDemoUsers.standardUser.password);

  await expect(loginPage.page).toHaveURL(/inventory\.html/);
  await inventoryPage.expectLoaded();
});

test('TC-002 Invalid credentials display an error message', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(sauceDemoUsers.invalidUser.username, sauceDemoUsers.invalidUser.password);

  await loginPage.expectLoginError('Username and password do not match');
  await expect(loginPage.page).toHaveURL(/\/$/);
});

test('TC-003 Unauthenticated user cannot access the Inventory page', async ({ page }) => {
  await page.goto('/inventory.html');

  await expect(page).not.toHaveURL(/inventory\.html/);
  await expect(page.getByPlaceholder('Username')).toBeVisible();
});
