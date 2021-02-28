import { base_random_engine } from '../engines/base_random_engine.js';
import { MapOptions } from './typings.js';

/**
 * Maps random engine output to a uniform integer range, if needed multiple times uniform_int_distribution is recommended
 * 
 * @param rng - A random engine
 * @param min - The lower boundry
 * @param max - The upper boundry
 * @param options - Options for mapping
 * @param options.inclusiveStart - Wether min should be inclusive
 * @param options.inclusiveEnd - Wether max should be inclusive
 * 
 * @since 1.0.0
 */
export function uniform_int_map(
	rng: base_random_engine,
	min: number,
	max: number,
	{ inclusiveStart = true, inclusiveEnd = false }: MapOptions = { inclusiveStart: true, inclusiveEnd: false }
): number {
	min += inclusiveStart ? 0 : 1;
	return (rng.next() / rng.RANGE * (max - min + (inclusiveEnd ? 0 : 1))) + min;
}