import { expect } from '@playwright/test';
import { BasePage } from './base-page';
import { toSlug } from '../utils/selectors';

export class InventoryPage extends BasePage {
  readonly cartLink = this.page.getByRole('link', { name: /shopping cart/i });
  readonly menuButton = this.page.getByRole('button', { name: 'Open Menu' });
  readonly logoutLink = this.page.getByRole('link', { name: 'Logout' });
  readonly inventoryItems = this.page.locator('.inventory_item');

  async expectLoaded(): Promise<void> {
    await expect(this.page.getByText('Products')).toBeVisible();
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  productCard(productName: string) {
    return this.page.locator(`[data-test="inventory-item-${toSlug(productName)}"]`);
  }

  addToCartButton(productName: string) {
    return this.page.locator(`[data-test="add-to-cart-${toSlug(productName)}"]`);
  }

  removeFromCartButton(productName: string) {
    return this.page.locator(`[data-test="remove-${toSlug(productName)}"]`);
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.addToCartButton(productName).click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
