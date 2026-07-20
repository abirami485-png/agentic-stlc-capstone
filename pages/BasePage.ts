import { Page, expect } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async navigate(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async expectUrlNotContaining(value: string): Promise<void> {
    await expect(this.page).not.toHaveURL(new RegExp(value));
  }
}
