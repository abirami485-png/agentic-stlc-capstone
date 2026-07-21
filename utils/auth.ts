import type { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { credentials } from '../test-data';

export const loginAsValidUser = async (page: Page): Promise<void> => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(credentials.validUser.username, credentials.validUser.password);
};
