import { expect, Page } from '@playwright/test';
import { env } from '@utils/env';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async open(path: string = '/') {
    await this.page.goto(`${env.baseUrl}${path}`);
  }

  async expectUrlContains(pathFragment: string) {
    await expect(this.page).toHaveURL(new RegExp(pathFragment));
  }
}
