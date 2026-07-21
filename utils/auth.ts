import type { Page } from '@playwright/test';

export async function openInventoryDirectly(page: Page): Promise<void> {
  await page.goto('/inventory.html');
}
