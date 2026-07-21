import { test, expect } from '../fixtures/test-fixtures';
import { sauceDemoProducts, sauceDemoUsers } from '../test-data/sauce-demo-data';

test('TC-004 User adds a product to the cart, views it, and removes it', async ({ loginPage, inventoryPage, cartPage }) => {
  await loginPage.goto();
  await loginPage.login(sauceDemoUsers.standardUser.username, sauceDemoUsers.standardUser.password);
  await inventoryPage.expectLoaded();

  await inventoryPage.addBackpackToCart();
  await expect(inventoryPage.cartBadge).toHaveText('1');
  await inventoryPage.openCart();

  await cartPage.expectProductVisible(sauceDemoProducts.backpack);
  await cartPage.removeItem();
  await expect(cartPage.cartItems).toHaveCount(0);
});
