import { FREQUENCY_QUESTION, HALTED_QUESTION } from '../constants';
import { ETerminalEntryState } from '../types';
import { isTerminalEntryKeyword, getTerminalEntryQuestion } from './terminal-entry';

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

	describe('Terminal Entry - getTerminalEntryQuestion Function', () => {
		it('should return valid question if the valid state is provided', () => {
			const frequencyState = ETerminalEntryState.FREQUENCY;
			const frequencyQuestion = getTerminalEntryQuestion(frequencyState);
			expect(frequencyQuestion).toEqual(FREQUENCY_QUESTION);

			const haltedState = ETerminalEntryState.HALTED;
			const haltedQuestion = getTerminalEntryQuestion(haltedState);
			expect(haltedQuestion).toEqual(HALTED_QUESTION);
		});

		it('should return undefined if invalid state is provided', () => {
			const invalidState = 'invalid';
			const question = getTerminalEntryQuestion(<ETerminalEntryState>invalidState);
			expect(question).toBeUndefined();
		});
	});
});
