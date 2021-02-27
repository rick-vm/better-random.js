import { base_random_engine } from './base_random_engine.js';

/**
 * Xoroshift64 PRNG algorithm
 * 
 * @since 1.0.0
 */
export class xorshift64 extends base_random_engine {
	private _x: number;
	private _y: number;

	constructor(x: number = Math.random() * Math.pow(2, 32), y: number = Math.random() * Math.pow(2, 32)) {
		super(4294967295);

		this._x = x;
		this._y = -y;
	}

	/**
	 * Generates the next number in the PRNG sequence and updates the seed
	 * 
	 * @returns {number}
	 * 
	 * @since 1.0.0
	 */
	next(): number {
		this._x ^= this._x << 13;
		this._y ^= this._y << 13 | this._x >>> 19;
		this._x ^= this._x >>> 7 | this._y << 25;
		this._y ^= this._y >>> 7;
		this._x ^= this._x << 17;
		this._y ^= this._y << 17 | this._x >>> 15;
		return this._x >>> 0;
	}

	/**
	 * Provides the PRNG with a new seed
	 * 
	 * @param x - The first 32 bits of the seed
	 * @param y - The second 32 bit integer of the seed
	 * 
	 * @since 1.0.0
	 */
	seed(x: number = Math.random() * Math.pow(2, 32), y: number = Math.random() * Math.pow(2, 32)): void {
		this._x = x;
		this._y = -y;
	}
}