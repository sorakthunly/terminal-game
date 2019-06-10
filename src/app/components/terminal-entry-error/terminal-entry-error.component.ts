import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-terminal-entry-error',
	templateUrl: './terminal-entry-error.component.html',
	styleUrls: ['./terminal-entry-error.component.scss']
})
export class TerminalEntryErrorComponent {
	/** Error message to display */
	@Input() message: string;
}
