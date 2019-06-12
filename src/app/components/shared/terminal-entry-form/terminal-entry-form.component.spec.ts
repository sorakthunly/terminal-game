import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FIBONACCI_ALERT } from 'src/app/constants';
import { ITerminalEntry } from 'src/app/types/terminal-entry';
import { TerminalEntryFormComponent } from './terminal-entry-form.component';

describe('TerminalEntryFormComponent', () => {
	let component: TerminalEntryFormComponent;
	let fixture: ComponentFixture<TerminalEntryFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TerminalEntryFormComponent],
			imports: [FormsModule]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TerminalEntryFormComponent);
		component = fixture.componentInstance;
	});

	it('should render the basic component elements with valid entry input provided', () => {
		component.terminalEntry = { state: 'frequency', isComplete: false };
		fixture.detectChanges();

		const compiled: HTMLElement = fixture.debugElement.nativeElement;
		const form = compiled.querySelector('form');
		expect(form).toBeTruthy();

		const input = compiled.querySelector('input');
		expect(input).toBeTruthy();
	});

	it(`should render the component with ${FIBONACCI_ALERT} flag displayed when the entry input is a fibonacci number`, () => {
		component.terminalEntry = { state: 'initial', isComplete: true, input: '1', isInputFibonacci: true };
		fixture.detectChanges();

		const compiled: HTMLElement = fixture.debugElement.nativeElement;
		const completedInputs = compiled.querySelectorAll('.terminal-completed-input');
		const completedInputsArray = Array.from(completedInputs);
		const hasFIBAlert = completedInputsArray.some(completedInput => completedInput.textContent === FIBONACCI_ALERT);
		expect(hasFIBAlert).toBeTruthy();
	});

	it('should output the component terminal entry when submitTerminalInput() is called', () => {
		let submitEvent: ITerminalEntry;
		component.submit.subscribe(event => (submitEvent = event));

		component.terminalEntry = { state: 'frequency', isComplete: false };
		fixture.detectChanges();

		component.submitTerminalInput();

		expect(submitEvent).toEqual(component.terminalEntry);
	});

	it('should focus the input element when a document click event is dispatched', () => {
		component.terminalEntry = { state: 'frequency', isComplete: false };
		fixture.detectChanges();

		document.dispatchEvent(new MouseEvent('click'));
		fixture.detectChanges();

		const compiled: HTMLElement = fixture.debugElement.nativeElement;
		const focusInput = compiled.querySelector('input:focus');
		expect(focusInput).toBeTruthy();
	});
});
