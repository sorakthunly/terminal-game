import { isEqual } from 'lodash';
import { generateFibonacciSequence } from './fibonacci';

describe('Utils - Fibonacci', () => {
	describe('Fibonacci - generateFibonacciSequence Function', () => {
		it('should return five valid sequence of fibonnaci numbers', () => {
			const expectedSequence = [0, 1, 1, 2, 3];
			const generatedSequence = generateFibonacciSequence(5);
			const areSequencesEqual = isEqual(expectedSequence, generatedSequence);

			expect(areSequencesEqual).toBeTruthy();
		});
	});
});
