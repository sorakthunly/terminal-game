export type TTerminalEntryState = 'frequency' | 'initial' | 'in-progress' | 'halted' | 'resumed' | 'quit';

export interface ITerminalEntry {
	state: TTerminalEntryState;
	isComplete: boolean;
	messages?: Array<string>;
	reply?: string;
	replyErrorMessage?: string;
	isReplyFibonacci?: boolean;
}

export interface ITerminalEntryCount {
	value: string;
	frequency: number;
}
