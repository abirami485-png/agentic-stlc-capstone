import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryTitle: Locator;
  readonly inventoryItems: Locator;
  readonly backpackAddButton: Locator;
  readonly backpackRemoveButton: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryTitle = page.getByText('Products');
    this.inventoryItems = page.locator('.inventory_item');
    this.backpackAddButton = page.getByTestId('add-to-cart-sauce-labs-backpack');
    this.backpackRemoveButton = page.getByTestId('remove-sauce-labs-backpack');
    this.cartLink = page.getByRole('link', { name: 'Shopping Cart' });
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.inventoryTitle).toBeVisible();
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async addBackpackToCart(): Promise<void> {
    await this.backpackAddButton.click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
