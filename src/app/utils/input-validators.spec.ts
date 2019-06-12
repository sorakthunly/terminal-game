import { FREQUENCY_INPUT_ERROR, INITIAL_INPUT_ERROR, INPUT_ERROR } from '../constants';
import { ITerminalEntry, ETerminalEntryState } from '../types';
import {
	isInvalidFrequencyEntry,
	isInvalidNonFrequencyEntry,
	isInvalidInitialEntry,
	checkFrequencyEntry,
	checkInitialEntry,
	checkNonFrequencyEntry
} from './input-validators';

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

	describe('Input Validators - checkFrequencyEntry Function', () => {
		it('should throw invalid frequency input error if the input is invalid', () => {
			const invalidEntry: ITerminalEntry = {
				state: ETerminalEntryState.FREQUENCY,
				isComplete: false,
				input: 'invalid'
			};

			try {
				const checkResult = checkFrequencyEntry(invalidEntry);
				expect(checkResult).toBeUndefined();
			} catch (err) {
				expect(err.message).toEqual(FREQUENCY_INPUT_ERROR);
			}
		});
	});

	describe('Input Validators - checkIntialEntry Function', () => {
		it('should throw invalid initial input error if the input is invalid', () => {
			const invalidEntry: ITerminalEntry = { state: ETerminalEntryState.INITIAL, isComplete: false, input: 'invalid' };

			try {
				const checkResult = checkInitialEntry(invalidEntry);
				expect(checkResult).toBeUndefined();
			} catch (err) {
				expect(err.message).toEqual(INITIAL_INPUT_ERROR);
			}
		});
	});

	describe('Input Validators - checkNonFrequencyEntry Function', () => {
		it('should throw invalid input error if the input is invalid', () => {
			const invalidEntry: ITerminalEntry = {
				state: ETerminalEntryState.IN_PROGRESS,
				isComplete: false,
				input: 'invalid'
			};

			try {
				const checkResult = checkNonFrequencyEntry(invalidEntry);
				expect(checkResult).toBeUndefined();
			} catch (err) {
				expect(err.message).toEqual(INPUT_ERROR);
			}
		});
	});
});
