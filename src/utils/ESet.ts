export class ESet<V> extends Set<V> {
	private _array: V[] | undefined;
	private _entryArray: [V, V][] | undefined;

	constructor(values?: readonly V[]) {
		super(values);
	}

	public add(value: V): this {
		this._array = undefined;
		this._entryArray = undefined;
		return super.add(value);
	}

	public clear(): void {
		this._array = undefined;
		this._entryArray = undefined;
		return super.clear();
	}

	public delete(value: V): boolean {
		this._array = undefined;
		this._entryArray = undefined;
		return super.delete(value);
	}

	public get array(): V[] {
		if (!this._array) this._array = [...this.values()];
		return this._array;
	}

	public get entryArray(): [V, V][] {
		if (!this._entryArray) this._entryArray = [...this.entries()];
		return this._entryArray;
	}

	public random(): V | undefined {
		return this.array[Math.floor(Math.random() * this.size)];
	}

	public randomEntry(): [V, V] | undefined {
		return this.entryArray[Math.floor(Math.random() * this.size)];
	}
}