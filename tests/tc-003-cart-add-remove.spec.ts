import { test, expect } from '../fixtures/app.fixture';
import { sauceDemoTestData } from '../test-data/sauce-demo.data';
import { loginWithStandardUser } from '../utils/auth';

test('TC-003: Add a product to the cart and remove it successfully', async ({ loginPage, inventoryPage, cartPage }) => {
  await loginWithStandardUser(loginPage);
  await inventoryPage.expectLoaded();

  await inventoryPage.addProductToCart(sauceDemoTestData.cartProduct);
  await inventoryPage.expectCartCount(1);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectItemVisible(sauceDemoTestData.cartProduct);

  await inventoryPage.page.getByTestId(`remove-${sauceDemoTestData.cartProduct.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`).click();
  await expect(inventoryPage.cartBadge).toHaveCount(0);

  await inventoryPage.openCart();
  await expect(cartPage.page.getByText(sauceDemoTestData.cartProduct, { exact: true })).toHaveCount(0);
});