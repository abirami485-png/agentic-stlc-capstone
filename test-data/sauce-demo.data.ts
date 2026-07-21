export const sauceDemoTestData = {
  validUser: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  invalidUser: {
    username: 'invalid_user',
    password: 'invalid_password',
  },
  purchaseProduct: 'Sauce Labs Backpack',
  cartProduct: 'Sauce Labs Bike Light',
  customer: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
  },
  emptyCustomer: {
    firstName: '',
    lastName: '',
    postalCode: '',
  },
} as const;