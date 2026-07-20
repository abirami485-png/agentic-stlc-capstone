import { expect, Locator, Page } from '@playwright/test';
import { productTestId } from '../utils/selectors';

export class InventoryPage {
  readonly inventoryContainer: Locator;
  readonly shoppingCartLink: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(private readonly page: Page) {
    this.inventoryContainer = page.locator('.inventory_list');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.getByText('Products')).toBeVisible();
    await expect(this.inventoryContainer).toBeVisible();
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.page.getByTestId(productTestId('add-to-cart', productName)).click();
  }

  async removeProductFromCart(productName: string): Promise<void> {
    await this.page.getByTestId(productTestId('remove-from-cart', productName)).click();
  }

  async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(this.page.getByText(productName, { exact: true })).toBeVisible();
  }
}
