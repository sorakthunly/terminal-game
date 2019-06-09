import { Component } from '@angular/core';
import { clone, last } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { isNumeric } from 'validator';
import { IInputPromptEntry, TInputPromptState, IInputPromptEntryCount } from './types/input-prompt';
import { generateFibonacciSequence } from './utils/fibonacci';
import {
	isInputPromptEntryReplyKeyword,
	throwFrequencyInputError,
	throwInputError,
	throwInitialInputError
} from './utils/input-prompt-entry';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	/** Array of the first 1,000 fibonacci sequence */
	fibonacciSequence: Array<number>;

	/** Frequency value as input by user converted to milliseconds */
	frequencyInMilliseconds: number;

	/** State of the input prompt */
	inputPromptEntries: Array<IInputPromptEntry>;

	/** Whether the game is complete */
	isGameComplete: boolean;

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
		this.initialiseTime();
		this.subcribeToTimeObservable();
		this.initialiseTerminalInputEntries();
		this.prepareFibonacciSequence();
	}

	/**
	 * @description
	 * Initialise the time counter.
	 */
	initialiseTime() {
		this.time = 0;
	}

	/**
	 * @description
	 * Initialise the time observable. And check that if time
	 * is divisible by the frequency input
	 */
	subcribeToTimeObservable() {
		this.time$.subscribe(time => {
			this.time += time;

			const canStartOutputting = this.time >= this.frequencyInMilliseconds;
			const timeIsMultiplierOfFrequencyInput = this.time % this.frequencyInMilliseconds === 0;
			const shouldOutputMessage = canStartOutputting && timeIsMultiplierOfFrequencyInput;

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

		const validInputPromptEntries = this.inputPromptEntries.filter(entry => {
			const reply = entry.reply;
			if (!reply) {
				return false;
			}

			const isReplyNumeric = isNumeric(reply);
			const isNotFrequencyInput = entry.state !== 'frequency';
			const isValidEntry = isReplyNumeric && isNotFrequencyInput;

			return isValidEntry ? entry : false;
		});

		validInputPromptEntries.forEach(entry => {
			const value = entry.reply;
			const entryCount = entryCounts.find(count => count.value === value);
			entryCount ? entryCount.frequency++ : entryCounts.push({ frequency: 1, value });
		});

		const message = entryCounts
			.sort((a, b) => b.frequency - a.frequency)
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
			const reply = entry.reply;
			if (!reply) {
				return;
			}

			const isReplyNumeric = isNumeric(reply);
			const isReplyZero = Number(reply) === 0;
			const isValidNumericInput = isReplyNumeric && !isReplyZero;

			const stateIsFrequency = entry.state === 'frequency';
			if (stateIsFrequency && !isValidNumericInput) {
				return throwFrequencyInputError();
			}

			const stateIsInitial = entry.state === 'initial';
			if (stateIsInitial && !isValidNumericInput) {
				return throwInitialInputError();
			}

			const isReplyKeyword = isInputPromptEntryReplyKeyword(reply);
			const isValidInput = isReplyNumeric || isReplyKeyword;
			if (!stateIsFrequency && !isValidInput) {
				return throwInputError();
			}

			entry.isComplete = true;

			switch (entry.state) {
				case 'frequency':
					this.frequencyInMilliseconds = Number(reply) * 1000;
					this.addNewInputPromptEntry('initial');
					break;

				case 'initial':
					this.addNewInputPromptEntry('in-progress');
					this.startTimer();
					break;

				case 'in-progress':
					if (reply === 'halt') {
						this.stopTimer();
					}
					this.addNewInputPromptEntry('in-progress');
					break;
			}
		} catch (error) {
			this.handleInputPromptEntryError(entry, error);
		}
	}

	/**
	 * @description
	 * Handle the the input prompt entry on a regular input case.
	 */
	handleInputPromptEntry(entry: IInputPromptEntry) {
		switch (entry.reply) {
			case 'halt':
				this.stopTimer();
				this.addNewInputPromptEntry('halted');
				break;

			case 'resume':
				this.startTimer();
				this.addNewInputPromptEntry('resumed');
				break;

			case 'quit':
				this.stopTimer();
				this.addNewInputPromptEntry('quit');
				break;

			default:
				this.addNewInputPromptEntry('in-progress');
				break;
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
	 * @param {number} interval Interval to count in milliseconds, defaulted to ten
	 */
	startTimer(interval: number = 10) {
		this.timerInterval = setInterval(() => {
			this.time$.next(interval);
		}, interval);
	}

	/**
	 * @description
	 * Stop the timer counter.
	 */
	stopTimer() {
		clearInterval(this.timerInterval);
	}
}
