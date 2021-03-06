import { isNumeric } from 'validator';
import { ITerminalEntryCount, ITerminalEntry, ETerminalEntryState } from '../types';

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

		const input = entry.input;
		const isInputNumeric = isNumeric(input);
		const isNotFrequencyEntry = entry.state !== ETerminalEntryState.FREQUENCY;
		const isValidEntry = isInputNumeric && isNotFrequencyEntry;

		return isValidEntry ? entry : false;
	});

	validTerminalEntries.forEach(entry => {
		const value = entry.input;
		const entryCount = entryCounts.find(count => count.value === value);
		entryCount ? entryCount.frequency++ : entryCounts.push({ frequency: 1, value });
	});

	const message = entryCounts
		.sort((a, b) => b.frequency - a.frequency)
		.map(entryCount => `${entryCount.value}:${entryCount.frequency.toString()}`)
		.join(', ');

	return message;
}
