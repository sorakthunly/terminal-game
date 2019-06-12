import { Component } from '@angular/core';
import { clone, last } from 'lodash';
import { FAREWELL, QUIT_KEYWORD, HALT_KEYWORD, RESUME_KEYWORD } from 'src/app/constants';
import { TimerService } from 'src/app/services/timer.service';
import { ITerminalEntry, ETerminalEntryState } from 'src/app/types';
import {
	fromSecondsToMilliseconds,
	generateFibonacciSequence,
	isFibonacci,
	throwFrequencyInputError,
	throwInitialInputError,
	throwInputError,
	isInvalidFrequencyEntry,
	isInvalidInitialEntry,
	isInvalidNonFrequencyEntry,
	generateTerminalMessage
} from 'src/app/utils';

@Component({
	selector: 'app-terminal-window',
	templateUrl: './terminal-window.component.html',
	styleUrls: ['./terminal-window.component.scss']
})
export class TerminalWindowComponent {
	/** Array of the first 1,000 fibonacci sequence */
	fibonacciSequence: Array<number>;

	/** Frequency value as input by user converted to milliseconds */
	frequencyInMilliseconds: number;

	/** List of terminal entries */
	terminalEntries: Array<ITerminalEntry>;

	/**
	 * @description
	 * Instantiate the component.
	 */
	constructor(private timerService: TimerService) {
		this.prepareFibonacciSequence();
		this.initialiseTerminalInputEntries();
		this.initialiseFibonacciAlertTimeListener();
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
	 * Initialise terminal entry.
	 */
	initialiseTerminalInputEntries() {
		this.terminalEntries = [{ state: ETerminalEntryState.FREQUENCY, isComplete: false }];
	}

	/**
	 * @description
	 * Subscribe to the timer service time observable and handle the observable stream of
	 * time emitted.
	 */
	initialiseFibonacciAlertTimeListener() {
		this.timerService.timeInMilliseconds$.subscribe(this.handleFibonacciAlertTimeListener.bind(this));
	}

	/**
	 * @description
	 * Check that if time is greater or equal to the frequency input time (milliseconds) and that it is
	 * divisible by the frequency input time before generating a terminal message.
	 *
	 * @param {number} timeInMilliseconds  Time elapsed in milliseconds
	 */
	handleFibonacciAlertTimeListener(timeInMilliseconds: number) {
		const canStartOutputting = timeInMilliseconds >= this.frequencyInMilliseconds;
		const timeIsMultiplierOfFrequencyInput = timeInMilliseconds % this.frequencyInMilliseconds === 0;

		const shouldOutputMessage = canStartOutputting && timeIsMultiplierOfFrequencyInput;
		if (shouldOutputMessage) {
			const lastTerminalEntry = last(this.terminalEntries);
			lastTerminalEntry.messages = lastTerminalEntry.messages || [];

			const terminalMessage = generateTerminalMessage(this.terminalEntries);
			lastTerminalEntry.messages.push(terminalMessage);
		}
	}

	/**
	 * @description
	 * Reset the state of the application.
	 */
	resetState() {
		this.frequencyInMilliseconds = undefined;
		this.timerService.stopTimer();
		this.timerService.initialiseTimer();
		this.initialiseTerminalInputEntries();
		this.initialiseFibonacciAlertTimeListener();
	}

	/**
	 * @description
	 * Submit the terminal entry. First validate that the input is valid
	 * before handling the entry object.
	 *
	 * @param {ITerminalEntry} terminalEntry	Terminal entry object
	 */
	submit(terminalEntry: ITerminalEntry) {
		try {
			if (!terminalEntry.input) {
				return;
			}

			const isFrequencyEntryInvalid = isInvalidFrequencyEntry(terminalEntry);
			if (isFrequencyEntryInvalid) {
				return throwFrequencyInputError();
			}

			const isInitialEntryInvalid = isInvalidInitialEntry(terminalEntry);
			if (isInitialEntryInvalid) {
				return throwInitialInputError();
			}

			const isNonFrequencyEntryInvalid = isInvalidNonFrequencyEntry(terminalEntry);
			if (isNonFrequencyEntryInvalid) {
				return throwInputError();
			}

			this.handleTerminalEntrySubmit(terminalEntry);
		} catch (error) {
			this.handleTerminalEntryError(terminalEntry, error);
		}
	}

	/**
	 * @description
	 * Handle the entry submission. Update each entry state and append
	 * a new entry (new question) accordingly for the user to input.
	 *
	 * @param {ITerminalEntry} terminalEntry	Terminal entry object
	 */
	handleTerminalEntrySubmit(terminalEntry: ITerminalEntry) {
		terminalEntry.isComplete = true;
		this.markNonFrequencyEntryAsFibonacci(terminalEntry);

		const isInputQuit = terminalEntry.input === QUIT_KEYWORD;
		if (isInputQuit) {
			alert(FAREWELL);
			this.resetState();
		} else {
			this.handleTerminalEntryUpdate(terminalEntry);
		}
	}

	/**
	 * @description
	 * Mark a non-frequency entry as fibonacci if the input belongs to the
	 * generated fibonacci sequence.
	 *
	 * @param {ITerminalEntry} terminalEntry Terminal entry object
	 */
	markNonFrequencyEntryAsFibonacci(terminalEntry: ITerminalEntry) {
		const isStateNotFrequency = terminalEntry.state !== ETerminalEntryState.FREQUENCY;
		if (isStateNotFrequency) {
			terminalEntry.isInputFibonacci = isFibonacci(terminalEntry.input, this.fibonacciSequence);
		}
	}

	/**
	 * @description
	 * Handle udpating the current entry and append a new one with the
	 * appropriate state based on the entry input.
	 *
	 * @param {ITerminalEntry} terminalEntry Terminal entry object
	 */
	handleTerminalEntryUpdate(terminalEntry: ITerminalEntry) {
		switch (terminalEntry.state) {
			case ETerminalEntryState.FREQUENCY:
				this.addNewTerminalEntry(ETerminalEntryState.INITIAL);
				this.frequencyInMilliseconds = fromSecondsToMilliseconds(terminalEntry.input);
				break;

			case ETerminalEntryState.INITIAL:
				this.addNewTerminalEntry(ETerminalEntryState.IN_PROGRESS);
				this.timerService.startTimer();
				break;

			case ETerminalEntryState.IN_PROGRESS:
			case ETerminalEntryState.RESUMED:
				this.handleTerminalInProgressEntry(terminalEntry);
				break;

			case ETerminalEntryState.HALTED:
				this.handleTerminalHaltedEntry(terminalEntry);
				break;
		}
	}

	/**
	 * @description
	 * Handle the the input prompt entry on a regular input case.
	 *
	 * @param {ITerminalEntry} terminalEntry Terminal entry object
	 */
	handleTerminalInProgressEntry(terminalEntry: ITerminalEntry) {
		switch (terminalEntry.input) {
			case HALT_KEYWORD:
				this.addNewTerminalEntry(ETerminalEntryState.HALTED);
				this.timerService.stopTimer();
				break;

			default:
				this.addNewTerminalEntry(ETerminalEntryState.IN_PROGRESS);
				break;
		}
	}

	/**
	 * @description
	 * Handle the the input prompt entry on a halted input case.
	 *
	 * @param {ITerminalEntry} terminalEntry Terminal entry object
	 */
	handleTerminalHaltedEntry(terminalEntry: ITerminalEntry) {
		switch (terminalEntry.input) {
			case RESUME_KEYWORD:
				this.addNewTerminalEntry(ETerminalEntryState.RESUMED);
				if (this.timerService.isHalted) {
					this.timerService.startTimer();
				}
				break;

			default:
				this.addNewTerminalEntry(ETerminalEntryState.HALTED);
				break;
		}
	}

	/**
	 * @description
	 * Add new input prompt entry.
	 *
	 * @param {TTerminalEntryState} entry Terminal entry object
	 */
	addNewTerminalEntry(terminalEntryState: ETerminalEntryState) {
		this.terminalEntries.push({ state: terminalEntryState, isComplete: false });
	}

	/**
	 * @description
	 * Handle error on an input prompt entry validation.
	 * This should mark the current entry as complete and add a new
	 * empty entry to the terminal.
	 *
	 * @param {ITerminalEntry} terminalEntry Terminal entry object
	 * @param {Error} error	Any error thrown
	 */
	handleTerminalEntryError(terminalEntry: ITerminalEntry, error: Error) {
		const clonedEntry = clone(terminalEntry);
		clonedEntry.input = undefined;

		terminalEntry.isComplete = true;
		terminalEntry.inputErrorMessage = error.message;

		this.terminalEntries.push(clonedEntry);
	}
}
