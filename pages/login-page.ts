import { expect } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  readonly usernameInput = this.page.getByPlaceholder('Username');
  readonly passwordInput = this.page.getByPlaceholder('Password');
  readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  readonly errorMessage = this.page.locator('[data-test="error"]');

  async open(): Promise<void> {
    await this.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectErrorMessage(message: string): Promise<void> {
    await expect(this.errorMessage).toContainText(message);
  }
}
