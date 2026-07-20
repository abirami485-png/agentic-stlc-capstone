import { test, expect } from '../fixtures/test-fixtures';
import { credentials } from '../test-data/credentials';
import { customerInfo } from '../test-data/customer';



test('TC-001 - Complete shopping workflow from login to logout', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage }) => {
  await loginPage.goto();
  await loginPage.login(credentials.valid.username, credentials.valid.password);
  await inventoryPage.expectVisible();
  await inventoryPage.expectProductsDisplayed();

  const productName = await inventoryPage.addFirstProductToCart();
  await inventoryPage.goToCart();
  await cartPage.expectProductVisible(productName);
  await cartPage.proceedToCheckout();

  await checkoutPage.expectCheckoutStepOneVisible();
  await checkoutPage.fillCustomerInfo(customerInfo.valid.firstName, customerInfo.valid.lastName, customerInfo.valid.postalCode);
  await checkoutPage.continueCheckout();
  await checkoutPage.expectCheckoutOverviewVisible();
  await checkoutPage.finishCheckout();
  await checkoutPage.expectCheckoutCompleteVisible();

  await inventoryPage.logout();
  await loginPage.expectOnLoginPage();
});

test('TC-002 - Show error message for invalid login credentials', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(credentials.invalid.username, credentials.invalid.password);
  await loginPage.expectErrorMessage('Username and password do not match any user in this service');
  await loginPage.expectOnLoginPage();
});

test('TC-003 - Prevent unauthenticated access to the Inventory page', async ({ page, loginPage }) => {
  await page.goto('/inventory.html');
  await loginPage.expectOnLoginPage();
  await expect(page).not.toHaveURL(/.*inventory\.html/);
  await expect(page.locator(inventoryProductsLocator)).toHaveCount(0);
});

test('TC-004 - Remove a product from the shopping cart', async ({ page, loginPage, inventoryPage, cartPage }) => {
  await loginPage.goto();
  await loginPage.login(credentials.valid.username, credentials.valid.password);
  await inventoryPage.expectVisible();

  const productName = await inventoryPage.addFirstProductToCart();
  await inventoryPage.goToCart();
  await cartPage.expectProductVisible(productName);
  await cartPage.removeProduct(productName);
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  await cartPage.expectCartEmpty();
});

test('TC-005 - Block checkout when mandatory customer information is missing', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
  await loginPage.goto();
  await loginPage.login(credentials.valid.username, credentials.valid.password);
  await inventoryPage.expectVisible();
  await inventoryPage.addFirstProductToCart();
  await inventoryPage.goToCart();
  await cartPage.proceedToCheckout();

  await checkoutPage.expectCheckoutStepOneVisible();
  await checkoutPage.fillCustomerInfo(customerInfo.invalidMissing.firstName, customerInfo.invalidMissing.lastName, customerInfo.invalidMissing.postalCode);
  await checkoutPage.continueCheckout();
  await checkoutPage.expectValidationMessage('Error: First Name is required');
  await checkoutPage.expectCheckoutStepOneVisible();
});
