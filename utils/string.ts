export function toKebabCase(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const removeWhitespace = (value: string): string => value.replace(/\s+/g, ' ').trim();