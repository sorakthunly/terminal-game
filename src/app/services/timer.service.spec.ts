import { TestBed } from '@angular/core/testing';
import { TimerService } from './timer.service';

describe('TimerService', () => {
	let service: TimerService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.get(TimerService);
	});

	it('should correctly start and stop the timer and update the isPause state', () => {
		service.startTimer();
		expect(service.timerInterval).toBeDefined();
		expect(service.isPaused).toBeFalsy();

		service.stopTimer();
		expect(service.timerInterval).toBeUndefined();
		expect(service.isPaused).toBeTruthy();
	});
});
