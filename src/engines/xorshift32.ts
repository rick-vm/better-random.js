import { base_random_engine } from './base_random_engine.js';

/**
 * Xoroshift32 PRNG algorithm
 * 
 * @since 1.0.0
 */
export class xorshift32 extends base_random_engine {
	private _x: number;

	constructor(x: number = Math.random() * Math.pow(2, 32)) {
		super(4294967295);

		this._x = x;
	}

	/**
	 * Generates the next number in the PRNG sequence and updates the seed
	 * 
	 * @since 1.0.0
	 */
	next(): number {
		this._x = (this._x ^ this._x << 13) ^ (this._x >>> 17) ^ (this._x << 5);
		return this._x >>> 0;
	}

	/**
	 * Provides the PRNG with a new seed
	 * 
	 * @param x - A 32 bit integer seed
	 * 
	 * @since 1.0.0
	 */
	seed(x: number = Math.random() * Math.pow(2, 32)): void {
		this._x = x;
	}
}