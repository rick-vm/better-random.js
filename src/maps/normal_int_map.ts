import { base_random_engine } from '../engines/base_random_engine.js';
import { MapOptions, NormalOptions } from './typings.js';
import { uniform_real_distribution } from '../distributions/uniform_real_distribution.js';

const dist = uniform_real_distribution(0, 1, { inclusiveStart: false });

/**
 * Maps random engine output to a normal integer range, if needed multiple times normal_int_distribution is recommended
 * 
 * @param rng - A random engine
 * @param min - The lower boundry
 * @param max - The upper boundry
 * @param options - Options for mapping
 * @param options.inclusiveStart - Wether min should be inclusive
 * @param options.inclusiveEnd - Wether max should be inclusive
 * @param options.standardDeviation - The standard deviation
 * 
 * @returns {number}
 * 
 * @since 1.0.0
 */
export function normal_int_map(
	rng: base_random_engine,
	min: number,
	max: number,
	{ inclusiveStart = true, inclusiveEnd = false, standardDeviation = 2 }: MapOptions & NormalOptions = { inclusiveStart: true, inclusiveEnd: false, standardDeviation: 2 }
): number {
	min += inclusiveStart ? 0 : 1;
	let res = Math.sqrt(-standardDeviation * Math.log(dist(rng))) * Math.cos((standardDeviation * Math.PI) * dist(rng)) / 10;
	while (res >= 0.5 || res < -0.5)
		res = Math.sqrt(-standardDeviation * Math.log(dist(rng))) * Math.cos((standardDeviation * Math.PI) * dist(rng)) / 10;
	return Math.floor((res + 0.5) * (max - min + (inclusiveEnd ? 0 : 1) + min));
}

