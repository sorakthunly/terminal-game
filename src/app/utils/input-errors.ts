/**
 * @description
 * Throw frequency input error with a meaningful message to display.
 */
export function throwFrequencyInputError(): never {
	throw new Error('Frequency number should be numeric');
}

/**
 * @description
 * Throw initial input error with a meaningful message to display.
 */
export function throwInitialInputError(): never {
	throw new Error('Initial number should be numeric');
}

/**
 * @description
 * Throw invalid input error with a meaningful message to display.
 */
export function throwInputError(): never {
	const message = 'Input should be numeric or belongs to one of the following keywords e.g. halt, resume, quit';
	throw new Error(message);
}