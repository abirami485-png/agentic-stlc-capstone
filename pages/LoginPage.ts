import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { routes } from '../utils/routes';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto(routes.login);
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async expectErrorMessage(message: string): Promise<void> {
    await expect(this.page.getByRole('alert')).toContainText(message);
  }

  async expectLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*\/$/);
    await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
  }
}
