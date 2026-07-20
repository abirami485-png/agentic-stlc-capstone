import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly checkoutInfoTitle = this.page.getByRole('heading', { name: 'Checkout: Your Information' });
  readonly overviewTitle = this.page.getByRole('heading', { name: 'Checkout: Overview' });
  readonly completeTitle = this.page.getByRole('heading', { name: 'Checkout: Complete!' });
  readonly firstNameInput = this.page.getByPlaceholder('First Name');
  readonly lastNameInput = this.page.getByPlaceholder('Last Name');
  readonly postalCodeInput = this.page.getByPlaceholder('Zip/Postal Code');
  readonly continueButton = this.page.getByRole('button', { name: 'Continue' });
  readonly finishButton = this.page.getByRole('button', { name: 'Finish' });
  readonly errorMessage = this.page.locator('[data-test="error"]');

  constructor(page: Page) {
    super(page);
  }

  async expectCheckoutInformationPage(): Promise<void> {
    await expect(this.checkoutInfoTitle).toBeVisible();
  }

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueCheckout(): Promise<void> {
    await this.continueButton.click();
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }

  async expectCheckoutComplete(): Promise<void> {
    await expect(this.completeTitle).toBeVisible();
  }

  async expectValidationMessage(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }
}
