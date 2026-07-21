import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly cartItem = (productName: string) => this.page.locator('[data-test="inventory-item-name"]', { hasText: productName });
  private readonly checkoutButton = this.page.getByRole('button', { name: 'Checkout' });

  constructor(page: Page) {
    super(page);
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(this.cartItem(productName)).toBeVisible();
  }

  async removeProduct(productName: string): Promise<void> {
    await this.page.getByRole('button', { name: 'Remove' }).first().click();
    await expect(this.page.getByText(productName)).toHaveCount(0);
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
