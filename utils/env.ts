export const env = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  validUsername: process.env.VALID_USERNAME || 'standard_user',
  validPassword: process.env.VALID_PASSWORD || 'secret_sauce',
  invalidUsername: process.env.INVALID_USERNAME || 'invalid_user',
  invalidPassword: process.env.INVALID_PASSWORD || 'invalid_password',
  firstName: process.env.FIRST_NAME || 'John',
  lastName: process.env.LAST_NAME || 'Doe',
  postalCode: process.env.POSTAL_CODE || '12345'
};
