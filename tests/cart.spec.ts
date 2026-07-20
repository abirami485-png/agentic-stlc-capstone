import { test, expect } from '../fixtures/testFixture';

test('TC-004 - Add a product to the cart, verify it in the cart, and remove it', async ({ loginPage, inventoryPage, cartPage, testData }) => {
  await loginPage.goto();
  await loginPage.login(testData.credentials.validUser.username, testData.credentials.validUser.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(testData.products.backpack.name);
  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectItemVisible(testData.products.backpack.name);
  await cartPage.removeItem(testData.products.backpack.name);
  await expect(cartPage.cartItem(testData.products.backpack.name)).toHaveCount(0);
});