import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TerminalEntryLogComponent } from './terminal-entry-log.component';

describe('TerminalEntryLogComponent', () => {
	let component: TerminalEntryLogComponent;
	let fixture: ComponentFixture<TerminalEntryLogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TerminalEntryLogComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TerminalEntryLogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should not render any paragraphs if no input value is provided', () => {
		const compiled: HTMLElement = fixture.debugElement.nativeElement;
		const paragraph = compiled.querySelector('p');
		expect(paragraph).toBeNull();
	});

	it('should render at least one paragraph correctly when an array of messages are given as input', () => {
		component.messages = ['Some message to display'];
		fixture.detectChanges();

		const compiled: HTMLElement = fixture.debugElement.nativeElement;
		const paragraph = compiled.querySelector('p');
		expect(paragraph).toBeDefined();
		expect(paragraph.textContent).toEqual(`Logged: ${component.messages[0]}`);
	});
});
