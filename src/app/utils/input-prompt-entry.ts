import { isNumeric } from 'validator';
import { IInputPromptEntry } from '../types/input-prompt';

/**
 * @description
 * Validate that a given input entry is valid.
 *
 * @param {IInputPromptEntry} entry	Input prompt entry object
 */
export function isInputPromptEntryValid(entry: IInputPromptEntry): boolean {
	const reply = entry.reply;

	if (!reply) {
		return false;
	}

	const isReplyNumeric = isNumeric(reply);

	return isReplyNumeric || isInputPromptEntryReplyKeyword(reply);
}

/**
 * @description
 * Whether the reply string is a keyword.
 *
 * @param {string} reply	Reply string
 */
export function isInputPromptEntryReplyKeyword(reply: string) {
	const keywords: Array<string> = ['halt', 'resume', 'quit'];
	const isReplyKeyword = keywords.indexOf(reply) > -1;

	return isReplyKeyword;
}

export function throwInvalidInputPromptEntryError(entry: IInputPromptEntry) {
	switch (entry.state) {
	}
}
