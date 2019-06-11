import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ITerminalEntry } from 'src/app/types/terminal-entry';
import { TerminalWindowComponent } from './terminal-window.component';

describe('TerminalWindowComponent', () => {
	let component: TerminalWindowComponent;
	let fixture: ComponentFixture<TerminalWindowComponent>;

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

	it('should create a wrapper terminal container', () => {
		const compiled: HTMLElement = fixture.debugElement.nativeElement;
		const terminalContainer = compiled.querySelector('.terminal-window');
		expect(terminalContainer).toBeTruthy();
	});

	it('should not show any app-terminal-entry element when no terminalEntries input is provided', () => {
		const compiled: HTMLElement = fixture.debugElement.nativeElement;
		const terminalEntry = compiled.querySelector('app-terminal-entry');
		expect(terminalEntry).toBeNull();
	});

	it('should show at least one app-terminal-entry element when terminalEntries input is provided', () => {
		component.terminalEntries = [{ state: 'frequency', isComplete: false }];
		fixture.detectChanges();

		const compiled: HTMLElement = fixture.debugElement.nativeElement;
		const terminalEntry = compiled.querySelector('app-terminal-entry');
		expect(terminalEntry).toBeTruthy();
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
