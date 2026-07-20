import dotenv from 'dotenv';

dotenv.config();

const parseBoolean = (value: string | undefined, defaultValue: boolean): boolean => {
  if (value === undefined) {
    return defaultValue;
  }

  return ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase());
};

const parseNumber = (value: string | undefined, defaultValue: number): number => {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : defaultValue;
};

export const env = {
  baseUrl: process.env.APP_URL?.trim() || 'https://www.saucedemo.com',
  headless: parseBoolean(process.env.HEADLESS, true),
  timeout: parseNumber(process.env.TIMEOUT, 30_000)
};
