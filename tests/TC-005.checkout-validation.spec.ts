import { test } from '../fixtures/baseFixture';
import { env } from '../utils/env';
import { testData } from '../utils/testData';

test('TC-005 Checkout cannot proceed without mandatory customer information', async ({ loginPage, inventoryPage, cartPage, checkoutPage, appHeader }) => {
  await loginPage.goto();
  await loginPage.login(env.username, env.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(testData.productName);
  await appHeader.goToCart();
  await cartPage.expectLoaded();
  await cartPage.checkout();
  await checkoutPage.expectInformationStep();
  await checkoutPage.fillCustomerInformation('', '', '');
  await checkoutPage.continue();
  await checkoutPage.expectErrorMessage('Error: First Name is required');
});
