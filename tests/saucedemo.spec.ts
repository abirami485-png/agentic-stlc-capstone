import { test, expect } from '../fixtures/test-fixtures';
import { testData } from '../utils/test-data';
import { env } from '../utils/env';

test.describe('SauceDemo end-to-end flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(env.baseURL);
  });

  test('TC-001 - Log in with valid credentials and access the Inventory page', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await inventoryPage.expectLoaded();
    await expect(testData.validUser.username).toBeDefined();
  });

  test('TC-002 - Show an error message for invalid login credentials', async ({ loginPage }) => {
    await loginPage.login(testData.invalidUser.username, testData.invalidUser.password);
    await loginPage.expectErrorMessageVisible();
  });

  test('TC-003 - Add a product to the cart and remove it from the Inventory page', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await inventoryPage.expectLoaded();
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.expectCartBadgeCount(1);
    await inventoryPage.removeFirstProductFromCart();
    await expect(inventoryPage).toBeDefined();
  });

  test('TC-004 - View selected products in the shopping cart', async ({ loginPage, inventoryPage, cartPage }) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.openCart();
    await cartPage.expectItemVisible();
  });

  test('TC-005 - Proceed from the shopping cart to checkout', async ({ loginPage, inventoryPage, cartPage, page }) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test('TC-006 - Prevent checkout continuation when mandatory customer information is missing', async ({ loginPage, inventoryPage, cartPage, checkoutInformationPage }) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();
    await checkoutInformationPage.fillCustomerInformation('', '', '');
    await checkoutInformationPage.continue();
    await checkoutInformationPage.expectValidationMessageVisible();
  });

  test('TC-007 - Complete checkout successfully with valid customer information', async ({ loginPage, inventoryPage, cartPage, checkoutInformationPage, checkoutOverviewPage, checkoutCompletePage }) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();
    await checkoutInformationPage.fillCustomerInformation(testData.customer.firstName, testData.customer.lastName, testData.customer.postalCode);
    await checkoutInformationPage.continue();
    await checkoutOverviewPage.expectDisplayed();
    await checkoutOverviewPage.finishOrder();
    await checkoutCompletePage.expectConfirmationVisible();
  });

  test('TC-008 - Log out successfully and return to the Login page', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await inventoryPage.logout();
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });
});