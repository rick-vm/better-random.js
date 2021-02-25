import { random_engine } from './random_engine.js';

export class xorshift128plus extends random_engine {
	private _x: number;

	constructor(x = Math.random() * Math.pow(2, 32)) {
		super(4294967295);

		this._x = x;
	}

	next(): number {
		this._x = (this._x ^ (this._x << 13)) ^ (this._x >>> 17) ^ (this._x << 5);

		return this._x >>> 0;
	}

	seed(x = Math.random() * Math.pow(2, 32)): void {
		this._x = x;
	}
}