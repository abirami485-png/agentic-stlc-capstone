import { expect, Page } from '@playwright/test';

export async function expectOnLoginPage(page: Page): Promise<void> {
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
}

export async function expectOnInventoryPage(page: Page): Promise<void> {
  await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
  await expect(page.getByText('Products')).toBeVisible();
}

export async function expectOnCartPage(page: Page): Promise<void> {
  await expect(page.getByText('Your Cart')).toBeVisible();
}

export async function expectOnCheckoutInformationPage(page: Page): Promise<void> {
  await expect(page.getByText('Checkout: Your Information')).toBeVisible();
}

export async function expectOnCheckoutOverviewPage(page: Page): Promise<void> {
  await expect(page.getByText('Checkout: Overview')).toBeVisible();
}
