import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly inventoryTitle = this.page.getByRole('heading', { name: 'Products' });
  readonly shoppingCartLink = this.page.getByRole('link', { name: /shopping cart/i });
  readonly burgerMenuButton = this.page.getByRole('button', { name: 'Open Menu' });
  readonly productList = this.page.locator('.inventory_list');
  readonly cartBadge = this.page.locator('.shopping_cart_badge');

  constructor(page: Page) {
    super(page);
  }

  productCard(productName: string) {
    return this.page.locator('.inventory_item').filter({ hasText: productName });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.inventoryTitle).toBeVisible();
    await expect(this.productList).toBeVisible();
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.productCard(productName).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeProductFromCart(productName: string): Promise<void> {
    await this.productCard(productName).getByRole('button', { name: 'Remove' }).click();
  }

  async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }
}
