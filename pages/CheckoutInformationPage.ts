import { expect, Page } from '@playwright/test';

export class CheckoutInformationPage {
  constructor(private readonly page: Page) {}

  private readonly firstNameInput = this.page.getByPlaceholder('First Name');
  private readonly lastNameInput = this.page.getByPlaceholder('Last Name');
  private readonly postalCodeInput = this.page.getByPlaceholder('Zip/Postal Code');
  private readonly continueButton = this.page.getByRole('button', { name: 'Continue' });
  private readonly errorMessage = this.page.locator('[data-test="error"]');

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    if (firstName) await this.firstNameInput.fill(firstName);
    if (lastName) await this.lastNameInput.fill(lastName);
    if (postalCode) await this.postalCodeInput.fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async expectValidationMessageVisible(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }
}
