import { isNumeric } from 'validator';
import { ITerminalEntry } from '../types/terminal-entry';
import { isTerminalEntryKeyword } from './terminal-entry';
import { isGreaterThanZero } from './validators';

/**
 * @description
 * Check to see if the frequency entry input is invalid.
 *
 * @param {ITerminalEntry} entry	Terminal entry object
 */
export function isInvalidFrequencyEntry(entry: ITerminalEntry) {
	const isStateFrequency = entry.state === 'frequency';
	const isReplyValid = isGreaterThanZero(entry.reply);

	return isStateFrequency && !isReplyValid;
}

/**
 * @description
 * Check to see if the non-frequency entry input is invalid.
 *
 * @param {ITerminalEntry} entry	Terminal entry object
 */
export function isInvalidNonFrequencyEntry(entry: ITerminalEntry) {
	const isStateNotFrequency = entry.state !== 'frequency';
	const isReplyNumeric = isNumeric(entry.reply);
	const isReplyKeyword = isTerminalEntryKeyword(entry.reply);
	const isInputValid = isReplyNumeric || isReplyKeyword;

	return isStateNotFrequency && !isInputValid;
}

/**
 * @description
 * Check to see if the initial entry input is invalid.
 *
 * @param {ITerminalEntry} entry	Terminal entry object
 */
export function isInvalidInitialEntry(entry: ITerminalEntry) {
	const isStateInitial = entry.state === 'initial';
	const isReplyNumeric = isNumeric(entry.reply);

	return isStateInitial && !isReplyNumeric;
}
