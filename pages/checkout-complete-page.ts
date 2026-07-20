import { expect } from '@playwright/test';
import { BasePage } from './base-page';

export class CheckoutCompletePage extends BasePage {
  readonly confirmationHeader = this.page.getByText('Thank you for your order!');
  readonly backHomeButton = this.page.getByRole('button', { name: 'Back Home' });

  async expectOrderCompleted(): Promise<void> {
    await expect(this.confirmationHeader).toBeVisible();
  }
}
