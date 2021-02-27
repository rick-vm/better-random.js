import { base_random_engine } from '../engines/base_random_engine.js';
import { ESet } from './ESet.js';

/**
 * Creates a random invisible (invisible unicode characters) string generator
 * 
 * @function
 * @param charset The characters to be used in generating the random process
 * @param charCount The amount of times a character is added to (or string if the supplied charset is an array) the generated string, if every string/character is of length 1 this represents the length of the generated string
 * @returns Function that returns a random string, takes a random number generator
 */
export function random_string_generator(charset: string | string[], charCount: number): (rng: base_random_engine) => string {
	return function random_string(rng: base_random_engine): string {
		let str = '';
		for (let i = 0; i < charCount; ++i) str += charset[Math.floor(rng.next() / rng.RANGE * charset.length)];
		return str;
	};
}

/**
 * Creates a random invisible (invisible unicode characters) string generator
 * 
 * @function
 * @param length The length of the generated string
 * @returns Function that returns a random invisible string, takes a random number generator
 */
const invChars = '\u200B\u2060\u180E\u200D\u200C'; // Invisible characters
export function invisible_string_generator(length: number): (rng: base_random_engine) => string {
	return function invisible_string(rng: base_random_engine): string {
		let str = '';
		for (let i = 0; i < length; ++i) str += invChars[Math.floor(rng.next() / rng.RANGE * 5 /*length of invChar set*/)];
		return str;
	};
}

export interface UniqueStringGeneratorOptions {
	uniquePercentage?: number,
	initialStrings?: readonly string[]
}

/**
 * Creates a unique random string generator
 * 
 * If generating a unique string fails, it retries untill it finds a unique string, when the percentage of unique strings has been exceeded, the cached strings get reset
 * 
 * @function
 * @param charset The characters to be used in generating the random process
 * @param charCount The amount of times a character is added to (or string if the supplied charset is an array) the generated string, if every string/character is of length 1 this represents the length of the generated string
 * @param {Object} options Any optional options for specifying behaviour like uniqueness
 * @param options.uniquePercentage A value between 0 and 1, the percentage of unique strings out of all possible unique strings that at least have to be generated before repeating once. Higher values mean longer generation times but less unique values
 * @param options.initialStrings The unique strings the generator should be preloaded with, useful if the strings were previously generated and you need to continue generating unique strings
 * @returns Function that returns a unique random string, takes a random number generator
 */
export function unique_string_generator(
	charset: string | string[],
	charCount: number,
	{ uniquePercentage = 0.99, initialStrings = undefined }: UniqueStringGeneratorOptions = { uniquePercentage: 0.99, initialStrings: undefined }
): (rng: base_random_engine) => string {
	const strings = new ESet<string>(initialStrings);
	const min_unique = Math.floor(charset.length ** charCount * Math.min(uniquePercentage, 1));

	return function unique_string(rng: base_random_engine): string {
		if (strings.size === min_unique) strings.clear();
		let str: string;
		do {
			str = '';
			for (let i = 0; i < charCount; ++i) str += charset[Math.floor(rng.next() / rng.RANGE * charset.length)];
		} while (strings.has(str));
		strings.add(str);
		return str;
	};
}