import { ElementRef } from '@angular/core';
import { AutoFocusDirective } from './auto-focus.directive';

describe('AutoFocusDirective', () => {
	it('should create an instance', () => {
		const mockElementRef = new ElementRef(null);
		const directive = new AutoFocusDirective(mockElementRef);
		expect(directive).toBeTruthy();
	});
});
