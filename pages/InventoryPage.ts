import { expect, type Page } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  async expectVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.page.getByText('Products')).toBeVisible();
  }

  async addFirstProductToCart(): Promise<string> {
    const firstItem = this.page.locator('.inventory_item').first();
    const productName = await firstItem.locator('.inventory_item_name').textContent();
    await firstItem.getByRole('button', { name: 'Add to cart' }).click();
    return productName?.trim() ?? '';
  }

  async goToCart(): Promise<void> {
    await this.page.locator('.shopping_cart_link').click();
  }

  async logout(): Promise<void> {
    await this.page.locator('#react-burger-menu-btn').click();
    await this.page.getByRole('link', { name: 'Logout' }).click();
  }

  async expectProductsDisplayed(): Promise<void> {
    await expect(this.page.locator('.inventory_item')).toHaveCountGreaterThan(0);
  }
}
