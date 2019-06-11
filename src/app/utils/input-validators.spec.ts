import { ITerminalEntry } from '../types/terminal-entry';
import { isInvalidFrequencyEntry, isInvalidNonFrequencyEntry, isInvalidInitialEntry } from './input-validators';

describe('Utils - Input Validators', () => {
	describe('Input Validators - isInvalidFrequencyEntry Function', () => {
		it('should return true when invalid frequency entry is provided', () => {
			const terminalEntry: ITerminalEntry = { state: 'frequency', isComplete: false, reply: 'invalid' };
			const isInvalidEntry = isInvalidFrequencyEntry(terminalEntry);
			expect(isInvalidEntry).toBeTruthy();
		});

		it('should return false when valid frequency entry is provided', () => {
			const terminalEntry: ITerminalEntry = { state: 'frequency', isComplete: false, reply: '4' };
			const isInvalidEntry = isInvalidFrequencyEntry(terminalEntry);
			expect(isInvalidEntry).toBeFalsy();
		});
	});

	describe('Input Validators - isInvalidNonFrequencyEntry Function', () => {
		it('should return true when invalid non-frequency entry is provided', () => {
			const terminalEntry: ITerminalEntry = { state: 'in-progress', isComplete: false, reply: 'invalid' };
			const isInvalidEntry = isInvalidNonFrequencyEntry(terminalEntry);
			expect(isInvalidEntry).toBeTruthy();
		});

		it('should return false when valid non-frequency entry is provided', () => {
			const terminalEntry: ITerminalEntry = { state: 'halted', isComplete: false, reply: 'resume' };
			const isInvalidEntry = isInvalidNonFrequencyEntry(terminalEntry);
			expect(isInvalidEntry).toBeFalsy();
		});
	});

	describe('Input Validators - isInvalidInitialEntry Function', () => {
		it('should return true when invalid frequency entry is provided', () => {
			const terminalEntry: ITerminalEntry = { state: 'initial', isComplete: false, reply: 'invalid' };
			const isInvalidEntry = isInvalidInitialEntry(terminalEntry);
			expect(isInvalidEntry).toBeTruthy();
		});

		it('should return false when valid frequency entry is provided', () => {
			const terminalEntry: ITerminalEntry = { state: 'initial', isComplete: false, reply: '4' };
			const isInvalidEntry = isInvalidInitialEntry(terminalEntry);
			expect(isInvalidEntry).toBeFalsy();
		});
	});
});
