import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-terminal-entry-question',
	templateUrl: './terminal-entry-question.component.html',
	styleUrls: ['./terminal-entry-question.component.scss']
})
export class TerminalEntryQuestionComponent {
	/** A terminal entry object */
	@Input() question: string;
}
