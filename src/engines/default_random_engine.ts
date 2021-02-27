import { base_random_engine } from './base_random_engine.js';

/**
 * The default implementation of Math.random
 * 
 * @since 1.0.0
 */
export class default_random_engine extends base_random_engine {
	constructor() {
		super(0);
	}

	/**
	 * Generates the next number in the PRNG sequence and updates the seed
	 * 
	 * @returns {number}
	 * 
	 * @since 1.0.0
	 */
	public next(): number {
		return Math.random();
	}
}