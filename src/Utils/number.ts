import { random_engine } from '../Engines/random_engine.js';
import { ESet } from './ESet.js';

export interface UniqueNumbersGeneratorOptions {
	uniquePercentage?: number,
	initialNumbers?: readonly number[]
}

/**
 * Creates a unique random number generator
 * 
 * If generating a unique number fails, it retries untill it finds a unique number, when the percentage of unique numbers has been hit, the numbers get reset
 * 
 * @function
 * @param min The characters to be used in generating the random process
 * @param charCount The amount of times a character is added to (or number if the supplied charset is an array) the generated number, if every number/character is of length 1 this represents the length of the generated number
 * @param {Object} options Any optional options for specifying behaviour like uniqueness
 * @param options.uniquePercentage A value between 0 and 1, the percentage of unique numbers out of all possible unique numbers that at least have to be generated before repeating once. Higher values mean longer generation times but less unique values
 * @param options.initialNumbers The unique numbers the generator should be preloaded with, useful if the numbers were previously generated and you need to continue generating unique numbers
 * @returns Function that returns a random number, takes a random number generator
 */
export function unique_int_generator(
	min: number,
	max: number,
	{ uniquePercentage = 0.99, initialNumbers = undefined }: UniqueNumbersGeneratorOptions = { uniquePercentage: 0.99, initialNumbers: undefined }
): (rng: random_engine) => number {
	const numbers = new ESet<number>(initialNumbers);
	const range = max - min;
	const min_unique = Math.floor(range * uniquePercentage);

	return function unique_int(rng: random_engine): number {
		if (numbers.size === min_unique) numbers.clear();
		let num: number;
		do {
			num = Math.floor((rng.next() / rng.RANGE * range) + min);
		} while (numbers.has(num));
		numbers.add(num);
		return num;
	};
}