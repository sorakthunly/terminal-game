import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ITerminalEntry } from 'src/app/types';

@Component({
	selector: 'app-terminal-entry',
	templateUrl: './terminal-entry.component.html'
})
export class TerminalEntryComponent {
	/** A terminal entry object */
	@Input() terminalEntry: ITerminalEntry;

	/** Submit event on user input completion */
	@Output() submit: EventEmitter<ITerminalEntry> = new EventEmitter();
}
