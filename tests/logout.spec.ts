import { test, expect } from '../fixtures/testFixture';

test('TC-007 - Log out successfully and return to the Login page', async ({ loginPage, inventoryPage, menuComponent, testData, page }) => {
  await loginPage.goto();
  await loginPage.login(testData.credentials.validUser.username, testData.credentials.validUser.password);
  await inventoryPage.expectLoaded();
  await menuComponent.open();
  await menuComponent.logout();
  await loginPage.expectLoginFormVisible();
  await expect(page).toHaveURL('/');
});