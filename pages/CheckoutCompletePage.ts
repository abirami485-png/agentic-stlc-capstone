import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectOrderComplete(): Promise<void> {
    await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
  }
}
