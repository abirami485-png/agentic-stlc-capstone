export const sauceDemoTestData = {
  validUser: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  invalidUser: {
    username: 'invalid_user',
    password: 'invalid_password'
  },
  productName: 'Sauce Labs Backpack',
  customer: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345'
  },
  incompleteCustomer: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: ''
  }
} as const;
