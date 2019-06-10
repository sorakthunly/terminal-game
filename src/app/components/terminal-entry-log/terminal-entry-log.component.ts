import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-terminal-entry-log',
	templateUrl: './terminal-entry-log.component.html',
	styleUrls: ['./terminal-entry-log.component.scss']
})
export class TerminalEntryLogComponent {
	/** Messages to log */
	@Input() messages: Array<string>;
}
