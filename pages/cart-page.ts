import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly removeBackpackButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.removeBackpackButton = page.getByTestId('remove-sauce-labs-backpack');
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(this.page.getByText(productName)).toBeVisible();
  }

  async removeItem(): Promise<void> {
    await this.removeBackpackButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
