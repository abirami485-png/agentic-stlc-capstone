import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async expectOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*saucedemo\.com\/?.*/);
    await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
  }

  async expectErrorMessage(message: string): Promise<void> {
    await expect(this.page.locator('[data-test="error"]')).toContainText(message);
  }
}
