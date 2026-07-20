import { expect } from '@playwright/test';
import { BasePage } from './base-page';
import { toSlug } from '../utils/selectors';

export class CartPage extends BasePage {
  readonly checkoutButton = this.page.getByRole('button', { name: 'Checkout' });

  itemByName(productName: string) {
    return this.page.locator(`[data-test="inventory-item-name"]`, { hasText: productName });
  }

  removeButton(productName: string) {
    return this.page.locator(`[data-test="remove-${toSlug(productName)}"]`);
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(this.itemByName(productName)).toBeVisible();
  }

  async removeProduct(productName: string): Promise<void> {
    await this.removeButton(productName).click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
