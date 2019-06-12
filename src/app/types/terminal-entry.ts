export type TTerminalEntryState = 'frequency' | 'initial' | 'in-progress' | 'halted' | 'resumed' | 'quit';

export interface ITerminalEntry {
	state: TTerminalEntryState;
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
