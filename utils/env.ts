export type AppEnv = {
  baseURL: string;
  username: string;
  password: string;
  invalidUsername: string;
  invalidPassword: string;
  firstName: string;
  lastName: string;
  postalCode: string;
};

export const env: AppEnv = {
  baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
  username: process.env.SAUCE_USERNAME || 'standard_user',
  password: process.env.SAUCE_PASSWORD || 'secret_sauce',
  invalidUsername: process.env.SAUCE_INVALID_USERNAME || 'locked_out_user',
  invalidPassword: process.env.SAUCE_INVALID_PASSWORD || 'wrong_password',
  firstName: process.env.SAUCE_FIRST_NAME || 'John',
  lastName: process.env.SAUCE_LAST_NAME || 'Doe',
  postalCode: process.env.SAUCE_POSTAL_CODE || '12345'
};
