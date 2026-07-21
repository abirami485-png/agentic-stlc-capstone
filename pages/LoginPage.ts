import { expect, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async attemptLogin(username: string, password: string): Promise<void> {
    await this.login(username, password);
  }

  async expectErrorMessage(message: string): Promise<void> {
    await expect(this.page.locator('[data-test="error"]')).toContainText(message);
  }

  async expectOnLoginPage(): Promise<void> {
    await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
  }
}
