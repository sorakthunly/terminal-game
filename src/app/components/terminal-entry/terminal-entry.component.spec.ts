import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalEntryComponent } from './terminal-entry.component';

describe('TerminalEntryComponent', () => {
	let component: TerminalEntryComponent;
	let fixture: ComponentFixture<TerminalEntryComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TerminalEntryComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TerminalEntryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
