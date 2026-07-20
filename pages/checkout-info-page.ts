import { expect } from '@playwright/test';
import { BasePage } from './base-page';

export class CheckoutInfoPage extends BasePage {
  readonly firstNameInput = this.page.getByPlaceholder('First Name');
  readonly lastNameInput = this.page.getByPlaceholder('Last Name');
  readonly postalCodeInput = this.page.getByPlaceholder('Zip/Postal Code');
  readonly continueButton = this.page.getByRole('button', { name: 'Continue' });
  readonly errorMessage = this.page.locator('[data-test="error"]');

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async expectValidationMessage(message: string): Promise<void> {
    await expect(this.errorMessage).toContainText(message);
  }
}
