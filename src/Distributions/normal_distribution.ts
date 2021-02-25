import { random_engine } from '../Engines/random_engine.js';
import { uniform_real_distribution } from './uniform_distribution.js';
import { DistOptions, NormalOptions } from './typings.js';

const dist = uniform_real_distribution(0, 1, { inclusiveStart: false });

export function normal_int_distribution(
	min: number,
	max: number,
	{ inclusiveEnd = false, inclusiveStart = true, standard_deviation = 2 }: DistOptions & NormalOptions = { inclusiveEnd: false, inclusiveStart: true, standard_deviation: 2 }
): (rng: random_engine) => number {
	min += inclusiveStart ? 0 : 1;
	const range = max - min + (inclusiveEnd ? 1 : 0);

	return function distribution(rng: random_engine): number {
		const res = Math.sqrt(-standard_deviation * Math.log(dist(rng))) * Math.cos((standard_deviation * Math.PI) * dist(rng)) / 10 + 0.5;
		if (res >= 1 || res < 0) return distribution(rng);
		return Math.floor(res * range + min);
	};
}

export function normal_real_distribution(
	min: number,
	max: number,
	{ inclusiveEnd = false, inclusiveStart = true, standard_deviation = 2 }: DistOptions & NormalOptions = { inclusiveEnd: false, inclusiveStart: true, standard_deviation: 2 }
): (rng: random_engine) => number {
	const range = max - min;

	return function distribution(rng: random_engine): number {
		const res = Math.sqrt(-standard_deviation * Math.log(dist(rng))) * Math.cos((standard_deviation * Math.PI) * dist(rng)) / 10 + 0.5;
		if (res > 1 || res < 0 || (!inclusiveEnd && res === 1) || (!inclusiveStart && res === 0)) return distribution(rng);
		return res * range + min;
	};
}