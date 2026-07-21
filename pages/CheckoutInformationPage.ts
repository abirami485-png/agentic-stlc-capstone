import { expect, Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class CheckoutInformationPage extends BasePage {
  private readonly firstNameInput = this.page.getByPlaceholder('First Name');
  private readonly lastNameInput = this.page.getByPlaceholder('Last Name');
  private readonly postalCodeInput = this.page.getByPlaceholder('Zip/Postal Code');
  private readonly continueButton = this.page.getByRole('button', { name: 'Continue' });
  private readonly errorMessage = this.page.getByRole('alert');

  constructor(page: Page) {
    super(page);
  }

  async expectLoaded() {
    await expect(this.page.getByText('Checkout: Your Information')).toBeVisible();
  }

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async expectValidationMessage(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }
}
