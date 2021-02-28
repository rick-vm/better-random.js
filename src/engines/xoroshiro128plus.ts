import { base_random_engine } from './base_random_engine.js';

/**
 * Xoroshiro128+ PRNG algorithm
 * 
 * @since 1.0.0
 */
export class xoroshiro128plus extends base_random_engine {
	private _x: number;
	private _y: number;
	private _z: number;
	private _w: number;

	/**
	 * @param x - The first 32 bits of the seed
	 * @param y - The second 32 bit integer of the seed
	 * @param z - The third 32 bit integer of the seed
	 * @param w - The fourth 32 bit integer of the seed
	 */
	constructor(x: number = Math.random() * Math.pow(2, 32), y: number = Math.random() * Math.pow(2, 32), z: number = Math.random() * Math.pow(2, 32), w: number = Math.random() * Math.pow(2, 32)) {
		super(4294967295);

		this._x = x >>> 0;
		this._y = y >>> 0;
		this._z = z >>> 0;
		this._w = w >>> 0;
	}

	/**
	 * Generates the next number in the PRNG sequence and updates the seed
	 * 
	 * @since 1.0.0
	 */
	next(): number {
		const z = this._z ^ this._x;
		const w = this._w ^ this._y;
		const t = (w + this._y + (z !== 0 && this._x >= (-z >>> 0) ? 1 : 0));

		this._x = (this._y << 23 | this._x >>> 9) ^ z ^ (z << 14);
		this._y = (this._x << 23 | this._y >>> 9) ^ w ^ (w << 14 | z >>> 18);
		this._z = w << 4 | z >>> 28;
		this._w = z << 4 | w >>> 28;

		return t >>> 0;
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
	seed(x: number = Math.random() * Math.pow(2, 31), y: number = Math.random() * Math.pow(2, 31), z: number = Math.random() * Math.pow(2, 31), w: number = Math.random() * Math.pow(2, 31)): void {
		this._x = x >>> 0;
		this._y = y >>> 0;
		this._z = z >>> 0;
		this._w = w >>> 0;
	}
}