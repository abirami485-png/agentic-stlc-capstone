import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { routes } from '../utils/routes';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectInformationPage(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    await expect(this.page.getByRole('heading', { name: 'Checkout: Your Information' })).toBeVisible();
  }

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    if (firstName !== undefined) {
      await this.page.getByPlaceholder('First Name').fill(firstName);
    }
    if (lastName !== undefined) {
      await this.page.getByPlaceholder('Last Name').fill(lastName);
    }
    if (postalCode !== undefined) {
      await this.page.getByPlaceholder('Zip/Postal Code').fill(postalCode);
    }
  }

  async continue(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async finish(): Promise<void> {
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }

  async expectOverviewPage(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    await expect(this.page.getByRole('heading', { name: 'Checkout: Overview' })).toBeVisible();
  }

  async expectCompletePage(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.page.getByRole('heading', { name: 'Checkout: Complete!' })).toBeVisible();
  }

  async gotoStepOne(): Promise<void> {
    await this.page.goto(routes.checkoutStepOne);
  }
}
