import { expect, Page } from '@playwright/test';

export class CheckoutCompletePage {
  constructor(private readonly page: Page) {}

  private readonly confirmationHeader = this.page.getByText('Thank you for your order!');

  async expectConfirmationVisible(): Promise<void> {
    await expect(this.confirmationHeader).toBeVisible();
  }
}
