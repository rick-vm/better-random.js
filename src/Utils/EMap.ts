export class EMap<K, V> extends Map<K, V> {
  private _array: V[] | undefined;
  private _keyArray: K[] | undefined;
  private _entryArray: [K, V][] | undefined;

  constructor(entries?: readonly [K, V][]) {
    super(entries);
  }

  public set(key: K, value: V): this {
    this._array = undefined;
    this._keyArray = undefined;
    return super.set(key, value);
  }

  public delete(key: K): boolean {
    this._array = undefined;
    this._keyArray = undefined;
    return super.delete(key);
  }

  public clear(): void {
    this._array = undefined;
    this._keyArray = undefined;
    return super.clear();
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