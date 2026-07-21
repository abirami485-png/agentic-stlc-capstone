import { test, expect } from '../fixtures/test-fixtures';
import { credentials, products, customerData, incompleteCustomerData } from '../test-data';
import { loginAsValidUser } from '../utils/auth';
import { routes } from '../utils/routes';

test('TC-001: Log in with valid credentials and view the inventory page', async ({ loginPage, inventoryPage, page }) => {
  await loginPage.goto();
  await loginPage.login(credentials.validUser.username, credentials.validUser.password);

  await inventoryPage.expectVisible();
  await expect(page.getByText(products.backpack, { exact: true })).toBeVisible();
});

test('TC-002: Show an error message for invalid login credentials', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login(credentials.invalidUser.username, credentials.invalidUser.password);

  await expect(page).toHaveURL(/\/?$/);
  await loginPage.expectErrorMessage('Username and password do not match any user in this service');
});

test('TC-003: Block unauthenticated access to the Inventory page', async ({ page, loginPage }) => {
  await page.goto(routes.inventory);

  await loginPage.expectLoginPage();
  await expect(page).not.toHaveURL(/inventory\.html/);
});

test('TC-004: Add a product to the cart and view it in the shopping cart', async ({ page, inventoryPage, cartPage }) => {
  await loginAsValidUser(page);
  await inventoryPage.addProductToCart(products.backpack);
  await inventoryPage.openCart();

  await cartPage.expectVisible();
  await cartPage.expectProductVisible(products.backpack);
});

test('TC-005: Remove a product from the cart', async ({ page, inventoryPage, cartPage }) => {
  await loginAsValidUser(page);
  await inventoryPage.addProductToCart(products.backpack);
  await inventoryPage.openCart();
  await cartPage.removeProduct(products.backpack);

  await cartPage.expectProductNotVisible(products.backpack);
});

test('TC-006: Proceed to checkout and complete the order successfully', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
  await loginAsValidUser(page);
  await inventoryPage.addProductToCart(products.backpack);
  await inventoryPage.openCart();
  await cartPage.proceedToCheckout();

  await checkoutPage.expectInformationPage();
  await checkoutPage.fillCustomerInformation(customerData.firstName, customerData.lastName, customerData.postalCode);
  await checkoutPage.continue();
  await checkoutPage.expectOverviewPage();
  await checkoutPage.finish();
  await checkoutPage.expectCompletePage();
});

test('TC-007: Prevent checkout when mandatory customer information is missing', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
  await loginAsValidUser(page);
  await inventoryPage.addProductToCart(products.backpack);
  await inventoryPage.openCart();
  await cartPage.proceedToCheckout();

  await checkoutPage.expectInformationPage();
  await checkoutPage.fillCustomerInformation(incompleteCustomerData.firstName, incompleteCustomerData.lastName, incompleteCustomerData.postalCode);
  await checkoutPage.continue();

  await expect(page.getByRole('heading', { name: 'Checkout: Your Information' })).toBeVisible();
  await expect(page.getByRole('alert')).toContainText('Error: First Name is required');
});

test('TC-008: Log out successfully and return to the Login page', async ({ page, menu, loginPage }) => {
  await loginAsValidUser(page);
  await menu.logout();

  await loginPage.expectLoginPage();
});
