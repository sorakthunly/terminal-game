import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { first, last, cloneDeep, isEqual } from 'lodash';
import { FAREWELL, FREQUENCY_INPUT_ERROR, QUIT_KEYWORD, RESUME_KEYWORD } from 'src/app/constants';
import { ITerminalEntry, ETerminalEntryState } from 'src/app/types';
import { TerminalWindowComponent } from './terminal-window.component';

describe('TerminalWindowComponent', () => {
	let component: TerminalWindowComponent;
	let fixture: ComponentFixture<TerminalWindowComponent>;

	const terminalEntries: Array<ITerminalEntry> = [
		{ state: ETerminalEntryState.FREQUENCY, isComplete: true, input: '1' },
		{ state: ETerminalEntryState.INITIAL, isComplete: true, input: '2' },
		{ state: ETerminalEntryState.IN_PROGRESS, isComplete: true, input: '2' },
		{ state: ETerminalEntryState.IN_PROGRESS, isComplete: false }
	];

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TerminalWindowComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TerminalWindowComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	describe('TerminalWindowComponent - constructor Method', () => {
		it('should initialise the first 1,000 fibonacci sequence', () => {
			const fibonacciSequenceLength = component.fibonacciSequence.length;
			expect(fibonacciSequenceLength).toBe(1000);
		});

		it('should initialise terminal input entries', () => {
			const frequencyEntry = component.terminalEntries[0];
			expect(frequencyEntry.state).toBe(ETerminalEntryState.FREQUENCY);
			expect(frequencyEntry.isComplete).toBeFalsy();
		});
	});

	describe('TerminalWindowComponent - handleFibonacciAlertTimeListener Method', () => {
		it('should correctly generate a fibonacci alert message with valid time argument', () => {
			component.terminalEntries = cloneDeep(terminalEntries);
			component.frequencyInMilliseconds = 1000;
			component.handleFibonacciAlertTimeListener(1000);

			const lastTerminalEntry = last(component.terminalEntries);
			expect(lastTerminalEntry.messages).toBeDefined();
			expect(lastTerminalEntry.messages[0]).toEqual('2:2');
		});

		it('should not generate any fibonacci alert message with invalid time argument', () => {
			component.terminalEntries = cloneDeep(terminalEntries);
			component.frequencyInMilliseconds = 1000;
			component.handleFibonacciAlertTimeListener(800);

			const lastTerminalEntry = last(component.terminalEntries);
			expect(lastTerminalEntry.messages).toBeUndefined();
		});
	});

	describe('TerminalWindowComponent - markNonFrequencyEntryAsFibonacci Method', () => {
		it('should mark non frequency entry as fibonacci if it is', () => {
			const terminalEntry: ITerminalEntry = { state: ETerminalEntryState.IN_PROGRESS, isComplete: true, input: '1' };
			component.markNonFrequencyEntryAsFibonacci(terminalEntry);
			expect(terminalEntry.isInputFibonacci).toBeTruthy();
		});

		it('should mark non frequency entry as not fibonacci if it is not', () => {
			const terminalEntry: ITerminalEntry = { state: ETerminalEntryState.IN_PROGRESS, isComplete: true, input: '4' };
			component.markNonFrequencyEntryAsFibonacci(terminalEntry);
			expect(terminalEntry.isInputFibonacci).toBeFalsy();
		});

		it('should not change fibonacci flag on frequency entry', () => {
			const terminalEntry: ITerminalEntry = { state: ETerminalEntryState.FREQUENCY, isComplete: true, input: '1' };
			component.markNonFrequencyEntryAsFibonacci(terminalEntry);
			expect(terminalEntry.isInputFibonacci).toBeUndefined();
		});
	});

	describe('TerminalWindowComponent - handleTerminalEntrySubmit Method', () => {
		it('should mark an entry as complete', () => {
			const frequencyEntry = component.terminalEntries[0];
			component.handleTerminalEntrySubmit(frequencyEntry);
			expect(frequencyEntry.isComplete).toBeTruthy();
		});

		it('should alert a farewell message and reset component state if the entry input is quit', () => {
			spyOn(window, 'alert');

			const terminalEntry: ITerminalEntry = {
				state: ETerminalEntryState.IN_PROGRESS,
				isComplete: false,
				input: QUIT_KEYWORD
			};
			component.handleTerminalEntrySubmit(terminalEntry);

			expect(window.alert).toHaveBeenCalledWith(FAREWELL);
		});

		it('should reset component state if the entry input is quit', () => {
			component.terminalEntries = cloneDeep(terminalEntries);

			const lastTerminalEntry = last(component.terminalEntries);
			lastTerminalEntry.input = QUIT_KEYWORD;

			component.handleTerminalEntrySubmit(lastTerminalEntry);
			expect(component.frequencyInMilliseconds).toBeUndefined();

			const expectedEntry: ITerminalEntry = { state: ETerminalEntryState.FREQUENCY, isComplete: false };
			const isShallowEqual = isEqual(component.terminalEntries[0], expectedEntry);
			expect(isShallowEqual).toBeTruthy();
		});
	});

	describe('TerminalWindowComponent - handleTerminalEntryUpdate Method', () => {
		it('should append initial entry when current entry is frequency and set frequencyInMilliseconds', () => {
			const terminalEntry: ITerminalEntry = { state: ETerminalEntryState.FREQUENCY, isComplete: true, input: '1' };
			component.handleTerminalEntryUpdate(terminalEntry);

			const lastTerminalEntry = last(component.terminalEntries);
			expect(lastTerminalEntry.state).toEqual(ETerminalEntryState.INITIAL);
			expect(component.frequencyInMilliseconds).toEqual(1000);
		});

		it('should append in-progress entry when current entry is initial and start the timer', () => {
			const terminalEntry: ITerminalEntry = { state: ETerminalEntryState.INITIAL, isComplete: true, input: '1' };
			component.handleTerminalEntryUpdate(terminalEntry);

			const lastTerminalEntry = last(component.terminalEntries);
			expect(lastTerminalEntry.state).toEqual(ETerminalEntryState.IN_PROGRESS);
		});
	});

	describe('TerminalWindowComponent - handleTerminalInProgressEntry Method', () => {
		it('should generate another in-progress entry if the entry input is not halt', () => {
			const currentEntry: ITerminalEntry = { state: ETerminalEntryState.IN_PROGRESS, isComplete: true, input: '1' };
			component.handleTerminalInProgressEntry(currentEntry);

			const lastTerminalEntry = last(component.terminalEntries);
			expect(lastTerminalEntry.state).toEqual(ETerminalEntryState.IN_PROGRESS);
		});

		it('should generate halted entry if the entry input is halt', () => {
			const currentEntry: ITerminalEntry = { state: ETerminalEntryState.IN_PROGRESS, isComplete: true, input: 'halt' };
			component.handleTerminalInProgressEntry(currentEntry);

			const lastTerminalEntry = last(component.terminalEntries);
			expect(lastTerminalEntry.state).toEqual(ETerminalEntryState.HALTED);
		});
	});

	describe('TerminalWindowComponent - handleTerminalHaltedEntry Method', () => {
		it('should generate another halted entry if the entry input is not resume', () => {
			const currentEntry: ITerminalEntry = { state: ETerminalEntryState.HALTED, isComplete: true, input: '1' };
			component.handleTerminalHaltedEntry(currentEntry);

			const lastTerminalEntry = last(component.terminalEntries);
			expect(lastTerminalEntry.state).toEqual(ETerminalEntryState.HALTED);
		});

		it('should generate resumed entry if the entry input is resume', () => {
			const currentEntry: ITerminalEntry = {
				state: ETerminalEntryState.HALTED,
				isComplete: true,
				input: RESUME_KEYWORD
			};
			component.handleTerminalHaltedEntry(currentEntry);

			const lastTerminalEntry = last(component.terminalEntries);
			expect(lastTerminalEntry.state).toEqual(ETerminalEntryState.RESUMED);
		});
	});

	describe('App Component - addNewTerminalEntry Method', () => {
		it('should add a new entry to the terminal entries array with a given state', () => {
			const newState: ETerminalEntryState = ETerminalEntryState.HALTED;
			component.addNewTerminalEntry(newState);

			const lastTerminalEntry = last(component.terminalEntries);
			expect(lastTerminalEntry.state).toEqual(newState);
		});
	});

	describe('App Component - handleTerminalEntryError Method', () => {
		it('should create a clone entry and correctly mark the current entry as complete', () => {
			const firstEntry = first(component.terminalEntries);
			const frequencyInputError = new Error(FREQUENCY_INPUT_ERROR);
			component.handleTerminalEntryError(firstEntry, frequencyInputError);

			expect(firstEntry.isComplete).toBeTruthy();
			expect(firstEntry.inputErrorMessage).toEqual(FREQUENCY_INPUT_ERROR);

			const lastTerminalEntry = last(component.terminalEntries);
			expect(lastTerminalEntry.state).toEqual(firstEntry.state);
			expect(lastTerminalEntry.isComplete).toBeFalsy();
		});
	});
});
