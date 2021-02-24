import { random_engine_base } from '../Engines/random_engine_base.js';

export function random_string_generator(charSet: string | string[], length: number): (rng: random_engine_base) => string {
	let str: string;
	return function (rng: random_engine_base): string {
		str = '';
		for (let i = 0; i < length; ++i) str += charSet[Math.floor(rng.next() / rng.RANGE * charSet.length)];
		return str;
	};
}


const invChars = '\u200B\u2060\u180E\u200D\u200C'; // Invisible characters
export function invisible_string_generator(length: number): (rng: random_engine_base) => string {
	let str: string;
	return function (rng: random_engine_base): string {
		str = '';
		for (let i = 0; i < length; ++i) str += invChars[Math.floor(rng.next() / rng.RANGE * 5 /*length of invChar set*/)];
		return str;
	};
}
