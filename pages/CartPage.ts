import { expect, Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  private readonly cartItems = this.page.locator('.cart_item');
  private readonly checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
  private readonly itemName = this.page.locator('.inventory_item_name');
  private readonly itemDescription = this.page.locator('.inventory_item_desc');

  async expectItemVisible(): Promise<void> {
    await expect(this.cartItems.first()).toBeVisible();
    await expect(this.itemName.first()).toBeVisible();
    await expect(this.itemDescription.first()).toBeVisible();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
