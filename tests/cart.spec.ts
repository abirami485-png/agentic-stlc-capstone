import { test } from '../fixtures/testFixture';
import { expectOnCartPage, expectOnInventoryPage } from '../utils/helpers';

test('TC-004 User adds and removes a product and sees the cart update', async ({ page, loginPage, inventoryPage, cartPage, appData }) => {
  await loginPage.open();
  await loginPage.login(appData.validUser.username, appData.validUser.password);
  await expectOnInventoryPage(page);
  await inventoryPage.addProductToCart(appData.productName);
  await inventoryPage.openCart();
  await expectOnCartPage(page);
  await cartPage.expectProductVisible(appData.productName);
  await cartPage.removeProduct(appData.productName);
});
