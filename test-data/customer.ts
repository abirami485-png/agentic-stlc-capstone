export const customerData = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345'
} as const;

export const incompleteCustomerData = {
  firstName: '',
  lastName: 'Doe',
  postalCode: '12345'
} as const;
