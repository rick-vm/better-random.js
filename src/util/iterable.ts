import { base_random_engine } from '../engines/base_random_engine.js';

export function value(str: string, rng: base_random_engine): string | undefined;
export function value<V>(arr: Array<V>, rng: base_random_engine): V | undefined;
export function value<V>(map: Map<unknown, V>, rng: base_random_engine): V | undefined;
export function value<V>(set: Set<V>, rng: base_random_engine): V | undefined;
export function value<V>(iterable: Array<V> | Map<unknown, V> | Set<V> | string, rng: base_random_engine): string | V | undefined {
	if (iterable instanceof Array || typeof iterable === 'string') {
		return iterable[Math.floor(rng.next() / rng.RANGE * iterable.length)];
	} else {
		return [...iterable.values()][Math.floor(rng.next() / rng.RANGE * iterable.size)];
	}
}

export function key(str: string, rng: base_random_engine): number | undefined;
export function key(arr: Array<unknown>, rng: base_random_engine): number | undefined;
export function key<K>(map: Map<K, unknown>, rng: base_random_engine): K | undefined;
export function key<K>(set: Set<K>, rng: base_random_engine): K | undefined;
export function key<K>(iterable: Array<unknown> | Map<K, unknown> | Set<K> | string, rng: base_random_engine): number | K | undefined {
	if (iterable instanceof Array || typeof iterable === 'string') {
		return Math.floor(rng.next() / rng.RANGE * iterable.length);
	} else {
		return [...iterable.keys()][Math.floor(rng.next() / rng.RANGE * iterable.size)];
	}
}

export function entry(str: string, rng: base_random_engine): [number, string | undefined];
export function entry<V>(arr: Array<V>, rng: base_random_engine): [number, V | undefined];
export function entry<K, V>(map: Map<K, V>, rng: base_random_engine): [K, V] | undefined;
export function entry<V>(set: Set<V>, rng: base_random_engine): [V, V] | undefined;
export function entry<T, V>(iterable: Array<T> | Map<T, V> | Set<T> | string, rng: base_random_engine): [number, string | undefined] | [number, T | undefined] | [T, V] | [T, T] | undefined {
	if (iterable instanceof Array) {
		const i = Math.floor(rng.next() / rng.RANGE * iterable.length);
		return [i, iterable[i]];
	} else if (typeof iterable === 'string') {
		const i = Math.floor(rng.next() / rng.RANGE * iterable.length);
		return [i, iterable[i]];
	} else {
		return [...iterable.entries()][Math.floor(rng.next() / rng.RANGE * iterable.size)];
	}
}