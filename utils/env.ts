import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
  baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
  standardUser: process.env.STANDARD_USER || 'standard_user',
  lockedOutUser: process.env.LOCKED_OUT_USER || 'locked_out_user',
  password: process.env.SECRET_SAUCE_PASSWORD || 'secret_sauce',
  firstName: process.env.DEFAULT_FIRST_NAME || 'John',
  lastName: process.env.DEFAULT_LAST_NAME || 'Doe',
  postalCode: process.env.DEFAULT_POSTAL_CODE || '12345'
};
