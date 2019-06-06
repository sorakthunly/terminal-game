export interface IInputPromptEntry {
	state: TInputPromptState;
	isComplete: boolean;
	reply?: string;
	isReplyFibonacci?: boolean;
}

export type TInputPromptState = 'frequency' | 'initial' | 'in-progress' | 'halted' | 'resumed' | 'quit';
