import { Component } from '@angular/core';
import { IInputPromptEntry } from './types/input-prompt';
import { generateFibonacciSequence } from './utils/fibonacci';
import { isInputPromptEntryValid, isInputPromptEntryReplyKeyword } from './utils/input-prompt-entry';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	/** Array of the first 1,000 fibonacci sequence */
	fibonacciSequence: Array<number>;

	/** State of the input prompt */
	inputPromptEntries: Array<IInputPromptEntry>;

	/**
	 * @description
	 * Instantiate the component.
	 */
	constructor() {
		this.initialiseTerminalInputEntries();
		this.prepareFibonacciSequence();
	}

	/**
	 * @description
	 * Initialise terminal entry.
	 */
	initialiseTerminalInputEntries() {
		this.inputPromptEntries = [{ state: 'frequency', isComplete: false }];
	}

	/**
	 * @description
	 * Generate the first 1,000 fibonacci numbers and set it onto the component variable.
	 */
	prepareFibonacciSequence() {
		this.fibonacciSequence = generateFibonacciSequence(1000);
	}

	/**
	 * @description
	 * Throw an error for input prompt invalid entry.
	 */
	throwInvalidInputPromptEntry() {}

	/**
	 * @description
	 * Submit the terminal prompt input.
	 */
	submit(entry: IInputPromptEntry) {
		try {
			const isEntryInvalid = isInputPromptEntryValid(entry);
			if (!isEntryInvalid) {
				this.throwInvalidInputPromptEntry();
			}

			entry.isComplete = true;

			switch (entry.state) {
				case 'frequency':
					this.inputPromptEntries.push({
						state: 'initial',
						isComplete: false
					});
					break;

				case 'initial':
				case 'in-progress':
					const isReplyKeyword = isInputPromptEntryReplyKeyword(entry.reply);
					this.inputPromptEntries.push({
						state: 'in-progress',
						isComplete: false
					});
					break;
			}
		} catch (err) {
			alert(err.message);
		}
	}
}
