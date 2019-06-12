import { Injectable } from '@angular/core';
import { isUndefined } from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TimerService {
	/** Time counter in milliseconds */
	private timeInMilliseconds: number;

	/** Application timer setInterval */
	private timerIntervalId;

	/** Time counter observable in milliseconds */
	timeInMilliseconds$: BehaviorSubject<number>;

	/**
	 * @description
	 * Instantiate the service.
	 */
	constructor() {
		this.initialiseTimer();
	}

	/**
	 * @description
	 * Initialise the time counter and the observable time counter.
	 */
	initialiseTimer() {
		this.timeInMilliseconds = 0;
		this.timeInMilliseconds$ = new BehaviorSubject(this.timeInMilliseconds);
	}

	/**
	 * @description
	 * Whether the state is paused.
	 */
	get isHalted(): boolean {
		return isUndefined(this.timerIntervalId);
	}

	/**
	 * @description
	 * Start the time counter.
	 *
	 * @param {number} interval Interval to count in milliseconds, defaulted to ten
	 */
	startTimer(interval: number = 10) {
		this.timerIntervalId = setInterval(() => {
			this.timeInMilliseconds += interval;
			this.timeInMilliseconds$.next(this.timeInMilliseconds);
		}, interval);
	}

	/**
	 * @description
	 * Stop the timer counter.
	 */
	stopTimer() {
		clearInterval(this.timerIntervalId);
		this.timerIntervalId = undefined;
	}
}
