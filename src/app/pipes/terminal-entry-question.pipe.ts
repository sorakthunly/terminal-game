import { Pipe, PipeTransform } from '@angular/core';
import { TTerminalEntryState } from '../types/terminal-entry';
import { getTerminalEntryQuestion } from '../utils/terminal-entry';

@Pipe({
	name: 'terminalEntryQuestion'
})
export class TerminalEntryQuestionPipe implements PipeTransform {
	/**
	 * @description
	 * Transform a state into terminal entry question.
	 *
	 * @param {TTerminalEntryState} state State of the terminal entry object
	 */
	transform(state: TTerminalEntryState): string {
		return getTerminalEntryQuestion(state);
	}
}
