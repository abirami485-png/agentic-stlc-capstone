import type { LoginPage } from '../pages/login.page';

export async function loginWithCredentials(
  loginPage: LoginPage,
  username: string,
  password: string,
): Promise<void> {
  await loginPage.goto();
  await loginPage.login(username, password);
}

export async function loginWithStandardUser(loginPage: LoginPage): Promise<void> {
  await loginWithCredentials(loginPage, process.env.USERNAME ?? 'standard_user', process.env.PASSWORD ?? 'secret_sauce');
}