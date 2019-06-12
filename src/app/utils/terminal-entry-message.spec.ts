import { ITerminalEntry, ETerminalEntryState } from '../types';
import { generateTerminalMessage } from './terminal-entry-message';

describe('Utils - Terminal Entry Message', () => {
	describe('Terminal Entry Message - generateTerminalMessage Function', () => {
		it('should return valid terminal message when valid terminal entries provided', () => {
			const terminalEntries: Array<ITerminalEntry> = [
				{ state: ETerminalEntryState.FREQUENCY, isComplete: true, input: '4' },
				{ state: ETerminalEntryState.INITIAL, isComplete: true, input: '2' },
				{ state: ETerminalEntryState.IN_PROGRESS, isComplete: true, input: '4' },
				{ state: ETerminalEntryState.IN_PROGRESS, isComplete: true, input: '2' },
				{ state: ETerminalEntryState.IN_PROGRESS, isComplete: false, input: '4' }
			];
			const expectedTerminalMessage = '2:2, 4:1';
			const terminalMessage = generateTerminalMessage(terminalEntries);

			expect(terminalMessage).toEqual(expectedTerminalMessage);
		});
	});
});
