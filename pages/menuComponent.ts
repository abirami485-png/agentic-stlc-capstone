import { expect, type Page } from '@playwright/test';

export class MenuComponent {
  private readonly menuButton = this.page.getByRole('button', { name: 'Open Menu' });
  private readonly logoutLink = this.page.getByRole('link', { name: 'Logout' });

  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.menuButton.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }

  async expectLogoutVisible(): Promise<void> {
    await expect(this.logoutLink).toBeVisible();
  }
}