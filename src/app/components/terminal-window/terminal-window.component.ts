import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ITerminalEntry } from 'src/app/types/terminal-entry';

@Component({
	selector: 'app-terminal-window',
	templateUrl: './terminal-window.component.html',
	styleUrls: ['./terminal-window.component.scss']
})
export class TerminalWindowComponent {
	/** List of terminal entries */
	@Input() terminalEntries: Array<ITerminalEntry>;

	/** Submit event on user input completion */
	@Output() submit: EventEmitter<ITerminalEntry> = new EventEmitter();
}
