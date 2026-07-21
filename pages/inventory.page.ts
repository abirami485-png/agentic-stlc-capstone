import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { toKebabCase } from '../utils/string';

export class InventoryPage extends BasePage {
  readonly cartLink = this.page.getByTestId('shopping-cart-link');
  readonly cartBadge = this.page.getByTestId('shopping-cart-badge');
  readonly menuButton = this.page.getByTestId('open-menu');
  readonly logoutLink = this.page.getByTestId('logout-sidebar-link');

  constructor(page: Page) {
    super(page);
  }

  private productCard(productName: string): Locator {
    return this.page.locator('.inventory_item').filter({ hasText: productName });
  }

  private productActionButton(action: 'add-to-cart' | 'remove', productName: string): Locator {
    return this.page.getByTestId(`${action}-${toKebabCase(productName)}`);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.getByText('Products')).toBeVisible();
    await expect(this.cartLink).toBeVisible();
  }

  async addProductToCart(productName: string): Promise<void> {
    await expect(this.productCard(productName)).toBeVisible();
    await this.productActionButton('add-to-cart', productName).click();
  }

  async removeProductFromCart(productName: string): Promise<void> {
    await this.productActionButton('remove', productName).click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async expectCartCount(count: number): Promise<void> {
    if (count === 0) {
      await expect(this.cartBadge).toHaveCount(0);
      return;
    }

    await expect(this.cartBadge).toHaveText(String(count));
  }
}