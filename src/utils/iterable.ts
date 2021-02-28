import { base_random_engine } from '../engines/base_random_engine.js';

/**
 * Retrieves a random value from a string.
 * 
 * @param str - The string to retrieve a random value from
 * @param rng - A random engine 
 * 
 * @since 1.0.0
 */
export function random_value(str: string, rng: base_random_engine): string | undefined;
/**
 * Retrieves a random value from an array.
 * 
 * @param arr - The array to retrieve a random value from
 * @param rng - A random engine 
 * 
 * @since 1.0.0
 */
export function random_value<V>(arr: Array<V>, rng: base_random_engine): V | undefined;
/**
 * Retrieves a random value from a Map.
 * 
 * @param map - The map to retrieve a random value from
 * @param rng - A random engine 
 * 
 * @since 1.0.0
 */
export function random_value<V>(map: Map<unknown, V>, rng: base_random_engine): V | undefined;
/**
 * Retrieves a random value from a Set.
 * 
 * @param set - The set to retrieve a random value from
 * @param rng - A random engine 
 * 
 * @since 1.0.0
 */
export function random_value<V>(set: Set<V>, rng: base_random_engine): V | undefined;
/**
 * Retrieves a random value from any iterable.
 * 
 * @param iterable - The iterable to retrieve a random value from
 * @param rng - A random engine 
 * 
 * @since 1.0.0
 */
export function random_value<V>(iterable: Array<V> | Map<unknown, V> | Set<V> | string, rng: base_random_engine): string | V | undefined {
	if (iterable instanceof Array || typeof iterable === 'string') {
		return iterable[Math.floor(rng.next() / rng.RANGE * iterable.length)];
	} else {
		return [...iterable.values()][Math.floor(rng.next() / rng.RANGE * iterable.size)];
	}
}

/**
 * Retrieves a random key from a string.
 * 
 * @param str - The string to retrieve a random key from
 * @param rng - A random engine 
 * 
 * @since 1.0.0
 */
export function random_key(str: string, rng: base_random_engine): number | undefined;
/**
 * Retrieves a random key from an array.
 * 
 * @param arr - The array to retrieve a random key from
 * @param rng - A random engine 
 * 
 * @since 1.0.0
 */
export function random_key(arr: Array<unknown>, rng: base_random_engine): number | undefined;
/**
 * Retrieves a random key from a Map.
 * 
 * @param map - The map to retrieve a random key from
 * @param rng - A random engine 
 * 
 * @since 1.0.0
 */
export function random_key<K>(map: Map<K, unknown>, rng: base_random_engine): K | undefined;
/**
 * Retrieves a random key from a Set.
 * 
 * @param set - The set to retrieve a random key from
 * @param rng - A random engine 
 * 
 * @since 1.0.0
 */
export function random_key<K>(set: Set<K>, rng: base_random_engine): K | undefined;
/**
 * Retrieves a random key from any iterable.
 * 
 * @param iterable - The iterable to retrieve a random key from
 * @param rng - A random engine 
 * 
 * @since 1.0.0
 */
export function random_key<K>(iterable: Array<unknown> | Map<K, unknown> | Set<K> | string, rng: base_random_engine): number | K | undefined {
	if (iterable instanceof Array || typeof iterable === 'string') {
		return Math.floor(rng.next() / rng.RANGE * iterable.length);
	} else {
		return [...iterable.keys()][Math.floor(rng.next() / rng.RANGE * iterable.size)];
	}
}

/**
 * Retrieves a random entry from a string.
 * 
 * @param str - The string to retrieve a random entry from
 * @param rng - A random engine 
 * 
 * @since 1.0.0
 */
export function random_entry(str: string, rng: base_random_engine): [number, string | undefined];
/**
 * Retrieves a random entry from an array.
 * 
 * @param arr - The array to retrieve a random entry from
 * @param rng - A random engine 
 * 
 * @since 1.0.0
 */
export function random_entry<V>(arr: Array<V>, rng: base_random_engine): [number, V | undefined];
/**
 * Retrieves a random entry from a Map.
 * 
 * @param map - The map to retrieve a random entry from
 * @param rng - A random engine 
 * 
 * @since 1.0.0
 */
export function random_entry<K, V>(map: Map<K, V>, rng: base_random_engine): [K, V] | undefined;
/**
 * Retrieves a random entry from a Set.
 * 
 * @param set - The set to retrieve a random entry from
 * @param rng - A random engine 
 * 
 * @since 1.0.0
 */
export function random_entry<V>(set: Set<V>, rng: base_random_engine): [V, V] | undefined;
/**
 * Retrieves a random entry from any iterable.
 * 
 * @param iterable - The iterable to retrieve a random entry from
 * @param rng - A random engine 
 * 
 * @since 1.0.0
 */
export function random_entry<T, V>(iterable: Array<T> | Map<T, V> | Set<T> | string, rng: base_random_engine): [number, string | undefined] | [number, T | undefined] | [T, V] | [T, T] | undefined {
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