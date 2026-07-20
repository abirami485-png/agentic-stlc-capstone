import { test, expect } from '../fixtures/appFixture';
import { sauceDemoTestData } from '../test-data/sauceDemo.data';

test.describe('SauceDemo end-to-end automation', () => {
  test('TC-001 Valid user logs in and accesses the inventory page', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.open();
    await loginPage.login(sauceDemoTestData.validUser.username, sauceDemoTestData.validUser.password);
    await expect(page).toHaveURL(/inventory\.html/);
    await inventoryPage.expectLoaded();
  });

  test('TC-002 Invalid credentials display a login error', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.login(sauceDemoTestData.invalidUser.username, sauceDemoTestData.invalidUser.password);
    await expect(page).toHaveURL(/\/$|index\.html/);
    await loginPage.expectErrorMessage();
    await loginPage.expectOnLoginPage();
  });

  test('TC-003 Unauthenticated user cannot access the inventory page directly', async ({ page, loginPage }) => {
    await page.goto('/inventory.html');
    await expect(page).not.toHaveURL(/inventory\.html/);
    await loginPage.expectOnLoginPage();
  });

  test('TC-004 Authenticated user adds and removes a product from the cart', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.open();
    await loginPage.login(sauceDemoTestData.validUser.username, sauceDemoTestData.validUser.password);
    await inventoryPage.expectLoaded();
    await inventoryPage.addProductToCart(sauceDemoTestData.productName);
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.removeProductFromCart(sauceDemoTestData.productName);
    await expect(inventoryPage.cartBadge).toHaveCount(0);
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });

  test('TC-005 User views selected products in the shopping cart', async ({ loginPage, inventoryPage, cartPage }) => {
    await loginPage.open();
    await loginPage.login(sauceDemoTestData.validUser.username, sauceDemoTestData.validUser.password);
    await inventoryPage.addProductToCart(sauceDemoTestData.productName);
    await inventoryPage.openCart();
    await cartPage.expectLoaded();
    await cartPage.expectProductVisible(sauceDemoTestData.productName);
  });

  test('TC-006 User completes checkout successfully with mandatory customer information', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.open();
    await loginPage.login(sauceDemoTestData.validUser.username, sauceDemoTestData.validUser.password);
    await inventoryPage.addProductToCart(sauceDemoTestData.productName);
    await inventoryPage.openCart();
    await cartPage.startCheckout();
    await checkoutPage.expectCheckoutInformationPage();
    await checkoutPage.fillCustomerInformation(
      sauceDemoTestData.customer.firstName,
      sauceDemoTestData.customer.lastName,
      sauceDemoTestData.customer.postalCode
    );
    await checkoutPage.continueCheckout();
    await expect(checkoutPage.overviewTitle).toBeVisible();
    await checkoutPage.finishCheckout();
    await checkoutPage.expectCheckoutComplete();
  });

  test('TC-007 Checkout cannot continue when mandatory customer information is missing', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.open();
    await loginPage.login(sauceDemoTestData.validUser.username, sauceDemoTestData.validUser.password);
    await inventoryPage.addProductToCart(sauceDemoTestData.productName);
    await inventoryPage.openCart();
    await cartPage.startCheckout();
    await checkoutPage.expectCheckoutInformationPage();
    await checkoutPage.fillCustomerInformation(
      sauceDemoTestData.incompleteCustomer.firstName,
      sauceDemoTestData.incompleteCustomer.lastName,
      sauceDemoTestData.incompleteCustomer.postalCode
    );
    await checkoutPage.continueCheckout();
    await checkoutPage.expectValidationMessage();
    await checkoutPage.expectCheckoutInformationPage();
  });

  test('TC-008 User logs out successfully and returns to the Login page', async ({ loginPage, inventoryPage, menuPage, page }) => {
    await loginPage.open();
    await loginPage.login(sauceDemoTestData.validUser.username, sauceDemoTestData.validUser.password);
    await inventoryPage.expectLoaded();
    await menuPage.openMenu();
    await menuPage.logout();
    await expect(page).not.toHaveURL(/inventory\.html/);
    await loginPage.expectOnLoginPage();
  });
});
