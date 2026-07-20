import { expect, Page } from '@playwright/test';

export class CheckoutOverviewPage {
  constructor(private readonly page: Page) {}

  private readonly finishButton = this.page.getByRole('button', { name: 'Finish' });
  private readonly overviewContainer = this.page.locator('[data-test="checkout-summary-container"]');

  async expectDisplayed(): Promise<void> {
    await expect(this.overviewContainer).toBeVisible();
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }
}
