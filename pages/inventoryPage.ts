import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class InventoryPage extends BasePage {
  private readonly inventoryContainer = this.page.locator('.inventory_container');
  private readonly cartLink = this.page.getByTestId('shopping-cart-link');
  private readonly menuButton = this.page.getByRole('button', { name: 'Open Menu' });

  constructor(page: Page) {
    super(page);
  }

  productCard(productName: string): Locator {
    return this.page.locator('.inventory_item').filter({ hasText: productName });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.inventoryContainer).toBeVisible();
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(this.productCard(productName)).toBeVisible();
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.productCard(productName).getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }
}