import { base_random_engine } from '../engines/base_random_engine.js';
import { ESet } from './ESet.js';

/**
 * Options for unique number generators.
 * 
 * @since 1.0.0
 */
export interface UniqueNumbersGeneratorOptions {
	/**
	 * The percentage of all possible unique numbers that should be generated before resetting the cache
	 * 
	 * The higher this number the longer the generation times will get when most unique numbers have been generated
	 * 
	 * @since 1.0.0
	 */
	uniquePercentage?: number,
	/**
	 * The numbers the generator will be preloaded with
	 * 
	 * @since 1.0.0
	 */
	initialNumbers?: readonly number[]
}

/**
 * The return value of all string generators.
 * 
 * @param rng - A random engine
 * 
 * @since 1.0.0
 */
export type NumberGenerator = (rng: base_random_engine) => number;

/**
 * Creates a unique random number generator.
 * 
 * If generating a unique number fails, it retries until it finds a unique number, when the percentage of unique numbers has been exceeded, the cached numbers get reset.
 * 
 * @param min - The lower boundry, inclusive
 * @param max - The upper boundry, exclusive
 * @param options - Options for the generator
 * @param options.uniquePercentage - The percentage of all possible unique numbers that should be generated before resetting the cache
 * @param options.initialNumbers - The numbers the generator will be preloaded with
 * 
 * @returns The generator function.
 * 
 * @since 1.0.0
 */
export function unique_int_generator(
	min: number,
	max: number,
	{ uniquePercentage = 0.99, initialNumbers = undefined }: UniqueNumbersGeneratorOptions = { uniquePercentage: 0.99, initialNumbers: undefined }
): (rng: base_random_engine) => number {
	const numbers = new ESet<number>(initialNumbers);
	const range = max - min;
	const min_unique = Math.floor(range * Math.min(uniquePercentage, 1));

	return function unique_int(rng: base_random_engine): number {
		if (numbers.size === min_unique) numbers.clear();
		let num: number;
		do {
			num = Math.floor((rng.next() / rng.RANGE * range) + min);
		} while (numbers.has(num));
		numbers.add(num);
		return num;
	};
}