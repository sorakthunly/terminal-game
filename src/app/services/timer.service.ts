import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TimerService {
	/** Time behaviour subject to update the time value */
	time$: BehaviorSubject<number> = new BehaviorSubject(0);

	/** Application timer setInterval */
	timerInterval;

	/**
	 * @description
	 * Whether the state is paused.
	 */
	get isPaused(): boolean {
		return !this.timerInterval;
	}

	/**
	 * @description
	 * Start the time counter.
	 *
	 * @param {number} interval Interval to count in milliseconds, defaulted to ten
	 */
	startTimer(interval: number = 10) {
		this.timerInterval = setInterval(() => {
			this.time$.next(interval);
		}, interval);
	}

	/**
	 * @description
	 * Stop the timer counter.
	 */
	stopTimer() {
		clearInterval(this.timerInterval);
		this.timerInterval = undefined;
	}
}
