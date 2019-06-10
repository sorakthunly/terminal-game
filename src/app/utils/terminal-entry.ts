import { isNumeric } from 'validator';
import { ITerminalEntryCount, ITerminalEntry } from '../types/terminal-entry';

/**
 * @description
 * Whether the reply string is a keyword.
 *
 * @param {string} reply	Reply string
 */
export function isTerminalEntryReplyKeyword(reply: string) {
	const keywords: Array<string> = ['halt', 'resume', 'quit'];
	const isReplyKeyword = keywords.indexOf(reply) > -1;

	return isReplyKeyword;
}

/**
 * @description
 * Generate output message from the list of terminal entries provided.
 *
 * @param {Array<ITerminalEntry>} terminalEntries	List of terminal entries input by user
 */
export function generateTerminalMessage(terminalEntries: Array<ITerminalEntry>): string {
	const entryCounts: Array<ITerminalEntryCount> = [];

	const validTerminalEntries = terminalEntries.filter(entry => {
		const reply = entry.reply;
		if (!reply) {
			return false;
		}

		const isReplyNumeric = isNumeric(reply);
		const isNotFrequencyEntry = entry.state !== 'frequency';
		const isValidEntry = isReplyNumeric && isNotFrequencyEntry;

		return isValidEntry ? entry : false;
	});

	validTerminalEntries.forEach(entry => {
		const value = entry.reply;
		const entryCount = entryCounts.find(count => count.value === value);
		entryCount ? entryCount.frequency++ : entryCounts.push({ frequency: 1, value });
	});

	const message = entryCounts
		.sort((a, b) => b.frequency - a.frequency)
		.map(entryCount => `${entryCount.value}:${entryCount.frequency.toString()}`)
		.join(', ');

	return message;
}

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
