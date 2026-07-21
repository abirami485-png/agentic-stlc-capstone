import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly cartItem = (productName: string) => this.page.locator('[data-test="inventory_item_name"]', { hasText: productName });
  private readonly checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
  private readonly removeButton = this.page.getByRole('button', { name: 'Remove' });

  constructor(page: Page) {
    super(page);
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(this.cartItem(productName)).toBeVisible();
  }

  async removeProduct(productName: string): Promise<void> {
    await this.removeButton.click();
    await expect(this.cartItem(productName)).toHaveCount(0);
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
