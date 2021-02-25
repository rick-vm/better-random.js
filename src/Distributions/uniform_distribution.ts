import { random_engine } from '../Engines/random_engine.js';
import { DistOptions } from './typings.js';

export function uniform_int_distribution(min: number, max: number, { inclusiveEnd = false, inclusiveStart = true }: DistOptions = { inclusiveEnd: false, inclusiveStart: true }): (rng: random_engine) => number {
	min += inclusiveStart ? 0 : 1;
	const range = max - min + (inclusiveEnd ? 1 : 0);
	return function (rng: random_engine): number {
		return Math.floor((rng.next() / rng.RANGE * range) + min);
	};
}

export function uniform_real_distribution(min: number, max: number, { inclusiveEnd = false, inclusiveStart = true }: DistOptions = { inclusiveEnd: false, inclusiveStart: true }): (rng: random_engine) => number {
	const range = max - min + (inclusiveEnd ? 1 : 0);
	const start = inclusiveStart ? 0 : 1;
	return function (rng: random_engine): number {
		return ((rng.next() + start) / (rng.RANGE + start) * range) + min;
	};
}