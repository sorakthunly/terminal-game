import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TerminalEntryErrorComponent } from './terminal-entry-error.component';

describe('TerminalEntryErrorComponent', () => {
	let component: TerminalEntryErrorComponent;
	let fixture: ComponentFixture<TerminalEntryErrorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TerminalEntryErrorComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TerminalEntryErrorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should not show any paragraph element when input is not provided', () => {
		fixture.detectChanges();

		const compiled: HTMLElement = fixture.debugElement.nativeElement;
		const paragraph = compiled.querySelector('p');
		expect(paragraph).toBeNull();
	});

	it('should correctly update the UI with the input message provided', () => {
		component.message = 'You have an error message';
		fixture.detectChanges();

		const compiled: HTMLElement = fixture.debugElement.nativeElement;
		const paragraph = compiled.querySelector('p');
		expect(paragraph.textContent).toEqual(component.message);
	});
});
