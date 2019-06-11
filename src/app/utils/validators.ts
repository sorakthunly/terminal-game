import { isNumeric } from 'validator';

/**
 * @description
 * Validate a value is not zero and return boolean state.
 *
 * @param {string} value	Value to validate
 */
export function isGreaterThanZero(value: string): boolean {
	const isReplyNumeric = isNumeric(value);
	const isReplyGreaterThanZero = Number(value) > 0;

	return isReplyNumeric && isReplyGreaterThanZero;
}
