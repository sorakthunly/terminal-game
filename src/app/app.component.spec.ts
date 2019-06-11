import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { first, last } from 'lodash';
import { AppComponent } from './app.component';
import { FREQUENCY_INPUT_ERROR } from './constants/errors';
import { TTerminalEntryState, ITerminalEntry } from './types/terminal-entry';

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AppComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	describe('AppComponent - constructor Method', () => {
		it('should initialise the first 1,000 fibonacci sequence', () => {
			const fibonacciSequenceLength = component.fibonacciSequence.length;
			expect(fibonacciSequenceLength).toBe(1000);
		});

		it('should initialise terminal input entries', () => {
			const terminalEntries = component.terminalEntries;
			const frequencyEntry = terminalEntries[0];
			expect(frequencyEntry.state).toBe('frequency');
			expect(frequencyEntry.isComplete).toBeFalsy();
		});

		it('should initialise the timer', () => {
			expect(component.timeInMilliseconds).toEqual(0);
		});
	});

	describe('AppComponent - handleTerminalInProgressEntry Method', () => {
		it('should generate another in-progress entry if the entry reply is not halt', () => {
			const currentEntry: ITerminalEntry = { state: 'in-progress', isComplete: true, reply: '1' };
			component.handleTerminalInProgressEntry(currentEntry);

			const lastEntry = last(component.terminalEntries);
			expect(lastEntry.state).toEqual('in-progress');
		});

		it('should generate halted entry if the entry reply is halt', () => {
			const currentEntry: ITerminalEntry = { state: 'in-progress', isComplete: true, reply: 'halt' };
			component.handleTerminalInProgressEntry(currentEntry);

			const lastEntry = last(component.terminalEntries);
			expect(lastEntry.state).toEqual('halted');
		});
	});

	describe('AppComponent - handleTerminalHaltedEntry Method', () => {
		it('should generate another halted entry if the entry reply is not resume', () => {
			const currentEntry: ITerminalEntry = { state: 'halted', isComplete: true, reply: '1' };
			component.handleTerminalHaltedEntry(currentEntry);

			const lastEntry = last(component.terminalEntries);
			expect(lastEntry.state).toEqual('halted');
		});

		it('should generate resumed entry if the entry reply is resume', () => {
			const currentEntry: ITerminalEntry = { state: 'halted', isComplete: true, reply: 'resume' };
			component.handleTerminalHaltedEntry(currentEntry);

			const lastEntry = last(component.terminalEntries);
			expect(lastEntry.state).toEqual('resumed');
		});
	});

	describe('App Component - addNewTerminalEntry Method', () => {
		it('should add a new entry to the terminal entries array with a given state', () => {
			const newState: TTerminalEntryState = 'halted';
			component.addNewTerminalEntry(newState);

			const lastEntry = last(component.terminalEntries);
			expect(lastEntry.state).toEqual(newState);
		});
	});

	describe('App Component - handleTerminalEntryError Method', () => {
		it('should create a clone entry and correctly mark the current entry as complete', () => {
			const firstEntry = first(component.terminalEntries);
			const frequencyInputError = new Error(FREQUENCY_INPUT_ERROR);
			component.handleTerminalEntryError(firstEntry, frequencyInputError);

			expect(firstEntry.isComplete).toBeTruthy();
			expect(firstEntry.replyErrorMessage).toEqual(FREQUENCY_INPUT_ERROR);

			const lastEntry = last(component.terminalEntries);
			expect(lastEntry.state).toEqual(firstEntry.state);
			expect(lastEntry.isComplete).toBeFalsy();
		});
	});
});
