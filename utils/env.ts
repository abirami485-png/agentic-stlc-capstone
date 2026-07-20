export const DEFAULT_BASE_URL = 'https://www.saucedemo.com';

export function getBaseUrl(): string {
  return process.env.BASE_URL?.trim() || DEFAULT_BASE_URL;
}
