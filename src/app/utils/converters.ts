/**
 * @description
 * Format a numeric string value from seconds to milliseconds.
 *
 * @param {string} value	Numeric string value
 */
export function fromSecondsToMilliseconds(value: string): number {
	return Number(value) * 1000;
}
