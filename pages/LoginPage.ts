import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  usernameInput() {
    return this.page.getByLabel('Username');
  }

  passwordInput() {
    return this.page.getByLabel('Password');
  }

  loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  errorMessage() {
    return this.page.getByRole('heading', { name: /Epic sadface/i }).or(this.page.getByText(/Epic sadface/i));
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
  }

  async expectOnLoginPage(): Promise<void> {
    await expect(this.usernameInput()).toBeVisible();
    await expect(this.passwordInput()).toBeVisible();
    await expect(this.loginButton()).toBeVisible();
  }
}