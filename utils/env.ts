import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
  baseURL: process.env.BASE_URL || 'https://www.saucedemo.com/',
  username: process.env.USERNAME || 'standard_user',
  password: process.env.PASSWORD || 'secret_sauce'
};