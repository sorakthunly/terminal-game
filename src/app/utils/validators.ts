import { isNumeric } from 'validator';

/**
 * @description
 * Validate a value is not zero and return boolean state.
 *
 * @param {string} value	Value to validate
 */
export function isGreaterThanZero(value: string): boolean {
	const isInputNumeric = isNumeric(value);
	const isInputGreaterThanZero = Number(value) > 0;

	return isInputNumeric && isInputGreaterThanZero;
}
