import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutInformationPage extends BasePage {
  readonly firstNameInput = this.page.getByTestId('firstName');
  readonly lastNameInput = this.page.getByTestId('lastName');
  readonly postalCodeInput = this.page.getByTestId('postalCode');
  readonly continueButton = this.page.getByTestId('continue');
  readonly errorMessage = this.page.getByTestId('error');

  constructor(page: Page) {
    super(page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.getByText('Checkout: Your Information')).toBeVisible();
  }

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async submitCustomerInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fillCustomerInformation(firstName, lastName, postalCode);
    await this.continue();
  }
}