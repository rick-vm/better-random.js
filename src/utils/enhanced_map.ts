/**
 * An enhanced Map.
 * 
 * @since 1.0.0
 */
export class EMap<K, V> extends Map<K, V> {
	private _array: V[] | undefined;
	private _keyArray: K[] | undefined;
	private _entryArray: [K, V][] | undefined;

	/**
	 * @param entries - An array of [Key, Value] tuples to be added as entries to the new EMap
	 */
	constructor(entries?: readonly (readonly [K, V])[]) {
		super(entries);
	}

	/**
	 * Identical to Map.clear(). Removes all entries from the EMap.
	 * 
	 * @since 1.0.0
	 */
	public clear(): void {
		this._array = undefined;
		this._keyArray = undefined;
		this._entryArray = undefined;
		return super.clear();
	}

	/**
	 * Creates a deep copy of this EMap.
	 * 
	 * @since 1.0.0
	 */
	public clone(): this {
		return new EMap[Symbol.species](this) as this;
	}

	/**
	 * Identical to Map.delete(). Deletes an entry from the EMap.
	 * 
	 * @param key - The key of the entry to delete from the EMap
	 * 
	 * @returns `true` if the entry was removed, `false` if the entry does not exist.
	 * 
	 * @since 1.0.0
	 */
	public delete(key: K): boolean {
		this._array = undefined;
		this._keyArray = undefined;
		this._entryArray = undefined;
		return super.delete(key);
	}

	/**
	 * Identical to Map.forEach(). Executes callback for each entry in the EMap.
	 * 
	 * @param callbackfn - Function to execute for each entry of the EMap
	 * @param thisArg - Value to use as `this` when executing `callbackfn`
	 * 
	 * @since 1.0.0
	 */
	public forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: unknown): this {
		super.forEach(callbackfn, thisArg);
		return this;
	}

	/**
	 * Identical to Map.get(). Gets an entry from the EMap
	 * 
	 * @param key - The key of the entry to retrieve from the EMap
	 * 
	 * @returns `undefined` if the entry does not exist.
	 * 
	 * @since 1.0.0
	 */
	public get(key: K): V | undefined {
		return super.get(key);
	}

	/**
	 * Identical to Map.has(). Checks if an entry exists in the EMap.
	 * 
	 * @param key - The key of the entry to check
	 * 
	 * @returns `true` if the entry exists, `false` if the entry does not exist
	 * 
	 * @since 1.0.0
	 */
	public has(key: K): boolean {
		return super.has(key);
	}

	/**
	 * Identical to Map.set(). Sets a new entry in the collection with the specified key and value.
	 *
	 * @param key - The key of the entry to add
	 * @param value - The value of the entry to add
	 * 
	 * @since 1.0.0
	 */
	public set(key: K, value: V): this {
		this._array = undefined;
		this._keyArray = undefined;
		this._entryArray = undefined;
		return super.set(key, value);
	}

	/**
	 * Creates an array of the values of this EMap and caches it internally. The array will be recreated if an entry is added or removed from the EMap, or if the EMap is cleared.
	 * 
	 * @since 1.0.0
	 */
	public get array(): V[] {
		if (!this._array) this._array = [...this.values()];
		return this._array;
	}

	/**
	 * Creates an array of the keys of this EMap and caches it internally. The array will be recreated if an entry is added or removed from the EMap, or if the EMap is cleared.
	 * 
	 * @since 1.0.0
	 */
	public get keyArray(): K[] {
		if (!this._keyArray) this._keyArray = [...this.keys()];
		return this._keyArray;
	}

	/**
	 * Creates an array of the entries of this EMap and caches it internally. The array will be recreated if an entry is added or removed from the EMap, or if the EMap is cleared.
	 * 
	 * @since 1.0.0
	 */
	public get entryArray(): [K, V][] {
		if (!this._entryArray) this._entryArray = [...this.entries()];
		return this._entryArray;
	}

	/**
	 * Retrieves a random value from this EMap.
	 * 
	 * @since 1.0.0
	 */
	public random(): V | undefined {
		return this.array[Math.floor(Math.random() * this.size)];
	}

	/**
	 * Retrieves a random key from this EMap.
	 * 
	 * @since 1.0.0
	 */
	public randomKey(): K | undefined {
		return this.keyArray[Math.floor(Math.random() * this.size)];
	}

	/**
	 * Retrieves a random entry from this EMap.
	 * 
	 * @since 1.0.0
	 */
	public randomEntry(): [K, V] | undefined {
		return this.entryArray[Math.floor(Math.random() * this.size)];
	}
}