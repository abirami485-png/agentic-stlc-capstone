import { expect, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  private readonly usernameInput = this.page.getByPlaceholder('Username');
  private readonly passwordInput = this.page.getByPlaceholder('Password');
  private readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  private readonly errorBanner = this.page.getByRole('alert');

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectVisible(): Promise<void> {
    await expect(this.loginButton).toBeVisible();
  }

  async expectErrorMessage(message: string): Promise<void> {
    await expect(this.errorBanner).toContainText(message);
  }
}