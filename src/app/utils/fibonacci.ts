import { isNumeric } from 'validator';

/**
 * @description
 * Generate a sequence of fibonacci numbers array for a given length.
 * By default, it returns the first two fibonacci values in sequence.
 *
 * @param {number} length	Length to generate the array
 */
export function generateFibonacciSequence(length: number): Array<number> {
	const fibonacciSequence: Array<number> = [0, 1];
	while (fibonacciSequence.length < length) {
		const sequenceLength = fibonacciSequence.length;
		const lastNumber = fibonacciSequence[sequenceLength - 1];
		const beforeLastNumber = fibonacciSequence[sequenceLength - 2];
		fibonacciSequence.push(lastNumber + beforeLastNumber);
	}

	return fibonacciSequence;
}

/**
 * @description
 * Check whether an entry input is part of the given array of fibonacci sequence.
 *
 * @param {ITerminalEntry} entry	Terminal entry object
 * @param {Array<number>} fibonacciSequence	Given array of fibonacci sequence
 */
export function isFibonacci(value: string, fibonacciSequence: Array<number>): boolean {
	const isInputNumeric = isNumeric(value);
	if (isInputNumeric) {
		const isInFibonacciSequence = fibonacciSequence.indexOf(Number(value)) > -1;

		return isInFibonacciSequence;
	} else {
		return false;
	}
}
