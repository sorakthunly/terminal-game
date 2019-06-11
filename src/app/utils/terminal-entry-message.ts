import { isNumeric } from 'validator';
import { ITerminalEntryCount, ITerminalEntry } from '../types/terminal-entry';

/**
 * @description
 * Generate output message from the list of terminal entries provided.
 *
 * @param {Array<ITerminalEntry>} terminalEntries	List of terminal entries input by user
 */
export function generateTerminalMessage(terminalEntries: Array<ITerminalEntry>): string {
	const entryCounts: Array<ITerminalEntryCount> = [];

	const validTerminalEntries = terminalEntries.filter(entry => {
		if (!entry.isComplete) {
			return false;
		}

		const reply = entry.reply;
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
