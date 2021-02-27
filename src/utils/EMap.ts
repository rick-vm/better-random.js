/**
 * An enhanced Map, used internally
 * 
 * @since 1.0.0
 */
export class EMap<K, V> extends Map<K, V> {
	private _array: V[] | undefined;
	private _keyArray: K[] | undefined;
	private _entryArray: [K, V][] | undefined;
	declare public readonly [Symbol.toStringTag]: string;
	declare public readonly size: number;
	declare public static readonly [Symbol.species]: MapConstructor;

	/**
	 * @param entries - An array of [Key, Value] tuples to be added as entries to the new EMap
	 */
	constructor(entries?: readonly (readonly [K, V])[]) {
		super(entries);
	}

	/**
	 * Identical to Map.set(). Sets a new entry in the collection with the specified key and value.
	 * 
	 * @param key - The key of the entry to add
	 * @param value - The value of the entry to add
	 * 
	 * @returns {this}
	 */
	public set(key: K, value: V): this {
		this._array = undefined;
		this._keyArray = undefined;
		this._entryArray = undefined;
		return super.set(key, value);
	}

	/**
	 * Identical to Map.delete(). Deletes an element from the EMap.
	 * 
	 * @param key - The key of the entry to delete from the EMap
	 * 
	 * @returns {boolean} `true` if the element was removed, `false` if the element does not exist.
	 */
	public delete(key: K): boolean {
		this._array = undefined;
		this._keyArray = undefined;
		this._entryArray = undefined;
		return super.delete(key);
	}

	public get array(): V[] {
		if (!this._array) this._array = [...this.values()];
		return this._array;
	}

	public get keyArray(): K[] {
		if (!this._keyArray) this._keyArray = [...this.keys()];
		return this._keyArray;
	}

	public get entryArray(): [K, V][] {
		if (!this._entryArray) this._entryArray = [...this.entries()];
		return this._entryArray;
	}

	public random(): V | undefined {
		return this.array[Math.floor(Math.random() * this.size)];
	}

	public randomKey(): K | undefined {
		return this.keyArray[Math.floor(Math.random() * this.size)];
	}

	public randomEntry(): [K, V] | undefined {
		return this.entryArray[Math.floor(Math.random() * this.size)];
	}
}