export interface IInputPromptEntry {
	state: TInputPromptState;
	isComplete: boolean;
	messages?: Array<string>;
	reply?: string;
	replyErrorMessage?: string;
	isReplyFibonacci?: boolean;
}

export interface IInputPromptEntryCount {
	value: string;
	frequency: number;
}

export type TInputPromptState = 'frequency' | 'initial' | 'in-progress' | 'halted' | 'resumed' | 'quit';
