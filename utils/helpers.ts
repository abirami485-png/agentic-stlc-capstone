import { expect, Page } from '@playwright/test';

export async function expectUrlContains(page: Page, fragment: string): Promise<void> {
  await expect(page).toHaveURL(new RegExp(fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
}

export async function expectTextVisible(page: Page, text: string): Promise<void> {
  await expect(page.getByText(text)).toBeVisible();
}