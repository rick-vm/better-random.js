import { random_engine } from '../Engines/random_engine.js';
import { DistOptions } from './typings.js';

/**
 * Creates an integer uniform distribution.
 * 
 * @function
 * 
 * @param min The lower boundry
 * @param max The upper boundry
 * @param options Options for the distribution
 * @param options.inclusiveStart Wether min should be inclusive
 * @param options.inclusiveEnd Wether max should be inclusive
 * 
 * @returns The distribution function
 */
export function uniform_int_distribution(
	min: number, 
	max: number, 
	{ inclusiveStart = true, inclusiveEnd = false }: DistOptions = { inclusiveStart: true, inclusiveEnd: false }
): (rng: random_engine) => number {
	min += inclusiveStart ? 0 : 1;
	const range = max - min + (inclusiveEnd ? 1 : 0);
	return function (rng: random_engine): number {
		return Math.floor((rng.next() / rng.RANGE * range) + min);
	};
}

/**
  * Creates a floating point uniform distribution.
  * 
  * @function
  * 
  * @param min The lower boundry
  * @param max The upper boundry
  * @param options Options for the distribution
  * @param options.inclusiveStart Wether min should be inclusive
  * @param options.inclusiveEnd Wether max should be inclusive
  * 
  * @returns The distribution function
  */
export function uniform_real_distribution(
	min: number, 
	max: number, 
	{ inclusiveStart = true, inclusiveEnd = false }: DistOptions = { inclusiveStart: true, inclusiveEnd: false }
): (rng: random_engine) => number {
	const range = max - min;
	const s = inclusiveStart ? 0 : 1;
	const se = start - (inclusiveEnd ? 1 : 0);
	return function (rng: random_engine): number {
		return ((rng.next() + s) / (rng.RANGE + se) * range) + min;
	};
}