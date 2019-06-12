import { Pipe, PipeTransform } from '@angular/core';
import { ETerminalEntryState } from '../types';
import { getTerminalEntryQuestion } from '../utils';

@Pipe({
	name: 'terminalEntryQuestion'
})
export class TerminalEntryQuestionPipe implements PipeTransform {
	/**
	 * @description
	 * Transform a state into terminal entry question.
	 *
	 * @param {ETerminalEntryState} state State of the terminal entry object
	 */
	transform(state: ETerminalEntryState): string {
		return getTerminalEntryQuestion(state);
	}
}
