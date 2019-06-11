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
		it('should return true when a given numeric string belongs to the given fibonacci sequence', () => {
			const generatedSequence = generateFibonacciSequence(5);
			const value = '1';
			const isValueFibonacci = isFibonacci(value, generatedSequence);

			expect(isValueFibonacci).toBeTruthy();
		});

		it('should return false when a given numeric string does not belong to the given fibonacci sequence', () => {
			const generatedSequence = generateFibonacciSequence(5);
			const value = '8';
			const isValueFibonacci = isFibonacci(value, generatedSequence);

			expect(isValueFibonacci).toBeFalsy();
		});

		it('should return false when a given string is not numeric', () => {
			const generatedSequence = generateFibonacciSequence(5);
			const value = 'A';
			const isValueFibonacci = isFibonacci(value, generatedSequence);

			expect(isValueFibonacci).toBeFalsy();
		});
	});
});
