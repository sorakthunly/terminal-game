import {
	FREQUENCY_QUESTION,
	INITIAL_QUESTION,
	IN_PROGRESS_QUESTION,
	HALTED_QUESTION,
	RESUMED_QUESTION
} from '../constants';
import { TTerminalEntryState } from '../types';

/**
 * @description
 * Whether the input string is a keyword.
 *
 * @param {string} input	Input string
 */
export function isTerminalEntryKeyword(input: string): boolean {
	const keywords: Array<string> = ['halt', 'resume', 'quit'];
	const isInputKeyword = keywords.indexOf(input) > -1;

	return isInputKeyword;
}

/**
 * @description
 * Return the terminal entry question based on the entry state.
 *
 * @param {TTerminalEntryStatee} entryState	State of the terminal entry
 */
export function getTerminalEntryQuestion(entryState: TTerminalEntryState): string {
	switch (entryState) {
		case 'frequency':
			return FREQUENCY_QUESTION;

		case 'initial':
			return INITIAL_QUESTION;

		case 'in-progress':
			return IN_PROGRESS_QUESTION;

		case 'halted':
			return HALTED_QUESTION;

		case 'resumed':
			return RESUMED_QUESTION;

		default:
			return;
	}
}
