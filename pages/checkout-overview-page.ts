import { expect } from '@playwright/test';
import { BasePage } from './base-page';

export class CheckoutOverviewPage extends BasePage {
  readonly finishButton = this.page.getByRole('button', { name: 'Finish' });
  readonly itemTotalLabel = this.page.locator('.summary_subtotal_label');

  async expectLoaded(): Promise<void> {
    await expect(this.finishButton).toBeVisible();
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }
}
