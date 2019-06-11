import { isTerminalEntryKeyword } from './terminal-entry';

describe('Utils - Terminal Entry', () => {
	describe('Terminal Entry - isTerminalEntryKeyword Function', () => {
		it('should return return true if valid keyword is provided', () => {
			const halt = 'halt';
			const isHaltValid = isTerminalEntryKeyword(halt);
			expect(isHaltValid).toBeTruthy();

			const resume = 'resume';
			const isResumeValid = isTerminalEntryKeyword(resume);
			expect(isResumeValid).toBeTruthy();

			const quit = 'quit';
			const isQuitValid = isTerminalEntryKeyword(quit);
			expect(isQuitValid).toBeTruthy();
		});

		it('should return return false if invalid keyword is provided', () => {
			const pause = 'pause';
			const isPauseValid = isTerminalEntryKeyword(pause);
			expect(isPauseValid).toBeFalsy();
		});
	});
});
