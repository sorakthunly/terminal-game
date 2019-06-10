import { Component, Input, ElementRef, ViewChild, HostListener, Output, EventEmitter } from '@angular/core';
import { ITerminalEntry } from 'src/app/types/terminal-entry';

@Component({
	selector: 'app-terminal-entry-form',
	templateUrl: './terminal-entry-form.component.html',
	styleUrls: ['./terminal-entry-form.component.scss']
})
export class TerminalEntryFormComponent {
	/** A terminal entry object */
	@Input() terminalEntry: ITerminalEntry;

	/** Submit event on user input completion */
	@Output() submit: EventEmitter<ITerminalEntry> = new EventEmitter();

	/** Terminal input element reference */
	@ViewChild('terminalInput', { static: false })
	terminalInput: ElementRef;

	/**
	 * @description
	 * Listen to any click event on the page to autofocus the input element.
	 * Wrap the focus invoker so that when the input is not shown after the
	 * entry is marked as complete, it does not attempt to focus a non-existent
	 * element.
	 */
	@HostListener('document:click', ['$event'])
	clickout() {
		if (this.terminalInput) {
			this.terminalInput.nativeElement.focus();
		}
	}

	/**
	 * @description
	 * Submit the terminal input and emit the temrinal entry object
	 * the parent component.
	 */
	submitTerminalInput() {
		this.submit.emit(this.terminalEntry);
	}
}
