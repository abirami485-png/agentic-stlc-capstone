import { test, expect } from '../fixtures/baseFixture';
import { env } from '../utils/env';
import { testData } from '../utils/testData';

test('TC-001 Complete purchase flow with valid login, checkout, and logout', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage, appHeader }) => {
  await loginPage.goto();
  await loginPage.login(env.username, env.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(testData.productName);
  await appHeader.expectCartItemCount(1);
  await appHeader.goToCart();
  await cartPage.expectLoaded();
  await cartPage.expectProductVisible(testData.productName);
  await cartPage.checkout();
  await checkoutPage.expectInformationStep();
  await checkoutPage.fillCustomerInformation(env.firstName, env.lastName, env.postalCode);
  await checkoutPage.continue();
  await expect(page.getByRole('heading', { name: 'Checkout: Overview' })).toBeVisible();
  await checkoutPage.finish();
  await checkoutPage.expectOrderComplete();
  await appHeader.logout();
  await loginPage.expectOnLoginPage();
});
