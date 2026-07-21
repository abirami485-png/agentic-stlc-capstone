import { expect, Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.page.getByText('Your Cart')).toBeVisible();
  }

  cartItem(productName: string) {
    return this.page.getByTestId('inventory-item-name').filter({ hasText: productName });
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(this.cartItem(productName)).toBeVisible();
  }

  async expectProductNotVisible(productName: string): Promise<void> {
    await expect(this.page.getByTestId('inventory-item-name').filter({ hasText: productName })).toHaveCount(0);
  }

  async continueShopping(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }

  async checkout(): Promise<void> {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }
}