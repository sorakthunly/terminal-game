import { isNumeric } from 'validator';
import { ITerminalEntry } from '../types/terminal-entry';

/**
 * @description
 * Whether the reply string is a keyword.
 *
 * @param {string} reply	Reply string
 */
export function isTerminalEntryKeyword(reply: string) {
	const keywords: Array<string> = ['halt', 'resume', 'quit'];
	const isReplyKeyword = keywords.indexOf(reply) > -1;

	return isReplyKeyword;
}
