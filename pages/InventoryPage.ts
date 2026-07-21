import { expect, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.getByText('Products')).toBeVisible();
  }

  private productCard(productName: string) {
    return this.page.locator('.inventory_item').filter({ hasText: productName });
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.productCard(productName).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeProductFromCart(productName: string): Promise<void> {
    await this.productCard(productName).getByRole('button', { name: 'Remove' }).click();
  }

  async openProductDetails(productName: string): Promise<void> {
    await this.productCard(productName).getByRole('link', { name: productName }).click();
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(this.productCard(productName)).toBeVisible();
  }

  async expectProductNotVisible(productName: string): Promise<void> {
    await expect(this.productCard(productName)).toHaveCount(0);
  }
}
