import { Component, OnInit, Input } from '@angular/core';
import { IInputPromptEntry } from 'src/app/types/input-prompt';

@Component({
	selector: 'app-terminal-entry',
	templateUrl: './terminal-entry.component.html',
	styleUrls: ['./terminal-entry.component.scss']
})
export class TerminalEntryComponent implements OnInit {
	@Input() inputPromptEntry: IInputPromptEntry;

	constructor() {}

	ngOnInit() {}
}
