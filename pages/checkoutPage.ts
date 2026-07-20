import { expect, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CheckoutPage extends BasePage {
  private readonly firstNameInput = this.page.getByPlaceholder('First Name');
  private readonly lastNameInput = this.page.getByPlaceholder('Last Name');
  private readonly postalCodeInput = this.page.getByPlaceholder('Zip/Postal Code');
  private readonly continueButton = this.page.getByRole('button', { name: 'Continue' });
  private readonly finishButton = this.page.getByRole('button', { name: 'Finish' });
  private readonly completeHeader = this.page.getByRole('heading', { name: 'Thank you for your order!' });
  private readonly errorMessage = this.page.getByRole('alert');

  constructor(page: Page) {
    super(page);
  }

  async expectInformationPageVisible(): Promise<void> {
    await expect(this.continueButton).toBeVisible();
  }

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async expectOverviewVisible(): Promise<void> {
    await expect(this.finishButton).toBeVisible();
  }

  async expectOrderComplete(): Promise<void> {
    await expect(this.completeHeader).toBeVisible();
  }

  async expectValidationMessage(): Promise<void> {
    await expect(this.errorMessage).toContainText('Error: Postal Code is required');
  }
}