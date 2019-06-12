import { isNumeric } from 'validator';
import { ITerminalEntry } from '../types';
import { isTerminalEntryKeyword } from './terminal-entry';
import { isGreaterThanZero } from './validators';

/**
 * @description
 * Check to see if the frequency entry input is invalid.
 *
 * @param {ITerminalEntry} terminalEntry	Terminal entry object
 */
export function isInvalidFrequencyEntry(terminalEntry: ITerminalEntry) {
	const isStateFrequency = terminalEntry.state === 'frequency';
	const isInputValid = isGreaterThanZero(terminalEntry.input);

	return isStateFrequency && !isInputValid;
}

/**
 * @description
 * Check to see if the non-frequency entry input is invalid.
 *
 * @param {ITerminalEntry} terminalEntry	Terminal entry object
 */
export function isInvalidNonFrequencyEntry(terminalEntry: ITerminalEntry) {
	const isStateNotFrequency = terminalEntry.state !== 'frequency';
	const isInputNumeric = isNumeric(terminalEntry.input);
	const isInputKeyword = isTerminalEntryKeyword(terminalEntry.input);
	const isInputValid = isInputNumeric || isInputKeyword;

	return isStateNotFrequency && !isInputValid;
}

/**
 * @description
 * Check to see if the initial entry input is invalid.
 *
 * @param {ITerminalEntry} terminalEntry	Terminal entry object
 */
export function isInvalidInitialEntry(terminalEntry: ITerminalEntry) {
	const isStateInitial = terminalEntry.state === 'initial';
	const isInputNumeric = isNumeric(terminalEntry.input);

	return isStateInitial && !isInputNumeric;
}
