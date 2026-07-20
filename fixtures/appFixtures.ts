import { test as base } from '@playwright/test';
import { CartPage } from '../pages/cartPage';
import { CheckoutCompletePage } from '../pages/checkoutCompletePage';
import { CheckoutInformationPage } from '../pages/checkoutInformationPage';
import { CheckoutOverviewPage } from '../pages/checkoutOverviewPage';
import { InventoryPage } from '../pages/inventoryPage';
import { LoginPage } from '../pages/loginPage';

type AppFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutInformationPage: CheckoutInformationPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
};

export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutInformationPage: async ({ page }, use) => {
    await use(new CheckoutInformationPage(page));
  },
  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  }
});

export { expect } from '@playwright/test';
