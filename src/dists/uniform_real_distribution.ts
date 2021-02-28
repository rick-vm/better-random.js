import { base_random_engine } from '../engines/base_random_engine.js';
import { DistOptions, DistributionFunction } from './typings.js';

/**
 * Creates a floating point uniform distribution.
 * 
 * @param min - The lower boundry
 * @param max - The upper boundry
 * @param options - Options for the distribution
 * @param options.inclusiveStart - Wether min should be inclusive
 * @param options.inclusiveEnd - Wether max should be inclusive
 * 
 * @returns The distribution function.
 *
 * @since 1.0.0
 */
export function uniform_real_distribution(
	min: number,
	max: number,
	{ inclusiveStart = true, inclusiveEnd = false }: DistOptions = { inclusiveStart: true, inclusiveEnd: false }
): DistributionFunction {
	const range = max - min;
	const s = inclusiveStart ? 0 : 1;
	const se = s - (inclusiveEnd ? 1 : 0);
	return function distribution(rng: base_random_engine): number {
		return ((rng.next() + s) / (rng.RANGE + se) * range) + min;
	};
}