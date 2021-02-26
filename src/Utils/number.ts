import { random_engine } from '../Engines/random_engine.js';
import { ESet } from './ESet.js';

export interface UniqueNumbersGeneratorOptions {
	uniquePercentage?: number,
	initialNumbers?: readonly number[]
}
export function unique_int_generator(
	min: number,
	max: number,
	{ uniquePercentage = 0.99, initialNumbers = undefined }: UniqueNumbersGeneratorOptions = { uniquePercentage: 0.99, initialNumbers: undefined }
): (rng: random_engine) => number {
	const numbers = new ESet<number>(initialNumbers);
	const range = max - min;
	const min_unique = range * uniquePercentage;

	return function unique_int(rng: random_engine): number {
		if (numbers.size > min_unique) numbers.clear();
		let num: number;
		do {
			num = Math.floor((rng.next() / rng.RANGE * range) + min);
		} while (numbers.has(num));
		numbers.add(num);
		return num;
	};
}