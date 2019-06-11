import {
	FREQUENCY_QUESTION,
	INITIAL_QUESTION,
	IN_PROGRESS_QUESTION,
	HALTED_QUESTION,
	RESUMED_QUESTION
} from '../constants/terminal-entry-questions';
import { TTerminalEntryState } from '../types/terminal-entry';

/**
 * @description
 * Whether the reply string is a keyword.
 *
 * @param {string} reply	Reply string
 */
export function isTerminalEntryKeyword(reply: string): boolean {
	const keywords: Array<string> = ['halt', 'resume', 'quit'];
	const isReplyKeyword = keywords.indexOf(reply) > -1;

	return isReplyKeyword;
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
