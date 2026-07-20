import { expect, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CheckoutCompletePage extends BasePage {
  private readonly completeTitle = this.page.getByText('Checkout: Complete!', { exact: true });
  private readonly confirmationHeader = this.page.getByText('Thank you for your order!', { exact: true });
  private readonly backHomeButton = this.page.getByRole('button', { name: 'Back Home' });

  constructor(page: Page) {
    super(page);
  }

  async expectOrderConfirmed(): Promise<void> {
    await expect(this.completeTitle).toBeVisible();
    await expect(this.confirmationHeader).toBeVisible();
  }

  async backToProducts(): Promise<void> {
    await this.backHomeButton.click();
  }
}