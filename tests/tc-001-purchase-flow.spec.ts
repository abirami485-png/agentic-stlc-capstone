import { test, expect } from '../fixtures/app.fixture';
import { sauceDemoTestData } from '../test-data/sauce-demo.data';
import { loginWithStandardUser } from '../utils/auth';

test('TC-001: Log in, purchase a product, and log out successfully', async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  checkoutCompletePage,
}) => {
  await loginWithStandardUser(loginPage);
  await inventoryPage.expectLoaded();

  await inventoryPage.addProductToCart(sauceDemoTestData.purchaseProduct);
  await inventoryPage.expectCartCount(1);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectItemVisible(sauceDemoTestData.purchaseProduct);

  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();
  await checkoutInformationPage.submitCustomerInformation(
    sauceDemoTestData.customer.firstName,
    sauceDemoTestData.customer.lastName,
    sauceDemoTestData.customer.postalCode,
  );

  await checkoutOverviewPage.expectLoaded();
  await checkoutOverviewPage.finishOrder();

  await checkoutCompletePage.expectLoaded();
  await checkoutCompletePage.backHome();

  await inventoryPage.expectLoaded();
  await inventoryPage.logout();

  await loginPage.expectOnLoginPage();
  await expect(loginPage.usernameInput).toBeVisible();
});