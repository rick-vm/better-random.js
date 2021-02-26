import { random_engine } from '../Engines/random_engine.js';
import { ESet } from './ESet.js';

/**
 * Creates a random invisible (invisible unicode characters) string generator
 * 
 * @param charset The characters to be used in generating the random process
 * @param charCount The amount of times a character is added to (or string if the supplied charset is an array) the generated string, if every string/character is of length 1 this represents the length of the generated string
 * @returns Function that returns a random string, takes a random number generator
 */
export function random_string_generator(charset: string | string[], charCount: number): (rng: random_engine) => string {
	return function random_string(rng: random_engine): string {
		let str = '';
		for (let i = 0; i < charCount; ++i) str += charset[Math.floor(rng.next() / rng.RANGE * charset.length)];
		return str;
	};
}

/**
 * Creates a random invisible (invisible unicode characters) string generator
 * 
 * @param length The length of the generated string
 * @returns Function that returns a random invisible string, takes a random number generator
 */
const invChars = '\u200B\u2060\u180E\u200D\u200C'; // Invisible characters
export function invisible_string_generator(length: number): (rng: random_engine) => string {
	return function invisible_string(rng: random_engine): string {
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
 * If generating a unique string fails, it returns any random string that fits within the current cycle, this way strings should be uniformly generated
 * 
 * @param charset The characters to be used in generating the random process
 * @param charCount The amount of times a character is added to (or string if the supplied charset is an array) the generated string, if every string/character is of length 1 this represents the length of the generated string
 * @param uniquePercentage Number between 0 and 1, the percentage of unique strings out of all possible unique strings that at least have to be generated before repeating once. Higher values mean longer generation times but less unique values
 * @param initialStrings The unique strings the generator should be preloaded with, useful if the strings were previously generated and you need to continue generating unique strings
 * @returns Function that returns a random string, takes a random number generator
 */
export function unique_string_generator(
	charset: string | string[],
	charCount: number,
	{ uniquePercentage = 0.99, initialStrings = undefined }: UniqueStringGeneratorOptions = { uniquePercentage: 0.99, initialStrings: undefined }
): (rng: random_engine) => string {
	const strings = new ESet<string>(initialStrings);
	const min_unique = charset.length ** charCount * uniquePercentage;

	return function unique_string(rng: random_engine): string {
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