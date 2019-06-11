import { fromSecondsToMilliseconds } from './converters';

describe('Utils - Converters', () => {
	describe('Converters - secondsToMilliseconds Function', () => {
		it('should return valid result when called with numeric string argument', () => {
			const timeInSeconds = '1';
			const timeInMilliseconds = fromSecondsToMilliseconds(timeInSeconds);
			expect(timeInMilliseconds).toEqual(1000);
		});

		it('should return NaN when called with non-numeric string argument', () => {
			const invalidTime = 'A';
			const timeInMilliseconds = fromSecondsToMilliseconds(invalidTime);
			expect(timeInMilliseconds).toBeNaN();
		});
	});
});
