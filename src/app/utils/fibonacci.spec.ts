import { isEqual } from 'lodash';
import { generateFibonacciSequence, isFibonacci } from './fibonacci';

describe('Utils - Fibonacci', () => {
	describe('Fibonacci - generateFibonacciSequence Function', () => {
		it('should return five valid sequence of fibonnaci numbers', () => {
			const expectedSequence = [0, 1, 1, 2, 3];
			const generatedSequence = generateFibonacciSequence(5);
			const areSequencesEqual = isEqual(expectedSequence, generatedSequence);

			expect(areSequencesEqual).toBeTruthy();
		});
	});

	describe('Fibonacci - isFibonacci Function', () => {
		it('should return true when a number belongs to the given fibonacci sequence', () => {
			const generatedSequence = generateFibonacciSequence(5);
			const isValueFibonacci = isFibonacci('1', generatedSequence);

			expect(isValueFibonacci).toBeTruthy();
		});

		it('should return false when a number does not belong to the given fibonacci sequence', () => {
			const generatedSequence = generateFibonacciSequence(5);
			const isValueFibonacci = isFibonacci('8', generatedSequence);

			expect(isValueFibonacci).toBeFalsy();
		});
	});
});
