import { EMap } from './EMap.js';

export class Vector<T> extends Array {
	constructor(size?: number, entries?: T[]) {
		super(size);
		if (entries) for (let i = 0; i < entries.length; ++i) this[i] = entries[i];
	}

	public random(): T | undefined {
		return this[Math.floor(Math.random() * this.length)];
	}

	public randomIndex(): number {
		return Math.floor(Math.random() * this.length);
	}

	public eMap<K>(callback: (entry: T | undefined, index: number) => [K, T]): EMap<K, T> {
		const entries: [K, T][] = [];
		for (let i = 0; i < this.length; ++i) {
			entries.push(callback(this[i], i));
		}
		return new EMap<K, T>(entries);
	}

	public fill(value: T, start?: number, end?: number): this;
	public fill(values: T[], start?: number): this;
	public fill(values: T | T[], start = 0, end = this.length): this {
		if (Array.isArray(values)) {
			for (let i = 0 + start; i < values.length + start; ++i) {
				this[i] = values[i];
			}
			return this;
		} else {
			return super.fill(values, start, end);
		}
	}
}