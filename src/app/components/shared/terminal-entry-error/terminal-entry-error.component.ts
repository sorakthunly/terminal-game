import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-terminal-entry-error',
	templateUrl: './terminal-entry-error.component.html'
})
export class TerminalEntryErrorComponent {
	/** Error message to display */
	@Input() message: string;
}
