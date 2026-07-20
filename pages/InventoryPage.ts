import { expect, Page } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  private readonly inventoryContainer = this.page.locator('[data-test="inventory-container"]');
  private readonly inventoryItems = this.page.locator('.inventory_item');
  private readonly cartLink = this.page.locator('.shopping_cart_link');
  private readonly cartBadge = this.page.locator('.shopping_cart_badge');
  private readonly menuButton = this.page.getByRole('button', { name: 'Open Menu' });
  private readonly logoutLink = this.page.getByRole('link', { name: 'Logout' });

  async expectLoaded(): Promise<void> {
    await expect(this.inventoryContainer).toBeVisible();
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async addFirstProductToCart(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add to cart' }).first().click();
  }

  async removeFirstProductFromCart(): Promise<void> {
    await this.page.getByRole('button', { name: 'Remove' }).first().click();
  }

  async expectCartBadgeCount(count: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
