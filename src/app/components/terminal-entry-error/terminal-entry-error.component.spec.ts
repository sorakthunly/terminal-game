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

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
