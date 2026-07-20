import { expect, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CheckoutInformationPage extends BasePage {
  private readonly title = this.page.getByText('Checkout: Your Information', { exact: true });
  private readonly firstNameInput = this.page.getByPlaceholder('First Name');
  private readonly lastNameInput = this.page.getByPlaceholder('Last Name');
  private readonly postalCodeInput = this.page.getByPlaceholder('Zip/Postal Code');
  private readonly continueButton = this.page.getByRole('button', { name: 'Continue' });
  private readonly errorMessage = this.page.getByRole('alert');

  constructor(page: Page) {
    super(page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toBeVisible();
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async expectRequiredFieldError(): Promise<void> {
    await expect(this.errorMessage).toContainText('Error: First Name is required');
  }
}