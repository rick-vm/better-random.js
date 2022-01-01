/**
 * An enhanced Set.
 * 
 * @since 1.0.0
 */
export class ESet<V> extends Set<V> {
	private _array: V[] | undefined;
	private _entryArray: [V, V][] | undefined;

	/**
	 * @param values - An array of values to preload the ESet with
	 */
	constructor(values?: readonly V[]) {
		super(values);
	}

	/**
	 * Identical to Set.size. The number of values in the ESet.
	 * 
	 * @since 1.0.0
	 */
	public get size(): number {
		return super.size;
	}

	/**
	 * Identical to Set.add(). Adds a value to the ESet.
	 * 
	 * @param value - The value to add to the ESet
	 * 
	 * @since 1.0.0
	 */
	public add(value: V): this {
		this._array = undefined;
		this._entryArray = undefined;
		return super.add(value);
	}

	/**
	 * Identical to Set.clear(). Removes all entries from the ESet.
	 * 
	 * @since 1.0.0
	 */
	public clear(): void {
		this._array = undefined;
		this._entryArray = undefined;
		return super.clear();
	}

	/**
	 * Identical to Set.delete(). Removes an entry from the ESet.
	 * 
	 * @param value - The value to remove from the ESet.
	 * 
	 * @returns `true` if the entry was removed, `false` if the entry does not exist.
	 * 
	 * @since 1.0.0
	 */
	public delete(value: V): boolean {
		this._array = undefined;
		this._entryArray = undefined;
		return super.delete(value);
	}

	/**
	 * Identical to Set.has(). Checks if an entry exists in the ESet.
	 * 
	 * @param value - The value to check for
	 * 
	 * @returns `true` if the entry exists, `false` if the entry does not exist.
	 * 
	 * @since 1.0.0
	 */
	public has(value: V): boolean {
		return super.has(value);
	}

	/**
	 * Identical to Set.forEach(). Executes callback for each entry in the ESet.
	 * 
	 * @param callbackfn - Function to execute for each entry of the ESet
	 * @param thisArg - Value to use as `this` when executing `callbackfn`
	 * 
	 * @since 1.0.0
	 */
	public forEach(callbackfn: (value: V, value2: V, set: Set<V>) => void, thisArg?: unknown): this {
		super.forEach(callbackfn, thisArg);
		return this;
	}

	/**
	 * Creates an array of the values of this ESet and caches it internally. The array will be recreated if an entry is added or removed from the ESet, or if the ESet is cleared.
	 * 
	 * @since 1.0.0
	 */
	public get array(): V[] {
		if (!this._array) this._array = [...this.values()];
		return this._array;
	}

	/**
	 * Creates an array of the entries of this ESet and caches it internally. The array will be recreated if an entry is added or removed from the ESet, or if the ESet is cleared.
	 * 
	 * @since 1.0.0
	 */
	public get entryArray(): [V, V][] {
		if (!this._entryArray) this._entryArray = [...this.entries()];
		return this._entryArray;
	}

	/**
	 * Retrieves a random value from the ESet.
	 * 
	 * @since 1.0.0
	 */
	public random(): V | undefined {
		return this.array[Math.floor(Math.random() * this.size)];
	}

	/**
	 * Retrieves a random entry from the ESet.
	 * 
	 * @since 1.0.0
	 */
	public randomEntry(): [V, V] | undefined {
		return this.entryArray[Math.floor(Math.random() * this.size)];
	}
}