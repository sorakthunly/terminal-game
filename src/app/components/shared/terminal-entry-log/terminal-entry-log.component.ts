import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-terminal-entry-log',
	templateUrl: './terminal-entry-log.component.html'
})
export class TerminalEntryLogComponent {
	/** Messages to log */
	@Input() messages: Array<string>;
}
