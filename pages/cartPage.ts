import { expect, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
  private readonly cartTitle = this.page.getByText('Your Cart', { exact: true });
  private readonly checkoutButton = this.page.getByRole('button', { name: 'Checkout' });

  constructor(page: Page) {
    super(page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.cartTitle).toBeVisible();
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(this.page.getByText(productName, { exact: true })).toBeVisible();
  }

  async expectProductHidden(productName: string): Promise<void> {
    await expect(this.page.getByText(productName, { exact: true })).toHaveCount(0);
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}