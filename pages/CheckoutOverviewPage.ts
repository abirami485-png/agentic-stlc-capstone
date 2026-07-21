import { expect, Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class CheckoutOverviewPage extends BasePage {
  private readonly finishButton = this.page.getByRole('button', { name: 'Finish' });

  constructor(page: Page) {
    super(page);
  }

  async expectLoaded() {
    await expect(this.page.getByText('Checkout: Overview')).toBeVisible();
  }

  async finish() {
    await this.finishButton.click();
  }
}
