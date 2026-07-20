import { env } from '../utils/env';

export const credentials = {
  valid: {
    username: env.validUsername,
    password: env.validPassword,
  },
  invalid: {
    username: env.invalidUsername,
    password: env.invalidPassword,
  },
};
