import { test } from '../fixtures/testFixture';
import { expectOnCartPage, expectOnCheckoutInformationPage, expectOnCheckoutOverviewPage, expectOnInventoryPage } from '../utils/helpers';

test('TC-005 User completes checkout with mandatory customer information', async ({ page, loginPage, inventoryPage, cartPage, checkoutInformationPage, checkoutOverviewPage, checkoutCompletePage, appData }) => {
  await loginPage.open();
  await loginPage.login(appData.validUser.username, appData.validUser.password);
  await expectOnInventoryPage(page);
  await inventoryPage.addProductToCart(appData.productName);
  await inventoryPage.openCart();
  await expectOnCartPage(page);
  await cartPage.proceedToCheckout();
  await expectOnCheckoutInformationPage(page);
  await checkoutInformationPage.fillCustomerInformation(appData.customer.firstName, appData.customer.lastName, appData.customer.postalCode);
  await checkoutInformationPage.continue();
  await expectOnCheckoutOverviewPage(page);
  await checkoutOverviewPage.expectOverviewVisible();
  await checkoutOverviewPage.finishCheckout();
  await checkoutCompletePage.expectOrderComplete();
});

test('TC-006 Checkout is blocked when mandatory customer information is missing', async ({ page, loginPage, inventoryPage, cartPage, checkoutInformationPage, appData }) => {
  await loginPage.open();
  await loginPage.login(appData.validUser.username, appData.validUser.password);
  await expectOnInventoryPage(page);
  await inventoryPage.addProductToCart(appData.productName);
  await inventoryPage.openCart();
  await expectOnCartPage(page);
  await cartPage.proceedToCheckout();
  await expectOnCheckoutInformationPage(page);
  await checkoutInformationPage.fillCustomerInformation(appData.customer.firstName, appData.customer.lastName, '');
  await checkoutInformationPage.continue();
  await checkoutInformationPage.expectValidationError();
});
