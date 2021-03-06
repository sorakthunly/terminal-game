import { FREQUENCY_QUESTION } from '../constants/terminal-entry-questions';
import { ETerminalEntryState } from '../types/terminal-entry';
import { TerminalEntryQuestionPipe } from './terminal-entry-question.pipe';

describe('TerminalEntryQuestionPipe', () => {
	it('should correct transform a terminal entry state to question', () => {
		const pipe = new TerminalEntryQuestionPipe();

		const state = ETerminalEntryState.FREQUENCY;
		const expectedQuestion = FREQUENCY_QUESTION;
		const transformedValue = pipe.transform(state);
		expect(transformedValue).toEqual(expectedQuestion);
	});
});
