import { base_random_engine } from '../engines/base_random_engine.js';
import { uniform_real_distribution } from './uniform_real_distribution.js';
import { DistOptions, NormalOptions, DistributionFunction } from './typings.js';

const dist = uniform_real_distribution(0, 1, { inclusiveStart: false });

/**
 * Creates an floating point normal/gaussian distribution.
 * 
 * @param min - The lower boundry
 * @param max - The upper boundry
 * @param options - Options for the distribution
 * @param options.inclusiveStart - Wether min should be inclusive
 * @param options.inclusiveEnd - Wether max should be inclusive
 * @param options.standardDeviation - The standard deviation
 * 
 * @returns The distribution function.
 * 
 * @since 1.0.0
 */
export function normal_real_distribution(
	min: number,
	max: number,
	{ inclusiveStart = true, inclusiveEnd = false, standardDeviation = 2 }: DistOptions & NormalOptions = { inclusiveStart: true, inclusiveEnd: false, standardDeviation: 2 }
): DistributionFunction {
	const range = max - min;

	return function distribution(rng: base_random_engine): number {
		let res = Math.sqrt(-standardDeviation * Math.log(dist(rng))) * Math.cos((standardDeviation * Math.PI) * dist(rng)) / 10;
		while (res > 0.5 || res < -0.5 || (!inclusiveEnd && res === 0.5) || (!inclusiveStart && res === -0.5))
			res = Math.sqrt(-standardDeviation * Math.log(dist(rng))) * Math.cos((standardDeviation * Math.PI) * dist(rng)) / 10;
		return (res + 0.5) * range + min;
	};
}