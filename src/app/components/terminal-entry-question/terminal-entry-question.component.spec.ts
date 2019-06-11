import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FREQUENCY_QUESTION } from 'src/app/constants/terminal-entry-questions';
import { TerminalEntryQuestionComponent } from './terminal-entry-question.component';

describe('TerminalEntryQuestionComponent', () => {
	let component: TerminalEntryQuestionComponent;
	let fixture: ComponentFixture<TerminalEntryQuestionComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TerminalEntryQuestionComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TerminalEntryQuestionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should correctly update the UI with the input message provided', () => {
		component.question = FREQUENCY_QUESTION;
		fixture.detectChanges();

		const compiled: HTMLElement = fixture.debugElement.nativeElement;
		const h6 = compiled.querySelector('h6');
		expect(h6.textContent).toEqual(component.question);
	});

	it('should return the UI with null text when no input question is provided', () => {
		const compiled: HTMLElement = fixture.debugElement.nativeElement;
		const h6 = compiled.querySelector('h6');
		expect(h6.textContent).toBe('');
	});
});
