import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutCompletePage extends BasePage {
  readonly backHomeButton = this.page.getByTestId('back-to-products');

  constructor(page: Page) {
    super(page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.getByText('Checkout: Complete!')).toBeVisible();
    await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
  }

  async backHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}