import { FREQUENCY_INPUT_ERROR, INITIAL_INPUT_ERROR, INPUT_ERROR } from '../constants/errors';

/**
 * @description
 * Throw frequency input error with a meaningful message to display.
 */
export function throwFrequencyInputError(): never {
	throw new Error(FREQUENCY_INPUT_ERROR);
}

/**
 * @description
 * Throw initial input error with a meaningful message to display.
 */
export function throwInitialInputError(): never {
	throw new Error(INITIAL_INPUT_ERROR);
}

/**
 * @description
 * Throw invalid input error with a meaningful message to display.
 */
export function throwInputError(): never {
	throw new Error(INPUT_ERROR);
}
