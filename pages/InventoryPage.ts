import { expect, Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class InventoryPage extends BasePage {
  private readonly inventoryContainer = this.page.locator('.inventory_list');
  private readonly cartLink = this.page.locator('.shopping_cart_link');
  private readonly cartBadge = this.page.locator('.shopping_cart_badge');
  private readonly menuButton = this.page.getByRole('button', { name: 'Open Menu' });
  private readonly logoutLink = this.page.getByRole('link', { name: 'Logout' });

  constructor(page: Page) {
    super(page);
  }

  async expectLoaded() {
    await expect(this.inventoryContainer).toBeVisible();
  }

  async addFirstProductToCart() {
    await this.page.locator('button').filter({ hasText: 'Add to cart' }).first().click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async expectCartCount(count: number) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
