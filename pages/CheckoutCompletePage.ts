import { expect, Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class CheckoutCompletePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectOrderConfirmation() {
    await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
  }
}
