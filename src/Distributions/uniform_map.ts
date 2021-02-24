import { random_engine_base } from '../Engines/random_engine_base';
import { DistOptions } from './typings.js';

export function uniform_int_map(min: number, max: number, rng: random_engine_base, { inclusiveEnd = false, inclusiveStart = true }: DistOptions = { inclusiveEnd: false, inclusiveStart: true }): number {
	min += inclusiveStart ? 0 : 1;
	return Math.floor((rng.next() / rng.RANGE * (max - min + (inclusiveEnd ? 1 : 0))) + min);
}

export function uniform_real_map(min: number, max: number, rng: random_engine_base, { inclusiveEnd = false, inclusiveStart = true }: DistOptions = { inclusiveEnd: false, inclusiveStart: true }): number {
	return ((rng.next() + (inclusiveStart ? 0 : 1)) / (rng.RANGE + (inclusiveStart ? 0 : 1)) * (max - min + (inclusiveEnd ? 1 : 0))) + min;
}