import { random_engine_base } from '../Engines/random_engine_base.js';
import { DistOptions } from './typings.js';

export function uniform_int_distribution(min: number, max: number, { inclusiveEnd = false, inclusiveStart = true }: DistOptions = { inclusiveEnd: false, inclusiveStart: true }): (rng: random_engine_base) => number {
	min += inclusiveStart ? 0 : 1;
	const range = max - min + (inclusiveEnd ? 1 : 0);
	return function (rng: random_engine_base): number {
		return Math.floor(((rng.next() - rng.MIN) / (rng.RANGE + 1) * range) + min);
	};
}

export function uniform_real_distribution(min: number, max: number, { inclusiveEnd = false, inclusiveStart = true }: DistOptions = { inclusiveEnd: false, inclusiveStart: true }): (rng: random_engine_base) => number {
	const range = max - min - (inclusiveEnd ? 1 : 0);
	return function (rng: random_engine_base): number {
		return ((rng.next() - rng.MIN + (inclusiveStart ? 0 : 1)) / (rng.RANGE + 1 + (inclusiveStart ? 0 : 1)) * range) + min;
	};
}