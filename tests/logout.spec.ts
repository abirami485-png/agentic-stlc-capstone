import { test } from '../fixtures/testFixture';
import { expectOnInventoryPage, expectOnLoginPage } from '../utils/helpers';

test('TC-007 Authenticated user logs out and returns to the Login page', async ({ page, loginPage, inventoryPage, appData }) => {
  await loginPage.open();
  await loginPage.login(appData.validUser.username, appData.validUser.password);
  await expectOnInventoryPage(page);
  await inventoryPage.logout();
  await expectOnLoginPage(page);
});
