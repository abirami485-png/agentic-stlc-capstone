export const firstDefined = <T>(...values: Array<T | undefined | null>): T => {
  const value = values.find((entry) => entry !== undefined && entry !== null);
  if (value === undefined || value === null) {
    throw new Error('No defined value found');
  }
  return value;
};
