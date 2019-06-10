import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalEntryFormComponent } from './terminal-entry-form.component';

describe('TerminalEntryFormComponent', () => {
  let component: TerminalEntryFormComponent;
  let fixture: ComponentFixture<TerminalEntryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalEntryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
