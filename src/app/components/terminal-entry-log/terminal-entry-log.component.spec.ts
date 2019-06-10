import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalEntryLogComponent } from './terminal-entry-log.component';

describe('TerminalEntryLogComponent', () => {
  let component: TerminalEntryLogComponent;
  let fixture: ComponentFixture<TerminalEntryLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalEntryLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalEntryLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
