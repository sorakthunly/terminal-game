export enum ETerminalEntryState {
	FREQUENCY = 'frequency',
	INITIAL = 'initial',
	IN_PROGRESS = 'in-progress',
	HALTED = 'halted',
	RESUMED = 'resumed',
	QUIT = 'quit'
}

export interface ITerminalEntry {
	state: ETerminalEntryState;
	isComplete: boolean;
	messages?: Array<string>;
	input?: string;
	inputErrorMessage?: string;
	isInputFibonacci?: boolean;
}

export interface ITerminalEntryCount {
	value: string;
	frequency: number;
}
