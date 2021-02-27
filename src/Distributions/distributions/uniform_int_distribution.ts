import { base_random_engine } from '../../engines/base_random_engine.js';
import { DistOptions, DistributionFunction } from '../typings.js';

/**
 * Creates an integer uniform distribution.
 * 
 * @param min - The lower boundry
 * @param max - The upper boundry
 * @param options - Options for the distribution
 * @param options.inclusiveStart - Wether min should be inclusive
 * @param options.inclusiveEnd - Wether max should be inclusive
 * 
 * @returns {DistributionFunction} The distribution function
 * 
 * @since 1.0.0
 */
export function uniform_int_distribution(
	min: number,
	max: number,
	{ inclusiveStart = true, inclusiveEnd = false }: DistOptions = { inclusiveStart: true, inclusiveEnd: false }
): DistributionFunction {
	min += inclusiveStart ? 0 : 1;
	const range = max - min + (inclusiveEnd ? 1 : 0);
	return function distribution(rng: base_random_engine): number {
		return Math.floor((rng.next() / rng.RANGE * range) + min);
	};
}