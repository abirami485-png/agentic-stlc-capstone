import type { Page } from '@playwright/test';

export class BasePage {
  constructor(public readonly page: Page) {}

  async open(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async currentPath(): Promise<string> {
    return new URL(this.page.url()).pathname;
  }

  async currentPath(): Promise<string> {
    return new URL(this.page.url()).pathname;
  }