import { test, expect } from '../fixtures/test-fixtures';
import { checkoutCustomer, sauceDemoUsers } from '../test-data/sauce-demo-data';

test('TC-005 User completes checkout successfully with mandatory customer information', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
  await loginPage.goto();
  await loginPage.login(sauceDemoUsers.standardUser.username, sauceDemoUsers.standardUser.password);
  await inventoryPage.addBackpackToCart();
  await inventoryPage.openCart();
  await cartPage.proceedToCheckout();

  await checkoutPage.fillCustomerInformation(
    checkoutCustomer.firstName,
    checkoutCustomer.lastName,
    checkoutCustomer.postalCode
  );
  await checkoutPage.continue();
  await checkoutPage.finish();

  await checkoutPage.expectOrderComplete();
});

test('TC-006 Checkout does not continue when a mandatory customer field is missing', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
  await loginPage.goto();
  await loginPage.login(sauceDemoUsers.standardUser.username, sauceDemoUsers.standardUser.password);
  await inventoryPage.addBackpackToCart();
  await inventoryPage.openCart();
  await cartPage.proceedToCheckout();

  await checkoutPage.fillCustomerInformation(
    checkoutCustomer.firstName,
    checkoutCustomer.lastName,
    ''
  );
  await checkoutPage.continue();

  await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
  await expect(checkoutPage.page).toHaveURL(/checkout-step-one\.html/);
});

test('TC-007 User logs out successfully and is redirected to the Login page', async ({ loginPage, inventoryPage }) => {
  await loginPage.goto();
  await loginPage.login(sauceDemoUsers.standardUser.username, sauceDemoUsers.standardUser.password);
  await inventoryPage.logout();

  await expect(loginPage.page.getByPlaceholder('Username')).toBeVisible();
  await expect(loginPage.page).toHaveURL(/\/$/);
});
