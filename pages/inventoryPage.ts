import { expect, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class InventoryPage extends BasePage {
  private readonly inventoryTitle = this.page.getByText('Products', { exact: true });
  private readonly cartLink = this.page.getByRole('link', { name: 'shopping cart' });
  private readonly menuButton = this.page.getByRole('button', { name: 'Open Menu' });
  private readonly logoutLink = this.page.getByRole('link', { name: 'Logout' });
  private readonly inventoryContainer = this.page.locator('.inventory_list');

  constructor(page: Page) {
    super(page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.inventoryTitle).toBeVisible();
    await expect(this.inventoryContainer).toBeVisible();
  }

  private productCard(productName: string) {
    return this.page.locator('.inventory_item').filter({ hasText: productName });
  }

  async addProduct(productName: string): Promise<void> {
    await this.productCard(productName).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeProduct(productName: string): Promise<void> {
    await this.productCard(productName).getByRole('button', { name: 'Remove' }).click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async expectNoInventoryContent(): Promise<void> {
    await expect(this.inventoryContainer).toHaveCount(0);
  }
}