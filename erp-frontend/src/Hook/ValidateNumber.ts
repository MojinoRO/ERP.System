export const IsOnlyDigits = (value: string): boolean =>
  /^\d+$/.test(value.trim());

export const IsInteger = (value: unknown): boolean =>
  Number.isInteger(Number(value));

export const IsDecimal = (value: unknown): boolean =>
  !Number.isNaN(Number(value));
