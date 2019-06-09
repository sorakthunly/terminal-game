import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TerminalEntryComponent } from './components/terminal-entry/terminal-entry.component';
import { TerminalWindowComponent } from './components/terminal-window/terminal-window.component';
import { AutoFocusDirective } from './directives/auto-focus.directive';

@NgModule({
	declarations: [AppComponent, AutoFocusDirective, TerminalWindowComponent, TerminalEntryComponent],
	imports: [BrowserModule, FormsModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
