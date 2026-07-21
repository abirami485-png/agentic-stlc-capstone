export const getAppBaseUrl = (): string => {
  return process.env.APP_BASE_URL ?? 'https://www.saucedemo.com';
};
