import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  private readonly inventoryContainer = this.page.locator('[data-test="inventory-container"]');
  private readonly shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]');
  private readonly menuButton = this.page.getByRole('button', { name: 'Open Menu' });
  private readonly logoutLink = this.page.getByText('Logout');
  private readonly productItem = (productName: string) => this.page.locator('[data-test="inventory-item"]').filter({ hasText: productName });

  constructor(page: Page) {
    super(page);
  }

  async expectInventoryVisible(): Promise<void> {
    await expect(this.inventoryContainer).toBeVisible();
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.productItem(productName).getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
