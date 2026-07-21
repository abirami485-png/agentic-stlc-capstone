import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { routes } from '../utils/routes';

export class InventoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto(routes.inventory);
  }

  async expectVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.page.getByText('Products', { exact: true })).toBeVisible();
  }

  async isProductVisible(productName: string): Promise<boolean> {
    return await this.page.getByText(productName, { exact: true }).isVisible();
  }

  async addProductToCart(productName: string): Promise<void> {
    const productCard = this.page.locator('.inventory_item').filter({ hasText: productName });
    await productCard.getByRole('button').click();
  }

  async removeProductFromCart(productName: string): Promise<void> {
    const productCard = this.page.locator('.inventory_item').filter({ hasText: productName });
    await productCard.getByRole('button').click();
  }

  async openCart(): Promise<void> {
    await this.page.locator('.shopping_cart_link').click();
  }

  async openMenu(): Promise<void> {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.page.getByRole('link', { name: 'Logout' }).click();
  }
}
