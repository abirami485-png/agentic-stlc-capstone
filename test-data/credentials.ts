export const credentials = {
  validUser: {
    username: process.env.APP_USERNAME ?? 'standard_user',
    password: process.env.APP_PASSWORD ?? 'secret_sauce'
  },
  invalidUser: {
    username: 'invalid_user',
    password: 'invalid_password'
  }
} as const;
