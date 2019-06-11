import { ITerminalEntry } from '../types/terminal-entry';
import { generateTerminalMessage } from './terminal-entry-message';

describe('Utils - Terminal Entry Message', () => {
	describe('Terminal Entry Message - generateTerminalMessage Function', () => {
		it('should return valid terminal message when valid terminal entries provided', () => {
			const terminalEntries: Array<ITerminalEntry> = [
				{ state: 'frequency', isComplete: true, reply: '4' },
				{ state: 'initial', isComplete: true, reply: '2' },
				{ state: 'in-progress', isComplete: true, reply: '4' },
				{ state: 'in-progress', isComplete: true, reply: '2' },
				{ state: 'in-progress', isComplete: false, reply: '4' }
			];
			const expectedTerminalMessage = '2:2, 4:1';
			const terminalMessage = generateTerminalMessage(terminalEntries);

			expect(terminalMessage).toEqual(expectedTerminalMessage);
		});
	});
});
