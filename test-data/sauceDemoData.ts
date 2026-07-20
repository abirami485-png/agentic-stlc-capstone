import { env } from '../utils/env';

export const sauceDemoData = {
  validLogin: {
    username: env.standardUser,
    password: env.password
  },
  invalidLogin: {
    username: 'invalid_user',
    password: 'invalid_password'
  },
  productName: 'Sauce Labs Backpack',
  checkoutCustomer: {
    firstName: env.firstName,
    lastName: env.lastName,
    postalCode: env.postalCode
  },
  checkoutVariants: [
    {
      missingField: 'First Name',
      firstName: '',
      lastName: env.lastName,
      postalCode: env.postalCode
    },
    {
      missingField: 'Last Name',
      firstName: env.firstName,
      lastName: '',
      postalCode: env.postalCode
    },
    {
      missingField: 'Postal Code',
      firstName: env.firstName,
      lastName: env.lastName,
      postalCode: ''
    }
  ]
};
