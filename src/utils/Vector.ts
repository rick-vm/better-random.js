import { EMap } from './enhanced_map.js';

/**
 * An enhanced array.
 * 
 * @since 1.0.0
 */
export class Vector<T> extends Array {
	/**
	 * @param size - The initial size of the array, gets filled with empty values
	 * @param entries - An array of [Key, Value] tuples to be added as entries to the new EMap
	 */
	constructor(size = 0, entries?: T[]) {
		super(size);
		if (entries) for (let i = 0; i < entries.length; ++i) this[i] = entries[i];
	}

	/**
	 * Retrieves a random value from this Vector.
	 * 
	 * @since 1.0.0
	 */
	public random(): T | undefined {
		return this[Math.floor(Math.random() * this.length)];
	}

	/**
	 * Retrieves a random index (key) from this Vector.
	 * 
	 * @since 1.0.0
	 */
	public randomIndex(): number {
		return Math.floor(Math.random() * this.length);
	}

	/**
	 * Retrieves a random entry from this Vector.
	 * 
	 * @since 1.0.0
	 */
	public randomEntry(): [number, T] {
		const i = Math.floor(Math.random() * this.length);
		return [i, this[i]];
	}

	/**
	 * Retrieves a random entry from this Vector.
	 * 
	 * @param callback - A function that returns a [key, value] pair for every entry in the Vector
	 * 
	 * @returns An EMap with all entries generated by the callback
	 * 
	 * @since 1.0.0
	 */
	public eMap<K>(callback: (entry: T | undefined, index: number) => [K, T]): EMap<K, T> {
		const entries: [K, T][] = [];
		for (let i = 0; i < this.length; ++i) {
			entries.push(callback(this[i], i));
		}
		return new EMap<K, T>(entries);
	}

	/**
	 * Sets all indeces from `start` to `end` (exclusive) to `value`
	 * 
	 * @param value - The value to fill the Vector with
	 * @param start - The index to start filling at, if negative it is treated as length+start
	 * @param end - The index to stop filling at, if negative it is treated as length+end
	 * 
	 * @since 1.0.0
	 */
	public fill(value: T, start?: number, end?: number): this;
	/**
	 * Fills the Vector with the `values` beginning at `start`
	 * 
	 * @param values - The values to fill the Vector with
	 * @param start - The index to start filling at
	 * 
	 * @since 1.0.0
	 */
	public fill(values: T[], start?: number): this;
	public fill(values: T | T[], start = 0, end = this.length): this {
		if (Array.isArray(values)) {
			for (let i = start; i < values.length + start; ++i) {
				this[i] = values[i];
			}
			return this;
		}
		
		return super.fill(values, start, end);
	}
}