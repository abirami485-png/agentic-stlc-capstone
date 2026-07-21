import { expect, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Your Cart' })).toBeVisible();
  }

  async checkout(): Promise<void> {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }

  async removeProduct(productName: string): Promise<void> {
    await this.page.locator('.cart_item').filter({ hasText: productName }).getByRole('button', { name: 'Remove' }).click();
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(this.page.locator('.cart_item')).toContainText(productName);
  }

  async expectProductNotVisible(productName: string): Promise<void> {
    await expect(this.page.locator('.cart_item').filter({ hasText: productName })).toHaveCount(0);
  }
}
