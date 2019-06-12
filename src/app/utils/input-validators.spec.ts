import { ITerminalEntry, ETerminalEntryState } from '../types';
import { isInvalidFrequencyEntry, isInvalidNonFrequencyEntry, isInvalidInitialEntry } from './input-validators';

describe('Utils - Input Validators', () => {
	describe('Input Validators - isInvalidFrequencyEntry Function', () => {
		it('should return true when invalid frequency entry is provided', () => {
			const terminalEntry: ITerminalEntry = {
				state: ETerminalEntryState.FREQUENCY,
				isComplete: false,
				input: 'invalid'
			};
			const isInvalidEntry = isInvalidFrequencyEntry(terminalEntry);
			expect(isInvalidEntry).toBeTruthy();
		});

		it('should return false when valid frequency entry is provided', () => {
			const terminalEntry: ITerminalEntry = { state: ETerminalEntryState.FREQUENCY, isComplete: false, input: '4' };
			const isInvalidEntry = isInvalidFrequencyEntry(terminalEntry);
			expect(isInvalidEntry).toBeFalsy();
		});
	});

	describe('Input Validators - isInvalidNonFrequencyEntry Function', () => {
		it('should return true when invalid non-frequency entry is provided', () => {
			const terminalEntry: ITerminalEntry = {
				state: ETerminalEntryState.IN_PROGRESS,
				isComplete: false,
				input: 'invalid'
			};
			const isInvalidEntry = isInvalidNonFrequencyEntry(terminalEntry);
			expect(isInvalidEntry).toBeTruthy();
		});

		it('should return false when valid non-frequency entry is provided', () => {
			const terminalEntry: ITerminalEntry = { state: ETerminalEntryState.HALTED, isComplete: false, input: 'resume' };
			const isInvalidEntry = isInvalidNonFrequencyEntry(terminalEntry);
			expect(isInvalidEntry).toBeFalsy();
		});
	});

	describe('Input Validators - isInvalidInitialEntry Function', () => {
		it('should return true when invalid initial entry is provided', () => {
			const terminalEntry: ITerminalEntry = { state: ETerminalEntryState.INITIAL, isComplete: false, input: 'invalid' };
			const isInvalidEntry = isInvalidInitialEntry(terminalEntry);
			expect(isInvalidEntry).toBeTruthy();
		});

		it('should return false when valid initial entry is provided', () => {
			const terminalEntry: ITerminalEntry = { state: ETerminalEntryState.INITIAL, isComplete: false, input: '4' };
			const isInvalidEntry = isInvalidInitialEntry(terminalEntry);
			expect(isInvalidEntry).toBeFalsy();
		});
	});
});
