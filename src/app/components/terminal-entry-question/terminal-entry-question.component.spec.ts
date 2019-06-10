import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
