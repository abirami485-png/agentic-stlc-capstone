import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { routes } from '../utils/routes';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.page.getByRole('heading', { name: 'Your Cart' })).toBeVisible();
  }

  async open(): Promise<void> {
    await this.page.goto(routes.cart);
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }

  async removeProduct(productName: string): Promise<void> {
    const cartItem = this.page.locator('.cart_item').filter({ hasText: productName });
    await cartItem.getByRole('button', { name: 'Remove' }).click();
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(this.page.getByText(productName, { exact: true })).toBeVisible();
  }

  async expectProductNotVisible(productName: string): Promise<void> {
    await expect(this.page.getByText(productName, { exact: true })).toHaveCount(0);
  }
}
