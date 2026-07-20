import { expect, type Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async expectProductVisible(productName: string): Promise<void> {
    await expect(this.page.getByText(productName, { exact: true })).toBeVisible();
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }

  async removeProduct(productName: string): Promise<void> {
    await this.page.getByRole('button', { name: `Remove` }).first().click();
    await expect(this.page.getByText(productName, { exact: true })).not.toBeVisible();
  }

  async expectCartEmpty(): Promise<void> {
    await expect(this.page.locator('.cart_item')).toHaveCount(0);
  }
}
