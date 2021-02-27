import { base_random_engine } from '../../engines/base_random_engine.js';
import { DistOptions } from '../typings.js';

/**
 * Maps random engine output to a uniform floating point range, if needed multiple times uniform_real_distribution is recommended
 * 
 * @param rng - A random engine
 * @param min - The lower boundry
 * @param max - The upper boundry
 * @param options - Options for mapping
 * @param options.inclusiveStart - Wether min should be inclusive
 * @param options.inclusiveEnd - Wether max should be inclusive
 * 
 * @returns {number}
 * 
 * @since 1.0.0
 */
export function uniform_real_map(
	rng: base_random_engine,
	min: number,
	max: number,
	{ inclusiveStart = true, inclusiveEnd = false }: DistOptions = { inclusiveStart: true, inclusiveEnd: false }
): number {
	return ((rng.next() + (inclusiveStart ? 0 : 1)) / (rng.RANGE + (inclusiveStart ? 0 : 1) - (inclusiveEnd ? 1 : 0)) * (max - min)) + min;
}