import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AutoFocusDirective } from './auto-focus.directive';

@Component({
	selector: 'app-test-component',
	template: '<input appAutoFocus type="text" />'
})
class TestComponent {}

describe('AutoFocusDirective', () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComponent, AutoFocusDirective]
		});
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should focus the input after the view is initialised', () => {
		const compiled: HTMLElement = fixture.debugElement.nativeElement;
		const focusInput = compiled.querySelector('input:focus');
		expect(focusInput).toBeTruthy();
	});
});
