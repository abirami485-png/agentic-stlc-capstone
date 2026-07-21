import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly cartContents = this.page.locator('.cart_contents_container');
  private readonly checkoutButton = this.page.getByRole('button', { name: 'Checkout' });

  constructor(page: Page) {
    super(page);
  }

  async expectLoaded() {
    await expect(this.cartContents).toBeVisible();
  }

  async removeFirstProduct() {
    await this.page.getByRole('button', { name: 'Remove' }).first().click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
