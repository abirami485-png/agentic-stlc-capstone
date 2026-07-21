import { expect, Page } from '@playwright/test';

export class AppHeader {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openMenu(): Promise<void> {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.page.getByRole('link', { name: 'Logout' }).click();
  }

  async goToCart(): Promise<void> {
    await this.page.getByRole('link', { name: /shopping cart/i }).click();
  }

  async expectCartItemCount(count: number): Promise<void> {
    await expect(this.page.locator('.shopping_cart_badge')).toHaveText(String(count));
  }
}
