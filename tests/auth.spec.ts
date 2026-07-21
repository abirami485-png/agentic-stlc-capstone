import { test, expect } from '../fixtures/testFixture';
import { expectOnInventoryPage, expectOnLoginPage } from '../utils/helpers';

test('TC-001 Valid user logs in and views available products', async ({ page, loginPage, inventoryPage, appData }) => {
  await loginPage.open();
  await loginPage.login(appData.validUser.username, appData.validUser.password);
  await expectOnInventoryPage(page);
  await inventoryPage.expectInventoryVisible();
});

test('TC-002 Invalid credentials display an error message', async ({ page, loginPage, appData }) => {
  await loginPage.open();
  await loginPage.login(appData.invalidUser.username, appData.invalidUser.password);
  await expectOnLoginPage(page);
  await loginPage.expectErrorMessage('Username and password do not match any user in this service');
});

test('TC-003 Unauthenticated user cannot access the Inventory page', async ({ page }) => {
  await page.goto('/inventory.html');
  await expectOnLoginPage(page);
  await expect(page).not.toHaveURL(/inventory.html/);
});
