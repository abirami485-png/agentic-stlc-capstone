import { test, expect } from '../fixtures/test-fixtures';
import { testData } from '../utils/test-data';

test('TC-001 Valid user logs in, adds a product, views cart, and completes checkout', async ({
  page,
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInfoPage,
  checkoutOverviewPage,
  checkoutCompletePage
}) => {
  await loginPage.open();
  await loginPage.login(testData['TC-001'].username, testData['TC-001'].password);

  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(testData['TC-001'].productName);
  await expect(inventoryPage.cartBadge).toHaveText('1');

  await inventoryPage.openCart();
  await cartPage.expectProductVisible(testData['TC-001'].productName);
  await cartPage.proceedToCheckout();

  await checkoutInfoPage.fillCustomerInformation(
    testData['TC-001'].firstName,
    testData['TC-001'].lastName,
    testData['TC-001'].postalCode
  );
  await checkoutInfoPage.continue();

  await checkoutOverviewPage.expectLoaded();
  await checkoutOverviewPage.finishCheckout();
  await checkoutCompletePage.expectOrderCompleted();
});

test('TC-002 Invalid login displays an error message', async ({ loginPage, page }) => {
  await loginPage.open();
  await loginPage.login(testData['TC-002'].username, testData['TC-002'].password);

  await loginPage.expectErrorMessage('Username and password do not match any user in this service');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByText('Products')).toHaveCount(0);
});

test('TC-003 Unauthenticated user cannot access the Inventory page directly', async ({ page, loginPage }) => {
  await page.goto('/inventory.html');

  await expect(loginPage.loginButton).toBeVisible();
  await expect(page).toHaveURL(/saucedemo\.com/);
  await expect(page.getByText('Products')).toHaveCount(0);
});

test('TC-004 User adds a product to the cart, views it, and removes it', async ({ loginPage, inventoryPage, cartPage }) => {
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(testData['TC-004'].productName);
  await inventoryPage.openCart();

  await cartPage.expectProductVisible(testData['TC-004'].productName);
  await cartPage.removeProduct(testData['TC-004'].productName);
  await expect(cartPage.itemByName(testData['TC-004'].productName)).toHaveCount(0);
});

test('TC-005 Checkout cannot continue when a mandatory customer field is missing', async ({ loginPage, inventoryPage, cartPage, checkoutInfoPage }) => {
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.openCart();
  await cartPage.proceedToCheckout();

  await checkoutInfoPage.fillCustomerInformation(
    testData['TC-005'].firstName,
    testData['TC-005'].lastName,
    testData['TC-005'].postalCode
  );
  await checkoutInfoPage.continue();

  await checkoutInfoPage.expectValidationMessage('Error: Postal Code is required');
  await expect(checkoutInfoPage.continueButton).toBeVisible();
});

test('TC-006 Authenticated user logs out successfully', async ({ loginPage, inventoryPage, page }) => {
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.expectLoaded();
  await inventoryPage.logout();

  await expect(loginPage.loginButton).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
  await page.goto('/inventory.html');
  await expect(loginPage.loginButton).toBeVisible();
});
