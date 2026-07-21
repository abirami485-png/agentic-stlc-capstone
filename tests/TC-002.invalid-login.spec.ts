import { test } from '../fixtures/baseFixture';
import { env } from '../utils/env';

test('TC-002 Invalid login shows an error message', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.attemptLogin(env.invalidUsername, env.invalidPassword);
  await loginPage.expectErrorMessage('Username and password do not match any user in this service');
  await loginPage.expectOnLoginPage();
});
