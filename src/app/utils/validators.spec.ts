import { isGreaterThanZero } from './validators';

describe('Utils - Validators', () => {
	describe('Validators - isGreaterThanZero Function', () => {
		it('should return valid result when called with greater than zero numeric string argument', () => {
			const validNumericString = '1';
			const isValueGreaterThanZero = isGreaterThanZero(validNumericString);
			expect(isValueGreaterThanZero).toBeTruthy();
		});

		it('should return valid result when called with less than zero numeric string argument', () => {
			const validNumericString = '-1';
			const isValueGreaterThanZero = isGreaterThanZero(validNumericString);
			expect(isValueGreaterThanZero).toBeFalsy();
		});

		it('should return NaN when called with non-numeric string argument', () => {
			const inValidNumericString = 'A';
			const isValueGreaterThanZero = isGreaterThanZero(inValidNumericString);
			expect(isValueGreaterThanZero).toBeFalsy();
		});
	});
});
