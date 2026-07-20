import { expect, type Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async expectUrlContains(pathFragment: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(pathFragment));
  }

  async open(path: string): Promise<void> {
    await this.page.goto(path);
  }
}