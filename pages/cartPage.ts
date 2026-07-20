import { expect, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
  private readonly cartContainer = this.page.locator('.cart_contents_container');
  private readonly checkoutButton = this.page.getByRole('button', { name: 'Checkout' });

  constructor(page: Page) {
    super(page);
  }

  cartItem(productName: string) {
    return this.page.locator('.cart_item').filter({ hasText: productName });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.cartContainer).toBeVisible();
  }

  async expectItemVisible(productName: string): Promise<void> {
    await expect(this.cartItem(productName)).toBeVisible();
  }

  async removeItem(productName: string): Promise<void> {
    await this.cartItem(productName).getByRole('button', { name: 'Remove' }).click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}