/**
 * The base class for all random engines
 * 
 * @abstract
 * 
 * @since 1.0.0
 */
export abstract class base_random_engine {
	/** The highest integer outputted by the PRNG */
	public readonly MAX: number;
	/** The range of the PRNG (MAX + 1) */
	public readonly RANGE: number;

	/**
	 * @param max - The highest integer outputted by the PRNG
	 */
	constructor(max: number) {
		this.MAX = max;
		this.RANGE = max + 1;
	}

	/**
	 * Generates the next number in the PRNG sequence and updates the seed
	 * 
	 * @abstract
	 * 
	 * @returns The generated number.
	 * 
	 * @since 1.0.0
	 */
	public abstract next(): number;
}