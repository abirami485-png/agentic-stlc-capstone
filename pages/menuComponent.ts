import { expect, type Page } from '@playwright/test';

export class MenuComponent {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
  }

  async logout(): Promise<void> {
    await this.page.getByRole('link', { name: 'Logout' }).click();
  }

  async expectLogoutVisible(): Promise<void> {
    await expect(this.page.getByRole('link', { name: 'Logout' })).toBeVisible();
  }
}