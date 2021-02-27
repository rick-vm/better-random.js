/**
 * Represents a 64 bit integer with a hi and lo 32 bit integer
 * 
 * @since 1.0.0
 */
export class int64 {
	public hi = 0;
	public lo = 0;

	/**
	 * @param hi The high (right-most) 32 bits
	 * @param lo The low (left-most) 32 bits
	 */
	constructor(hi = 0, lo = 0) {
		this.hi = hi >>> 0;
		this.lo = lo >>> 0;
	}

	/**
	 * Add an integer or int64 to this instance
	 * 
	 * @since 1.0.0 
	 */
	public add(int: number): this;
	public add(int: int64): this;
	public add(int: number | int64): this {
		if (int instanceof int64) {
			this.lo += int.lo;
			this.hi += int.hi;
		} else {
			this.lo += int = (4294967295 - this.lo);
		}
		return this;
	}
}