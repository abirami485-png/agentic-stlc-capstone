export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com',
  validUsername: process.env.VALID_USERNAME ?? 'standard_user',
  validPassword: process.env.VALID_PASSWORD ?? 'secret_sauce',
  invalidUsername: process.env.INVALID_USERNAME ?? 'invalid_user',
  invalidPassword: process.env.INVALID_PASSWORD ?? 'invalid_password'
} as const;
