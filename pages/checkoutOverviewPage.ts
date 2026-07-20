import { expect, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CheckoutOverviewPage extends BasePage {
  private readonly title = this.page.getByText('Checkout: Overview', { exact: true });
  private readonly finishButton = this.page.getByRole('button', { name: 'Finish' });

  constructor(page: Page) {
    super(page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toBeVisible();
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }
}