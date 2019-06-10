import { Component, Input } from '@angular/core';
import { ITerminalEntry } from 'src/app/types/terminal-entry';

@Component({
	selector: 'app-terminal-entry-question',
	templateUrl: './terminal-entry-question.component.html',
	styleUrls: ['./terminal-entry-question.component.scss']
})
export class TerminalEntryQuestionComponent {
	/** A terminal entry object */
	@Input() terminalEntry: ITerminalEntry;
}
