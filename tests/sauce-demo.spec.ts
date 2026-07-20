import { test, expect } from '../fixtures/test';
import { sauceDemoData } from '../test-data/sauceDemoData';

test('TC-001 - Log in with valid credentials and access the Inventory page', async ({ page, loginPage, inventoryPage }) => {
  await loginPage.goto();
  await loginPage.login(sauceDemoData.validLogin.username, sauceDemoData.validLogin.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.expectProductVisible(sauceDemoData.productName);
  await expect(page).toHaveURL(/inventory.html/);
});

test('TC-002 - Display an error for invalid login credentials', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login(sauceDemoData.invalidLogin.username, sauceDemoData.invalidLogin.password);
  await loginPage.expectErrorMessage('Username and password do not match any user in this service');
  await expect(page).toHaveURL(/\//);
});

test('TC-003 - Block unauthenticated access to the Inventory page', async ({ page }) => {
  await page.goto('/inventory.html');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.locator('.inventory_list')).toHaveCount(0);
});

test('TC-004 - Add and remove a product from the cart and verify cart contents', async ({ page, loginPage, inventoryPage, cartPage }) => {
  await loginPage.goto();
  await loginPage.login(sauceDemoData.validLogin.username, sauceDemoData.validLogin.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(sauceDemoData.productName);
  await inventoryPage.openCart();
  await cartPage.expectProductInCart(sauceDemoData.productName);
  await cartPage.removeProduct(sauceDemoData.productName);
  await expect(page.getByText(sauceDemoData.productName, { exact: true })).toHaveCount(0);
});

test('TC-005 - Complete purchase checkout successfully and log out', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage }) => {
  await loginPage.goto();
  await loginPage.login(sauceDemoData.validLogin.username, sauceDemoData.validLogin.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(sauceDemoData.productName);
  await inventoryPage.openCart();
  await cartPage.expectProductInCart(sauceDemoData.productName);
  await cartPage.goToCheckout();
  await checkoutPage.fillCustomerInformation(
    sauceDemoData.checkoutCustomer.firstName,
    sauceDemoData.checkoutCustomer.lastName,
    sauceDemoData.checkoutCustomer.postalCode
  );
  await checkoutPage.continue();
  await checkoutPage.finish();
  await checkoutPage.expectComplete();
  await inventoryPage.logout();
  await expect(page).toHaveURL(/\//);
});

test('TC-006 - Prevent checkout when mandatory customer information is missing', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
  for (const variant of sauceDemoData.checkoutVariants) {
    await loginPage.goto();
    await loginPage.login(sauceDemoData.validLogin.username, sauceDemoData.validLogin.password);
    await inventoryPage.expectLoaded();
    await inventoryPage.addProductToCart(sauceDemoData.productName);
    await inventoryPage.openCart();
    await cartPage.goToCheckout();
    await checkoutPage.fillCustomerInformation(variant.firstName, variant.lastName, variant.postalCode);
    await checkoutPage.continue();
    await checkoutPage.expectValidationMessage(`Error: ${variant.missingField} is required`);
    await expect(checkoutPage.continueButton).toBeVisible();
  }
});
