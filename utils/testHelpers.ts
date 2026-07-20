export function isEmpty(value: string | undefined | null): boolean {
  return !value || value.trim().length === 0;
}
