/**
 * Validates the "level" attribute and throws an exception if the provided value
 * is invalid.
 * @param value The value to validate.
 * @returns void
 */
export function validateLevel(value: string|null): void {
  const val = Number(value);
  if (val < 1 || val > 6) {
    throw new RangeError('Heading level must be a number from 1 through 6.');
  }
}
