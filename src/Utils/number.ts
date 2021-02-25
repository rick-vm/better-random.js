import { random_engine } from '../Engines/random_engine.js';

export function unique_int_generator(length: number): (rng: random_engine) => number;
/**
 * @param min 
 */
export function unique_int_generator(min: number, max: number): (rng: random_engine) => number;
export function unique_int_generator(minOrLength: number, max?: number): (rng: random_engine) => number {
	if (max) {
		const range = max - min;
		return function unique_int(rng: random_engine): number {
			return Math.floor((rng.next() / rng.RANGE * range) + min);
		};
	} else {
		return function unique_int(rng: random_engine): number {

		}
	}

}