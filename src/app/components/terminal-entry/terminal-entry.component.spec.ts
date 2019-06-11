import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TerminalEntryQuestionPipe } from 'src/app/pipes/terminal-entry-question.pipe';
import { ITerminalEntry } from 'src/app/types/terminal-entry';
import { TerminalEntryComponent } from './terminal-entry.component';

describe('TerminalEntryComponent', () => {
	let component: TerminalEntryComponent;
	let fixture: ComponentFixture<TerminalEntryComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TerminalEntryComponent, TerminalEntryQuestionPipe],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TerminalEntryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should not render any elements if terminalEntry input is not provided', () => {
		const compiled: HTMLElement = fixture.debugElement.nativeElement;
		const wrapperContainer = compiled.querySelector('div');
		expect(wrapperContainer).toBeNull();
	});

	it('should render app-terminal-entry-question and app-terminal-entry-form when a valid entry input is provided', () => {
		component.terminalEntry = { state: 'frequency', isComplete: false };
		fixture.detectChanges();

		const compiled: HTMLElement = fixture.debugElement.nativeElement;
		const terminalEntryQuestion = compiled.querySelector('app-terminal-entry-question');
		expect(terminalEntryQuestion).toBeTruthy();

		const terminalEntryForm = compiled.querySelector('app-terminal-entry-form');
		expect(terminalEntryForm).toBeTruthy();
	});

	it('should render app-terminal-entry-log when an array of log messages are provided', () => {
		component.terminalEntry = { state: 'frequency', isComplete: false, messages: ['Some message'] };
		fixture.detectChanges();

		const compiled: HTMLElement = fixture.debugElement.nativeElement;
		const terminalEntryLog = compiled.querySelector('app-terminal-entry-log');
		expect(terminalEntryLog).toBeTruthy();
	});

	it('should render app-terminal-entry-error when an error message is provided', () => {
		component.terminalEntry = {
			state: 'frequency',
			isComplete: true,
			reply: 'invalid',
			replyErrorMessage: 'Error message'
		};
		fixture.detectChanges();

		const compiled: HTMLElement = fixture.debugElement.nativeElement;
		const terminalEntryError = compiled.querySelector('app-terminal-entry-error');
		expect(terminalEntryError).toBeTruthy();
	});

	it('should output submit event when the submit action is triggered', () => {
		let submitEvent: ITerminalEntry;
		component.submit.subscribe(event => (submitEvent = event));

		const terminalEntry: ITerminalEntry = { state: 'frequency', isComplete: false };
		component.submit.emit(terminalEntry);

		fixture.detectChanges();
		expect(submitEvent).toEqual(terminalEntry);
	});
});
