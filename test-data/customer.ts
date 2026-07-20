import { env } from '../utils/env';

export const customerInfo = {
  valid: {
    firstName: env.firstName,
    lastName: env.lastName,
    postalCode: env.postalCode,
  },
  invalidMissing: {
    firstName: '',
    lastName: '',
    postalCode: '',
  },
};
