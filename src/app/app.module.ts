import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TerminalEntryComponent } from './components/terminal-entry/terminal-entry.component';
import { TerminalWindowComponent } from './components/terminal-window/terminal-window.component';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { TerminalEntryQuestionComponent } from './components/terminal-entry-question/terminal-entry-question.component';
import { TerminalEntryLogComponent } from './components/terminal-entry-log/terminal-entry-log.component';
import { TerminalEntryErrorComponent } from './components/terminal-entry-error/terminal-entry-error.component';
import { TerminalEntryFormComponent } from './components/terminal-entry-form/terminal-entry-form.component';

@NgModule({
	declarations: [AppComponent, AutoFocusDirective, TerminalWindowComponent, TerminalEntryComponent, TerminalEntryQuestionComponent, TerminalEntryLogComponent, TerminalEntryErrorComponent, TerminalEntryFormComponent],
	imports: [BrowserModule, FormsModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
