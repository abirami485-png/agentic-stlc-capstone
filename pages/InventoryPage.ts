import { expect, Page } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.page.getByText('Products')).toBeVisible();
  }

  productCard(productName: string) {
    return this.page.getByText(productName, { exact: true }).locator('xpath=ancestor::div[@data-test="inventory-item"]');
  }

  addToCartButton(productName: string) {
    return this.productCard(productName).getByRole('button', { name: /Add to cart/i });
  }

  removeButton(productName: string) {
    return this.productCard(productName).getByRole('button', { name: /Remove/i });
  }

  cartLink() {
    return this.page.getByTestId('shopping-cart-link');
  }

  menuButton() {
    return this.page.getByRole('button', { name: 'Open Menu' });
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.addToCartButton(productName).click();
  }

  async removeProductFromCart(productName: string): Promise<void> {
    await this.removeButton(productName).click();
  }

  async openCart(): Promise<void> {
    await this.cartLink().click();
  }

  async openMenu(): Promise<void> {
    await this.menuButton().click();
  }
}