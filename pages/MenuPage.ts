import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class MenuPage extends BasePage {
  readonly openMenuButton = this.page.getByRole('button', { name: 'Open Menu' });
  readonly logoutLink = this.page.getByRole('link', { name: 'Logout' });

  constructor(page: Page) {
    super(page);
  }

  async openMenu(): Promise<void> {
    await this.openMenuButton.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }

  async expectLogoutVisible(): Promise<void> {
    await expect(this.logoutLink).toBeVisible();
  }
}
