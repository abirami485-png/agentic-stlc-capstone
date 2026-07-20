import { type Page, type Locator } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }
}