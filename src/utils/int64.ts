/**
 * Represents a 64 bit integer by a hi and a lo 32 bit integer.
 * 
 * THIS IS A WORK IN PROGRESS.
 * 
 * It is nowhere near finished as I'm still figuring out how to do all this.
 */
export class int64 {
	/**
	 * The high (left-most) 32 bits.
	 * 
	 * @since 1.0.0
	 */
	public hi = 0;
	/**
	 * The low (right-most) 32 bits.
	 * 
	 * @since 1.0.0
	 */
	public lo = 0;

	/**
	 * @param hi The high (left-most) 32 bits
	 * @param lo The low (right-most) 32 bits
	 */
	constructor(hi = 0, lo = 0) {
		this.hi = hi >>> 0;
		this.lo = lo >>> 0;
	}
}