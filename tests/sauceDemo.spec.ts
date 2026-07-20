import { test, expect } from '../fixtures/appFixtures';
import { env } from '../utils/env';
import { sauceDemoData } from '../test-data/sauceDemoData';

test('TC-001 Log in, manage cart, complete checkout, and log out successfully', async ({ page, loginPage, inventoryPage, cartPage, checkoutInformationPage, checkoutOverviewPage, checkoutCompletePage }) => {
  await loginPage.goto();
  await loginPage.login(env.validUsername, env.validPassword);
  await inventoryPage.expectLoaded();

  await inventoryPage.addProduct(sauceDemoData.tc001.firstProduct);
  await inventoryPage.addProduct(sauceDemoData.tc001.secondProduct);
  await inventoryPage.removeProduct(sauceDemoData.tc001.firstProduct);
  await inventoryPage.openCart();

  await cartPage.expectLoaded();
  await cartPage.expectProductVisible(sauceDemoData.tc001.secondProduct);
  await cartPage.proceedToCheckout();

  await checkoutInformationPage.expectLoaded();
  await checkoutInformationPage.fillInformation(sauceDemoData.tc001.firstName, sauceDemoData.tc001.lastName, sauceDemoData.tc001.postalCode);
  await checkoutInformationPage.continue();

  await checkoutOverviewPage.expectLoaded();
  await checkoutOverviewPage.finishCheckout();

  await checkoutCompletePage.expectOrderConfirmed();
  await checkoutCompletePage.backToProducts();
  await inventoryPage.expectLoaded();
  await inventoryPage.logout();
  await loginPage.expectVisible();
});

test('TC-002 Display an error for invalid login credentials', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(sauceDemoData.tc002.username, sauceDemoData.tc002.password);
  await loginPage.expectErrorMessage('Epic sadface: Username and password do not match any user in this service');
  await loginPage.expectVisible();
});

test('TC-003 Block unauthenticated access to the Inventory page', async ({ page, loginPage, inventoryPage }) => {
  await page.goto('/inventory.html');
  await expect(page).not.toHaveURL(/inventory\.html/);
  await loginPage.expectVisible();
  await expect(page.getByText('Products', { exact: true })).toHaveCount(0);
  await inventoryPage.expectNoInventoryContent();
});

test('TC-004 Validate mandatory customer information during checkout', async ({ loginPage, inventoryPage, cartPage, checkoutInformationPage }) => {
  await loginPage.goto();
  await loginPage.login(env.validUsername, env.validPassword);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProduct(sauceDemoData.tc001.firstProduct);
  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.proceedToCheckout();

  await checkoutInformationPage.expectLoaded();
  await checkoutInformationPage.fillInformation(sauceDemoData.tc004.firstName, sauceDemoData.tc004.lastName, sauceDemoData.tc004.postalCode);
  await checkoutInformationPage.continue();
  await checkoutInformationPage.expectRequiredFieldError();
});