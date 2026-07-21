import { test } from '../fixtures/baseFixture';
import { env } from '../utils/env';
import { testData } from '../utils/testData';

test('TC-004 Add and remove a product from the shopping cart', async ({ loginPage, inventoryPage, cartPage, appHeader }) => {
  await loginPage.goto();
  await loginPage.login(env.username, env.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.expectProductVisible(testData.productName);
  await inventoryPage.addProductToCart(testData.productName);
  await appHeader.goToCart();
  await cartPage.expectLoaded();
  await cartPage.expectProductVisible(testData.productName);
  await cartPage.removeProduct(testData.productName);
  await cartPage.expectProductNotVisible(testData.productName);
});
