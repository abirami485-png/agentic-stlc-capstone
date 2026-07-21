import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutOverviewPage extends BasePage {
  readonly finishButton = this.page.getByTestId('finish');

  constructor(page: Page) {
    super(page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.getByText('Checkout: Overview')).toBeVisible();
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }
}