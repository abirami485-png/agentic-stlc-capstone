export function getEnv(name: string, fallback = ''): string {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : fallback;
}

export const env = {
  baseUrl: getEnv('BASE_URL', 'https://www.saucedemo.com/'),
};