import { expect, Locator, Page } from '@playwright/test';
import { productActionSelector } from '../utils/selectors';

export class CartPage {
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(private readonly page: Page) {
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.cartItems = page.locator('.cart_item');
  }

  async expectProductInCart(productName: string): Promise<void> {
    await expect(this.page.getByText(productName, { exact: true })).toBeVisible();
    await expect(this.page.locator(productActionSelector('remove-from-cart', productName))).toBeVisible();
  }

  async removeProduct(productName: string): Promise<void> {
    await this.page.locator(productActionSelector('remove-from-cart', productName)).click();
  }

  async goToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async expectCartEmptyOf(productName: string): Promise<void> {
    await expect(this.page.getByText(productName, { exact: true })).toHaveCount(0);
  }
}
