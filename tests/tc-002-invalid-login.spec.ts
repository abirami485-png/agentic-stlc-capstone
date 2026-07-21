import { test, expect } from '../fixtures/app.fixture';
import { sauceDemoTestData } from '../test-data/sauce-demo.data';

test('TC-002: Display an error for invalid login credentials', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(sauceDemoTestData.invalidUser.username, sauceDemoTestData.invalidUser.password);

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  await loginPage.expectOnLoginPage();
});