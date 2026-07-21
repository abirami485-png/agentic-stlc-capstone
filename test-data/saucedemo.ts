export const testUsers = {
  standard: {
    username: process.env.STANDARD_USER ?? 'standard_user',
    password: process.env.DEFAULT_PASSWORD ?? 'secret_sauce'
  },
  invalid: {
    username: process.env.STANDARD_USER ?? 'standard_user',
    password: 'wrong_password'
  }
} as const;

export const checkoutCustomer = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345'
} as const;

export const inventoryProduct = {
  name: 'Sauce Labs Backpack'
} as const;