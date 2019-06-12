import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TerminalWindowComponent } from './components/main';
import {
	TerminalEntryErrorComponent,
	TerminalEntryFormComponent,
	TerminalEntryLogComponent,
	TerminalEntryQuestionComponent,
	TerminalEntryComponent
} from './components/shared';
import { AutoFocusDirective } from './directives';
import { TerminalEntryQuestionPipe } from './pipes';

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
