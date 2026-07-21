import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { toKebabCase } from '../utils/string';

export class CartPage extends BasePage {
  readonly checkoutButton = this.page.getByTestId('checkout');
  readonly continueShoppingButton = this.page.getByTestId('continue-shopping');

  constructor(page: Page) {
    super(page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.checkoutButton).toBeVisible();
  }

    await this.page.getByTestId(`remove-${toKebabCase(productName)}`).click();
    await this.page.getByTestId(`remove-${productName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`).click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async expectItemVisible(productName: string): Promise<void> {
    await expect(this.page.getByText(productName, { exact: true })).toBeVisible();

  async expectItemNotVisible(productName: string): Promise<void> {
    await expect(this.page.getByText(productName, { exact: true })).toHaveCount(0);
  }
  }
}