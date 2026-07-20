import { test, expect } from '../fixtures/testFixture';

test('TC-005 - Proceed to checkout and complete the purchase with mandatory customer information', async ({ loginPage, inventoryPage, cartPage, checkoutPage, testData }) => {
  await loginPage.goto();
  await loginPage.login(testData.credentials.validUser.username, testData.credentials.validUser.password);
  await inventoryPage.addProductToCart(testData.products.backpack.name);
  await inventoryPage.openCart();
  await cartPage.checkout();
  await checkoutPage.expectInformationPageVisible();
  await checkoutPage.fillCustomerInformation(
    testData.customer.validCustomer.firstName,
    testData.customer.validCustomer.lastName,
    testData.customer.validCustomer.postalCode
  );
  await checkoutPage.continue();
  await checkoutPage.expectOverviewVisible();
  await checkoutPage.finish();
  await checkoutPage.expectOrderComplete();
});

test('TC-006 - Block checkout when mandatory customer information is incomplete', async ({ loginPage, inventoryPage, cartPage, checkoutPage, testData }) => {
  await loginPage.goto();
  await loginPage.login(testData.credentials.validUser.username, testData.credentials.validUser.password);
  await inventoryPage.addProductToCart(testData.products.backpack.name);
  await inventoryPage.openCart();
  await cartPage.checkout();
  await checkoutPage.expectInformationPageVisible();
  await checkoutPage.fillCustomerInformation(
    testData.customer.incompleteCustomer.firstName,
    testData.customer.incompleteCustomer.lastName,
    testData.customer.incompleteCustomer.postalCode
  );
  await checkoutPage.continue();
  await checkoutPage.expectValidationMessage();
});