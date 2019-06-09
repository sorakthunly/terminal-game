import { Component } from '@angular/core';
import { clone, last } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { isNumeric } from 'validator';
import { IInputPromptEntry, TInputPromptState, IInputPromptEntryCount } from './types/input-prompt';
import { generateFibonacciSequence } from './utils/fibonacci';
import {
	isInputPromptEntryReplyKeyword,
	throwFrequencyInputError,
	throwInvalidInputError
} from './utils/input-prompt-entry';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	/** Array of the first 1,000 fibonacci sequence */
	fibonacciSequence: Array<number>;

	/** Frequency value as input by user */
	frequencyValue: number;

	/** State of the input prompt */
	inputPromptEntries: Array<IInputPromptEntry>;

	/** Time counted in milliseconds */
	time: number;

	/** Time behaviour subject to update the time value */
	time$: BehaviorSubject<number> = new BehaviorSubject(0);

	/** Application timer setInterval */
	timerInterval;

	/**
	 * @description
	 * Instantiate the component.
	 */
	constructor() {
		this.subcribeToTimeObservable();
		this.initialiseTerminalInputEntries();
		this.prepareFibonacciSequence();
	}

	/**
	 * @description
	 * Initialise the time observable. And check that if time
	 * is divisible by the frequency input
	 */
	subcribeToTimeObservable() {
		this.time$.subscribe(time => {
			this.time += time;

			const timeInSeconds = time / 1000;
			const frequencyValue = this.frequencyValue;
			const shouldOutputMessage = timeInSeconds % frequencyValue;
			if (shouldOutputMessage) {
				const lastInputPromptEntry = last(this.inputPromptEntries);
				lastInputPromptEntry.messages = lastInputPromptEntry.messages || [];
				lastInputPromptEntry.messages.push(this.generateInputMessage());
			}
		});
	}

	/**
	 * @description
	 * Generate output message.
	 */
	generateInputMessage(): string {
		const entryCounts: Array<IInputPromptEntryCount> = [];

		this.inputPromptEntries.forEach(entry => {
			const value = entry.reply;
			const entryCount = entryCounts.find(count => count.value === value);
			entryCount ? entryCount.frequency++ : entryCounts.push({ frequency: 1, value });
		});

		const message = entryCounts
			.sort((a, b) => a.frequency - b.frequency)
			.map(entryCount => `${entryCount.value}:${entryCount.frequency.toString()}`)
			.join(', ');

		return message;
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
	 * Submit the terminal prompt input.
	 */
	submit(entry: IInputPromptEntry) {
		try {
			if (!entry.reply) {
				return;
			}

			const stateIsFrequency = entry.state === 'frequency';

			const isReplyNumeric = isNumeric(entry.reply);
			const isReplyZero = Number(entry.reply) === 0;
			const isFrequencyReplyValid = stateIsFrequency && isReplyNumeric && !isReplyZero;
			if (!isFrequencyReplyValid) {
				return throwFrequencyInputError();
			}

			const isReplyKeyword = isInputPromptEntryReplyKeyword(entry.reply);
			const isReplyValid = isReplyNumeric || isReplyKeyword;
			const isNonFrequencyReplyValid = !stateIsFrequency && isReplyValid;
			if (!isNonFrequencyReplyValid) {
				return throwInvalidInputError();
			}

			entry.isComplete = true;

			switch (entry.state) {
				case 'frequency':
					this.frequencyValue = Number(entry.reply);
					this.addNewInputPromptEntry('initial');
					break;

				case 'initial':
					this.addNewInputPromptEntry('in-progress');
					this.startTimer();
					break;

				case 'in-progress':
					this.addNewInputPromptEntry('in-progress');
					break;
			}
		} catch (error) {
			this.handleInputPromptEntryError(entry, error);
		}
	}

	/**
	 * @description
	 * Add new input prompt entry.
	 */
	addNewInputPromptEntry(state: TInputPromptState) {
		this.inputPromptEntries.push({ state, isComplete: false });
	}

	/**
	 * @description
	 * Handle error on an input prompt entry validation.
	 * This should mark the current entry as complete and add a new
	 * empty entry to the terminal.
	 */
	handleInputPromptEntryError(entry: IInputPromptEntry, error: Error) {
		const clonedEntry = clone(entry);
		clonedEntry.reply = undefined;

		entry.isComplete = true;
		entry.replyErrorMessage = error.message;

		this.inputPromptEntries.push(clonedEntry);
	}

	/**
	 * @description
	 * Start the time counter.
	 *
	 * @param {number} interval	Defaulted to counting every millisecond
	 */
	startTimer(interval: number = 1) {
		this.timerInterval = setInterval(() => {
			this.time$.next(interval);
		}, interval);
	}

	/**
	 * @description
	 * Stop the timer counter.
	 */
	stopCounter() {
		clearInterval(this.timerInterval);
	}
}
