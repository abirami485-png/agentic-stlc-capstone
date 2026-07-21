import { expect, Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async expectInformationPage(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    await expect(this.page.getByText('Checkout: Your Information')).toBeVisible();
  }

  async expectOverviewPage(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    await expect(this.page.getByText('Checkout: Overview')).toBeVisible();
  }

  async expectCompletePage(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
  }

  firstNameInput() {
    return this.page.getByLabel('First Name');
  }

  lastNameInput() {
    return this.page.getByLabel('Last Name');
  }

  postalCodeInput() {
    return this.page.getByLabel('Zip/Postal Code');
  }

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput().fill(firstName);
    await this.lastNameInput().fill(lastName);
    await this.postalCodeInput().fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async finish(): Promise<void> {
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }

  async expectPostalCodeValidation(): Promise<void> {
    await expect(this.page.getByText('Error: Postal Code is required')).toBeVisible();
  }
}