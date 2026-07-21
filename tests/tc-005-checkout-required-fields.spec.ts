import { test, expect } from '../fixtures/app.fixture';
import { sauceDemoTestData } from '../test-data/sauce-demo.data';
import { loginWithStandardUser } from '../utils/auth';

test('TC-005: Prevent checkout when mandatory customer information is missing', async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
}) => {
  await loginWithStandardUser(loginPage);
  await inventoryPage.addProductToCart(sauceDemoTestData.purchaseProduct);
  await inventoryPage.openCart();
  await cartPage.checkout();

  await checkoutInformationPage.expectLoaded();
  await checkoutInformationPage.submitCustomerInformation(
    sauceDemoTestData.emptyCustomer.firstName,
    sauceDemoTestData.emptyCustomer.lastName,
    sauceDemoTestData.emptyCustomer.postalCode,
  );

  await expect(checkoutInformationPage.errorMessage).toBeVisible();
  await expect(checkoutInformationPage.errorMessage).toContainText('First Name is required');
  await checkoutInformationPage.expectLoaded();
});