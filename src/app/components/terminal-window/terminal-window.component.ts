import { Component, OnInit, Input } from '@angular/core';
import { IInputPromptEntry } from 'src/app/types/input-prompt';

@Component({
	selector: 'app-terminal-window',
	templateUrl: './terminal-window.component.html',
	styleUrls: ['./terminal-window.component.scss']
})
export class TerminalWindowComponent implements OnInit {
	/** List of terminal entries */
	@Input() inputPromptEntries: Array<IInputPromptEntry>;

	constructor() {}

	ngOnInit() {}
}
