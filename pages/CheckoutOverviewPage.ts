import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutOverviewPage extends BasePage {
  private readonly finishButton = this.page.getByRole('button', { name: 'Finish' });

  constructor(page: Page) {
    super(page);
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }

  async expectOverviewVisible(): Promise<void> {
    await expect(this.page.getByText('Checkout: Overview')).toBeVisible();
  }
}
