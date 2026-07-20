import { test, expect } from '../fixtures/testFixture';
import { appPaths } from '../utils/navigation';

test('TC-001 - Log in with valid credentials and view the product inventory', async ({ loginPage, inventoryPage, testData, page }) => {
  await loginPage.goto();
  await loginPage.login(testData.credentials.validUser.username, testData.credentials.validUser.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.expectProductVisible(testData.products.backpack.name);
  await expect(page).toHaveURL(appPaths.inventory);
});

test('TC-002 - Display an error when login credentials are invalid', async ({ loginPage, testData, page }) => {
  await loginPage.goto();
  await loginPage.login(testData.credentials.invalidUser.username, testData.credentials.invalidUser.password);
  await loginPage.expectErrorMessage('Username and password do not match any user in this service');
  await expect(page).toHaveURL('/');
});