import { random_engine } from '../Engines/random_engine.js';
import { ESet } from '../Engines/random_enginr.js';

export function unique_int_generator(length: number): (rng: random_engine) => number;
export function unique_int_generator(min: number, max: number): (rng: random_engine) => number;
export function unique_int_generator(minOrLength: number, max?: number): (rng: random_engine) => number {
	if (max) {
	  const numbers = new ESet<number>();
	  const range = max - minOrLength;
		return function unique_int(rng: random_engine): number {
		  let num: number;
		  do {
		    num = Math.floor((rng.next() / rng.RANGE * range) + minOrLength);
		  } while (numbers.has(num));
		  numbers.add(num);
			return num;
		};
	} else {
		return function unique_int(rng: random_engine): number {

		}
	}

}