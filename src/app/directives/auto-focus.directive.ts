import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
	selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit {
	/**
	 * @description
	 * Instantiate the directive and get the selected element.
	 */
	constructor(private element: ElementRef) {}

	/**
	 * @description
	 * Set focus state on the element.
	 */
	ngAfterViewInit() {
		this.element.nativeElement.focus();
	}
}
