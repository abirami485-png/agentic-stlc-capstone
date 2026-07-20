import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartTitle = this.page.getByRole('heading', { name: 'Your Cart' });
  readonly checkoutButton = this.page.getByRole('button', { name: 'Checkout' });

  constructor(page: Page) {
    super(page);
  }

  cartItem(productName: string) {
    return this.page.locator('.cart_item').filter({ hasText: productName });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.cartTitle).toBeVisible();
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(this.cartItem(productName)).toBeVisible();
  }

  async startCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
