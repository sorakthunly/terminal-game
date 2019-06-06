/**
 * @description
 * Generate a sequence of fibonacci numbers array for a given length.
 *
 * @param {number} length	Length to generate the array
 */
export function generateFibonacciSequence(length: number): Array<number> {
	const fibonacciSequence: Array<number> = [0, 1];
	while (fibonacciSequence.length <= length) {
		const sequenceLength = fibonacciSequence.length;
		const lastNumber = fibonacciSequence[sequenceLength - 1];
		const beforeLastNumber = fibonacciSequence[sequenceLength - 2];
		fibonacciSequence.push(lastNumber + beforeLastNumber);
	}

	return fibonacciSequence;
}
