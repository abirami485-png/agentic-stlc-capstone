import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class MenuComponent extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
  }

  async logout(): Promise<void> {
    await this.open();
    await this.page.getByRole('link', { name: 'Logout' }).click();
  }
}
