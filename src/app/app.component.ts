import { Component } from '@angular/core';
import { clone, last } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { isNumeric } from 'validator';
import { TimerService } from './services/timer.service';
import { ITerminalEntry, TTerminalEntryState, ITerminalEntryCount } from './types/terminal-entry';
import { generateFibonacciSequence } from './utils/fibonacci';
import {
	isTerminalEntryReplyKeyword,
	throwFrequencyInputError,
	throwInputError,
	throwInitialInputError,
	generateTerminalMessage
} from './utils/terminal-entry';

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
	terminalEntries: Array<ITerminalEntry>;

	/** Time counted in milliseconds */
	timeInMilliseconds: number;

	/**
	 * @description
	 * Instantiate the component.
	 */
	constructor(private timerService: TimerService) {
		this.initialiseTimer();
		this.initialiseTerminalInputEntries();
		this.prepareFibonacciSequence();
	}

	/**
	 * @description
	 * Reset the state of the application.
	 */
	resetState() {
		this.frequencyInMilliseconds = 0;
		this.timeInMilliseconds = 0;
		this.initialiseTerminalInputEntries();
	}

	/**
	 * @description
	 * Initialise the time counter. Subscribe to the timer service time observable
	 * and check that if time is divisible by the frequency input.
	 */
	initialiseTimer() {
		this.timeInMilliseconds = 0;

		this.timerService.time$.subscribe(intervalTime => {
			this.timeInMilliseconds += intervalTime;

			const canStartOutputting = this.timeInMilliseconds >= this.frequencyInMilliseconds;
			const timeIsMultiplierOfFrequencyInput = this.timeInMilliseconds % this.frequencyInMilliseconds === 0;
			const shouldOutputMessage = canStartOutputting && timeIsMultiplierOfFrequencyInput;

			if (shouldOutputMessage) {
				const lastInputPromptEntry = last(this.terminalEntries);
				lastInputPromptEntry.messages = lastInputPromptEntry.messages || [];

				const terminalMessage = generateTerminalMessage(this.terminalEntries);
				lastInputPromptEntry.messages.push(terminalMessage);
			}
		});
	}

	/**
	 * @description
	 * Initialise terminal entry.
	 */
	initialiseTerminalInputEntries() {
		this.terminalEntries = [{ state: 'frequency', isComplete: false }];
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
	 * Submit the terminal entry. First validate that the input is valid
	 * before handling the entry object.
	 *
	 * @param {ITerminalEntry} entry	Terminal entry object
	 */
	submit(entry: ITerminalEntry) {
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

			const isReplyKeyword = isTerminalEntryReplyKeyword(reply);
			const isValidInput = isReplyNumeric || isReplyKeyword;
			if (!stateIsFrequency && !isValidInput) {
				return throwInputError();
			}

			this.handleTerminalEntrySubmit(entry);
		} catch (error) {
			this.handleTerminalEntryError(entry, error);
		}
	}

	/**
	 * @description
	 * Handle the entry submission. Update each entry state and append
	 * a new entry (new question) accordingly for the user to reply.
	 *
	 * @param {ITerminalEntry} entry	Terminal entry object
	 */
	handleTerminalEntrySubmit(entry: ITerminalEntry) {
		entry.isComplete = true;

		const isReplyNumeric = isNumeric(entry.reply);
		const isReplyFibonacci = isReplyNumeric && this.fibonacciSequence.indexOf(Number(entry.reply)) > -1;
		entry.isReplyFibonacci = isReplyFibonacci;

		const isReplyQuit = entry.reply === 'quit';
		if (isReplyQuit) {
			alert('You have quitted the game');

			return this.resetState();
		}

		switch (entry.state) {
			case 'frequency':
				this.addNewTerminalEntry('initial');
				this.frequencyInMilliseconds = Number(entry.reply) * 1000;
				break;

			case 'initial':
				this.addNewTerminalEntry('in-progress');
				this.timerService.startTimer();
				break;

			case 'in-progress':
			case 'resumed':
				this.handleTerminalInProgressEntry(entry);
				break;

			case 'halted':
				this.handleTerminalHaltedEntry(entry);
				break;
		}
	}

	/**
	 * @description
	 * Handle the the input prompt entry on a regular input case.
	 */
	handleTerminalInProgressEntry(entry: ITerminalEntry) {
		switch (entry.reply) {
			case 'halt':
				this.addNewTerminalEntry('halted');
				this.timerService.stopTimer();
				break;

			default:
				this.addNewTerminalEntry('in-progress');
				break;
		}
	}

	/**
	 * @description
	 * Handle the the input prompt entry on a halted input case.
	 */
	handleTerminalHaltedEntry(entry: ITerminalEntry) {
		switch (entry.reply) {
			case 'resume':
				this.addNewTerminalEntry('resumed');
				if (this.timerService.isPaused) {
					this.timerService.startTimer();
				}
				break;

			default:
				this.addNewTerminalEntry('halted');
				break;
		}
	}

	/**
	 * @description
	 * Add new input prompt entry.
	 */
	addNewTerminalEntry(state: TTerminalEntryState) {
		this.terminalEntries.push({ state, isComplete: false });
	}

	/**
	 * @description
	 * Handle error on an input prompt entry validation.
	 * This should mark the current entry as complete and add a new
	 * empty entry to the terminal.
	 */
	handleTerminalEntryError(entry: ITerminalEntry, error: Error) {
		const clonedEntry = clone(entry);
		clonedEntry.reply = undefined;

		entry.isComplete = true;
		entry.replyErrorMessage = error.message;

		this.terminalEntries.push(clonedEntry);
	}
}
