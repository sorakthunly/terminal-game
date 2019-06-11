import { FREQUENCY_INPUT_ERROR, INPUT_ERROR, INITIAL_INPUT_ERROR } from '../constants/errors';
import { throwFrequencyInputError, throwInitialInputError, throwInputError } from './input-errors';

describe('Utils - Input Errors', () => {
	describe('Input Errors - throwFrequencyInputError Function', () => {
		it('should throw an error with the correct error message', () => {
			try {
				throwFrequencyInputError();
			} catch (err) {
				const message = err.message;
				expect(message).toEqual(FREQUENCY_INPUT_ERROR);
			}
		});
	});

	describe('Input Errors - throwInitialInputError Function', () => {
		it('should throw an error with the correct error message', () => {
			try {
				throwInitialInputError();
			} catch (err) {
				const message = err.message;
				expect(message).toEqual(INITIAL_INPUT_ERROR);
			}
		});
	});

	describe('Input Errors - throwInputError Function', () => {
		it('should throw an error with the correct error message', () => {
			try {
				throwInputError();
			} catch (err) {
				const message = err.message;
				expect(message).toEqual(INPUT_ERROR);
			}
		});
	});
});
