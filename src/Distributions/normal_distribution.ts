import { random_engine } from '../Engines/random_engine.js';
import { uniform_real_distribution } from './uniform_distribution.js';
import { DistOptions, NormalOptions } from './typings.js';

const dist = uniform_real_distribution(0, 1, { inclusiveStart: false });

/**
 * Creates an integer normal/gaussian distribution.
 * 
 * @function
 * 
 * @param min The lower boundry
 * @param max The upper boundry
 * @param options Options for the distribution
 * @param options.inclusiveStart Wether min should be inclusive
 * @param options.inclusiveEnd Wether max should be inclusive
 * @param options.standardDeviation The standard deviation
 * 
 * @returns The distribution function
 */
export function normal_int_distribution(
	min: number,
	max: number,
	{ inclusiveStart = true, inclusiveEnd = false, standardDeviation = 2 }: DistOptions & NormalOptions = { inclusiveStart: true, inclusiveEnd: false, standardDeviation: 2 }
): (rng: random_engine) => number {
	min += inclusiveStart ? 0 : 1;
	const range = max - min + (inclusiveEnd ? 1 : 0);

	return function distribution(rng: random_engine): number {
		const res = Math.sqrt(-standard_deviation * Math.log(dist(rng))) * Math.cos((standard_deviation * Math.PI) * dist(rng)) / 10;
		if (res >= 0.5 || res < -0.5) return distribution(rng);
		return Math.floor((res + 0.5) * range + min);
	};
}

/**
 * Creates an floating point normal/gaussian distribution.
 * 
 * @function
 * 
 * @param min The lower boundry
 * @param max The upper boundry
 * @param options Options for the distribution
 * @param options.inclusiveStart Wether min should be inclusive
 * @param options.inclusiveEnd Wether max should be inclusive
 * @param options.standardDeviation The standard deviation
 * 
 * @returns The distribution function
 */
export function normal_real_distribution(
	min: number,
	max: number,
	{ inclusiveStart = true, inclusiveEnd = false, standardDeviation = 2 }: DistOptions & NormalOptions = { inclusiveStart: true, inclusiveEnd: false, standardDeviation: 2 }
): (rng: random_engine) => number {
	const range = max - min;

	return function distribution(rng: random_engine): number {
		const res = Math.sqrt(-standard_deviation * Math.log(dist(rng))) * Math.cos((standard_deviation * Math.PI) * dist(rng)) / 10;
		if (res > 0.5 || res < -0.5 || (!inclusiveEnd && res === 0.5) || (!inclusiveStart && res === -0.5)) return distribution(rng);
		return (res + 0.5) * range + min;
	};
}