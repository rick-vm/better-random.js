import { base_random_engine } from '../engines/base_random_engine.js';
import { ESet } from './ESet.js';

/**
 * The return value of all string generators.
 * 
 * @param rng - A random engine
 * 
 * @since 1.0.0
 */
export type StringGenerator = (rng: base_random_engine) => string;

/**
 * Options for unique string generators.
 * 
 * @since 1.0.0
 */
export interface UniqueStringGeneratorOptions {
	/**
	 * The percentage of all possible unique strings that should be generated before resetting the cache
	 * 
	 * The higher this number the longer the generation times will get when most unique strings have been generated
	 * 
	 * @since 1.0.0
	 */
	uniquePercentage?: number,
	/**
	 * The strings the generator will be preloaded with
	 * 
	 * @since 1.0.0
	 */
	initialStrings?: readonly string[]
}

/**
 * Creates a random invisible (invisible unicode characters) string generator
 * 
 * @param charset The characters to be used in generating the random process
 * @param charCount The amount of times a character is added to (or string if the supplied charset is an array) the generated string, if every string/character is of length 1 this represents the length of the generated string
 * 
 * @returns The generator function.
 */
export function random_string_generator(charset: string | string[], charCount: number): StringGenerator {
	return function random_string(rng: base_random_engine): string {
		let str = '';
		for (let i = 0; i < charCount; ++i) str += charset[Math.floor(rng.next() / rng.RANGE * charset.length)];
		return str;
	};
}


const invChars = '\u200B\u2060\u180E\u200D\u200C'; // Invisible characters
/**
 * Creates a random invisible (invisible unicode characters) string generator
 * 
 * @param length - The length of the generated string
 * 
 * @returns The generator function.
 * 
 * @since 1.0.0
 */
export function invisible_string_generator(length: number): StringGenerator {
	return function invisible_string(rng: base_random_engine): string {
		let str = '';
		for (let i = 0; i < length; ++i) str += invChars[Math.floor(rng.next() / rng.RANGE * 5 /*length of invChar set*/)];
		return str;
	};
}

/**
 * Creates a unique random string generator
 * 
 * If generating a unique string fails, it retries untill it finds a unique string, when the percentage of unique strings has been exceeded, the cached strings get reset
 * 
 * @function
 * @param charset The characters to be used in generating the random process
 * @param charCount The amount of times a character is added to (or string if the supplied charset is an array) the generated string, if every string/character is of length 1 this represents the length of the generated string
 * @param options - Options for the generator
 * @param options.uniquePercentage - The percentage of all possible unique strings that should be generated before resetting the cache
 * @param options.initialStrings - The strings the generator will be preloaded with
 * 
 * @returns The generator function.
 * 
 * @since 1.0.0
 */
export function unique_string_generator(
	charset: string | string[],
	charCount: number,
	{ uniquePercentage = 0.99, initialStrings = undefined }: UniqueStringGeneratorOptions = { uniquePercentage: 0.99, initialStrings: undefined }
): StringGenerator {
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