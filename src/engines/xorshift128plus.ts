import { base_random_engine } from './base_random_engine.js';

/**
 * Xoroshift128+ PRNG algorithm
 * 
 * @since 1.0.0
 */
export class xorshift128plus extends base_random_engine {
	private _x: number;
	private _y: number;
	private _z: number;
	private _w: number;

	constructor(x: number = Math.random() * Math.pow(2, 32), y: number = Math.random() * Math.pow(2, 32), z: number = Math.random() * Math.pow(2, 32), w: number = Math.random() * Math.pow(2, 32)) {
		super(4294967295);

		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;
	}

	/**
	 * Generates the next number in the PRNG sequence and updates the seed
	 * 
	 * @returns {number}
	 * 
	 * @since 1.0.0
	 */
	next(): number {
		const t = this._x ^ this._x << 11;

		this._x = this._y;
		this._y = this._z;
		this._z = this._w;

		this._w = (this._w ^ this._w >>> 19) ^ (t ^ t >>> 8);
		return this._w >>> 0;
	}

	/**
	 * Provides the PRNG with a new seed
	 * 
	 * @param x - The first 32 bits of the seed
	 * @param y - The second 32 bit integer of the seed
	 * @param z - The third 32 bit integer of the seed
	 * @param w - The fourth 32 bit integer of the seed
	 * 
	 * @since 1.0.0
	 */
	seed(x: number = Math.random() * Math.pow(2, 32), y: number = Math.random() * Math.pow(2, 32), z: number = Math.random() * Math.pow(2, 32), w: number = Math.random() * Math.pow(2, 32)): void {
		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;
	}
}