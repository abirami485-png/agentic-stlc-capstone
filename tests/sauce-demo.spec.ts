import { test, expect, env } from '../fixtures/test-fixtures';
import { checkoutCustomer, invalidCheckoutCustomer } from '../test-data/test-data';

test('TC-001 - Log in with valid credentials and view the product inventory', async ({ page, loginPage, inventoryPage }) => {
  await loginPage.openLoginPage();
  await loginPage.login(env.validUsername, env.validPassword);
  await inventoryPage.expectLoaded();
  await expect(page.getByText('Products')).toBeVisible();
  const productCount = await page.locator('.inventory_item').count();
  expect(productCount).toBeGreaterThan(0);
});

test.skip('TC-002 - Attempt to log in with invalid credentials', async ({ loginPage }) => {
  await loginPage.openLoginPage();
  await loginPage.login(env.invalidUsername, env.invalidPassword);
  await loginPage.expectLoginError('Username and password do not match any user in this service');
});

test('TC-003 - Add a product to the cart, view it in the cart, and remove it', async ({ page, loginPage, inventoryPage, cartPage }) => {
  await loginPage.openLoginPage();
  await loginPage.login(env.validUsername, env.validPassword);
  await inventoryPage.expectLoaded();
  await inventoryPage.addFirstProductToCart();
  await inventoryPage.expectCartCount(1);
  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await expect(page.locator('.cart_item')).toHaveCount(1);
  await cartPage.removeFirstProduct();
  await expect(page.locator('.cart_item')).toHaveCount(0);
});

test('TC-004 - Complete checkout successfully with valid customer information', async ({ loginPage, inventoryPage, cartPage, checkoutInformationPage, checkoutOverviewPage, checkoutCompletePage }) => {
  await loginPage.openLoginPage();
  await loginPage.login(env.validUsername, env.validPassword);
  await inventoryPage.expectLoaded();
  await inventoryPage.addFirstProductToCart();
  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();
  await checkoutInformationPage.fillCustomerInformation(checkoutCustomer.firstName, checkoutCustomer.lastName, checkoutCustomer.postalCode);
  await checkoutInformationPage.continue();
  await checkoutOverviewPage.expectLoaded();
  await checkoutOverviewPage.finish();
  await checkoutCompletePage.expectOrderConfirmation();
});

test.skip('TC-005 - Attempt to continue checkout with a missing mandatory customer field', async ({ page, loginPage, inventoryPage, cartPage, checkoutInformationPage }) => {
  await loginPage.openLoginPage();
  await loginPage.login(env.validUsername, env.validPassword);
  await inventoryPage.expectLoaded();
  await inventoryPage.addFirstProductToCart();
  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();
  await checkoutInformationPage.fillCustomerInformation(invalidCheckoutCustomer.firstName, invalidCheckoutCustomer.lastName, invalidCheckoutCustomer.postalCode);
  await checkoutInformationPage.continue();
  await checkoutInformationPage.expectValidationMessage('Postal Code is required');
  await expect(page.getByText('Checkout: Your Information')).toBeVisible();
});

test('TC-006 - Log out and verify Inventory access is blocked after logout', async ({ page, loginPage, inventoryPage }) => {
  await loginPage.openLoginPage();
  await loginPage.login(env.validUsername, env.validPassword);
  await inventoryPage.expectLoaded();
  await inventoryPage.logout();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await page.goto(`${env.baseUrl}/inventory.html`);
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await expect(page.locator('.inventory_list')).toHaveCount(0);
});
