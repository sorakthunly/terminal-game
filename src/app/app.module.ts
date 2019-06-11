import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TerminalEntryErrorComponent } from './components/terminal-entry-error/terminal-entry-error.component';
import { TerminalEntryFormComponent } from './components/terminal-entry-form/terminal-entry-form.component';
import { TerminalEntryLogComponent } from './components/terminal-entry-log/terminal-entry-log.component';
import { TerminalEntryQuestionComponent } from './components/terminal-entry-question/terminal-entry-question.component';
import { TerminalEntryComponent } from './components/terminal-entry/terminal-entry.component';
import { TerminalWindowComponent } from './components/terminal-window/terminal-window.component';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { TerminalEntryQuestionPipe } from './pipes/terminal-entry-question.pipe';

@NgModule({
	declarations: [
		AppComponent,
		AutoFocusDirective,
		TerminalWindowComponent,
		TerminalEntryComponent,
		TerminalEntryQuestionComponent,
		TerminalEntryLogComponent,
		TerminalEntryErrorComponent,
		TerminalEntryFormComponent,
		TerminalEntryQuestionPipe
	],
	imports: [BrowserModule, FormsModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
