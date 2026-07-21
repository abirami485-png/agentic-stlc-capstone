import { test, expect } from '../fixtures/test-fixtures';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { Sidebar } from '../pages/Sidebar';
import { testUsers, checkoutCustomer, inventoryProduct } from '../test-data/saucedemo';

const invalidCredentials = {
  username: testUsers.invalid.username,
  password: testUsers.invalid.password
};

test('TC-001 Valid user logs in and reaches the Inventory page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.open();
  await loginPage.login(testUsers.standard.username, testUsers.standard.password);
  await inventoryPage.expectLoaded();
  await expect(page.getByText(inventoryProduct.name)).toBeVisible();
});

test('TC-002 Invalid credentials display a login error', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(invalidCredentials.username, invalidCredentials.password);
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
  await loginPage.expectOnLoginPage();
});

test('TC-003 Unauthenticated user cannot access the Inventory page', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/inventory.html');
  await loginPage.expectOnLoginPage();
});

test('TC-004 User adds a product to the cart, views it, and removes it', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.open();
  await loginPage.login(testUsers.standard.username, testUsers.standard.password);
  await inventoryPage.expectLoaded();

  await inventoryPage.addProductToCart(inventoryProduct.name);
  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectProductVisible(inventoryProduct.name);

  await cartPage.continueShopping();
  await inventoryPage.expectLoaded();
  await inventoryPage.removeProductFromCart(inventoryProduct.name);
  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectProductNotVisible(inventoryProduct.name);
});

test('TC-005 User completes checkout successfully and logs out', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const sidebar = new Sidebar(page);

  await loginPage.open();
  await loginPage.login(testUsers.standard.username, testUsers.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(inventoryProduct.name);
  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.checkout();

  await checkoutPage.expectInformationPage();
  await checkoutPage.fillCustomerInformation(checkoutCustomer.firstName, checkoutCustomer.lastName, checkoutCustomer.postalCode);
  await checkoutPage.continue();
  await checkoutPage.expectOverviewPage();
  await checkoutPage.finish();
  await checkoutPage.expectCompletePage();

  await sidebar.logout();
  await loginPage.expectOnLoginPage();
});

test('TC-006 Checkout cannot continue when mandatory customer information is missing', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.open();
  await loginPage.login(testUsers.standard.username, testUsers.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(inventoryProduct.name);
  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.checkout();

  await checkoutPage.expectInformationPage();
  await checkoutPage.fillCustomerInformation(checkoutCustomer.firstName, checkoutCustomer.lastName, '');
  await checkoutPage.continue();
  await checkoutPage.expectPostalCodeValidation();
  await checkoutPage.expectInformationPage();
});