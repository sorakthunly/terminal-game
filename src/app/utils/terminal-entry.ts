import {
	FREQUENCY_QUESTION,
	INITIAL_QUESTION,
	IN_PROGRESS_QUESTION,
	HALTED_QUESTION,
	RESUMED_QUESTION,
	HALT_KEYWORD,
	RESUME_KEYWORD,
	QUIT_KEYWORD
} from '../constants';
import { ETerminalEntryState } from '../types';

/**
 * @description
 * Whether the input string is a keyword.
 *
 * @param {string} input	Input string
 */
export function isTerminalEntryKeyword(input: string): boolean {
	const keywords: Array<string> = [HALT_KEYWORD, RESUME_KEYWORD, QUIT_KEYWORD];
	const isInputKeyword = keywords.indexOf(input) > -1;

	return isInputKeyword;
}

/**
 * @description
 * Return the terminal entry question based on the entry state.
 *
 * @param {TTerminalEntryStatee} entryState	State of the terminal entry
 */
export function getTerminalEntryQuestion(entryState: ETerminalEntryState): string {
	switch (entryState) {
		case ETerminalEntryState.FREQUENCY:
			return FREQUENCY_QUESTION;

		case ETerminalEntryState.INITIAL:
			return INITIAL_QUESTION;

		case ETerminalEntryState.IN_PROGRESS:
			return IN_PROGRESS_QUESTION;

		case ETerminalEntryState.HALTED:
			return HALTED_QUESTION;

		case ETerminalEntryState.RESUMED:
			return RESUMED_QUESTION;

		default:
			return;
	}
}
